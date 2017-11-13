import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as habitsActions from '../actions/habits.actions'

/* Components */
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
		    <div className="title">
			{ habit.title }
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
		<div className="main-menu">
		    <div className="dropdown">
			<i className="fa fa-bars"></i>
			<ul className="dropdown-menu" role="menu">
			    <li>
				<a>
				    <i className="fa fa-download"></i>Export
				</a>
			    </li>
			    <li>
				<a>
				    <i className="fa fa-upload"></i>Import
				</a>
			    </li>
			    <li>			    
				<a>
				    <i className="fa fa-gear"></i>Edit
				</a>
			    </li>
			    <li>				
				<a>
				    <i className="fa fa-info-circle"></i>About
				</a>
			    </li>
			    <li>				
				<a>
				    <i className="fa fa-sign-out"></i>Logout
				</a>
			    </li>
			    
			</ul>
		    </div>
		</div>
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
