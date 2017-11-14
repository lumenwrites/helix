import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* Components */
import Menu from './Menu'
import Calendar from './Calendar'


class Header extends Component {
    render() {
	return (
	    <header className="header">
		<Menu />
		<Calendar />
		<div className="clearfix"/>
	    </header>
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
export default connect(mapStateToProps, profilesActions)(Header);
