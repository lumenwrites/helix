import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'
import cors from 'cors'

/* Import Routes */
import profilesRoutes from './routes/profiles.routes.js'
import habitsRoutes from './routes/habits.routes.js'

/* Import config */
import keys from './config/keys'

/* Setup app */
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(cors())

/* Tell express to use cookies */
/* Cookie will last for 30 days(in milliseconds), and be encrypted with random key. */
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
}))
/* Cookie extracts browser cookies and puts them into req.session
   (stored before, by passport with Set-cookie header, when user profiles'd)*/
/* passport extracts id from cookie data, deserializes it, and returns me a user.*/
/* And as a result, I have req.user.*/
app.use(passport.initialize())
/* Passport takes info from req.session and uses it to deserialize a user */
app.use(passport.session())
/* body-parser allows me to receive json, and puts it into req.body */
app.use(bodyParser.json({ limit: '20mb' }));

/* Connect to DB */
mongoose.Promise = global.Promise;
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/helix';
console.log("Connecting to the db at " + MONGO_DB_URL);
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) {
	console.error('Please make sure Mongodb is installed and running!'); 
	throw error;
    }
});


/* API Routes */
app.use('/api/v1/profiles', profilesRoutes);
app.use('/api/v1', habitsRoutes);

/* Serve client react app */
/* Static files */
app.use('/styles', express.static(path.resolve(__dirname, '../client/styles')))
app.use('/img', express.static(path.resolve(__dirname, '../client/img')))
app.use('/pwa', express.static(path.resolve(__dirname, '../client/pwa')))
app.get('/client.js', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/client.js'));
})
app.get('/sw.js', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/pwa/sw.js'));
})
/* Send the rest of the requests to be handled by the react router */
app.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/index.html')));

/* Serve */
const port = process.env.PORT || 3020
app.listen(port, function () {
    console.log(`Running on port ${port}!`)
})
