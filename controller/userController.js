import UserModel from "../model/userModel.js"
import bcrypt from "bcrypt"

const userModel = new UserModel()

class UserController {
    async register(req, res) {
        const bcryptPass = bcrypt.hash(req.body.password, 10)

        const registeredId = userModel.create({
            username: req.params.username,
            password: bcryptPass,
            email: req.params.email
        }) 

        if (registeredId) {
            const userData = userModel.findById(registeredId)

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
    }
}

export default UserController