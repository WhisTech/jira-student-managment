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