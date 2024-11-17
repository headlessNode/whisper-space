const asyncHandler = require('express-async-handler');
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const db = require('../db/query.js');

// VALIDATIONS //

const validateUsername = [
    body('username').trim().notEmpty().withMessage('Username is required')
];

const validatePassword = [
    body('password').trim().notEmpty().withMessage('Password is required')
];

// CONTROLLER //

const loginController = {
    renderForm: asyncHandler(async (req, res) => {
        res.render('login');
    }),

    loginUser: [
        validateUsername,
        validatePassword,
        asyncHandler(async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render('login', {errors: errors.array()});
            } else {
                passport.authenticate('local', (err, user, info) => {
                    if (err) {
                        return next(err);
                    }
                    console.log(err);
                    console.log(user);
                    if (!user) {
                        return res.render('login', { sessionErrors: [info.message] });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect('/');
                    });
                })(req, res, next);
            }

        })]
};

module.exports = loginController;