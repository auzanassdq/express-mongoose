const User = require("../models/user");
const objectId = require("mongodb").ObjectID;

module.exports = {
  getAllUser: (req, res) => {
    User.find().populate("addresses", "address").then(result => {
      res.send(result)
    });
  },

  addUser: (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, result) => {
      try {
        res.status(200).send(result)
      } catch (error) {
        res.status(400).send(user)
        console.log(err)
      }
    });
  },

  deleteUser: (req, res) => {
    User.deleteOne({ _id: objectId(req.body.id) }, 
    (err, result) => {
      try {
        res.status(200).send(result)
      } catch (error) {
        res.status(400).send(error)
        console.log(err)
      }
    });
  },

  updateTodo:  (req, res) => {
    User.updateOne(
      { 
        _id: {$eq: objectId(req.body.id)}
      },
      {
        $set: req.body
      },
      (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err);
      }
    })
    }

};
