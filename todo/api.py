from todo.models import ToDoList
from todo.serializers import TodoListSerializer
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView


class TodoOpera(APIView):
    def get(self,request):
        todo_list = ToDoList.objects.filter(remove_status=False)
        seria = TodoListSerializer(todo_list, many=True)
        return Response(seria.data)
    def post(self,request):
        print(request.data)
        seria = TodoListSerializer(data=request.data)
        if seria.is_valid():
            todo = seria.create_item(request.data)
            seria = TodoListSerializer(todo)
            return Response(seria.data)
        else:
            return Response(seria.errors)
    def put(self,request):
        seria = TodoListSerializer(data=request.data)
        if seria.is_valid():
            # seria.change_accomplish()
            todo = ToDoList.objects.filter(id=request.data['id'])
            if todo:
                todo = todo.first()
                seria.data['content'] = todo.content
                seria.data['accomplish_status'] = todo.accomplish_status
                seria.update(todo,seria.data)
            else:
                seria.save()
            return Response(seria.data)
        else:
            return Response(seria.errors)
    def delete(self,request):
        seria = TodoListSerializer(data=request.data)
        if seria.is_valid():
            todo = ToDoList.objects.filter(id=request.data['id'])
            if todo:
                todo = todo.first()
                msg = seria.delete_todo(todo)
                return Response({'status':'success',"msg":msg})
            else:
                return Response({'status': 'fail, without of id'})
        else:
            return Response(seria.errors)

