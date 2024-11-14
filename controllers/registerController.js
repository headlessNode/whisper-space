const {body, validationResult} = require('express-validator');
const db = require('../db/query.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// VALIDATIONS //

const validateUsername = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('username').custom(async (value) => {
        const count = await db.filterUsername(value);
        if (count > 0) {
            return Promise.reject();
        };
        return Promise.resolve();
    }).withMessage('Username already exists')
];

const validatePassword = [
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    body('password').custom((value, { req }) => {
        if (value !== req.body.verify_password) {
            return Promise.reject();
        }
        return Promise.resolve();
    }).withMessage('Passwords do not match')
];


const validateFirstName = [
    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),
    body('first_name')
        .isAlpha()
        .withMessage('First name must contain only alphabetic characters')
];

const validateLastName = [
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    body('last_name')
        .isAlpha()
        .withMessage('Last name must contain only alphabetic characters')
];

// CONTROLLER //

const registerController = {
    renderForm: asyncHandler((req, res) => {
        res.render('register');
    }),

    registerUser: [
        validateUsername,
        validatePassword,
        validateFirstName,
        validateLastName,
        asyncHandler( async (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                const {username, password, first_name, last_name} = req.body;
                const hash = await bcrypt.hash(password, 10);
                await db.registerUser(username, hash, first_name, last_name);
                res.redirect('/login');
            } else {
                res.render('register', {errors: errors.array()});
            }
        })
    ]
};

module.exports = registerController;