import json
from typing import Optional, Type, Dict, Union
from agents.utils.helpers import is_json
from agents.constants.ai_models import grokclient
from fastapi import HTTPException
from agents.workflows.index import WorkflowInterface

class WorkflowOrchestrator:
    def __init__(self):
        # Set up database connection and checkpointer
        self.connection_kwargs = {
            "autocommit": True,
            "prepare_threshold": 0,
        }
        # Mapping of workflows to initialization functions
        self.agents: Dict[str, Type[WorkflowInterface]] = {
        }

    def start(self, workflow_name: str, message: Optional[Union[dict, str]] = None):
        """Starts a workflow by name if available, else raises an HTTPException."""
        try:
            if workflow_name in self.agents:
                if (message):
                    return self.agents[workflow_name].start(message)
                return self.agents[workflow_name].start()
            else:
                raise HTTPException(status_code=404, detail="Workflow not found")
        except HTTPException as http_exc:
            raise http_exc
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=str(e))

    def chat(self, workflow_name: str, thread_id: str, message: dict):
        """Replies to an active workflow given a workflow name, thread ID, and message."""
        if workflow_name not in self.agents:
            raise HTTPException(status_code=404, detail="Workflow not found")

        if workflow_name in self.agents:
            return self.agents[workflow_name].chat(thread_id, message)
        else:
            raise HTTPException(
                status_code=500, detail="Workflow chat not implemented")

    def get_state(self, workflow_name: str, thread_id: str):
        """Retrieves the current state of an active workflow."""
        if workflow_name not in self.agents:
            raise HTTPException(status_code=404, detail="Workflow not found")
        return self.agents[workflow_name].get_state(thread_id)
