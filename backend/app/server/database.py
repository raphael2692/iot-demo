import motor.motor_asyncio
from bson.objectid import ObjectId
import json

config_path = "../config.json"
with open(config_path) as json_data_file:
    config = json.load(json_data_file)

MONGO_URL = config["database"]["uri"]

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = client["test-database"]
temp_collection = database.get_collection("sensore_temperatura")

# Helpers
def list_to_dict(item) -> dict:
    return {
        "id": str(item["_id"]),
        "temperatura": str(item["temperatura"]), 
        "data": str(item["data"])
    }

# Retrieve all students present in the database
async def retrieve_temperatures():
    temperatures = []
    async for temperature in temp_collection.find().sort("_id", -1).limit(10):
        temperatures.append(list_to_dict(temperature))
    return temperatures

    