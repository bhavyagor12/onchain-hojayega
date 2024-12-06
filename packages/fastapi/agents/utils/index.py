import base64
from io import BytesIO
import json
from PyPDF2 import PdfReader
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
from fastapi import HTTPException
from agents.constants.prompts import IMAGE_TO_PRD_SYSTEM_PROMPT
from agents.utils.index import stripped_uuid4
from agents.constants.ai_models import chat

def initNode(x, y, label=None, desc=None, cardData=None):
    node = nodeTemplate.copy()
    node['id'] = stripped_uuid4()
    node['position'] = {
        **node['position'],
        'x': x,
        'y': y
    }
    node['data'] = {
        **node['data'],
        **({'nodeLabel': label} if label is not None else {}),
        **({'nodeDescription': desc} if desc is not None else {}),
        **({'cardData': cardData} if cardData is not None else {})
    }
    return node


def initStarterNode(label=None, desc=None, cardData=None, starterNodeData=None):
    node = starterNodeTemplate.copy()
    node['data'] = {
        **node['data'],
        **({'nodeLabel': label} if label is not None else {}),
        **({'nodeDescription': desc} if desc is not None else {}),
        **({'cardData': cardData} if cardData is not None else {})
    }
    if starterNodeData is not None:
        node['data'] = {
            **node['data'],
            **starterNodeData
        }
    return node


def initEdge(source, target, label=None):
    if source is None or target is None:
        raise ValueError("Both 'source' and 'target' must be provided.")
    edge = edgeTemplate.copy()
    edge['id'] = stripped_uuid4()
    edge['source'] = source
    edge['target'] = target
    edge['data'] = {
        **edge['data'],
        **({'label': label} if label is not None else {})
    }
    return edge


def process_input(state):
    messages = state['messages']
    user_input = messages[-1]

    if user_input.type == "file":
        file_data = base64.b64decode(user_input.file)
        pdf_file = BytesIO(file_data)
        reader = PdfReader(pdf_file)
        extracted_text = "".join(page.extract_text()
                                 for page in reader.pages)
        if not extracted_text.strip():
            raise ValueError("Failed to extract text from the PDF.")

        parsed_message = BaseMessage(
            type='PRD', content=extracted_text, role="system")
        return {"messages": parsed_message}

    elif user_input.type == "image_url":
        prd = image_to_prd_ai(user_input)
        return {"messages": prd}

    return state


def image_to_prd_ai(message: BaseMessage):
    image_urls = json.loads(message.content)

    if not image_urls or not isinstance(image_urls, list) or len(image_urls) == 0:
        raise HTTPException(
            status_code=400, detail="At least one image URL is required")

    try:
        # Initialize the OpenAI model with LangChain
        # Prepare messages for the chat
        content_messages = [
            SystemMessage(content=IMAGE_TO_PRD_SYSTEM_PROMPT),
            HumanMessage(content=json.dumps({
                "type": "image_url",
                "image_urls": [{"url": url, "detail": "high"} for url in image_urls]
            }))
        ]

        # Send the chat request
        response = chat.invoke(content_messages)

        # Extract content
        content = response.content
        if not content:
            raise HTTPException(
                status_code=500, detail="Failed to generate PRD from images")

        try:
            return BaseMessage(content=content, role="system", type="PRD")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"An error occurred: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
