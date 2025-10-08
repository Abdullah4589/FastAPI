from fastapi import APIRouter,Depends,HTTPException
from pydantic import BaseModel
from database import get_db
from sqlalchemy.orm import Session
from models import ToDo
from typing import List
router = APIRouter()

class ToDoCreate(BaseModel):
    title: str
    description: str
    done: bool
class ToDoResponse(ToDoCreate):
    id: int

todos=[]

# # @router.get("/")
# # def Show_Todos():
# #     return todos
@router.post("/",response_model=ToDoResponse)
def create_todo(todo:ToDoCreate,db:Session=Depends(get_db)):
    new_todo=ToDo(title=todo.title,description=todo.description,done=todo.done)
    db.add(new_todo)
    db.commit()
    return new_todo
#@router.put("/{todo_id}")
# def update_todo(todo_id:int,updated_todo:ToDo):
#     for i,todo in enumerate(todos):
#         if todo.id==todo_id:
#             todos[i]=updated_todo
#             return {"message": "Todo has been updated successfully."}
#     return {"message": "Todo not found."}
# @router.delete("/{todo_id}")
# def delete_todo(todo_id:int):
#     global todos
#     todos=[todo for todo in todos if todo.id!=todo_id]
#     return {"message": "Todo has been deleted successfully"}