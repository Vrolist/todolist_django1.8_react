# Todo示例项目
技术：Django+DjangoRestFramework+React+Bootstrap

后端数据查看地址：http://todo.spbeen.com/api/v2/todo/

## 功能一：增加一个待办事项
在输入框输入一个新的待办事项名称，点击添加按钮，待完成任务中会新增一条任务。

![addTask](http://bulabean.spbeen.com/todo_gif/addTask.gif)

## 功能二：删除一个事项
每个事项都有“删除”按钮，点击“删除”按钮，事项会被移除，且顶部会有信息提示删除成功。
![delTask](http://bulabean.spbeen.com/todo_gif/delTask.gif)

## 功能三：标记一个待办事项为已完成
每个待完成事项都有“标记已完成”的按钮，点击该事项会被移动到已完成事项的目录下，且顶部会有信息提示操作成功。
![accomplishTask](http://bulabean.spbeen.com/todo_gif/accomplishTask.gif)

## 功能四：编辑一个待办事项的具体内容
所有事项都有“编辑”按钮，点击按钮会弹框模态框，头部展示“[未完成事项/已完成事项]：事项名称”；中间部分是textarea输入框，控制内容；底部是关闭和提交的按钮，关闭是关闭模态框，提交是保存数据，保存成功会有信息提示操作成功。

![editTask](http://bulabean.spbeen.com/todo_gif/editTask.gif)

## 功能五：列出所有的待办事项
网页打开后，会自动请求后端并加载全部事项，未完成事项在未完成事项目录下，已完成事项在已完成事项下。
![autoRequestTask](http://bulabean.spbeen.com/todo_gif/autoRequestTask.gif)
