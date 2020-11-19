// 3 things required for every model
// 1. require mongoose
const mongoose = require('mongooose');

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
        dropdups: true
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

// 3. export the schema
module.exports = mongoose.model('User', UserSchema);