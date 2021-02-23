FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
COPY . /app 
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install pip --upgrade
RUN pip install -r requirements.txt
CMD ["sh",  "start.sh"]