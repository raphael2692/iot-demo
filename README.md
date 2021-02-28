# IoT Architecture Demo

![Architettura](/screens/architettura_iot.png)



Il repo contiene il prototipo di un'architettura scalabile utilizzabile in un contesto IoT. 

I componenti principali dell'applicazione sono:

1. Un broker mqtt (mosquitto)
2. Un servizio  producer (crea un dato finto e lo invia al topic /temperatura)
3. Un servizio consumer (quando viene pubblicato un nuovo messaggio su /temperatura invia il dato a un db remoto)
4. MongoDB Atlas un istanza online di MongoDB
5. FastAPI un framework REST per esporre i dati in database a dei client front-end. 100% compliant allo standard OpenAPI (Swagger)
6. Una dashboard responsiva in React. 

Ogni componente è dockerizzato (tranne il database). Per far girare l'applicazione la prima volta digitare:

```shell
sudo docker-compose up --build
```

Dopodiché si può omettere `--build`  (a meno che non si istallino nuove dipendenze). 

Una volta che il servizio è attivo, è possibile modificare il sorgente senza bisogno di riavviare per buildare le modifiche. 

## Possibili pull request:

1. Implementare l'autenticazione dei metodi su FastAPI 
2. Implementare uno scambio di certificati di sicurezza su mqtt
3. Sostituire Atlas con un container dedicato e implementare un metodo di autenticazione robusto (flusso consumer -> mongo)
4. Creare un clone dell'app che supporti Postgres invece di mongo (va cambiato l'ORM lato FastAPI, ad es. sqlalchemy invece di Motor)
5. Creare un clone della dashboard con Vue.JS
6. Connettere dei nuovi sensori "fake" e creare nuove route (sul backend) e view (sul frontend)
7. Creare un modello di forecasting della temperatura e implementare su FastAPI una route per le predizioni e delle view interessanti su React
8. Implementare un meccanismo di job watching e load balancing


## Screenshot

### Dashboard 
![Dashboard](/screens/dashboard.png)

<br />

### Swagger
![FastAPI](/screens/fastapi_route.png)



