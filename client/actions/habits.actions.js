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

export function saveHabits(habits) {
    /* ../components/Habits.js triggers this action every time habits in state change  */
    /* For some weird reason, if Im using "habits" vairable, inside the following
       function it becomes empty. if I rename it to "habitsToSave", everything works.
       why? no idea. */
    var data = {
	habits: habits,
	lastSaved: new Date()
    }
    return async function(dispatch) {
	const res = await axios.post('/api/v1/habits', data)
	const habits = res.data
	console.log('Saved habits to server') /* + JSON.stringify(habits))*/

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
	/* const res = await axios.get('/api/v1/habits')*/
	const res = await axios.get('/api/v1/profiles/user')	
	console.log('Fetched habits')
	
	const serverHabits = JSON.parse(res.data.habits)
	const browserHabits = JSON.parse(localStorage.getItem('habits'))

	const serverLastSaved = Date.parse(res.data.lastSaved)
	const browserLastSaved = Date.parse(localStorage.getItem('lastSaved'))

	var habits = []
	/* TODO: doesn't work right yet. after I fetch habits in Habits.js,
	   it automatically resaves it. Making debugging this more confusing.  */
	/* Compare habits from DB and local storage */
	if (serverLastSaved > browserLastSaved) {
	    /* Local storage habits were changed more recently,
	       because  I was logged out or offline. */
	    console.log("Loading browser habits")
	    habits = browserHabits
	} else {
	    /* DB habits were changed more recently, on another device */
	    console.log("Loading server habits")	    
	    habits = serverHabits	    
	}

	
	dispatch({
	    type: 'LOAD_HABITS',
	    payload: serverHabits
	})
    }    
}

export function saveHabitsBrowser(habits) {
    /* ../components/Habits.js triggers this action every time habits in state change  */
    localStorage.setItem('habits', JSON.stringify(habits))
    localStorage.setItem('lastSaved', new Date())   
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
