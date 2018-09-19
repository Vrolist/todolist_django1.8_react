from __future__ import unicode_literals
from rest_framework import serializers
from todo.models import ToDoList
from django.utils.timezone import now


class TodoListSerializer(serializers.ModelSerializer):
    title = serializers.CharField(allow_null=True,allow_blank=True)
    content = serializers.CharField(allow_null=True,allow_blank=True)
    accomplish_status = serializers.BooleanField()
    # create_time = serializers.DateTimeField(allow_null=True,default=now)

    def create_item(self,data):
        todo = ToDoList(title=data['title'])
        todo.save()
        return todo

    def delete_todo(self,instance):
        if instance.title==self.data['title']:
            instance.remove_status = True
            instance.save()
            return "Delete successfully"
        else:
            return "Delete failed"

    class Meta:
        model = ToDoList
        fields = ('id', 'title', 'content', 'accomplish_status', 'create_time')

