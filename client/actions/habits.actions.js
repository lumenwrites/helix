import axios from 'axios'

export function updateCheckmark(checkmark) {
    return async function(dispatch) {
	/* const res = await axios.get('/api/v1/profiles/user')
	   const user = res.data*/
	/* console.log('Logged in ' + JSON.stringify(user))*/
	dispatch({
	    type: 'UPDATE_CHECKMARK',
	    payload: checkmark
	})
    }
}

export function saveHabitsBrowser(habits) {
    /* localStorage.setItem('habits', JSON.stringify(habits))*/
    console.log("Saved habits")
    return {
	type: 'SAVE_HABITS',
	payload: habits
    }
}

export function loadHabitsBrowser() {
    var habits = JSON.parse(localStorage.getItem('habits'))
    console.log("Load habits")
    return {
	type: 'LOAD_HABITS',
	payload: habits
    }
}
