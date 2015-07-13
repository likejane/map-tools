



## Dev Setup

### Backend

1. Basic buzzfeed dev setup.

To store the geodata points the app uses PostGres database with GIS functionality.
This requires a little extra work for setup.

After running `brew install postgres` you need to:

`ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents`

then

`launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist`

Source (https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql#macosx).


2. PostGIS prerequisites.
	- postgresql and gdal _might_ already be installed on your computer.
	- Setup databases

Run which to see what's installed

```bash
createuser --superuser geo
createdb geodjango --owner=geo
```




3. Create `mapper` virtualenv and install requirements.

4. Run django migrations.

`python manage.py migrate`

5. Start server
`python manage.py runserver`







geodjango tutorial: https://docs.djangoproject.com/en/dev/ref/contrib/gis/tutorial/
installing postGIS: https://docs.djangoproject.com/en/dev/ref/contrib/gis/install/#macosx
https://docs.djangoproject.com/en/dev/ref/contrib/gis/install/postgis/#spatialdb-template
http://gis.stackexchange.com/questions/71130/how-to-create-a-new-gis-database-in-postgis


http://www.django-rest-framework.org/


## Management Commands

#### add_points
