const INITIAL_STATE = {}

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'FETCH_USER':
	    var user = action.payload
	    return  user || false
	default:
	    return state
    }
}
