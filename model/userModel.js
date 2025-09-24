import BaseSqlModel from "./base.js";

class UserModel extends BaseSqlModel {
    constructor() {
        super("user")
    }
}

export default UserModel