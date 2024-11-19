const {Router} = require('express');
const loginRouter = Router();
const loginController = require('../controllers/loginController.js');

loginRouter.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect('/');
    } else {
        loginController.renderForm(req, res);
    }
});
loginRouter.post('/', loginController.loginUser);

module.exports = loginRouter;