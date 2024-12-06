from typing import Optional
from openai import BaseModel

class PromptRequest(BaseModel):
    prompt: str
    owner: str
    previous_context: Optional[str] = ""


class ImageRequest(BaseModel):
    image_url: str
    owner: str
    previous_context: Optional[str] = None
