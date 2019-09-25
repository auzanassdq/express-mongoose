const Address = require('../models/address')
const User = require('../models/user')
const objectId = require("mongodb").ObjectID;

module.exports = {
  addAddress: async (req, res) => {
    // create address first to generate its _id
    const address = await Address.create({address: req.body.address})

    // then pass the address._id to user
    const user = await User.findOneAndUpdate(
      {_id: objectId(req.body.id)},
      {$push: {addresses: address._id}},
      {new : true}
    )

    res.status(200).send({
      message: "Created new address success",
      address,
      user
    })
  }
}