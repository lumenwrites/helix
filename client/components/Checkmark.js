/* Checkmark component takes current day, and renders checkmark based on it's value */

import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as habitsActions from '../actions/habits.actions'

class Checkmark extends Component {
    onClick() {
	const { checkmark } = this.props
	this.props.updateCheckmark(checkmark)
    }
    
    render() {
	const { checkmark } = this.props
	var mark = null
	switch (checkmark.value) {
	    case 0:
		mark = (<i className="fa fa-times"></i>)
		break
	    case 1:
		mark = (<i className="fa fa-check"></i>)
		break		
	    case 2:
		mark = (<i className="fa fa-thumbs-up"></i>)
		break		
	    default:
		mark = (<div className="empty-day"> { /* checkmark.date.slice(-2) */ } </div>)
	}

	return (
	    <div className="checkmark"
	    	 onClick={this.onClick.bind(this)}>
		{ mark }
	    </div>
	)
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	habits: state.habits,
	profile: state.profile
    };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Checkmark);

