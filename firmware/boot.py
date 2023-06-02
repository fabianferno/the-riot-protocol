# boot.py -- run on boot-up
import network
 
def connectToNetwork():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('Connecting to Wifi...')
        sta_if.active(True)
        sta_if.connect("Phantom", '8754462663')
        while not sta_if.isconnected():
            pass
    print('Wifi connected:', sta_if.ifconfig())

connectToNetwork()