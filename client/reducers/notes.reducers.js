var INITIAL_STATE = {
    timeline: [
	{
	    date: '2017-11-15',
	    note: "String note"
	}
    ]
}

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    var habitList = JSON.parse(JSON.stringify(state.habitList)) /* deep copy */

    switch (action.type) {
	case 'CREATE_HABIT':
	    habitList = createHabit(habitList)
	    console.log("Create habit")
	    return { ...state, habitList, modified: true}  

	case 'UPDATE_HABIT':
	    var habit = action.payload

	    /* Find a checkmark, update it's state, return updated habits  */
	    habitList = updateHabit(habit, habitList)
	    console.log("Updating habit " + JSON.stringify(habit))
	    
	    return { ...state, habitList, modified: true}  
	case 'DELETE_HABIT':
	    var habit = action.payload
	    habitList = deleteHabit(habit, habitList)
	    return { ...state, habitList, modified: true}
	    
	case 'UPDATE_CHECKMARK':
	    /* When ../components/Checkmark is clicked */
	    var checkmark = action.payload
	    /* Find a checkmark, update it's state, return updated habits  */
	    habitList = updateCheckmark(checkmark, habitList)
	    return { ...state, habitList, modified: true }
	case 'SAVE_HABITS':
	    /* Habits have been saved to db, turn off the modified flag. */
	    return {...state, modified: false}
	case 'FETCH_USER':
	    const profile = action.payload
	    console.log('[habits.reducers]')
	    console.log('Logged in ' + profile.email)
	    /* Loading habits */
	    if (profile.habits) {
		const serverHabits = JSON.parse(profile.habits)

		/* Check if browser habits were updated more recently */
		const browserHabits = JSON.parse(localStorage.getItem('habits'))
		if (browserHabits &&
		    browserHabits.lastUpdated > serverHabits.lastUpdated ) {
		    console.log('Loading habits from browser (recently modified).')
		    return browserHabits
		}
		
		console.log('Loading habits from server (recently modified).')
		return serverHabits
	    } else {
		const habits = JSON.parse(localStorage.getItem('habits'))
		if (habits) {
		    console.log('Loading habits from browser.')		    
		    return habits
		} else {
		    console.log('Loading default habits.')
		    return state
		}
	    }
	default:
	    return state
    }
}
