import os
from langchain_openai import ChatOpenAI


chat_json = ChatOpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),
    model="gpt-4o",
    max_tokens=8000,
    model_kwargs={
        "response_format": {"type": "json_object"}
    }
)


