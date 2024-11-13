const path = require('path');
const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const customErrors = require('./errors/CustomErrors.js');

// EXPRESS SETUP //

const assestsPath = path.join(__dirname, 'public');
app.use(express.static(assestsPath));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTERS //

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use((req, res, next) => {
    const err = new customErrors.CustomNotFoundError('This page doesnot exist.');
    next(err);
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).render('error', { err });
});

// SERVER STARTUP //

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});