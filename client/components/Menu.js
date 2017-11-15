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
			  */}
			<li>				
			    <a onClick={this.createHabit.bind(this)}>
				<i className="fa fa-plus"></i>Add Habit
			    </a>
			</li>
			<li>				
			    <Link to="/about">
				<i className="fa fa-info-circle"></i>About
			    </Link>
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
