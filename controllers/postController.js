const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const db = require('../db/query.js');

// VALIDATIONS //


const validateTitle = [
    body('title').trim().notEmpty().withMessage('The title is required'),
    body('title').isLength({ min: 5 }).withMessage('The title must be at least 5 characters long'),
    body('title').isLength({ max: 80 }).withMessage('The title must be at most 80 characters long')
];

const validateContent = [
    body('content').trim().notEmpty().withMessage('The content cannot be empty'),
    body('content').isLength({ min: 5 }).withMessage('The content must be at least 5 characters long'),
    body('content').isLength({ max: 500 }).withMessage('The content must be at most 500 characters long')
];

// CONTROLLER //


const postController = {
    renderForm: asyncHandler(async (req, res) => {
        const user = {
            ...res.locals.currentUser
        };
        // const postsCreated = db.getPostsCreated(user.id);
        res.render('createPost', {user});
    }),

    renderEditForm: asyncHandler(async (req, res) => {
        const postId = req.params.id;
        const user = {
            ...res.locals.currentUser
        };
        const post = await db.getPostById(postId);
        res.render('editPost', {user, post});
    }),

    createPost: [
        validateTitle,
        validateContent,
        asyncHandler(async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const user = {
                    ...res.locals.currentUser
                };
                res.render('createPost', {user, errors: errors.array()});
            } else {
                const {title, content} = req.body;
                const userId = res.locals.currentUser.id;
                await db.createPost(title, content, userId);
                res.redirect('/');
            }
        })
    ],

    editPost: [
        validateTitle,
        validateContent,
        asyncHandler(async (req, res) => {
            const postId = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const user = {
                    ...res.locals.currentUser
                };
                const post = await db.getPostById(postId);
                res.render('editPost', {user, post, errors: errors.array()});
            } else {
                const {title, content} = req.body;
                await db.editPost(postId, title, content);
                res.redirect('/');
            }
        })
    ],

    deletePost: asyncHandler(async (req, res) => {
        const postId = req.params.id;
        await db.deletePost(postId);
        res.redirect('/');
    })

}

module.exports = postController;