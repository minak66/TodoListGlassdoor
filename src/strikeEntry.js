import React from 'react';

class StrikeEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            task: null
        }
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    }

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
        const text = this.props.data.task;
        return(
            <div className="EntriesContainer">
                <input className="checkbox" id={this.props.data.key} type="checkbox" name="task" onChange={this.onCheckBoxClick} checked={this.props.data.checked}></input>
                {/* strike task's texts which are checked */}
                <div id="task"> <strike> {text}</strike></div>
                <div className="time">{str}</div>
            </div>
        )
    }
}

export default StrikeEntry;