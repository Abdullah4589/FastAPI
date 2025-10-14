from fastapi import FastAPI
from database import engine
from models import Base
from curd import router as crud_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI()

# This is the new, more permissive CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

Base.metadata.create_all(bind=engine)

app.include_router(crud_router, prefix="/todos", tags=["todos"])
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1",port=8000)