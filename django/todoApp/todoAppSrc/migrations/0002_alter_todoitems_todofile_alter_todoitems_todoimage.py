# Generated by Django 4.1.5 on 2024-05-24 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoAppSrc', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitems',
            name='todoFile',
            field=models.FileField(default=None, upload_to=''),
        ),
        migrations.AlterField(
            model_name='todoitems',
            name='todoImage',
            field=models.ImageField(default=None, upload_to=''),
        ),
    ]
