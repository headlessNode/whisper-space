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
    const result = await pool.query(
        'INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)', [username, hash, first_name, last_name]
    );
    console.log(result);
});

const findUser = asyncHandler(async (username) => {
    const {rows} = await pool.query(
        'SELECT * FROM users WHERE username = $1', [username]
    );
    return rows[0];
});

const findUserById = asyncHandler(async (id) => {
    const {rows} = await pool.query(
        'SELECT * FROM users WHERE id = $1', [id]
    );
    return rows[0];
});

const getPosts = asyncHandler(async () => {
    const {rows} = await pool.query(
        'SELECT * FROM posts ORDER BY created_at DESC'
    );
    return rows;
});

const getPostById = asyncHandler(async (id) => {
    const {rows} = await pool.query(
        'SELECT * FROM posts WHERE id = $1', [id]
    );
    return rows[0];
});

const createPost = asyncHandler(async (title, content, userId) => {
    await pool.query(
        'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)', [title, content, userId]
    );
});

const deletePost = asyncHandler(async (id) => {
    await pool.query(
        'DELETE FROM posts WHERE id = $1', [id]
    );
});

const editPost = asyncHandler(async (id, title, content) => {
    await pool.query(
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, id]
    );
});

module.exports = {
    filterUsername,
    registerUser,
    findUser,
    findUserById,
    getPosts,
    getPostById,
    createPost,
    editPost,
    deletePost
};