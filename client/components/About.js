import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Actions */
import * as profilesActions from '../actions/profiles.actions'

/* Components */
import Menu from './Menu'


class About extends Component {
    render() {
	return (
	    <div>
		<header>
		</header>
		<div className="habits about">
		    <div className="logo">
			<img  src="/img/logo_256x256.png"/>
		    </div>
		    <h1> Helix </h1>
		    <p><a href="/">Helix</a> is a habit tracking app that will help you to create and maintain an awesome daily routine, which is one of the most powerful tools for achieving your goals and sending your life in an upwards spiral. </p>
		    <p> Determine the most important things you need to practice regularly to achieve what you want in life, and strive to never skip a day. </p>
		    <img src="/img/screenshots/default-habits.png"/>
		    <p> Mark the day with <i className="fa fa-check"></i> every time you successfully complete a  <a href="https://hackernoon.com/micro-habits-changed-my-life-47f572bfc153">microhabit</a>, and mark a day with <i className="fa fa-thumbs-up"></i> every time you accomplish more significant progress you're proud of. Doing 10 pushups, reading one page of a book, or writing a line of code are good examples of microhabits; going to the gym or developing a cool feature for your app are good examples of thumbsup-worthy days.</p>
		    <p> Number in a circle to the left of each habit tells you how many days in a row you have successfully completed a habit. Strive to maintain the streak for as long as possible. Usually it takes about 30 days to successfully develop a habit, so I recommend using this as your first goal.</p>
		    <p> Double click on the habit to edit it. By default habits are saved in your browser, you can create an account to save them on server and synchronize them across the devices.</p>
		    <p> If you are on mobile - open browser settings and click "Add to Home Screen", and helix will work like a native app. </p>
		    <hr/>
		    <p> I've launched Helix only recently, and at moment it is still in beta. Shoot me an email to <b>ray@startuplab.io</b> with some feedback and feature suggestions, I would really appreciate it =) </p>
		    <p> Note that in the future Helix will become a premium app ($12/year), but all the early adopters who join during the beta and send me some useful feedback will get free lifetime accounts.</p>
		    <p> Upcoming features :
			<ul>
			    <li>Import/Export habits</li>
			    <li>Drag and drop to rearrange</li>
			    <li>Custom checkbox types</li>
			    <li>Daily todos and notes</li>
			    <li>GitHub-like calendar</li>
			    <li>Cool stats and graphs</li>
			    <li>Offline mode on mobile</li>
			</ul>
		    </p>


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
