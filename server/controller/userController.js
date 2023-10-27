const userHandler = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretCode = "nextask";
const passwordSalt = 10;
 
//user login controller
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const isExists = await userHandler.isExists({ email });
  
      if (!isExists) {
        return res.status(401).json({ message: "Incorrect username or password."});
      }
  
      const valid = await bcrypt.compare(password, isExists.password);
      if (!valid) {
        return res.status(401).json({ message: "Incorrect username or password."});
      }

      const token = jwt.sign(
        { email: isExists.email, id: isExists.id },
        secretCode,
      );
      res.status(200).send({
  
        user: {
          email: isExists.email,
          firstName: isExists.first_name,
          userId: isExists.user_id
        },
        token,
      });
    } catch (e) {
      console.log(e.message);
      return res.status(500).send("internal server error");
    }

};

//user signup controller
const signUpHandler = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

  try {
    // check existing user
    const isExists = await userHandler.isExists({ email });

    if (isExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // make hash password
    let hashPassword = await bcrypt.hash(password, passwordSalt);

    // user creation
    const createUser = await userHandler.signupModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword
    });

    // token generate
    const token = jwt.sign(
      { email: createUser.email, userId: createUser.user_id, firstName: createUser.first_name },
      secretCode,
    );
    res.status(201).send({ user: createUser[0], token });
    
  } catch (e) {
    console.log(e.message);
    return res.status(500).send("internal server error");
  }
};
  
module.exports = { signUpHandler, loginHandler };