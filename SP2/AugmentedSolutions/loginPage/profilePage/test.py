import json
import hmac
import base64
import hashlib
import requests
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from email.utils import formatdate


# el access key del server
SERVER_ACCESS_KEY = 'a6248a354e1c8ce582354b732a45af3895db4d93'
# el secret key del server
# noten que tiene un b al principio del string porque esto dice en
# python que es en bytes, sino truena el hmac
SERVER_SECRET_KEY = b'9402d9396b1af285ea60b95812ff3f93e91fb215'


# crea la aplicacion de flask que es el servidor de python
app = Flask('Vuforia App')
# para que no bloquee las peticiones chrome y firefox
CORS(app)


# el hostname de vuforia web services
VWS_API_ENDPOINT = 'https://vws.vuforia.com/targets'


# calcula el md5 del body
def compute_md5_hex(data):
    h = hashlib.md5()
    h.update(data.encode('UTF-8'))
    return h.hexdigest()


# calcula el signature con el server scret access key
def compute_hmac(data):
    h = hmac.new(SERVER_SECRET_KEY, None, hashlib.sha1)
    h.update(data.encode('UTF-8'))
    return base64.b64encode(h.digest())


# crea el Authorization header y lo devuelve junto con la fecha
# vuforia espera que la fecha del signature y la fecha del request
# sean las mismas
def authorization(body):
    # obtenemos la fecha en GMT
    datestr = str(formatdate(None, localtime=False, usegmt=True))
    components = [
        'POST',                      # HTTP-Verb
        str(compute_md5_hex(body)),  # Content-MD5
        'application/json',          # Content-Type
        datestr,                     # Date
        '/targets'                   # Request-Path (relativo)
    ]
    # creamos el StringToSign
    string_to_sign = '\n'.join(components)
    # computamos y creamos el Authorization header
    signature = compute_hmac(string_to_sign).decode('utf-8')
    auth_header = "VWS %s:%s" % (SERVER_ACCESS_KEY, signature)
    return auth_header, datestr


# practicamente este es el webservice
# que solo pueden acceder por medio de POST
@app.route('/add/', methods=['POST'])
def add():
    # obtenemos lo que nos manda javascript
    data = request.get_json()
    # creamos el body del request
    body = json.dumps({
        'image': data['image'],
        'name': data['name'],
        'width': float(data['width'])
    })
    # creamos los headers
    auth, date = authorization(body)
    headers = {
        'Authorization': auth,
        'Content-Type': 'application/json; charset=utf-8',
        'Date': date
    }
    # efectuamos el request a Vuforia VWS
    response = requests.post(VWS_API_ENDPOINT, data=body, headers=headers)
    # si fue un exito
    if response.status_code == 200 or response.status_code == 201:
        return jsonify({'status': 'OK, Target Created'})
    # si no fue un exito
    else:
        return jsonify({'status': 'ERROR, Invalid request'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
