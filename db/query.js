const pool = require('./pool.js');
const asyncHandler = require('express-async-handler');

// DB QUERIES //

const filterUsername = asyncHandler(async (username) => {
    const isTableEmpty = async () => {
        const {rows} = await pool.query(
            'SELECT COUNT(*) FROM users;'
        );
        if( rows[0].count === 0){
            return true;
        }
        return false;
    }
    if(!isTableEmpty && username) {
        const {rows} = await pool.query(
            'SELECT COUNT(*) FROM users WHERE username = $1', [username]
        );
        return rows[0].count;
    } else {
        return 0;
    }
});

const registerUser = asyncHandler(async (username, hash, first_name, last_name) => {
    console.log(hash);
    const result = await pool.query(
        'INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)', [username, hash, first_name, last_name]
    );
    console.log(result);
});

module.exports = {
    filterUsername,
    registerUser
};