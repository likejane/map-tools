import django_filters
import collections

from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, list_route
from rest_framework.parsers import JSONParser

from rest_framework_bulk import (
    BulkCreateModelMixin,
    BulkUpdateModelMixin
)

from api.models import Map, MapPoint
from django.contrib.gis.geos import Point
from api.serializers import MapSerializer, MapPointSerializer, MapSerializerFullResponse



def convert(data):
    if isinstance(data, basestring):
        return str(data)
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data

class MapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows maps to be viewed.
    """
    queryset = Map.objects.all()

    def get_serializer_class(self):
        if 'include' in self.request.query_params:
            includes = self.request.query_params['include']
            if includes == 'points':
                return MapSerializerFullResponse
        return MapSerializer

    """
    def create(self, request, *args, **kwargs):
        print request.data
        points = request.data.pop('points')
        print request.data
        map_serializer = MapSerializer(data=request.data)
        if map_serializer.is_valid():
            map_serializer.save()
            point_serializer = MapPointSerializer(data=points['features'])
            if point_serializer.is_valid():
                point_serializer.save()
            print point_serializer.errors


            return Response(map_serializer.data, status=status.HTTP_201_CREATED)
        return Response(map_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """

    @list_route()
    def recent_maps(self, request):
        recent_maps = Map.objects.all().order_by('-updated_at')

        page = self.paginate_queryset(recent_maps)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_maps, many=True)
        return Response(serializer.data)


def update_or_create_points(map_id, data):
    map = Map.objects.get(id = map_id)
    points = data['features']
    ids = []
    for p in points:
        p = convert(p)
        if 'id' not in p: #CREATE
            epoint = MapPoint(map=map,
                     title=p['properties']['title'],
                     marker_id=p['properties']['marker_id'],
                     point = Point(*p['geometry']['coordinates'])).save()
            print "point created"
        else: #UPDATE
            epoint = MapPoint.objects.get(id=p['id'])
            epoint.title = p['properties']['title']
            epoint.marker_id=p['properties']['marker_id']
            epoint.point = Point(p['geometry']['coordinates'])
            epoint.save()
            print "point updated"
        ids.append(epoint.id)
        print ids





@api_view(['GET','POST'])
def map_list(request):
    if request.method == 'GET':
        maps = Map.objects.all()
        serializer = MapSerializerFullResponse(maps, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data=data)
        if serializer.is_valid():
            print "VALID"
            serializer.save()  # POST the data as a serialized JSON object
            map_id = serializer.data.get('id')
            print map_id
            print data
            update_or_create_points(map_id, data['points'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def map_detail(request, pk):  # Creating a view for viewing, updating and deleting a map object
    try:
        map = Map.objects.get(pk=pk)
    except Map.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = MapSerializerFullResponse(map)
        return Response(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = MapSerializer(map, data=data)
        if serializer.is_valid():
            print "VALID"
            serializer.save()  # POST the data as a serialized JSON object
            map_id = serializer.data.get('id')
            print map_id
            print data
            update_or_create_points(map_id, data['points'])
            return Response(serializer.data,status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        map.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
