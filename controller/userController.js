import UserModel from "../model/userModel.js"
import bcrypt from "bcrypt"

const userModel = new UserModel()

class UserController {
    async register(req, res) {
        try {
            if (req.body.password.length < 10) {
                return res.status(400).json({
                    message: "Password is too short"
                })
            }

            const userExists = await userModel.findOne("username", req.body.username)
            if (userExists) {
                return res.status(400).json({
                    message: "User already exists"
                })
            }

            const bcryptPass = await bcrypt.hash(req.body.password, 10)

            const registeredId = await userModel.create({
                username: req.body.username,
                password: bcryptPass,
                email: req.body.email
            }) 

            if (registeredId) {
                const userData = await userModel.findById(registeredId)

                req.session.user = {
                    username: userData.username,
                    id: userData.id
                }

                return res.status(201).json({
                    message: "Register success",
                    user_session: req.session.user
                })
            }
            else {
                return res.status(500).json({
                    message: "Failed to register user"
                })
            }
        } catch (error) {
            console.log(error)

            return res.status(500).json({
                message: "Failed to register user"
            })
        }
    }
}

export default UserController