import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: 'String' },    
    googleId: { type: 'String', required: true }    
})

/* User collection */
export default mongoose.model('User', userSchema)
