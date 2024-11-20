const {body, validationResult} = require('express-validator');
const {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} = require('obscenity');
const db = require('../db/query.js');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// VALIDATIONS //

const profanityFilter = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

const validateUsername = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('username').trim().custom((value) => {
        if(profanityFilter.hasMatch(value)) {
            return Promise.reject();
        };
        return Promise.resolve();
    }).withMessage('Please choose another username. Profanity is not allowed'),
    body('username').trim().custom((value) => {
        if(value.includes(' ')) {
            return Promise.reject();
        };
        return Promise.resolve();
    }).withMessage('Username cannot contain spaces'),
    body('username').trim().isLength({max: 20}).withMessage('Username must be at most 20 characters long'),
    body('username').trim().isLength({min: 4}).withMessage('Username must be at least 4 characters long'),
    body('username').trim().custom(async (value) => {
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
        .withMessage('First name must contain only alphabetic characters'),
    body('first_name').trim().custom((value) => {
        if(profanityFilter.hasMatch(value)) {
            return Promise.reject();
        };
        return Promise.resolve();
    }).withMessage('Please choose another Firstname. Profanity is not allowed'),
    body('first_name').trim().isLength({max: 20}).withMessage('Firstname must be at most 20 characters long'),
    body('first_name').trim().isLength({min: 4}).withMessage('Firstname must be at least 4 characters long'),
];

const validateLastName = [
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    body('last_name')
        .isAlpha()
        .withMessage('Last name must contain only alphabetic characters'),
    body('last_name').trim().custom((value) => {
        if(profanityFilter.hasMatch(value)) {
            return Promise.reject();
        };
        return Promise.resolve();
    }).withMessage('Please choose another Lastname. Profanity is not allowed'),
    body('last_name').trim().isLength({max: 20}).withMessage('Lastname must be at most 20 characters long'),
    body('last_name').trim().isLength({min: 4}).withMessage('Lastname must be at least 4 characters long'),
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