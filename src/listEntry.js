import React from 'react';

class ListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            task: null
        }
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    }

    //call App componenet checkHandler on checkedClick to update the storage
    onCheckBoxClick(e) {
        this.props.onCheckBoxClick(this.props.data.key, this.props.date)
    }
    
    render() {
        //take out time from new Date formated staring
        var str;
        if(this.props.data.time === "All Day"){
            str = this.props.data.time;
        } else{
            str = this.props.data.time.substr(0,5);
        }
        return(
            <div className="EntriesContainer">
                <input className="checkbox" id={this.props.data.key} type="checkbox" name="task" onChange={this.onCheckBoxClick} checked={this.props.data.checked}></input>
                <div id="task">{this.props.data.task}</div>
                <div className="time">{str}</div>
                
            </div>
        )
    }
}

export default ListEntry;