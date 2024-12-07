from langchain_community.retrievers import TavilySearchAPIRetriever
from langchain_community.tools import DuckDuckGoSearchRun
from tavily import TavilyClient, AsyncTavilyClient
from langchain.tools import Tool

tavily_search_tool= TavilySearchAPIRetriever(k=3)

duckduckgo_search_tool = DuckDuckGoSearchRun(k=3)

tavily_client = AsyncTavilyClient(api_key="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")

tavily_tool = Tool(
    name="TavilySearch",
    func=tavily_search_tool.get_relevant_documents,
    description="Search using the Tavily API. Use this tool to find detailed, specific information."
)

duckduckgo_tool = Tool(
    name="DuckDuckGoSearch",
    func=duckduckgo_search_tool.run,
    description="Search the web using DuckDuckGo. Use this tool for general-purpose searches."
)
