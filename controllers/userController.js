const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register_POST = (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  User.findOne({ username: username }, (err, user) => {
    if (err) console.log(err);
    if (user)
      return res.json({ msg: 'User with this username already exists' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) console.log(err);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      }).save((err, user) => {
        if (err) console.log(err);

        res.status(200).json({
          user: {
            id: user.id,
            username: user.username,
          },
        });
      });
    });
  });
};
