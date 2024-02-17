const usersModels = require("../models/users.models");

exports.createUser = async (req,res,next) => {
  try {
    const { email, username, description, phone, role, firstName, lastName } = req.body;
    const user = usersModels({
      email,
      username, 
      description,
      phone, 
      role, 
      first_name: firstName,
      last_name: lastName
    })
    const userAdded = await usersModels.create(user);
    res.send(userAdded)
  } catch(err) {
    next(err);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await usersModels.find({}).select('username email description');
    res.send(users);
  } catch(err) {
    next(err);
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersModels.findById(id);
    res.send(user);
  } catch(err) {
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { deletedCount } = await usersModels.deleteOne({_id: id});
    if(deletedCount>0) res.send({data: "deleted successfully!"})
    res.status(400).json({message: "Could not delete, please try again"})
  } catch(err) {
    next(err);
  }
}