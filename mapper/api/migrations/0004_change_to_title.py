# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20150713_1815'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mappoint',
            old_name='name',
            new_name='title',
        ),
    ]
