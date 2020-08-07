const User = require("../Model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function register(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
      bcrypt
        .hash(req.body.password, saltRounds)
        .then((hash) => {
          if (!hash) {
            return res
              .status(400)
              .json({ success: false, message: "Hash not generated" });
          }
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            contact_no: req.body.contact_no,
          });
          user
            .save()
            .then(() => {
              const token = generateToken(user, res);
              return res.status(200).json({
                success: true,
                message: `${user.name} Registered`,
                token: token,
              });
            })
            .catch((err) => {
              return res
                .status(400)
                .json({ success: false, message: err.message });
            });
        })
        .catch((err) => {
          return res.status(400).json({ success: false, message: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err.message });
    });
}

module.exports = { register };
