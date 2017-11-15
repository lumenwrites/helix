import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'
import * as habitsActions from '../actions/habits.actions'

/* Utils */
import { calculateStreak } from '../utils/habits.utils'

/* Components */
import Timeline from './Timeline'

class Habit extends Component {

    onDoubleClick() {
	const { habit } = this.props
	this.props.updateHabit({...habit, editing:true})
    }
    onCancel() {
	const { habit } = this.props
	this.props.updateHabit({...habit, editing:false})
    }
    onDelete() {
	const { habit } = this.props
	this.props.deleteHabit(habit)
    }
    
    onSubmit(event) {
	event.preventDefault()
	const { habit } = this.props
	/* Get form data */
	const title = ReactDOM.findDOMNode(this.refs.title).value
	const description = ReactDOM.findDOMNode(this.refs.description).value
	this.props.updateHabit({
	    ...habit,
	    title: title,
	    description: description,				
	    editing:false
	})
    }
    render() {
	const { habit } = this.props	    

	if (!habit.editing) {
	    /* Render habit */
	    return (
		<div className="habit"
		     key={habit.title}
		     onDoubleClick={this.onDoubleClick.bind(this)}>
		    <div className="streak">
			{ calculateStreak(habit.checkmarks) }
		    </div>
		    <div className={ "title " + habit.color }>
			{ habit.title }
			{ habit.description ?
			  <div className="description">{ habit.description }</div> : null }
		    </div>
		    <Timeline habit={habit} />
		    <div className="clearfix" />
		</div>
	    )
	} else {
	    /* Edit Habit */
	    return (
		<div className="habit" key={habit.id}>
		    <form onSubmit={this.onSubmit.bind(this)}>
			<input type="text"
			       ref="title"
			       className="title"
			       defaultValue={habit.title} />
			<input type="text"
			       ref="description"
			       className="description"			
			       defaultValue={habit.description} />
			<br/>
			<button className="btn btn-delete"
				onClick={this.onDelete.bind(this)}>
			    <i className="fa fa-trash"></i>
			</button>
			<div className="right">
			    <button className="btn btn-submit"
				    onClick={this.onCancel.bind(this)}>
				Cancel
			    </button>
			    <input className="btn btn-submit right"
				   type="submit"
				   value="Save" />
			</div>
		    </form>
		</div>
	    )
	}
	
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	profile: state.profile
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Habit);
