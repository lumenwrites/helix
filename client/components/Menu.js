import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'
import * as habitsActions from '../actions/habits.actions'

class Menu extends Component {
    createHabit(event) {
	event.preventDefault()
	this.props.createHabit()
    }
    exportHabitsJSON(event) {
	event.preventDefault()

	const profile = this.props.profile
	const browserHabits = JSON.parse(localStorage.getItem('habits'))
	const browserNotes = JSON.parse(localStorage.getItem('notes'))	
	var exportJSON = {
	    habits: browserHabits,
	    notes: browserNotes	    
	}

	if (profile) {
	    /* if logged in */
	    const serverHabits = JSON.parse(profile.habits)
	    if (!browserHabits ||
		serverHabits.lastUpdated > browserHabits.lastUpdated  ) {
		/* if serverHabits were updated more recently */
		exportJSON.habits = serverHabits		
	    }
	    const serverNotes = JSON.parse(profile.notes)
	    if (!browserNotes ||
		serverNotes.lastUpdated > browserNotes.lastUpdated  ) {
		/* if serverNotes were updated more recently */
		exportJSON.notes = serverNotes		
	    }
	}

	this.props.exportHabitsJSON(exportJSON)
    }        
    render() {
	return (
	    <div className="main-menu">
		<div className="dropdown">
		    <Link to="/">
			<i className="fa fa-bars"></i>
			<div className="logo">
			    <img src="/img/logo_256x256.png"/> Helix
			</div>
		    </Link>
		    <ul className="dropdown-menu" role="menu">
			{/*  
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
			  */}			
			<li onClick={this.createHabit.bind(this)}>
			    <a>
				<i className="fa fa-plus"></i>Add Habit
			    </a>
			</li>
			<li onClick={this.props.toggleCalendar}>
			    <a>
				<i className="fa fa-calendar"></i>Calendar
			    </a>
			</li>
			
			<li>				
			    <Link to="/about">
				<i className="fa fa-info-circle"></i>About
			    </Link>
			</li>
			<li onClick={this.exportHabitsJSON.bind(this)}>
			    <a>
				<i className="fa fa-download"></i>Export
			    </a>
			</li>
			{ this.props.profile ?
			  <li>				
			      <a href="/api/v1/profiles/logout">
				  <i className="fa fa-sign-out"></i>Logout
			      </a>
			  </li> :
			  <li>				
			      <a href="/api/v1/profiles/google">
				  <i className="fa fa-google"></i>Signup/Login
			      </a>
			  </li>
			}
			
		    </ul>
		</div>
	    </div>
	);
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	profile: state.profile
    };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Menu);
