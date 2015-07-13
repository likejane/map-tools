from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


from api.models import Map, MapPoint


class MapPointSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = MapPoint
        geo_field = "point"


class MapSerializerFullResponse(serializers.ModelSerializer):
    points = MapPointSerializer(many=True, read_only=True)
    class Meta:
        model = Map
        fields = ('id', 'name', 'points')

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
