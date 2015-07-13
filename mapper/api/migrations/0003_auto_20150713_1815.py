# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_update_map_model'),
    ]

    operations = [
        migrations.AddField(
            model_name='mappoint',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 13, 18, 15, 47, 745090, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='mappoint',
            name='notes',
            field=models.CharField(max_length=1024, blank=True),
        ),
        migrations.AddField(
            model_name='mappoint',
            name='timestamp',
            field=models.DateTimeField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='mappoint',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 13, 18, 15, 54, 105158, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
