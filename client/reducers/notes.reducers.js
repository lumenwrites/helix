import moment from 'moment'

var INITIAL_STATE = {
    active:'2017-11-16',
    lastUpdated:null,    
    timeline: []
}
/*
   {
   date: '2017-11-13',
   note: "Another note"
   },
*/
/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'FETCH_USER':
	    const profile = action.payload
	    const today = moment().format('YYYY-MM-DD')

	    /* Loading notes */
	    if (profile.notes) {
		const serverNotes = JSON.parse(profile.notes)

		/* Check if browser notes were updated more recently */
		const browserNotes = JSON.parse(localStorage.getItem('notes'))
		if (browserNotes &&
		    browserNotes.lastUpdated > serverNotes.lastUpdated ) {
		    console.log('Loading notes from browser (recently modified).')
		    return {...browserNotes, active:today}
		}
		
		console.log('Loading notes from server (recently modified).')
		return {...serverNotes, active:today}
	    } else {
		var notes = JSON.parse(localStorage.getItem('notes'))
		if (notes) {
		    console.log('Loading notes from browser.')		    
		    return {...notes, active: today}
		} else {
		    console.log('Loading default notes.')
		    return {...state, active:today}
		}
	    }
	case 'UPDATE_NOTE':
	    var note = action.payload
	    var timeline = JSON.parse(JSON.stringify(state.timeline)) /* Deep copy */
	    var foundNote = false
	    timeline = timeline.map((n)=>{
		if (n.date == note.date) {
		    /* find a note, return updated one */
		    foundNote = true
		    return note
		}
		return n
	    })
	    /* If I didn't find a note, then add a new one */
	    if (!foundNote) { timeline.push(note) }
	    return { ...state, timeline}
	case 'ACTIVATE_NOTE':
	    var date = action.payload
	    /* console.log("Activate note " + date)*/
	    if (date) {
		return { ...state, active:date}  
	    } else {
		return { ...state, active: moment().format('YYYY-MM-DD')}
	    }
	default:
	    return state
    }
}
