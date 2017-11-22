import moment from 'moment'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';

/* Actions */
import * as profilesActions from '../actions/profiles.actions'
import * as habitsActions from '../actions/habits.actions'

/* Utils */
import { calculateStreak } from '../utils/habits.utils'

/* Vendor components */
import CalendarHeatmap from 'react-calendar-heatmap'

/* Components */
import Timeline from './Timeline'
import ColorPicker from './ColorPicker'
import Graph from './Graph'

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
	const color = ReactDOM.findDOMNode(this.refs.selectedColor).value
	this.props.updateHabit({
	    ...habit,
	    title: title,
	    description: description,
	    color: color,					    
	    editing:false
	})
    }

    render() {
	const { habit } = this.props	    

	if (!habit.editing) {
	    /* Render habit */
	    return (
		<div className="habit"
		     key={habit.title}>
		    <div className="streak">
			{ calculateStreak(habit.checkmarks) }
		    </div>
		    <div className="title"
			 style={{color: habit.color}}
			 onDoubleClick={this.onDoubleClick.bind(this)}>
			{ habit.title }
			{ habit.description ?
			  <div className="description">{ habit.description }</div> : null }
		    </div>
		    <Timeline habit={habit} />
		    <div className="clearfix" />
		    {this.props.habits.showCalendar ?
		     <Graph habit={habit}/> : null }
		</div>
	    )
	} else {
	    /* Edit Habit */
	    return (
		<div className="habit" key={habit.id}>
		    <ColorPicker
			defaultColor={habit.color}
			setColor={(color)=> {
				/* When color is selected, ColorPicker component
				   will call this callback function,
				   passing it the chosen color.  */
				/* console.log("Selected Color " + newColor) */
				/* I take selected color, and put it into a hidden field,
				   which I will then use in onSubmit when I save the form. */
				ReactDOM.findDOMNode(this.refs.selectedColor).value = color
			}} />
		    <form onSubmit={this.onSubmit.bind(this)}>
			<input type="text"
			       ref="title"
			       className="title-edit"
			       defaultValue={habit.title}
			       placeholder="New Habit" />
			<input type="text"
			       ref="description"
			       className="description"			
			       defaultValue={habit.description}
			       placeholder="Description..." />
			<input type="hidden"
			       ref="selectedColor"/>
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
		    <div className="clearfix"/>
		</div>
	    )
	}
	
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	profile: state.profile,
    	habits: state.habits	
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, habitsActions)(Habit);
