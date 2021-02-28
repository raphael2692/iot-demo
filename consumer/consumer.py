import paho.mqtt.client as mqtt
import argparse
from pymongo import MongoClient
import json
import datetime

parser = argparse.ArgumentParser()
parser.add_argument('--topic', required=True, help="Nome topic")
parser.add_argument('--database', required=False,
                    default="test", help="Nome del db MongoDB")
parser.add_argument('--collection', required=True,
                    help="Nome della collection MongoDB, relativamente a un sensore, ad es. 'sensore_temperatura'")
args, unknown = parser.parse_known_args()

with open("config.json") as json_data_file:
    config = json.load(json_data_file)

# Connessione a Mongo
client = MongoClient(config["database"]["uri"])
db = client[args.database]
collection = db[args.collection]

def on_connect(mqttc, obj, flags, rc):
    print("rc: " + str(rc))

def on_message(mqttc, obj, msg):
    print("Messaggio ricevuto!")
    print("Topic: ", msg.topic)
    # print("Qos: ", str(msg.qos))
    print("Payload: ", str(msg.payload))
    msg_dec = msg.payload.decode('utf-8')
    msg_dict = json.loads(msg_dec)
    msg_dict = {list(msg_dict.keys())[0]: list(msg_dict.values())[
        0], "data": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")}
    insert = collection.insert_one(msg_dict)
    print("Callback: Messaggio inviato a MongoDB.")

# def on_publish(mqttc, obj, mid):
#     print("mid: " + str(mid))

def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mqttc, obj, level, string):
    print(string)

# If you want to use a specific client id, use
# mqttc = mqtt.Client("client-id")
# but note that the client id must be unique on the broker. Leaving the client
# id parameter empty will generate a random id for you.

mqttc = mqtt.Client()
mqttc.on_message = on_message
mqttc.on_connect = on_connect
# mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
print("Iscritto al topic: ", args.topic)
# Uncomment to enable debug messages
# mqttc.on_log = on_log
mqttc.connect("172.17.0.1", 1883, 60)
mqttc.subscribe(args.topic, 0)

mqttc.loop_forever()
