const INITIAL_STATE = {
    user: null
}

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'FETCH_USER':
	    var user = action.payload
	    return {...state, user: user || false}
	default:
	    return state
    }
}
