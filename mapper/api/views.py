import django_filters

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response

from rest_framework_bulk import (
    BulkCreateModelMixin,
    BulkUpdateModelMixin
)

from api.models import Map, MapPoint
from api.serializers import MapSerializer, MapPointSerializer

class MapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows maps to be viewed.
    """
    queryset = Map.objects.all()
    serializer_class = MapSerializer



class MapPointFilter(django_filters.FilterSet):
	class Meta:
		model = MapPoint
		fields = ['map']


class MapPointViewSet(viewsets.ModelViewSet,
                        BulkCreateModelMixin,
                        BulkUpdateModelMixin):
    """
    API endpoint that allows datapoints to be viewed.
    """
    queryset = MapPoint.objects.all()
    serializer_class = MapPointSerializer
    filter_class = MapPointFilter
