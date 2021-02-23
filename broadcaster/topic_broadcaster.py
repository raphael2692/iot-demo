import paho.mqtt.client as mqtt
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--topic', required=True, help="Nome topic")
args, unknown = parser.parse_known_args()

def on_connect(mqttc, obj, flags, rc):
    print("rc: " + str(rc))


def on_message(mqttc, obj, msg):
    print("Messaggio ricevuto!")
    print("Topic: ", msg.topic)
    # print("Qos: ", str(msg.qos))
    print("Payload: ", str(msg.payload))
    # print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))


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