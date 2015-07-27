#map-tools


## mapper

A [GeoDjango][1] app for creating maps.

### Development

- API: [http://localhost:8000/api/](http://localhost:8000/api/)
- Demo Map: [http://localhost:8000/](http://localhost:8000/)

#### Prerequisites

- __Python:__ The [buzzfeed dev setup][2] kickstart script should take care of your python setup. If you're having trouble setting up a virtualenv make sure the following is in `~/.bash_profile`, then run ``source ~/.bash_profile`.
	
	``` bash
	export WORKON_HOME=$HOME/.virtualenvs
	export PROJECT_HOME=$HOME/Devel
	source /usr/local/bin/virtualenvwrapper.sh
	```

- __Postgres:__ The django app uses a PostgreSQL database with GIS functionality. To install postgres installed and get it running([source][3]):

	``` bash
	$ brew install postgresql
	$ brew install postgis
	$ ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
	$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
	```
- GeoDjango also requries GDAL and libgeoip.

	``` bash
	$ brew install gdal
	$ brew install libgeoip
	```
- __Sass__:
	``` bash
	$ sudo gem install sass
	```

#### Setup

1. Create virtualenv and install requirements.

	``` bash
	$ mkvirtualenv mapper
	$ pip install -U -r requirements.txt
	```

2. Setup PostGIS database and enable spatial functionality.

	``` bash
	$ createuser --superuser geo
	$ createdb geodjango --owner=geo
	$ psql geodjango
	> CREATE EXTENSION postgis;
	```
3. Create a secret settings file and get contents from someone working on project.

	``` bash
	$ cd mapper
	$ touch settings/secret.py
	```
	
4. Run initial django migrations.

	``` bash
	$ cd mapper
	$ python manage.py migrate
	```
5. Start server.

	``` bash
	$ cd mapper
	$ python manage.py runserver
	```


### Reference

#### Importing sample data

You can use the `import_points` management command to import map points from a csv into the database.

```bash
$ cd mapper
$ python manage.py import_points --map=bikes --file=../data/citibike-demo.csv
```


[1]: https://docs.djangoproject.com/en/dev/ref/contrib/gis/ "GeoDjango"
[2]: https://github.com/buzzfeed/buzzfeed_setup "BuzzFeed development setup"
[3]: https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql#macosx "How to install postgresql"
