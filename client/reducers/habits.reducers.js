import { updateCheckmark } from '../utils/habits.utils'

const INITIAL_STATE = [
    {
	id: 1,
	title: 'Food',
	checkmarks: [
	]
    },
    {
	id: 2,
	title: 'Sport',
	checkmarks: [
	]
    },
    {
	id: 3,
	title: 'Code',
	checkmarks: [
	]
    },
    {
	id: 4,
	title: 'Write',
	checkmarks: [
	]
    },
    {
	id: 5,
	title: 'Comedy',
	checkmarks: [
	]
    }


]

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'UPDATE_CHECKMARK':
	    /* When ../components/Checkmark is clicked */
	    var checkmark = action.payload
	    var habits = JSON.parse(JSON.stringify(state))
	    /* Find a checkmark, update it's state, return updated habits  */
	    habits = updateCheckmark(checkmark, habits)
	    /* Save habits (hacky, should do it in action) */
	    localStorage.setItem('habits', JSON.stringify(habits))
	    return habits
	case 'LOAD_HABITS':
	    var habits = action.payload
	    /* Load habits when ../components/Habits mounts */
	    return habits
	default:
	    return state
    }
}
