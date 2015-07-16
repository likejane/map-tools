import requests
import json


with open('citibike.json') as f:
	dataN = json.load(f)


url = 'http://localhost:8000/api/maps/'

dataN['name'] = 'bikes'
dataN['notes'] = 'demo'

for i,d in enumerate(dataN['features']):
	d['properties']['marker_id'] = i


headers = {"Content-Type": "application/json"}
print json.dumps(dataN)
r = requests.post(url, data=json.dumps(dataN), headers=headers)
print r.text

