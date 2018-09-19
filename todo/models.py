# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.timezone import now


class ToDoList(models.Model):
    title = models.CharField(max_length=128)
    content = models.TextField(default="")
    accomplish_status = models.BooleanField(default=False)
    remove_status = models.BooleanField(default=False)
    create_time = models.DateTimeField(default=now)

    def __str__(self):
        return "{} {}".format(self.title, self.accomplish_status)

    class Meta:
        ordering = ('create_time',)
