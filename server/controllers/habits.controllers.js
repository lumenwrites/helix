/* Import Models */
import { User } from '../models/users.models'


/* Get Habits */
export function getHabits(req, res) {
    /* Passport deserializes cookie (finds user by id),
       attaches it to req, and then I send it back. */
    const user = req.user
    res.json(user.habits)
}

/* Save Habits */
export function saveHabits(req, res) {
    /* Passport deserializes cookie (finds user by id),
       attaches it to req, and then I send it back. */
    const user = req.user
    const habits = req.body
    /* console.log('Received habits ' + JSON.stringify(req.body))*/
    user.habits = JSON.stringify(habits)
    user.save((err, usr)=>{
	console.log(`Saved ${usr.email}'s habits ` + usr.habits)
	res.json(usr.habits)
    })
}


/* Save Notes */
export function saveNotes(req, res) {
    /* Passport deserializes cookie (finds user by id),
       attaches it to req, and then I send it back. */
    const user = req.user
    const notes = req.body
    console.log('Received notes ' + JSON.stringify(notes))
    user.notes = JSON.stringify(notes)
    user.save((err, usr)=>{
	console.log(`Saved ${usr.email}'s notes ` + usr.notes)
	res.json(usr.notes)
    })
}

