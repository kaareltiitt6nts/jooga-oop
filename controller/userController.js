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
                message: "Internal server error"
            })
        }
    }

    async login(req, res) {
        try {
            const username = req.body.username
            const password = req.body.password

            const userData = await userModel.findOne("username", username)
            if (!userData) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const passwordHash = userData.password
            const bcryptComparison = await bcrypt.compare(password, passwordHash)

            if (bcryptComparison) {
                req.session.user = {
                    username: userData.username,
                    id: userData.id
                }

                return res.status(200).json({
                    message: "Login success",
                    user_session: req.session.user
                })
            }
            else {
                return res.status(401).json({
                    message: "Password is wrong"
                })
            }
        } catch (error) {
            console.log(error)

            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

export default UserController