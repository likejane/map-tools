from django.db import models
from django.contrib.gis.db import models as geomodels



class Map(geomodels.Model):
	name = models.CharField(max_length=256)


class MapPoint(geomodels.Model):
	map = models.ForeignKey(Map, related_name = 'points')
	name = models.CharField(max_length=256)
	point = geomodels.PointField()

	objects = geomodels.GeoManager()

