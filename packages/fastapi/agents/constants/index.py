import json

starter_map = {
    "story": "agents/templates/story/story_starter.json"
}

template_info = {
    "single_short": {
        "cards": {
            "product": "agents/templates/story/single_1.json",
        },
        "required_context": {
            "products": [
                {
                    "title": "",
                    "description": "keep this 10-20 words",
                    "img_url": ""
                }
            ]
        },
        "formats": [
            "single", "multi"
        ],
    },
    "single_long": {
        "cards": {
            "intro": "agents/templates/story/single_long_intro.json",
            "info": "agents/templates/story/single_long_info.json",
        },
        "required_context": {
            "title": "product_title",
            "img_url": "",
            "marketing_content_1": {
                "title": "",
                "description": "",
                "img_url": ""
            },
            "marketing_content_2": {
                "title": "",
                "description": "",
                "img_url": ""
            },
            "marketing_content_3": {
                "title": "",
                "description": "",
                "img_url": ""
            },
        },
        "formats": [
            "single"
        ],
    },
    "single_medium": {
        "cards": {
            "intro": "agents/templates/story/single_medium_intro.json",
            "info": "agents/templates/story/single_medium_info.json",
        },
        "required_context": {
            "title": "",
            "description": "",
            "img_url": "",
            "marketing_content_1": {
                "title": "",
                "description": "",
                "img_url": ""
            },
            "marketing_content_2": {
                "title": "",
                "description": "",
                "img_url": ""
            },
            "marketing_content_3": {
                "title": "",
                "description": "",
                "img_url": ""
            },
        },
        "formats": [
            "single"
        ],
        "image_settings": {
            "aspect-ratio": "16:9"
        }
    },
    "single_store": {
        "cards": {
            "product": "agents/templates/story/single_store.json",
        },
        "required_context": {
            "products": [
                {
                    "product_name": "",
                    "price": "Add currency symbol at start of price",
                    "img_url": ""
                }
            ]
        },
        "formats": [
            "single", "multi"
        ],
    },
}

format_template_map = {fmt: [key for key, value in template_info.items() if fmt in value['formats']] for fmt in set(
    fmt for value in template_info.values() for fmt in value['formats'])}

with open("store/feature_blogs.json", "r") as f:
    blogs = json.load(f)