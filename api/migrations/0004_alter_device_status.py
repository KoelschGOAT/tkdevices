# Generated by Django 3.2.5 on 2021-07-28 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_device_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='status',
            field=models.CharField(default='einlagern', max_length=7),
        ),
    ]
