# IoT Demo

This is a demo application for the main components of an IoT application. The app is written mainly in python, with a React frontend. 

The application is composed of:

1. mqtt broker (mosquitto/python)
2. mqtt publisher (which sends fake temperature data)
3. mongoDB database (via Atlas)
4. FastAPI (to serve data in a RESTful manner with using http)
5. React frontend (which query FastAPI for temperature data)

Every component of the app is dockerized. To run the app, create a database using a free istance of [Atlas]("https://www.mongodb.com/cloud/atlas/register") and create a database named "database-test". Get the uri and add it the config files in `/backend` and `/sensor`. 

Run the app using docker-compose:

```shell

sudo docker-compose up --build

```


## Screens

![FastAPI](/screens/fastapi_route.png)

<br />

![Dashboard](/screens/dashboard.png)