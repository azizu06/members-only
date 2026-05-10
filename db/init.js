require("dotenv").config();
const { Client } = require("pg");

const createTables = `
  DROP TABLE IF EXISTS messages;
  DROP TABLE IF EXISTS users;
  
  CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name TEXT,
    last_name TEXT,
    username TEXT UNIQUE NOT NULL,
    password TEXT,
    is_member BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
  );

  CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
  );
`;

const main = async () => {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(createTables);
  await client.end();
};
main();
