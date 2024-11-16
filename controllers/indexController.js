const db = require('../db/query.js');

const indexController = {
    renderIndex: (req, res) => {
        const user = {
            ...res.locals.currentUser
        };
        const posts = db.getPosts(user.is_member);
        res.render('index', {user, posts});
    }
};

module.exports = indexController;