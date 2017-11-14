import axios from 'axios'

export function fetchUser() {
    console.log("[profiles.actions] Fetching user")
    return async function(dispatch) {
	const res = await axios.get('/api/v1/profiles/user')
	const user = res.data
	/* console.log('Fetched user ' + user.email)*/
	dispatch({
	    type: 'FETCH_USER',
	    payload: user
	})
    }
}
