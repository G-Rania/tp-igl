# Generated by Django 5.0 on 2024-01-01 22:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warafi', '0002_alter_tokenadmin_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tokenadmin',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 1, 22, 58, 59, 313442, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='tokenmod',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 1, 22, 58, 59, 314435, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='tokenuser',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 1, 1, 22, 58, 59, 314435, tzinfo=datetime.timezone.utc)),
        ),
    ]
