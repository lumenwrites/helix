import axios from 'axios'

export function fetchUser() {
    console.log("Fetching user")
    return async function(dispatch) {
	const res = await axios.get('/api/v1/profiles/user')
	const user = res.data
	console.log('Logged in ' + JSON.stringify(user))
	dispatch({
	    type: 'FETCH_USER',
	    payload: user
	})
    }
}
