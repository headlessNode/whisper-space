const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./routes/indexRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const postRouter = require('./routes/postRouter.js');
const customErrors = require('./errors/CustomErrors.js');
const db = require('./db/query.js');
const pool = require('./db/pool.js');
const bcrypt = require('bcryptjs');
const pgSession = require('connect-pg-simple')(session);
const asyncHandler = require('express-async-handler');
require('dotenv').config();

// EXPRESS SETUP //

const assestsPath = path.join(__dirname, 'public');
app.use(express.static(assestsPath));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// SESSION SETUP //

const sessionStore = new pgSession({
    pool: pool,
    tableName: 'session'
});

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.session());

// PASSPORT STRATEGY //

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(asyncHandler(async (id, done) => {
    const user = await db.findUserById(id);
    if (!user) {
        return done(new Error('User not found'), null);
    }
    done(null, user);
}));

passport.use(
    new LocalStrategy(
        async (username, password, done) => {
            const user = await db.findUser(username);
            if(!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
    )
);


// MAKE CURRENT USER AVAILABLE TO ENTIRE APP //

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


// ROUTERS //

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/create-post', postRouter);
app.post('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
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