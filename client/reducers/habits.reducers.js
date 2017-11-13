import { updateCheckmark } from '../utils/habits.utils'

const INITIAL_STATE = [
    {
	id: 1,
	title: 'Food',
	description: '16 packs > 0 packs',
	color: 'blue',
	checkmarks: [
	]
    },
    {
	id: 2,
	title: 'Sport',
	description: 'Basic + Abs > Lake',
	color: 'blue',
	checkmarks: [
	]
    },
    {
	id: 3,
	title: 'Code',
	description: 'Udemy/AIPages > Art > Clients',
	color: 'orange',
	checkmarks: [
	]
    },
    {
	id: 4,
	title: 'Comedy',
	description: '4 jokes > Tweets/Microscripts',
	color: 'orange',
	checkmarks: [
	]
    },
    {
	id: 5,
	title: '++ Info Value',
	description: 'SL Paragraphs > Speak',
	color: 'gray',	
	checkmarks: [
	]
    },
    {
	id: 6,
	title: '++ Info Diet',
	description: 'RSS only. No yt/hn/rdt > Plug off.',
	color: 'gray',	
	checkmarks: [
	]
    },
    {
	id: 7,
	title: '++ Withdrawal',
	description: 'N/FO3/NFS > Draw/Lowpoly.',
	color: 'gray',	
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
