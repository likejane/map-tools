import requests
import json


with open('citibike.json') as f:
	dataN = json.load(f)


url = 'http://localhost:8000/api/mappoints/'

print json.dumps(dataN)

for d in dataN['features']:
	d['properties']['map'] = 3

headers = {"Content-Type": "application/json"}
r = requests.post(url, data=json.dumps(dataN['features']), headers=headers)
print r.text

