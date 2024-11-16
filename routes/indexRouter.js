const {Router} = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController.js');

indexRouter.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        indexController.renderIndex(req, res);
    } else {
        res.redirect('/login');
    }
});

module.exports = indexRouter;