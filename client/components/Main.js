import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

/* Styles are built with compass, loaded with webpack loaders that read css properly) */
/* import '../styles/css/vendor.css'
 * import '../styles/css/style.css'*/

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* My components  */
import Header from './Header'
import Habits from './Habits'


class Main extends Component {
    componentDidMount(){
	this.props.fetchUser()
    }

    render() {
	return (
	    <div>
		<BrowserRouter>
		    <div className="mainWrapper">
			<Header />
			<Route exact path="/" component={Habits} />		    
		    </div>
		</BrowserRouter>
	    </div>
	)
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
