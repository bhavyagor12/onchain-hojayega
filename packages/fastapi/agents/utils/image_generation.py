from langchain_core.messages import SystemMessage, HumanMessage
from agents.constants.ai_models import chat_json
from fastapi import HTTPException
import replicate
import json

IMAGE_PROMPT_IMPROVER = """
I want you to generate a stable diffusion prompt for me. Only output the prompt in a json format as {"prompt": "..."}.
This is the formula for a stable diffusion prompt you can augment the formula a little but stick to the overall format. 
Create the prompt for the product I pass below. Assume details that are not sent to you that are close to the context.
The final image has to be a marketing image, make more illustrations. Dont make realistic images. Dont display humans in the image. Dont have text in the image let it just be an illustration.
There will also be some card context provided with the card context, which you should also take into consideration to theme the image to the card.

Formula: {{prompt_formula}}
"""

DEFAULT_PROMPT_FORMULA = "An image of [adjective] [product/subject] [in a setting or doing an action], [lighting style], [render style], [composition details], [color palette], detailed, realistic, cinematic, trending on ArtStation, in the style of [artist 1], [artist 2], [artist 3], negative: [undesired elements]."

def remove_non_ascii(metadata: dict) -> dict:
    return {key: value.encode('ascii', 'ignore').decode('ascii') if isinstance(value, str) else value
            for key, value in metadata.items()}

def _get_image_prompt_improver_prompt(productName: str, promptFormula: str) -> str:
    prompt = IMAGE_PROMPT_IMPROVER.replace("{{product_name}}", productName)
    prompt = prompt.replace("{{prompt_formula}}", promptFormula)
    return prompt

def generate_image_for_product(
    productName: str,
    cardContext: list[str],
    aspectRatio: str = "9:16",
    promptFormula: str = DEFAULT_PROMPT_FORMULA,
) -> list[str]:
    prompt = _get_image_prompt_improver_prompt(productName, promptFormula)
    images_output_array = []
    final_image_prompt = ""
    try:
        for card in cardContext:
            try:
                messages = [
                    SystemMessage(content=prompt),
                    HumanMessage(content=f"Product: {productName} Card Context: {card}"),
                ]
                response = chat_json.invoke(messages)
                if not response or not response.content:
                    raise ValueError("Failed to extract promotion details from response.")
                final_image_prompt = json.loads(response.content).get("prompt")
                if not final_image_prompt:
                    raise ValueError("Prompt is missing from the response JSON.")
                output = replicate.run(
                    "black-forest-labs/flux-schnell",
                    input={
                        "prompt": final_image_prompt,
                        "go_fast": True,
                        "megapixels": "1",
                        "num_outputs": 1,
                        "aspect_ratio": aspectRatio,
                        "output_format": "webp",
                        "output_quality": 80,
                        "num_inference_steps": 4,
                    },
                )
                images_output_array.append(output)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Image generation error: {str(e)}")
    except json.JSONDecodeError as json_error:
        raise HTTPException(
            status_code=500, detail=f"Failed to parse JSON: {str(json_error)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")