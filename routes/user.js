import express from "express"
import UserController from "../controller/userController.js"

const userRouter = express.Router()
const userController = new UserController()

userRouter.post("/user/register", (req, res) => userController.register(req, res))
userRouter.post("/user/login", (req, res) => userController.login(req, res))

export default userRouter