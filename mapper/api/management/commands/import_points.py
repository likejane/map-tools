from django.core.management.base import BaseCommand

import csv
from api.models import Map, MapPoint
from django.contrib.gis.geos import Point


class Command(BaseCommand):
    help = 'Command to import datapoints from a csv file to a map.'

    def add_arguments(self, parser):

        parser.add_argument('--map',
            default='',
            type=str,
            help='name of map')


        parser.add_argument('--file',
            default='',
            type=str,
            help='string path of file with data to import')



    def handle(self, *args, **options):

        if options['map']:

            new_map, created = Map.objects.get_or_create(name=options['map'])


        if options['file']:
            files_list = [options['file']] #in the future we may want to pass in a folders option

        for file in files_list:
            reader = csv.DictReader(open(file, 'rb'))
            for line in reader:
                lng = float(line.pop('lng'))
                lat = float(line.pop('lat'))
                name = line.pop('name')
                uid = line.pop('station_id')
                MapPoint(map= new_map, name = name, point = Point(lng,lat)).save()
