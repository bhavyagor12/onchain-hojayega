import json
import openai
import numpy as np
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Function to get embeddings from OpenAI
def get_openai_embeddings(texts):
    response = openai.Embedding.create(
        input=texts,
        model="text-embedding-ada-002"
    )
    return [item["embedding"] for item in response["data"]]

# Step 1: Load the JSON data (from blogs.json)
with open('./store/plotlines_blogs.json', 'r') as file:
    blog_data = json.load(file)

# Step 2: Chunk the content by feature
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,  # Adjust based on desired chunk size (larger chunks to cover full feature)
    chunk_overlap=100  # Adjust overlap for context
)

chunks_with_metadata = []

# Iterate over features and examples
for feature_data in blog_data:
    feature_name = feature_data["feature"]
    
    # Combine all examples under the feature into one large text block
    feature_content = f"Feature: {feature_name}\n"
    
    for example in feature_data["examples"]:
        company = example["company"]
        purpose = example["purpose"]
        
        for info in example["aggregated_info"]:
            title = info["title"]
            description = info["description"]
            richtext = info["richtext"]
            image_url = info["image"]
            url = info["url"]
            
            # Combine title, description, and richtext into the feature content
            feature_content += f"Company: {company}\nPurpose: {purpose}\nTitle: {title}\nDescription: {description}\nRichtext: {richtext}\nImage URL: {image_url}\nURL: {url}\n\n"
    
    # Chunk the combined feature content
    chunks = text_splitter.split_text(feature_content)

    # Add each chunk with metadata for the feature
    for chunk in chunks:
        chunks_with_metadata.append(
            Document(
                page_content=chunk,
                metadata={
                    "feature": feature_name,  # Store the feature name in metadata
                }
            )
        )

# Step 3: Generate embeddings for each chunk using OpenAI's embeddings
embedding_model = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(chunks_with_metadata, embedding_model)

# Step 4: Save the FAISS index and metadata
vectorstore.save_local("store/blogs_index")

# Step 5: Query the FAISS index
query = "I want to educate the user about my new feature and its benefits."
results = vectorstore.similarity_search(query, k=3)

# Step 6: Display query results with metadata (list features)
print("Query Results:")
features_found = set()
for result in results:
    print(f"Chunk: {result.page_content}")
    print(f"Metadata: {result.metadata}")
    features_found.add(result.metadata['feature'])  # Collect relevant features

# Display the list of relevant features
print("\nRelevant Features:")
for feature in features_found:
    print(feature)