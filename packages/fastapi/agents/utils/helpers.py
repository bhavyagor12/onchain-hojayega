import json
import uuid

def is_json(string: str) -> bool:
    """
    Checks if the given string is valid JSON.

    Args:
        string (str): The string to check.

    Returns:
        bool: True if the string is valid JSON, False otherwise.
    """
    try:
        json.loads(string)
        return True
    except (ValueError, TypeError):
        return False


def stripped_uuid4():
    return str(uuid.uuid4()).replace('-', '')