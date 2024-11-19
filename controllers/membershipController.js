const asyncHandler = require('express-async-handler');
const db = require('../db/query.js');
const {body, validationResult} = require('express-validator');
require('dotenv').config();

const validateRiddle = [
    body('secret_answer')
        .trim()
        .notEmpty()
        .withMessage('The answer is required'),
    body('secret_answer')
        .trim()
        .custom(value => value === process.env.MEMBERSHIP_SECRET)
        .withMessage('The answer is incorrect. Try again.')
];

const membershipController = {
    renderForm: asyncHandler(async (req, res) => {
        const user = {
            ...res.locals.currentUser
        };
        res.render('membership', {user});
    }),

    addMembership: [
        validateRiddle,
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            const user = {
                ...res.locals.currentUser
            };
            if (!errors.isEmpty()) {
                res.render('membership', {user, errors: errors.array()});
            } else {
                await db.addMembership(user.id);
                res.redirect('/');
            }
        })
    ],
};

module.exports = membershipController;