const { UserModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ email, password, phone, salt }) {
    try {
      const user = new UserModel({
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  

  async FindUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUserById({ id }) {
    try {
      const existingUser = await UserModel.findById(id)

      return existingUser;

    } catch (err) {
      throw new APIError("API Error",STATUS_CODES.INTERNAL_ERROR,"Unable to Find User"
      );
    }
  }

  


  

}

module.exports = UserRepository;
