from fastapi import FastAPI
from database import engine
from models import Base
from curd import router as crud_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(crud_router, prefix="/todos", tags=["todos"])