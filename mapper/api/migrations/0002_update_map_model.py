# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='map',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 13, 17, 51, 35, 292675, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='map',
            name='notes',
            field=models.CharField(max_length=1024, blank=True),
        ),
        migrations.AddField(
            model_name='map',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 7, 13, 17, 51, 47, 339971, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
