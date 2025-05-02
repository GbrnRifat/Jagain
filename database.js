const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jagain'
});

function checkLogin(identifier, password, callback) {
  const sql = `
    SELECT user_id FROM users
    WHERE (email = ? OR name = ?) AND password = ?
  `;
  pool.query(sql, [identifier, identifier, password], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      callback(null, true, results[0].user_id);
    } else {
      callback(null, false, null);
    }
  });
}

function registerUser(name, email, password, callback) {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  pool.query(query, [name, email, password], callback);
}

function getAllUsers(callback) {
  pool.query('SELECT * FROM users', callback);
}

module.exports = {
  checkLogin,
  registerUser,
  getAllUsers,
  query: (sql, params, callback) => pool.query(sql, params, callback),
};
