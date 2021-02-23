from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (

    retrieve_temperatures
)
from server.models.temperatures import (
    ErrorResponseModel,
    ResponseModel
)

router = APIRouter()

@router.get("/", response_description="Dati sulla temperatura")
async def get_temperatures():
    temperatures = await retrieve_temperatures()
    if temperatures:
        return ResponseModel(temperatures, "Dati sulla temperatura restituiti corettamente")
    return ResponseModel(temperatures, "Nessun dato sulla temperatura")