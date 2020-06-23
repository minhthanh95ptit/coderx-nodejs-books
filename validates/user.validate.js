module.exports.postCreate = function (req, res, next) {
  var errors = [];
  if (req.body.name.length > 30) {
    errors.push('Name > 30 chars')
  }
  if (!req.body.phone) {
    errors.push('Phone is required!')
  }
  if (!req.body.address) {
    errors.push('Address is required!')
  }

  if (errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
}