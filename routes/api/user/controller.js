const express = require("express");
const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {validatePostInput} = require('../../../validations/validatePostInput')



//desc:danh sach user
//route :GET   {host}/api/users
//access:PUBLIC
module.exports.getUsers = (req, res, nex) => {
  //middke ware
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.json(err));
};

module.exports.createUser = async (req, res, next) => {
  const {isValid,errors} = await validatePostInput(req.body)

  if(!isValid) return res.status(400).json(errors)
  const { email, password, DOB, userType, phone } = req.body;
  //hash password
  const newUser = new User({
    email,
    password,
    DOB,
    userType,
    phone
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err);
      newUser.password = hash;

      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => res.json(err));
    });
  });
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "id invalid" });

  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status).json({ err: err.message });
    });
};

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });

      // const { email, password, DOB, userType, phone } = req.body;
      // user.email = email;
      // user.password = password;
      // user.DOB = DOB;
      // user.userType = userType;
      // user.phone = phone;

      //users[key] = req.body[key]
      Object.keys(req.body) //=> ['email', 'password', 'DOB', 'userType', 'phone']
        .forEach(field => {
          user[field] = req.body[field];
        });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.json(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return res.json(err);
          user.password = hash;

          user.save().then(user => {
            res.status(200).json(user);
          });
        });
      });
    })

    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User Not Found" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Womg Passwordr" });

        const payload = {
          email: user.email,
          userType: user.userType,
          id: user._id
        };

        jwt.sign(payload, "XEDIKE", { expiresIn: 3600 }, (err, token) => {
          if (err) res.json(err);
          res.status(200).json({ success: true, token }), token;
        });
      });
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(res.status).json({ message: err.message });
    });
};

// module.exports.uploadAvatar = (req, res, next) => {
//   const { id } = req.params; //
//   User.findById(id)
//     .then(user => {
//       if (!user)
//         return Promise.reject({ status: 404, message: "User not found" });

//       user.avatar = req.file.path;
//       return user.save();
//     })
//     .then(user => {
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       if (!err.status) return res.json(err);
//       res.status(200).json({ message: err.message });
//     });
// };