import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

class Main extends Component {
    render() {
	return (
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
export default connect(mapStateToProps, profilesActions)(Main);
