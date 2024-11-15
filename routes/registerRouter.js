const {Router} = require('express');
const registerRouter = Router();
const registerController = require('../controllers/registerController.js');

registerRouter.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        res.render('register', {user: res.locals.currentUser, isAuthenticated: true});
    } else {
        registerController.renderForm(req, res);
    }
});

registerRouter.post('/', registerController.registerUser);

module.exports = registerRouter;