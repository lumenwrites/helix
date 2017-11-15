import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

class HabitEdit extends Component {
    constructor(props){
	super(props);
	const { habit } = this.props
	this.state = {
	    title: habit.title,
	    description: habit.description
	}
	
	/* So that I would be able to access this component with "this"
	   inside the functions: */
	this.onSomething = this.onSomething.bind(this);
    }
    
    render() {
	return (
	    <div>
		Habit form
	    </div>
	);
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	profile: state.profile
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, profilesActions)(HabitEdit);
