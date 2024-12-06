from langchain_core.runnables.graph import MermaidDrawMethod
from abc import ABC, abstractmethod
from typing import Optional, Tuple
import os

class WorkflowInterface(ABC):
    """An interface for workflows to standardize structure and behavior."""
    @abstractmethod
    def __init__(self, Checkpointer):
        self.workflow_instance = None
        pass
    
    def _save_workflow_diagram(self, file_path: str):
        self.mermaidimg = self.workflow_instance.get_graph().draw_mermaid_png(
            draw_method=MermaidDrawMethod.API,
        )
        output_file_path = os.path.join(
            file_path, "workflow_diagram.png")
        with open(output_file_path, "wb") as f:
            f.write(self.mermaidimg)

    @abstractmethod
    def start(self, message = "") -> Tuple[str, dict]:
        """Start the workflow, returning a thread ID and the initial event."""
        pass

    @abstractmethod
    def chat(self, thread_id: str, message: dict, file: Optional[str] = None) -> dict:
        """Handle a chat within the workflow, updating its state and returning the latest event."""
        pass

    def get_state(self, thread_id: str) -> dict:
        """Retrieve the current state of the workflow given a thread ID."""
        config = {"configurable": {"thread_id": thread_id}}
        curr_state = self.workflow_instance.get_state(config)
        return curr_state