const {Router} = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.render('index', {user: res.locals.currentUser});
});

module.exports = indexRouter;