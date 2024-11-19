const {Router} = require('express');
const postRouter = Router();
const postController = require('../controllers/postController.js');

postRouter.get('/create', (req, res) => {
    if(req.isAuthenticated()) {
        postController.renderForm(req, res);
    } else {
        res.redirect('/login');
    }
});
postRouter.post('/create', postController.createPost);
postRouter.get('/delete/:id', (req, res) => {
    if(req.isAuthenticated()) {
        postController.deletePost(req, res);
    } else {
        res.redirect('/login');
    }
});
postRouter.get('/edit/:id', (req, res) => {
    if(req.isAuthenticated()) {
        postController.renderEditForm(req, res);
    } else {
        res.redirect('/login');
    }
});
postRouter.post('/edit/:id', postController.editPost);

module.exports = postRouter;