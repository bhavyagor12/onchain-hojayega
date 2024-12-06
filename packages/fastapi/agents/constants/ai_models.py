from langchain_openai import ChatOpenAI
import os

XAI_API_KEY = "xai-7jKdO6jExdsL4AGdmLINapDeUQh7J8hHzNmU9831Jo65YpM2hYAdfRmfeOF2EAcWS7pHAXcZjggRpKeK"

grokclient = ChatOpenAI(
    api_key=XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)