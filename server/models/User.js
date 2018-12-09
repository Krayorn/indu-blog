import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        role: String,
    }
)

export default mongoose.model('User', UserSchema)
