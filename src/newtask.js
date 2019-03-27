import React from 'react';

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

//set gloal variable to use as unique key of each task
var count=0;

class NewTask extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            flag : false,
            task : '',
            time : null,
            allDay: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.checkKey = this.checkKey.bind(this);
        this.saveTasks = this.saveTasks.bind(this);
        this.onchangeHandler = this.onchangeHandler.bind(this);
        //this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.onAllDayCheck = this.onAllDayCheck.bind(this);
    }

    //replace Save button with newTask button when its clicked
    handleClick() {
        this.setState({flag: !this.state.flag});
    }

    //replace newTask button with save button when its clicked
    checkKey(e) {
        this.setState({flag: !this.state.flag});
        //call save function to save the new task
        this.saveTasks(e);
    }

    //timepicker handler
    handleTimeChange(time) {
        this.setState({
          time: time
        });
    }

    //check if both task input and time input are filled before save them
    saveTasks() {
        if(this.state.task === ''){
            alert("please eneter a task");
            return;
        }
        if(!this.state.allDay && !this.state.time){
            alert("please select a time");
            return;
        }
        //call save task from App component with new task 
        if(!this.state.allDay) {     
            this.props.handleSaveTasks({"key":count++, "task" : this.state.task, "time" : this.state.time.toTimeString(), 'checked':false});
        } else {
        this.props.handleSaveTasks({"key":count++, "task" : this.state.task, "time" : "All Day", 'checked':false});
        }
        this.setState({allDay :true});
    }

    //update state on task input change
    onchangeHandler(e) {
        const newState= {};
        newState.task = e.target.value;
        this.setState(newState);
    }

    onAllDayCheck(e){
        this.setState({
            allDay : !this.state.allDay
        });
    }

    render(){
        const taskInput = <input className="taskinput" type="text" onChange={this.onchangeHandler} placeholder="type your task"></input>
        const allday    = <input className="checkbox" type="checkbox" onChange={this.onAllDayCheck}></input>
        var timePick;
        if(this.state.allDay) 
        timePick = <DatePicker
                            selected={this.state.time}
                            onChange={this.handleTimeChange}
                            placeholderText="select time"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            timeCaption="Time"
                            disabled
                        />
        else
        timePick = <DatePicker
                            selected={this.state.time}
                            onChange={this.handleTimeChange}
                            placeholderText="select time"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            timeCaption="Time"
                        />

        const saveButton = <button className={"saveButton"} onClick={this.checkKey}>Save</button>
        const newTaskButton = <button className={"newTaskButton"} onClick={this.handleClick}>Add New +</button>
        const count = <div className="newTaskDiv">{this.props.count} TASKS</div>
        
        return (
            <div>
                {
                    this.state.flag //check state
                    ? 
                        //render save button
                        <div className="savetaskContainer">
                            <div className="saveTaskDiv">{taskInput}</div>
                            <div className="saveContainer">
                                <div className="SsaveTaskDiv">{timePick}</div>
                                <div style={{"margin-left": "5px", "height":"16px", "margin-top":"0px"}}> {allday}</div> <div style={{"color":"#6060a2", "font-size":"small"}}> All Day </div>     
                            </div>
                            <div className="saveTaskDiv">{saveButton}</div>
                        </div> 
                    : 
                        //render newTask button
                        <div className="newtaskContainer">
                            <div className="outterNewTaskDiv">{count}</div>
                            <div>{newTaskButton}</div>
                        </div>
                }  
            </div>
        )
    }
}

export default NewTask;