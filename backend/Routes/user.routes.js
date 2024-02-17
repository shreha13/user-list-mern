const { Router } = require("express");
const { getUsers, createUser, getUserById, deleteUser } = require("../controllers/users.controller");
const { validateUser } = require("../middleware/validateUser");

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", validateUser, createUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser)

module.exports = userRouter;