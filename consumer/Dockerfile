FROM python:3.8
COPY . /app 
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install pip --upgrade
RUN pip install -r requirements.txt


CMD ["python",  "consumer.py", "--topic", "sensore_temperatura", "--database", "test-database","--collection", "sensore_temperatura"]