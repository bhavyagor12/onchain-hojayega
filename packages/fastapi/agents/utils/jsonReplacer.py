import json


class JsonReplacer:
    def __init__(self):
        self.json_string = None

    def load(self, file_path: str) -> str:
        """
        Load a JSON file from the given file path and convert it to a string.

        :param file_path: The path to the JSON file.
        :return: The JSON content as a string.
        """
        with open(file_path, 'r', encoding='utf-8') as file:
            self.json_string = file.read()
        return json.loads(self.json_string)

    def replace(self, replace_dict: dict[str, str]) -> dict:
        """
        Replace placeholders in the JSON string with corresponding values from the replace_dict
        and return the modified JSON as a dictionary.

        :param replace_dict: A dictionary where keys are placeholders to be replaced in the JSON string.
        :return: The modified JSON content as a dictionary with placeholders replaced by their corresponding values.
        """
        if not self.json_string:
            raise ValueError(
                "No JSON string loaded. Please load a JSON file first.")
        new_json = self.json_string
        for key, value in replace_dict.items():
            placeholder = f"{{{{ {key} }}}}"
            if isinstance(value, (list, dict)):
                placeholder = f'"{{{{ {key} }}}}"'
                value = json.dumps(value)
            new_json = new_json.replace(placeholder, value)
        return json.loads(new_json)
