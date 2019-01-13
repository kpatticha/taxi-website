import User from '../models/User';

const userController = {};

userController.list = function(req, res) {
  User.find({}).exec(
    function (err, users) {
      if (err) {
        console.error('Error:', err);
      }
      else {
        res.send(users);
      }
    });
};

userController.show = function(req, res) {
  const userId = req.params._id;

  if (typeof userId === 'undefined') {
    return 'throw an error, id is undefined';
  }

  User.findById(
    userId, 
    function (err, user) {
      if (err) return res.json(err);
      res.send(user); 
    });
};

userController.create = function(req, res) {
  const user = new User(req.body);

  user.save(function(err, user) {
    if (err) return res.json(err);
    res.send(`User ${user.firstName} successfully created!`);
  });
};

userController.delete = function(req, res) {
  const userId = req.params._id;

  User.findByIdAndDelete(
    userId, 
    function(err, user) {
      if (err) return res.json(err);
      res.json(user);
    });
};

userController.update = function(req, res) {
  const options = {
    new: true,
    runValidators: true
  };

  // sanitize req.query
  User.findByIdAndUpdate(
    req.params._id, 
    req.query, 
    options, 
    function(err, user) {
      if (err) return res.json(err);
      res.json(user);
    });
};

module.exports = userController;
