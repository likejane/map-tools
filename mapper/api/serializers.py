from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from api.models import Map, MapPoint


class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map



class MapPointSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = MapPoint
        geo_field = "point"
