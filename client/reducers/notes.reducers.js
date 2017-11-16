import moment from 'moment'

var INITIAL_STATE = {
    active:'2017-11-16',
    timeline: [
	{
	    date: '2017-11-13',
	    note: "Another note"
	},
	{
	    date: '2017-11-15',
	    note: "Test note"
	},
	{
	    date: '2017-11-16',
	    note: "Today's note"
	}
    ]
}

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
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
	    if (date) {
		return { ...state, active:date}  
	    } else {
		return { ...state, active: moment().format('YYYY-MM-DD')}
	    }
	default:
	    return state
    }
}
