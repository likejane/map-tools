# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_change_to_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='mappoint',
            name='marker_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='mappoint',
            unique_together=set([('map', 'marker_id')]),
        ),
    ]
