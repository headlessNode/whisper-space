const {Client} = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255),
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        is_member BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER,
        title VARCHAR(255),
        content TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;

async function main() {
    const client = new Client({
        connectionString: process.argv[2],
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Database populated');
};

main();