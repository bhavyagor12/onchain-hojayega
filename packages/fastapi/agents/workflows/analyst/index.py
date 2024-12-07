import json
from typing import Annotated, List, Literal, Optional, TypedDict
from fastapi import HTTPException
from langchain_core.messages import BaseMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from agents.utils.helpers import is_json, stripped_uuid4
from agents.workflows.index import WorkflowInterface
import os
from operator import add
from agents.workflows.analyst.nodes import approval_modifier, approval_node, context_generator, end_workflow, mermaid_generator, start_workflow, process_input


class WorkflowState(TypedDict):
    messages: Annotated[list, add_messages]
    user_prompt: str
    company_name: str
    context: str
    mermaid_diagram: str
    file: any


class AnalystWorkflow(WorkflowInterface):
    def __init__(self, Checkpointer):
        self.graph = StateGraph(WorkflowState)
        self._initialize_graph()
        self.workflow_instance = self.graph.compile(
            interrupt_before=["process_input", "approval_node"],
            checkpointer=Checkpointer,
        )
        # self._save_workflow_diagram(os.path.dirname(__file__))

    def _initialize_graph(self):
        """Setup the state graph for the workflow process."""
        self.graph.add_node('start', start_workflow)
        self.graph.add_node('process_input', process_input)
        self.graph.add_node('context_generator', context_generator)
        self.graph.add_node('mermaid_generator', mermaid_generator)
        self.graph.add_node('approval_node', approval_node)
        self.graph.add_node('end', end_workflow)

        self.graph.add_edge('start', 'process_input')
        self.graph.add_edge('process_input', 'context_generator')
        self.graph.add_edge('context_generator', 'mermaid_generator')
        self.graph.add_edge('mermaid_generator', 'approval_node')
        self.graph.add_conditional_edges('approval_node', approval_modifier)

        self.graph.set_entry_point('start')

    def start(self, message: dict = {}):
        thread_id = stripped_uuid4()
        config = {"configurable": {"thread_id": thread_id}}
        json_message = json.loads(message)
        print(message)

        if message:
            initial_message = BaseMessage(content=json_message.get("content", {}), type=json_message.get(
            "type", ""), role=json_message.get("role", ""), file=json_message.get("file", ""))
            initial_state = WorkflowState(
                messages=[initial_message],
                elementDOM=None,
                intent=[],
                improved_prompt="",
                updated_style={},
                updated_content=""
            )
            latest_event = None
            for event in self.workflow_instance.stream(initial_state, config, stream_mode="values"):
                latest_event = event
            return thread_id, latest_event
        else:
            initial_state = WorkflowState(
                messages=[],
                elementDOM=None,
                intent=[],
                improved_prompt="",
                updated_style={},
                updated_content=""
            )
            latest_event = None
            return thread_id, latest_event

    def chat(self, thread_id: str, message: dict, file: Optional[str] = None):
        config = {"configurable": {"thread_id": thread_id}}
        curr_state = self.workflow_instance.get_state(config)
        print(curr_state)
        curr_state = self.workflow_instance.get_state(config)
        values = curr_state.values
        json_message = json.loads(message)
        if values.get("finished"):
            if values["finished"] is True:
                return "Chat has ended"
        messages = values.get("messages", [])
        if message:
            user_message = BaseMessage(content=json_message.get(
                "content", ""), type=json_message.get("type", ""), role=json_message.get("role", ""), file=json_message.get("file", ""))
            messages.append(user_message)
            self.workflow_instance.update_state(
                config=config, values={**values, "messages": messages})
        if file:
            self.workflow_instance.update_state(
                config=config, values={**values, "file": file})
        latest_event = None
        for event in self.workflow_instance.stream(None, config, stream_mode="values"):
            latest_event = event
        return latest_event