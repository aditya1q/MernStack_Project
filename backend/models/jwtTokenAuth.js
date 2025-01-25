import mongoose from "mongoose";
import { hashPassword } from '../middleware/hashPassword.js'
const userJwtTokenSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your Email adress is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "your username is required"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
}, { timestamps: true });

// Pre-save middleware to hash the password
userJwtTokenSchema.pre("save", hashPassword)

const user = mongoose.model('user', userJwtTokenSchema);
export default user;