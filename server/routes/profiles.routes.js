import { Router } from 'express'
const router = new Router()

import passport from 'passport'
/* Not using this anywhere, just importing the file
   to execute it and setup passport. */
import passportConfig from '../services/passport'

/* Import controllers */
import * as usersControllers from '../controllers/users.controllers';


router.route('/').get(usersControllers.home)

/* Get user */
router.route('/user').get((req, res)=>{
    /* Passport deserializes cookie (finds user by id),
       attaches it to req, and then I send it back. */
    res.send(req.user)
})

/* Logout */
router.route('/logout').get((req, res)=>{
    /* Passport attaches .logout() function to req object.  */
    req.logout()
    /* res.send(req.user)*/
    res.redirect('/')
})


/* When a user goes to /auth/google, tell passport to start auth flow with GoogleStrategy
   It'll redirect user to page where he gives permission to view his info.
   Scope is the list of permissions we want. */
router.route('/google').get(
    passport.authenticate('google', {
	scope: ['profile', 'email']
    })
)

/* When user visits /auth/google, passport uses strategy to go and ask for permission.
   Google redirects a person here, with the code I need to access stuff.
   Passport sees the code in the url and knows it can use it.*/
router.route('/google/callback').get(
    passport.authenticate('google'),
    (req, res) => {
	res.redirect('/')
    }
)

export default router
