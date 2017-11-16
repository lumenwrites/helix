import { Router } from 'express'
const router = new Router()

import passport from 'passport'
/* Not using this anywhere, just importing the file
   to execute it and setup passport. */
import passportConfig from '../services/passport'

/* Import controllers */
import * as habitsControllers from '../controllers/habits.controllers';


/* Get user */
router.route('/').get(habitsControllers.getHabits)
router.route('/habits').post(habitsControllers.saveHabits)
router.route('/notes').post(habitsControllers.saveNotes)



export default router
