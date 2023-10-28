const jwt = require("jsonwebtoken");
const secretCode = "nextask";

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // console.log(token);
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, secretCode);
      req.user_id = user.id;
      next();
    } else {
      return res.status(401).send("Unauthorized!");
    }
  } catch (e) {
    console.log(e.message);
    return res.status(401).send("Unauthorized");
  }
 
};

module.exports = auth;