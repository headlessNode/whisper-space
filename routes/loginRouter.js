const {Router} = require('express');
const loginRouter = Router();
const loginController = require('../controllers/loginController.js');

loginRouter.get('/', loginController.renderForm);
loginRouter.post('/', loginController.loginUser);

module.exports = loginRouter;