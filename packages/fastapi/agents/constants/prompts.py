QUERY_GENERATION_SYSTEM_PROMPT = '''
You are my research helper. Given a, you will find the most relevant queries
with which I can query the internet to find the most relevant information about the business.
Provide 3 search queries that you think are relevant to the business and help provide more
context about the business and its business model.

Please provide the queries in the following JSON format:
{
  "queries": [
    ...
  ]
}
'''


MERMAID_GENERATION_SYSTEM_PROMPT = '''
Create a Mermaid BPMN diagram for a company that captures key business processes, departments, and systems. 
Illustrate the flow of tasks, dependencies between processes (e.g., marketing, sales, finance, supply chain), and interactions with external systems (e.g., CRM, ERP). Include decision points, cross-functional workflows, and the dependencies between departments, showing how each process supports the others.

Please provide the diagram in the following JSON format:
{
  "mermaid_diagram_string": "..."
}
'''