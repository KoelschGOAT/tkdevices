# Generated by Django 3.2.5 on 2021-07-30 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_device_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='status',
            field=models.CharField(choices=[('lagernd', 'einlagern'), ('raus', 'ausgeben')], default='einlagern', max_length=7),
        ),
    ]