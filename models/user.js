// 3 things required for every model
// 1. import mongoose and passportLocalMongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// 2. define a schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropdups: true,
        // validation checks
        validate: [
            {
                validator: async function (value) {
                    const emailCount = await this.model('user').countDocuments({email: value});
                    return emailCount === 0; // must return boolean from validator; true equals valid
                },
                message: props => `Please try a different email. This one already exists ${props.value}`
            },
            {
                // test format of email with regex
                validator: function (value) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());
                },
                message: props => `Please ensure your email address is in the correct format. The email you entered was ${props.value}`
            },
            {
                validator: function (value) {
                    return this.emailConfirmation === value;
                },
                message: props => `Your email, ${props.value} does not match the email confirmation you entered`
            }
        ]
    }
}, {
    timestamps: true
});

// set a virtual attribute - values that only exist until model is saved, then they are gone
UserSchema.virtual('emailConfirmation')
.get(function () {
    return this._emailConfirmation; // this cannot match the name of the attribute
})
.set(function (value) {

    this._emailConfirmation = value;
});


UserSchema.virtual('password')
.get(function () {
    return this._password;
})
.set(function (value) {
    // validation check
    if (value !== this.passwordConfirmation) {
        this.invalidate('password', 'Password and password confirmation must match');
    }

    this._password = value;
});


UserSchema.virtual('passwordConfirmation')
.get(function () {
    return this._passwordConfirmation;
})
.set(function (value) {
    this._passwordConfirmation = value;
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

// 3. export the schema
module.exports = mongoose.model('user', UserSchema);