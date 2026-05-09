const pool = require("./pool");

exports.findMsg = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id = $1`, [
    id,
  ]);
  return rows[0];
};

exports.getAllMsgs = async () => {
  const { rows } = await pool.query(
    `SELECT m.*, u.* FROM messages m JOIN users u ON m.user_id = u.id`,
  );
  return rows;
};

exports.addUser = async (info) => {
  const { firstName, lastName, username, password } = info;
  await pool.query(
    `
    INSERT INTO users (first_name, last_name, username, password) 
    VALUES ($1, $2, $3, $4)
    `,
    [firstName, lastName, username, password],
  );
};

exports.addMsg = async (info) => {
  const { title, message } = info;
  await pool.query(
    `
    INSERT INTO messages (title, message) VALUES ($1, $2)
    `,
    [title, message],
  );
};

exports.deleteMsg = async (id) => {
  await pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};

exports.findUser = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users where id = $1`, [id]);
  return rows[0];
};
