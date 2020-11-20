const User = require('../models/user');

// controller actions
exports.index = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    console.log(req.body);
    
    try {
        const { // order matters
            name,
            email,
            emailConfirmation,
            passwordConfirmation,
            password
        } = req.body;

        const user = await User.register({
            name,
            email,
            emailConfirmation,
            passwordConfirmation,
            password
        }, password); // register function comes from passport plugin
        
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

exports.destroy = async (req, res, next) => {
    try {

    } catch(error) {
        next(error);
    }
};