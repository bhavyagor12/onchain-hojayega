
import base64
from io import BytesIO
import json
import time
from PyPDF2 import PdfReader
from duckduckgo_search import DDGS
from fastapi import HTTPException
from langchain_core.messages import BaseMessage
from agents.constants.ai_models import chat_json
from agents.constants.prompts import MERMAID_GENERATION_SYSTEM_PROMPT, QUERY_GENERATION_SYSTEM_PROMPT


def start_workflow(state):
    return {
        "messages": [
            BaseMessage(content="Hey, I'm Morgan, your AI Business Analyst. Let me help you map your business out and seperate it into different compoents to modularise and make a plan to bring you onchain.",
                        role="system", type="text")
        ]
    }

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
    
    return {"messages": messages, "user_prompt": user_input.content, "company_name": user_input.content}

def context_generator_with_retry(queries) -> str:
    context = ""
    max_retries = 5  # Maximum number of retries
    retry_delay = 2  # Delay (in seconds) before retrying

    for query in queries:
        retries = 0
        while retries < max_retries:
            try:
                # Attempt to get the response for the query
                response = DDGS().text(query, max_results=3)
                context += f"{response}\n"
                break  # Break out of the retry loop if successful
            except Exception as e:
                if "RateLimited" in str(e):
                    retries += 1
                    print(f"Rate limited, retrying... Attempt {retries}/{max_retries}")
                    time.sleep(retry_delay * retries)  # Exponential backoff (retry_delay increases with each attempt)
                else:
                    print(f"An error occurred: {e}")
                    break  # If the error isn't rate-limiting, break out of the loop
    
    return context

def context_generator(state):
    user_prompt = state['user_prompt']
    try:
        response = chat_json.invoke(
            [
                {"role": "system", "content": QUERY_GENERATION_SYSTEM_PROMPT},
                {"role": "human", "content": user_prompt}
            ]
        )
        content = response.content
        if not content:
            raise HTTPException(
                status_code=500, detail="Failed to extract style details")

        # Parse JSON response
        try:
            res = json.loads(content)
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500, detail=f"Failed to parse JSON: {str(e)}")
    except Exception as e:
        raise ValueError("Failed to generate queries from the user prompt.")

    queries = res.get("queries", [])
    context = context_generator_with_retry(queries)
    return {
        "messages": [
            BaseMessage(content="Searching the web for more information based on the queries generated...",
                        role="tool", type="text")
        ],
        "context": context
    }

    # Run the agent to get queries

def mermaid_generator(state):
    context = state['context']
    company_name = state['company_name']
    try:
        response = chat_json.invoke(
            [
                {"role": "system", "content": MERMAID_GENERATION_SYSTEM_PROMPT},
                {"role": "human", "content": company_name},
                {"role": "human", "content": context}
            ]
        )
        content = response.content
        if not content:
            raise HTTPException(
                status_code=500, detail="Failed to extract style details")
        # Parse JSON response
        try:
            res = json.loads(content)
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500, detail=f"Failed to parse JSON: {str(e)}")
    except Exception as e:
        raise ValueError("Failed to generate mermaid diagram from the user prompt.")
    print(res)
    return {
        "messages": [
            BaseMessage(content="I have generated a mermaid diagram based on the queries you provided. Please review it and let me know if you would like to proceed.",
                        expect_user_response=True, role="system", type="text")
        ],
        "mermaid_diagram": res.get("mermaid_diagram_string")
    }

def approval_node(state):
    return {
        "messages": [
            BaseMessage(content="Do you approve of the mermaid diagram I generated?",
                        expect_user_response=True, role="system", type="text")
        ]
    }

def end_workflow(state):
    return {
        "messages": [
            BaseMessage(content="Thanks! Its been a pleasure working with you, you can now talk to my colleague Clyde",
                        role="system", type="text")
        ]
    }

# Edges

def approval_modifier(state):
    messages = state['messages']
    user_input = messages[-1]
    if user_input.content.lower() == "yes":
        # return {"messages": [BaseMessage(content="Thanks! Its been a pleasure working with you, you can now talk to my colleague Clyde", role="system", type="text")]}
        return "end_node"
    else :
        return "context_generator"
