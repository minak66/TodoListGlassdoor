import React, { Component } from 'react';
import './App.css';
import NewTask from './newtask';
import List from './list';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

//local storages
var tasks = {}; //all tasks with dates as their keys
var dates = []; //sorted array of dates which have tasks


class App extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    //set the correct time for default date on calandar
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    this.state = {
      data : [],
      date : date
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSaveTasks = this.handleSaveTasks.bind(this);
    this.onCheckedClick = this.onCheckedClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  //check the sorted dates array to find the next available date
  //do nothing if there is no Next date
  handleNext() {
    var today = this.state.date;
    for(var i = 0; i < dates.length; i++) {
      if(dates[i] > today.getTime()){
        break;
      }
    }
    
    if(i < dates.length) {
      this.setState({date: new Date(dates[i])});
      this.setState({data: tasks[this.state.date]});
    }
  }

  //check the sorted dates array to find the previous available date
  //do nothing if there is no previous date
  handlePrev() {
    var today = this.state.date;
    for(var i = 0; i < dates.length; i++) {
      //find the next date after today which has tasks
      if(dates[i] >= today.getTime()){
        break;
      }
    }
    if(dates[i-1]) {
      //update state with previous date and render List component
      this.setState({date: new Date(dates[i-1])});
      this.setState({data: tasks[this.state.date]});
    }
  }

  //handle onclick of tasks
  onCheckedClick(key) {
    for(var i in this.state.data){
      if(this.state.data[i]['key'] === key) {
        this.state.data[i]['checked'] = !this.state.data[i]['checked'];
        break;
      }
    }
    //render new List based on new updates
    this.setState({data: this.state.data});
  }

  //save a new task to storage and update the soreted dates array
  handleSaveTasks(newtask) {
    var currDate = new Date();
    //check if date of the new task is in future
    if(this.state.date > currDate){
      alert("it is not allowed to add future tasks");
      return;
    }
    var tasklist = tasks[this.state.date]
    if(!tasklist){
      tasklist = []
    }
    tasklist.push(newtask)
    tasks[this.state.date] = tasklist;
    dates.push(this.state.date.getTime());
    dates.sort();
    this.setState({data: tasks[this.state.date]});
  }

  //update state based on the selected date on calandar
  handleDateChange(date) {
    this.setState({data: tasks[date]});
    this.setState({date});
  }



  render() {

    //if there is no task for current date on calandar reder empty list
    //otherwise render tasks of the current date
    var list=null;
    if(!this.state.data) {
      //render empty list
      list = <div></div>  
    } else {
      //call List component with tasks of the current date
      list = <List onCheckedClick={this.onCheckedClick} data={this.state.data} />
    }

    var temp = this.state.data;
        if(!temp) {
          temp = [];
    }

    //count the number of tasks of current date and pass it to List component
    if(this.state.data) {
      var count = this.state.data.length;
    } else {
      //if no tasks pass 0
      var count = 0;
    }
    return (
      <div className="app">
          <div className="top child">
            <div className="calandarContainer">
                  <div className="calandarChild" onClick={this.handlePrev}>&lt;</div>
                  {/* //time picker package */}
                  <DatePicker 
                              value={this.state.date.toDateString()}
                              className="calandarChild pick"
                              placeholderText ="select date"
                              onChange={this.handleDateChange}
                              dateFormat="d, MMMM d, yyyy"
                  />
                  <div className="calandarChild" onClick={this.handleNext}>&gt;</div>
            </div>
          </div>
        
        <div className="middle child">
          {list}
        </div>
        
        <div className="bottom child">
          <NewTask count={count} handleSaveTasks={this.handleSaveTasks} tasks={temp} date={this.state.date} />
        </div>
      </div>
    );
  }
}

export default App;
