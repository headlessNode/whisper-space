const {Router} = require('express');
const membershipRouter = Router();
const membershipController = require('../controllers/membershipController.js');

membershipRouter.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        membershipController.renderForm(req, res);
    } else {
        res.redirect('/login');
    }
});
membershipRouter.post('/', membershipController.addMembership);

module.exports = membershipRouter;