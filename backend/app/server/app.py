from fastapi import FastAPI
import motor.motor_asyncio
from server.routes.temperatures import router as TemperaturesRouter
import json

from fastapi.middleware.cors import CORSMiddleware


config_path = "../config.json"
with open(config_path) as json_data_file:
    config = json.load(json_data_file)

MONGO_URL = config["database"]["uri"]
app = FastAPI()

# CORS
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://0.0.0.0:8080",
    "http://localhost:3000",
    "http://0.0.0.0:3000"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = client["test-database"]
temp_collection = database.get_collection("sensore_temperatura")


app.include_router(TemperaturesRouter, tags=[
                   "Temperature"], prefix="/temperatures")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "App di test"}
