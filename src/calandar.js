import React from 'react';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Calandar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date : new Date()
        }
        this.handleDateChange =this.handleDateChange.bind(this);
    }

    handleDateChange(newDate) {
        this.setState({
           date : newDate
        });
        this.props.handleDateChange(newDate.toDateString());
    }

    render(){
        return(
            <div className="calandarContainer">
                <div className="calandarChild">&lt;</div>
                <DatePicker 
                            className="calandarChild pick"
                            placeholderText ="select date"
                            onChange={this.handleDateChange}
                            dateFormat="MMMM d, yyyy"
                            selected={this.state.date}
                        />
                <div className="calandarChild" >&gt;</div>
            </div>
        )
    }
}

export default Calandar;