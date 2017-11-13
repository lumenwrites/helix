import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'


class Header extends Component {
    renderLoginButton () {
	var user = this.props.user
	switch(user) {
	    case null:
		return
	    case false:
		return (
		    <a href="/api/v1/profiles/google"> Login with Google </a>
		)
	    default:
		return (
		    <div>
			{ user.email }
			<a href="/api/v1/profiles/logout"> Logout </a>
		    </div>
		)
	}
    }
    render() {
	return (
	    <header>
		<Link to={this.props.user ? '/dashboard' : '/'}>
		    <div className="logo">
			maily
		    </div>
		</Link>
		<div className="main-menu">
		    { this.renderLoginButton() }
		</div>
		<div className="clearfix"></div>
	    </header>
	);
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	user: state.profiles.user	
    };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, profilesActions)(Header);
