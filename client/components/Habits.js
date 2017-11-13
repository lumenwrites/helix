import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as habitsActions from '../actions/habits.actions'

/* Components */
import Timeline from './Timeline'
import Header from './Header'

/* Utils */
import { calculateStreak } from '../utils/habits.utils'

class Habits extends Component {
    componentDidMount() {
	/* Temporarily, fetch habits from local storage for logged out user */
	if (localStorage.getItem('habits')) {
	    this.props.loadHabitsBrowser()
	}
    }

    componentDidUpdate(pastProps, pastState) {
	const { habits, user } = this.props
	const pastUser = pastProps.user
	if (user != pastUser && user) {
	    /* If user is logged in, fetch his habits from db. */
	    console.log("Fetched user, loading habits")
	    this.props.loadHabits()
	}
	const pastHabits = pastProps.habits
	/* Clicking on checkmarks updates state. I want to save it after it's updated. */
	/* So if the habits have changed, I run action that saves them. */
	if (habits != pastHabits) {
	    if (this.props.user) {
		/* if user is logged in, save his habits to db */
		this.props.saveHabits(this.props.habits)
	    } 
	    /* save habits to browser, whether user is logged in or not. */
	    this.props.saveHabitsBrowser(this.props.habits)	    
	}
	
    }
    renderHabits() {
	const { habits } = this.props
	return habits.map((habit) => {
	    return (
		<div className="habit" key={habit.title}>
		<div className="streak">
		{ calculateStreak(habit.checkmarks) }
		    </div>
		    <div className={ "title " + habit.color }>
			{ habit.title }
			{ habit.description ?
			  <div className="description">{ habit.description }</div> : null }
		    </div>
		    <Timeline habit={habit} />
		    <div className="clearfix" />
		</div>
	    )
	})
    }
    render() {
	return (
	    <div className="habits">
		<Header />			
		{ this.renderHabits() }
	    </div>
	)
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	habits: state.habits,
	user: state.profiles.user,
    };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Habits);
