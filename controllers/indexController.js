const asyncHandler = require('express-async-handler');
const db = require('../db/query.js');

const indexController = {
    renderIndex: asyncHandler(async (req, res) => {
            const user = {
                ...res.locals.currentUser
            };
            const posts = await db.getPosts();
            const postCreators = await Promise.all(
                posts.map(async (post) => await db.findUserById(post.user_id))
              );
            res.render('index', {user, posts, postCreators});
    }),
};

module.exports = indexController;