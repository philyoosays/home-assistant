module.exports = {

  handleUserLogin(req, res, next) {
    res.json({ token: res.locals.token })
  },

  sendJSON(req,res) {
    res.json(res.locals);
  },

}
