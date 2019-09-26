const objectId = require("mongodb").ObjectID;

const User = require("../models/user"); 
const UserImage = require("../models/userImage")

module.exports = {
  getAllUser: (req, res) => {
    User.find().populate("addresses", "address").then(result => {
      res.send(result)
    });
  },

  addUser: async (req, res) => {
    try {
      const user = await User.create(req.body);

      const userAvatar = await UserImage.create({
        filename: req.files[0].filename,
        path: req.files[0].path
      })

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { avatar: userAvatar._id} },
        { new: true}
      )

      res.status(200).send({
        message: "user created",
        user,
        userAvatar
      })

    } catch (error) {
      res.status(400).send({
        message: "user failed to create",
        error: error.message
      })
    }
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
    },

    uploadImage:  (req, res) => {
      UserImage.create({
        filename: req.files[0].filename,
        path: req.files[0].path
      })
      .then(result => res.send(result))
      .catch(error => res.send(error))
    }

};