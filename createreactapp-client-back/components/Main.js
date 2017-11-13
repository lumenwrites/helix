import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'

/* Styles (create-react-app automatically configures webpack to read css properly) */
import '../styles/style.css'
import '../styles/vendor/bootstrap.min.css'

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* My components  */
import Header from './Header'
import Home from './Home'
import Dashboard from './Dashboard'
import Emails from './Emails'


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
			<Route exact path="/" component={Home} />		    
			<Route path="/emails" component={Emails} />
			<Route path="/dashboard" component={Dashboard} />
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
