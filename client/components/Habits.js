import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Actions */
import * as habitsActions from '../actions/habits.actions'

/* Components */
import Header from './Header'
import Habit from './Habit'
import Notes from './Notes'

class Habits extends Component {
    
    componentDidUpdate(pastProps, pastState) {
	const { habits } = this.props
	/* Save habits if they've been updated. */
	if (habits.modified) {
	    console.log("[Habits.js] Habits modified, saving habits.")
	    if (this.props.profile.email) {
		/* if profile is logged in, save his habits to db */
		this.props.saveHabits(this.props.habits)
	    } 
	    /* save habits to browser, whether profile is logged in or not. */
	    this.props.saveHabitsBrowser(this.props.habits)	    
	}
	
    }

    render() {
	const habitList = this.props.habits.habitList
	if (!habitList) { return <div>Fetching....</div> }

	/* Generate list of all habits. */
	const habits = habitList.map((habit) => {
	    return (
		<Habit key={habit.id} habit={habit} />
	    )
	})
	
	return (
	    <div className="habits">
		<Header />			
		{ habits }
		<Notes />
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
export default connect(mapStateToProps, habitsActions)(Habits);
