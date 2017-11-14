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
    renderHabits() {
	const habitList = this.props.habits.habitList
	if (!habitList) { return <div>Fetching....</div> }

	return habitList.map((habit) => {
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
	profile: state.profile
    };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Habits);
