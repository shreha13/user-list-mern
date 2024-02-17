const usersModels = require("../models/users.models");

exports.validateUser = async (req, res, next) => {
  try {
    const { username, email, phone } = req.body;
    let query =  [
        { username: username },
        { email: email },
      ]
    if(phone) {
      query.push({phone: phone})
    }
    const user = await usersModels.find({$or: query});

    if(user.length > 0) {
      return res.status(400).json({message: "Not a unique user"})
    }
    next();
  } catch(err) {
    res.status(400).send(err?.response?.message);
  }
}