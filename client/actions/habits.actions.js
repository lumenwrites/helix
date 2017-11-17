import axios from 'axios'
import saveAs from 'save-as'

export function createHabit() {
    return {
	type: 'CREATE_HABIT',
	payload: null
    }
}

export function updateHabit(habit) {
    return {
	type: 'UPDATE_HABIT',
	payload: habit
    }
}

export function deleteHabit(habit) {
    return {
	type: 'DELETE_HABIT',
	payload: habit
    }
}


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
    var data = habits
    data.lastUpdated = new Date()
    data.modified = false

    return async function(dispatch) {
	const res = await axios.post('/api/v1/habits', data)
	const habits = res.data
	console.log('[habits.actions] Saved habits to server') /* + JSON.stringify(habits)) */

	dispatch({
	    type: 'SAVE_HABITS',
	    payload: habits
	})
    }
}

export function saveHabitsBrowser(habits) {
    /* ../components/Habits.js triggers this action every time habits in state change  */
    habits.lastUpdated = new Date()
    habits.modified = false
    localStorage.setItem('habits', JSON.stringify(habits))
    console.log("[habits.actions]  Saved habits to local storage")
    return {
	type: 'SAVE_HABITS',
	payload: habits
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
	
	dispatch({
	    type: 'LOAD_HABITS',
	    payload: serverHabits
	})
    }    
}


export function loadHabitsBrowser() {
    /* I'm loading habits when ../components/Habits.js is mounted  */    
    var habits = JSON.parse(localStorage.getItem('habits'))
    console.log("Load habits from local storage")
    return {
	type: 'LOAD_HABITS',
	payload: habits
    }
}



export function exportHabitsJSON(exportJSON) {
    console.log("Exporting " + JSON.stringify(exportJSON))

    /* Use magical component to save it into a file */
    var contents = JSON.stringify(exportJSON, null, 4)
    var blob = new Blob([contents], { type: 'application/json;charset=utf-8' })
    var filename = 'helix.json'
    saveAs(blob, filename)
    return {
	type: 'EXPORT_HABITS',
	payload: null
    }    
}
