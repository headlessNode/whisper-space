const asyncHandler = require('express-async-handler');
const db = require('../db/query.js');

const indexController = {
    renderIndex: asyncHandler(async (req, res) => {
            const user = {
                ...res.locals.currentUser
            };
            const posts = await db.getPosts();
            res.render('index', {user, posts});
    }),
};

module.exports = indexController;