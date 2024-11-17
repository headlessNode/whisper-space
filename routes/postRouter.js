const {Router} = require('express');
const postRouter = Router();
const postController = require('../controllers/postController.js');

postRouter.get('/', postController.renderForm);
postRouter.post('/', postController.createPost);

module.exports = postRouter;