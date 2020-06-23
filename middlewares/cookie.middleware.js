const db = require("../db.js");
const shortid = require("shortid");

module.exports = (req, res, next) => {
  if (!req.cookies.cookieId) { // chua ton tai cookieId
    var cookieId = shortid.generate();

    res.cookie("cookieId", cookieId);
    db.get('cookies')
      .push({ id: cookieId, count: 0 })
      .write()
  }
  else { // Da ton tai cookieId
    var count = db
      .get('cookies')
      .find({ id: req.cookies.cookieId })
      .value().count;

    count += 1;

    console.log({ cookie: count })

    db.get('cookies')
      .find({ id: req.cookies.cookieId })
      .assign({ count: count })
      .write();
  }
  next();
}