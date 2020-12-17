const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        maxlength: 50
    },
    surname: {
        type: String,
        maxlength: 50
    },
    phone: {
        type: Number,
        minlength: 10
    },
    password: {
        type: String,
        minlength: 8
    },
    role: {
        type: Number,
        default: 1
    },
    image: String,
    google: String,
    toknes: Array
})


userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }