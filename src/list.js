import React from 'react';
import ListEntry from './listEntry';
import StrikeEntry from './strikeEntry';

class List extends React.Component {
    render() {
        return (
            <div>
                {/* render unchecked tasks first and render them in order */}
                {this.props.data.filter(el => el.checked===false).map(el => <ListEntry onCheckBoxClick={this.props.onCheckedClick} key={el.key} data={el}/>)}
                {this.props.data.filter(el => el.checked===true).map(el => <StrikeEntry onCheckBoxClick={this.props.onCheckedClick} key={el.key} data={el}/>)}
            </div>
        )
    }
}

export default List;