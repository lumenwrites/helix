import React, { Component } from 'react'
import { connect } from 'react-redux';

/* Actions */
import * as notesActions from '../actions/notes.actions'

/* Utils */
import { generateRecentDays } from '../utils/habits.utils'
import { loadNotes, insertCheckmark, insertTime } from '../utils/notes.utils'


/* Vendor Components */
import Textarea from 'react-textarea-autosize'


class Notes extends Component {
    onChange(event, activeNote){
	/* Update note's value as I type */
	activeNote.note = event.target.value
	this.props.updateNote(activeNote)
    }

    render() {
	const days = generateRecentDays()
	const savedNotes = this.props.notes
	const daysWithNotes = loadNotes(savedNotes.timeline, days)
	const timeline = daysWithNotes.map((day, i)=>{
	    return (
		<div key={day.date}
		     className={"day "
			      + (day.note ? "has-note " : "" )
			      + (day.date == savedNotes.active ? "active" : "" )}
		     onClick={()=> this.props.activateNote(day.date)}>
		</div>
	    )
	})

	var activeNote = {}
	/* Find an active note based on the date */
	savedNotes.timeline.map((n)=>{
	    if (n.date == savedNotes.active) {
		activeNote = n
	    }
	})
	if (!activeNote.note) {
	    /* If I couldn't find a saved note, make a new one. */
	    activeNote = {
		date:savedNotes.active,
		note:""
	    }
	}
	return (
	    <div className="notes">
		<div className="timeline">
		    <div className="days">		    
			{ timeline }
		    </div>
		</div>
		<Textarea placeholder="Note..."
			  value={ activeNote.note }
			  className="textarea"
			  onChange={(event)=> this.onChange(event, activeNote)} />
		<div className="buttons">
		    <a className="btn"
		       onClick={insertTime.bind(this)}>
			<i className="fa fa-clock-o"></i>
		    </a>
		    <a className="btn"
		       onClick={insertCheckmark.bind(this)}>
			<i className="fa fa-check-square-o"></i>
		    </a>
		    <a className="btn"
		       onClick={()=> {
			       if (this.props.profile.email) {
				   /* if profile is logged in, save notes to db */
				   this.props.saveNotes(this.props.notes)
			       } 
			       /* save notes to browser,
				  whether profile is logged in or not. */
			       this.props.saveNotesBrowser(this.props.notes)	    
		       }}>
			<i className="fa fa-floppy-o"></i>
		    </a>
		</div>
		<div className="clearfix"/>
	    </div>
	)
    }
}

/* Magic connecting component to redux */
function mapStateToProps(state) {
    return {
    	notes: state.notes,
    	profile: state.profile
    }
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, notesActions)(Notes);
