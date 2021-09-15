const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// Verfie le token afin d'autoriser certain acces par exemple on peut creer un role administrateur et/ou un moderateur 
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;
