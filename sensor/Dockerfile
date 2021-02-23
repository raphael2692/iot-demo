FROM python:3.8
COPY . /app 
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install pip --upgrade
RUN pip install -r requirements.txt
CMD ["python",  "dummy_sensor.py", "--database", "test-database","--collection", "sensore_temperatura", "--fake_key", "temperatura", "-t", "sensore_temperatura"]