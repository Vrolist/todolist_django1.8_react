import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            url :'http://127.0.0.1:8000/api/v2/todo/',
            list:[ ],
            newtodo:{
                id:0,
                title:"",
                content:"",
                accomplish_status:false,
            },
            modifyitem:{
                "id": 0,
                "title": "",
                "content": "",
                "accomplish_status": false,
                "create_time": ""
            },
            reminderinfo:{
                "show":false,
                "message":"",
            },
            url:'/api/v2/todo/?format=json',
        }
    }

    addTodoItem(){
        //添加某一项
        fetch(this.state.url,
            {
                method: 'POST',
                body:JSON.stringify(this.state.newtodo),
                headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json', }
            })
            .then(response=>response.json())
            .then(data=>{this.setState({list:[...this.state.list,data]})})
            .then(this.setReminderInfo("成功添加一条待办事项"))
            .catch(e=>{console.log("error"),this.setReminderInfo("操作失败，请查看日志输出")})


        this.state.newtodo.title = "";
        this.state.newtodo.content = "";


    }
    listenNewTodoItemName(e){
        this.state.newtodo.title = e.target.value
        this.setState({
            newtodo : this.state.newtodo
        })

    }
    completeTodoItem(item){
        item.accomplish_status = true;
        fetch(this.state.url,
            {
                method: 'PUT',
                body:JSON.stringify(item),
                headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json', }
            })
            .then(response=>response.json())
            .then(data=>{
                item = data,
                this.setState({
                    list:[...this.state.list],
                })
            })
            .then(this.setReminderInfo("操作成功，待完成任务改为已完成任务"))
            .catch(e=>{console.log("error"),this.setReminderInfo("操作失败，请查看日志输出")})
        // 这里需要和后端交互一次，更改完成状态

    }
    uncompleteTodoItem(item){
        item.accomplish_status = false;
        fetch(this.state.url,
            {
                method: 'PUT',
                body:JSON.stringify(item),
                headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json', }
            })
            .then(response=>response.json())
            .then(data=>{
                item = data,
                this.setState({
                    list:[...this.state.list],
                })
            })
            .then(this.setReminderInfo("撤回成功，已完成任务改为待完成任务"))
            .catch(e=>{console.log("error"),this.setReminderInfo("操作失败，请查看日志输出")})
        // 这里需要和后端交互一次，更改完成状态

    }
    //删除某一项
    deleteTodoItem(item){
        fetch(this.state.url,
            {
                method: 'DELETE',
                body:JSON.stringify(item),
                headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json', }
            })
            .then(response=>{
                this.setState({
                    list:this.state.list.filter((obj) => obj.id != item.id)
                })
            })
            .then(this.setReminderInfo("成功移除一条任务"))
            .catch(e=>{console.log("error"),this.setReminderInfo("移除失败，请查看日志输出")})
    }
    autoGetAllData(){
        fetch(this.state.url)
            .then(response=>response.json())
            .then(data=>{this.setState({list:data})})
            .then(this.setReminderInfo("加载成功，当前为最新状态"))
            .catch(e=>{console.log("error"),this.setReminderInfo("加载失败，请检查下网络")})
    }
    componentDidMount(){
        this.autoGetAllData()
    }
    modifyTodoItemInfo(item){

        // this.state.modifyitem = _.cloneDeep(item);
        this.state.modifyitem = item;
        this.setState({
            modifyitem: this.state.modifyitem,
        })
    }
    updateTodoItemInfo(item){
        fetch(this.state.url,
            {
                method: 'PUT',
                body:JSON.stringify(item),
                headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json', }
            })
            .then(response=>response.json())
            .then(data=>{
                item = data,
                this.setState({
                    list:[...this.state.list],
                })
            })
            .then(this.setReminderInfo("更新成功，信息已自动更新"))
            .catch(e=>{console.log("error"),this.setReminderInfo("更新失败，请查看日志输出")})
    }
    listenModifyItemContent(e){
        this.state.modifyitem.content = e.target.value;
        this.setState({
            modifyitem:this.state.modifyitem,
        })
    }
    changeReminderInfo(){
        this.state.reminderinfo.show = false;
        this.state.reminderinfo.message = "";
        this.setState({
            reminderinfo : this.state.reminderinfo,
        })
    }
    setReminderInfo(message){
        this.state.reminderinfo.show = true;
        this.state.reminderinfo.message = message;
        this.setState({
            reminderinfo : this.state.reminderinfo,
        })
        // var self = this;
        // if (this.timer) {
        //     clearTimeout(this.timer);
        // }
        // this.timer = setTimeout(() => {
        //     this.changeReminderInfo()
        // }, 2000);

    }



    render() {
        return (
            <React.Fragment>
                { this.state.reminderinfo.show ?
                <div className=" alert  alert-info  animated shake ">
                    <a href="#" onClick={ this.changeReminderInfo.bind(this)} className="close">
                        &times;
                    </a>
                    { this.state.reminderinfo.message }
                </div>
                : <div></div> }
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-info" role="alert" style={{marginTop:30,marginBottom:0}}>新建任务</div>
                    <form className="input-group" method="" action="">
                        <input type="text" name="task" className="form-control" placeholder="请输入任务" value={this.state.newtodo.title} onChange={this.listenNewTodoItemName.bind(this)}/>
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button" onClick={this.addTodoItem.bind(this)}>添加</button>
                            </span>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="alert alert-warning" role="alert" style={{marginTop:30,marginBottom:0}}>待完成任务</div>
                    <ul className="list-group" id="TodoList">
                        {
                            this.state.list.map((item) => {
                                if (item.accomplish_status === false){
                                return (
                                    <li key={item.id} className="list-group-item" >
                                        <span className="glyphicon glyphicon-question-sign" style={{ color : "rgb(175, 160, 122)", marginRight:10 }} aria-hidden="true"></span>

                                        { item.title }
                                        <button style={{ marginRight: 3}} className="pull-right btn btn-danger btn-xs" type="button"  onClick={this.deleteTodoItem.bind(this,item)} >删除</button>

                                        <button style={{ marginRight: 3}} className="pull-right btn btn-success btn-xs" type="button" onClick={ this.completeTodoItem.bind(this, item) }>标记已完成</button>

                                        <button onClick={this.modifyTodoItemInfo.bind(this,item)} style={{ marginRight: 3}} className="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#myModal">
                                            编辑
                                        </button>
                                    </li>
                                )
                                }}
                            )

                        }



                    </ul>
                </div>
                <div className="col-md-6">
                    <div className="alert alert-success" role="alert" style={{marginTop:30,marginBottom:0}}>已完成任务</div>
                    <ul className="list-group">
                        {
                            this.state.list.map((item) => {
                                if (item.accomplish_status === true){
                                    return (
                                        <li key={item.id} className="list-group-item">
                                            <span className="glyphicon glyphicon-ok-circle" style={{ color : "#31a900", marginRight:10 }} aria-hidden="true"></span>
                                             { item.title }


                                            <button style={{ marginRight: 3}} className="pull-right btn btn-danger btn-xs" type="button"  onClick={this.deleteTodoItem.bind(this,item)} >删除</button>

                                            <button style={{ marginRight: 3}} className="pull-right btn btn-success btn-xs" type="button" onClick={ this.uncompleteTodoItem.bind(this, item) }>标记未完成</button>

                                            <button onClick={this.modifyTodoItemInfo.bind(this,item)} style={{ marginRight: 3}} className="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#myModal">
                                                编辑
                                            </button>
                                        </li>
                                            )
                                }}
                            )

                        }


                    </ul>
                </div>
            </div>
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    &times;
                                </button>
                                <h4 className="modal-title" id="myModalLabel">
                                    { this.state.modifyitem.accomplish_status===true ? '已完成任务' : '未完成任务' }
                                    ：
                                    { this.state.modifyitem.title }
                                </h4>
                            </div>
                            <div className="modal-body">
                                <textarea className="form-control" rows="3" value={this.state.modifyitem.content} onChange={this.listenModifyItemContent.bind(this)}>
                                    {/*{ this.state.modifyitem.content }*/}
                                </textarea>

                            </div>
                            <div className="modal-footer">
                                <button id='modelclose' type="button" className="btn btn-default" data-dismiss="modal">关闭
                                </button>
                                <button data-dismiss="modal"
                                    onClick={ this.updateTodoItemInfo.bind(this, this.state.modifyitem) }
                                    type="button" className="btn btn-primary">
                                    提交更改
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TodoList;
