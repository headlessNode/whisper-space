const {Router} = require('express');
const registerRouter = Router();
const registerController = require('../controllers/registerController.js');

registerRouter.get('/', registerController.renderForm);

registerRouter.post('/', registerController.registerUser);

module.exports = registerRouter;