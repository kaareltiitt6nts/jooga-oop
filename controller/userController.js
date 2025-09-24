import UserModel from "../model/userModel.js"
import bcrypt from "bcrypt"

const userModel = new UserModel()

class UserController {
    async register(req, res) {
        try {
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

                res.json({
                    message: "Register success",
                    user_session: req.session.user
                })
            }
            else {
                res.json({
                    message: "Failed to register user"
                })
            }
        } catch (error) {
            console.log(error)

            res.json({
                message: "Failed to register user"
            })
        }
    }
}

export default UserController