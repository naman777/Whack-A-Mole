import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email'
        }
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isMobilePhone(value, 'any'),
            message: 'invalid phone number'
        }
    }
})

const User = mongoose.model('User', userSchema);
export default User;