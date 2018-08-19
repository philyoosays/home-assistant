const db = require('../db/dbConfig')

module.exports = {

  findOneUser(username) {
    return db.any(`
      SELECT *
      FROM users
      WHERE username = $1
      AND active = true
      `, username);
  },

  addUser(data) {
    return db.none(`
      INSERT INTO users
      (fname, lname, username, email, pass_digest, account_type)
      VALUES
      ($/fname/, $/lname/, $/username/, $/email/, $/pass_digest/, $/role/)
      `, data);
  },

}
