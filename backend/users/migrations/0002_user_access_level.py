# Generated by Django 3.0 on 2019-12-13 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='access_level',
            field=models.SmallIntegerField(default=0),
        ),
    ]