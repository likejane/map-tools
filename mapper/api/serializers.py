from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin
)


from api.models import Map, MapPoint


class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map



class MapPointSerializer(BulkSerializerMixin,GeoFeatureModelSerializer):
    class Meta:
        model = MapPoint
        geo_field = "point"
        list_serializer_class=BulkListSerializer
