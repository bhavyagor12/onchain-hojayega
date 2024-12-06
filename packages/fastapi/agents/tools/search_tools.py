from langchain_community.retrievers import TavilySearchAPIRetriever
from langchain_community.tools import DuckDuckGoSearchRun

tavily_search_tool= TavilySearchAPIRetriever(k=3)

duckduckgo_search_tool = DuckDuckGoSearchRun(k=3)

