import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const auth = mongoose.model('auth', userSchema);
export default auth;
