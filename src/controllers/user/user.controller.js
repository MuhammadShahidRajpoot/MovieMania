const jwt = require("jsonwebtoken");
const { SECRET_FOR_JWT } = require("../../config/config");
const bcrypt = require("bcrypt");
const Users = require("../../models/user");
const { Op } = require('sequelize');
const {
  validateRegisterUser, validateLoginUser, validateUpdateUser,
} = require("../../validator/user.validator");
const { resSuccess, resError } = require("../../utils/response");
const SuccessConstants = require("../../constants/success.constant");
const ErrorConstants = require("../../constants/errors.constant");

async function registerUser(req, res) {
  try {
    console.log("req.body", req.body);
    const valid = await validateRegisterUser(req.body);
    if (valid.status) {
      return res.status(409).send(resError(valid.error, 409));
    }
    const userDataWithEmail = await Users.findOne({
      where: {
        email: req.body.email,
      },
      attributes: { exclude: ["password"] },
    });

    const userDataWithUserName = await Users.findOne({
      where: {
        user_name: req.body.user_name,
      },
      attributes: { exclude: ["password"] },
    });
    if (userDataWithEmail) {
      return res
        .status(409)
        .send(resError(ErrorConstants.USER_WITH_EMAIL_ALREADY_EXISTS, 409));
    }
    if (userDataWithUserName) {
      return res
        .status(409)
        .send(resError(ErrorConstants.USER_WITH_USER_NAME_ALREADY_EXISTS, 409));
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const addUser = await Users.create(req.body);
    if (addUser) {
      return res.send(resSuccess(SuccessConstants.USER_CREATED, 200, {}));
    } else {
      return res.status(500).send(resError(ErrorConstants.ERROR, 500));
    }
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send(resError(err.message, 500));
  }
}

async function users(req, res) {
  try {
    const valid = await validateUpdateUser(req.body);
    if (valid.status) {
      return res.status(409).send(resError(valid.error, 409));
    }
    if(!req.query.id){
    const users = await Users.findAll();
    return res.send(resSuccess(SuccessConstants.USER_RETRIEVED, 200, users));
    }
    const user = await Users.findByPk(req.query.id);
    if (!user) {
      return res.status(404).send(resError("User not found", 404));
    }
    if (user) {
      return res.send(resSuccess(SuccessConstants.USER_RETRIEVED, 200, user));
    } else {
      return res.status(500).send(resError(ErrorConstants.ERROR, 500));
    }

  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send(resError(err.message, 500));
  }
}

async function updateUser(req, res) {
  try {
    const valid = await validateUpdateUser(req.body);
    if (valid.status) {
      return res.status(409).send(resError(valid.error, 409));
    }
    if(!req.query.id){
      return res.status(409).send(resError(ErrorConstants.MOVIE_ID_REQUIRED, 409));
    }
    const user = await Users.findByPk(req.query.id);
    if (!user) {
      return res.status(404).send(resError("User not found", 404));
    }
    const userDataWithEmail = await Users.findOne({
      where: {
        email: req.body.email,
        id: { [Op.ne]: req.query.id } 
      },
      attributes: { exclude: ["password"] },
    });

    const userDataWithUserName = await Users.findOne({
      where: {
        user_name: req.body.user_name,
        id: { [Op.ne]: req.query.id } 
      },
      attributes: { exclude: ["password"] },
    });
    if (userDataWithEmail) {
      return res
        .status(409)
        .send(resError(ErrorConstants.USER_WITH_EMAIL_ALREADY_EXISTS, 409));
    }
    if (userDataWithUserName) {
      return res
        .status(409)
        .send(resError(ErrorConstants.USER_WITH_USER_NAME_ALREADY_EXISTS, 409));
    }
    const addUser = await user.update(req.body);
    if (addUser) {
      return res.send(resSuccess(SuccessConstants.USER_UPDATED, 200, {}));
    } else {
      return res.status(500).send(resError(ErrorConstants.ERROR, 500));
    }


  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send(resError(err.message, 500));
  }
}

async function loginUser(req, res) {
  try {
    const valid = await validateLoginUser(req.body);

    if (valid.status) {
      return res.status(409).send(resError(valid.error, 409));
    }
    let userData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userData) {
      const comparedPassword = await bcrypt.compare(
        req.body.password,
        userData?.password
      );
      if (comparedPassword) {
        const encryption = {
          id: userData?.id,
          email: userData?.email,
        };
        const token = jwt.sign(
          {
            user: encryption,
          },
          SECRET_FOR_JWT,
          { expiresIn: "1d" }
        );

          return res.send(
            resSuccess(SuccessConstants.USER_LOGGED_IN, 200, token)
          )
      } else {
        return res
          .status(409)
          .send(resError(ErrorConstants.USER_PASSWORD_DOESNT_MATCHED, 409));
      }
    } else {
      return res.status(409).send(resError(ErrorConstants.USER_NOT_EXIST, 409));
    }
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send(resError(err.message, 500));
  }
}

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  users
};
