import requests
import json


with open('sample_maps.json') as f:
	data = json.load(f)


url = 'http://localhost:8000/api/maps/'

for m in data:

	headers = {"Content-Type": "application/json"}
	print json.dumps(m)
	r = requests.post(url, data=json.dumps(m), headers=headers)
	print r.text

