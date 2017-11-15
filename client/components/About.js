import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* Components */
import Menu from './Menu'


class About extends Component {
    render() {
	return (
	    <div>
		<header>
		    <Menu />
		</header>
		<div className="habits about">		
		    <h1> About </h1>
		    <p> About helix </p>
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
export default connect(mapStateToProps, profilesActions)(About);
