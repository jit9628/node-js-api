const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = `INSERT INTO users (name, email, password, address, profile_image, role) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [userData.name, userData.email, userData.password, userData.address, userData.profile_image, userData.role];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },

  updateById: (id, userData, callback) => {
    const query = `UPDATE users SET name = ?, email = ?, password = ?, address = ?, profile_image = ?, role = ? WHERE id = ?`;
    const values = [userData.name, userData.email, userData.password, userData.address, userData.profile_image, userData.role, id];
    db.query(query, values, callback);
  },

  deleteById: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
