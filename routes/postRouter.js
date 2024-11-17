const {Router} = require('express');
const postRouter = Router();
const postController = require('../controllers/postController.js');

postRouter.get('/create', postController.renderForm);
postRouter.post('/create', postController.createPost);
postRouter.get('/delete/:id', postController.deletePost);
postRouter.get('/edit/:id', postController.renderEditForm);
postRouter.post('/edit/:id', postController.editPost);

module.exports = postRouter;