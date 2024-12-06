import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.workflow_routes import router as workflow_router
import os

dotenv_path = os.path.join(os.path.dirname(__file__), 'packages/fastapi/.env')
print(dotenv_path)

load_dotenv(dotenv_path=dotenv_path)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

start_time = time.time()\
    
app.include_router(workflow_router, prefix="/workflow", tags=["Workflow"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

