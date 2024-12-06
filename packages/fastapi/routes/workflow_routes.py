import base64
from typing import Optional, Union
from fastapi import APIRouter, HTTPException, Form, Path, UploadFile, File
from agents.orchestrator import WorkflowOrchestrator
import json
import traceback

# Create an API router specifically for workflow-related routes
router = APIRouter()
# Initialize the WorkflowOrchestrator instance
workflow_orchestrator = WorkflowOrchestrator()


@router.post("/{workflowName}")
async def create_workflow(
    workflowName: str = Path(..., description="Name of the workflow"),
    message: Union[str, None] = Form(
        None, description="Stringified JSON message from the request body (optional)"),
    file: Union[UploadFile, None] = File(
        None, description="Optional uploaded file"),
):
    """
    Initiates a new workflow based on the provided workflow name.
    Returns a unique threadId and the initial state of the workflow.
    """
    try:
        if message:
            try:
                messageJson = json.loads(message)
            except:
                raise HTTPException(
                    status_code=400, detail="Invalid JSON in message")
            threadId, state = workflow_orchestrator.start(
                workflowName, messageJson)
        else:
            threadId, state = workflow_orchestrator.start(workflowName)

        if file:
            file_content = await file.read()
            encoded_file = base64.b64encode(file_content).decode('utf-8')
            message_dict = {}
            message_dict["file"] = encoded_file
            threadId, state = workflow_orchestrator.start(workflow_name=workflowName, message=message_dict)


        return {"status": "success", "state": state, "threadId": threadId}
    except HTTPException as e:
        return {"error": e.detail, "status_code": e.status_code}


@router.get("/{workflowName}/{threadId}")
async def get_workflow_state(
    workflowName: str = Path(..., description="Name of the workflow"),
    threadId: str = Path(..., description="Thread ID of the workflow"),
):
    """
    Retrieves the current state of an active workflow.
    """
    try:
        state = workflow_orchestrator.get_state(workflowName, threadId)
        return {"status": "success", "state": state}
    except HTTPException as e:
        return {"error": e.detail, "status_code": e.status_code}


@router.post("/{workflowName}/{threadId}")
async def chat_workflow(
    workflowName: str = Path(..., description="Name of the workflow"),
    threadId: str = Path(..., description="Thread ID of the workflow"),
    message: str = Form(..., description="Stringified JSON message"),
    file: Union[UploadFile, None] = File(
        None, description="Optional uploaded file"),
):
    """
    Sends additional input to an active workflow.
    Accepts a JSON message and an optional file to continue the workflow session.
    """
    try:
        # Validate threadId
        if not threadId:
            raise HTTPException(
                status_code=400, detail="Thread ID is required")

        # Validate message
        if not message:
            raise HTTPException(status_code=400, detail="Message is required")

        # Parse the JSON message
        try:
            message_dict = json.loads(message)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=400, detail="Invalid JSON in message")

        # Process the optional file
        if file:
            file_data = await file.read()
            # Encode the file data to base64
            encoded_file = base64.b64encode(file_data).decode('utf-8')
            message_dict["file"] = encoded_file

        # Continue workflow
        state = workflow_orchestrator.chat(
            workflowName, threadId, message_dict)

        return {"status": "success", "state": state}

    except HTTPException as e:
        print(traceback.format_exc())
        return {"error": e.detail, "status_code": e.status_code}
    except Exception as e:
        print(traceback.format_exc())
        return {"error": "An unexpected error occurred.", "detail": str(e)}

@router.get("")
async def list_workflows():
    """
    Lists all available workflows.
    """
    try:
        workflow_orchestrator.getAll()
    except HTTPException as e:
        return {"error": e.detail, "status_code": e.status_code}
    except Exception as e:
        return {"error": "An unexpected error occurred.", "detail": str(e)}

