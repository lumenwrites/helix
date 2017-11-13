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

export function saveHabits(habitsToSave) {
    /* ../components/Habits.js triggers this action every time habits in state change  */
    /* For some weird reason, if Im using "habits" vairable, inside the following
       function it becomes empty. if I rename it to "habitsToSave", everything works.
       why? no idea. */
    habitsToSave.lastSaved = new Date()
    return async function(dispatch) {
	const res = await axios.post('/api/v1/habits', habitsToSave)
	const habits = res.data
	console.log('Saved habits ' + JSON.stringify(habits))

	dispatch({
	    type: 'SAVE_HABITS',
	    payload: habits
	})
    }
}

export function loadHabits() {
    /* I'm loading habits when ../components/Habits.js is mounted  */
    console.log("Fetching habits")
    return async function(dispatch) {
	const res = await axios.get('/api/v1/habits')
	const serverHabits = JSON.parse(res.data)
	console.log('Fetched habits')
	dispatch({
	    type: 'LOAD_HABITS',
	    payload: serverHabits
	})
    }    
}

export function saveHabitsBrowser(habits) {
    /* ../components/Habits.js triggers this action every time habits in state change  */
    localStorage.setItem('habits', JSON.stringify(habits))
    /* localStorage.setItem('lastSaved', new Date())    */
    console.log("Saved habits")
    return {
	type: 'SAVE_HABITS',
	payload: habits
    }
}

export function loadHabitsBrowser() {
    /* I'm loading habits when ../components/Habits.js is mounted  */    
    var habits = JSON.parse(localStorage.getItem('habits'))
    console.log("Load habits")
    return {
	type: 'LOAD_HABITS',
	payload: habits
    }
}
