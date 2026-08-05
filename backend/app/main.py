from fastapi import FastAPI
from app.config.database import supabase

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI + Supabase Connected"}

@app.get("/users")
def get_users():
    response = supabase.table("users").select("*").execute()
    return response.data

@app.get("/students")
def get_students():
    response = supabase.table("students").select("*").execute()
    return response.data

@app.post("/students")
def create_student(student: dict):
    response = supabase.table("students").insert(student).execute()
    return response.data

@app.get("/students/{student_id}")
def get_student(student_id: str):
    response = supabase.table("students").select("*").eq("id", student_id).execute()
    return response.data

@app.put("/students/{student_id}")
def update_student(student_id: str, student: dict):
    response = supabase.table("students").update(student).eq("id", student_id).execute()
    return response.data

@app.delete("/students/{student_id}")
def delete_student(student_id: str):
    response = supabase.table("students").delete().eq("id", student_id).execute()
    return response.data