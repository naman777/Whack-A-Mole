const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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

const User = mongoose.model('User', userSchema)
module.exports = User