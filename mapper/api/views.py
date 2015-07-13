import django_filters

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

from api.models import Map, MapPoint
from api.serializers import MapSerializer, MapPointSerializer

class MapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows datapoints to be viewed.
    """
    queryset = Map.objects.all()
    serializer_class = MapSerializer

    @list_route()
    def recent_maps(self, request):
        recent_maps = Map.objects.all().order_by('-updated_at')

        page = self.paginate_queryset(recent_maps)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_maps, many=True)
        return Response(serializer.data)


class MapPointFilter(django_filters.FilterSet):
	class Meta:
		model = MapPoint
		fields = ['map']


class MapPointViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows datapoints to be viewed.
    """
    queryset = MapPoint.objects.all()
    serializer_class = MapPointSerializer
    filter_class = MapPointFilter
