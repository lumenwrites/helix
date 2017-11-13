import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as habitsActions from '../actions/habits.actions'

/* Components */
import Menu from './Menu'
import Calendar from './Calendar'
import Timeline from './Timeline'


/* Utils */
import { calculateStreak } from '../utils/habits.utils'

class Habits extends Component {
    componentDidMount() {
	/* Load habits if they're saved. */
	if (localStorage.getItem('habits')) {
	    this.props.loadHabitsBrowser()
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
		<Menu />
		<Calendar />
		<div className="clearfix"/>		
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
