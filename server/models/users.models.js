import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: 'String' },    
    googleId: { type: 'String', required: true },
    habits: { type: 'String' }
})

/* User collection */
export default mongoose.model('User', userSchema)
