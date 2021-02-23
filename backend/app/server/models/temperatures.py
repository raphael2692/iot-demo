from typing import Optional
from pydantic import BaseModel, EmailStr, Field

def ResponseModel(data, message):
    return data


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}