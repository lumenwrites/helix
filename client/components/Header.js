import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'


class Header extends Component {
    render() {
	return (
	    <header>
		<div className="logo">
		    <img src="/img/logo_256x256.png"/>
		    helix
		</div>
		<div className="main-menu">
		    <a>
			<i className="fa fa-gear"></i>
		    </a>
		</div>
		<div className="clearfix"/>		    
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
