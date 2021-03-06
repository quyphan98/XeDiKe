const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { token } = req.headers;
  console.log(token);

  jwt.verify(token, "XEDIKE", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    if (decoded)
     {
         req.user = decoded;
        return next();
     }
  });
};

const authorize = userTypeArr => {
  return (req, res, next) => {
      console.log(userTypeArr);
      
    // if(userType === req.user.userType)
    if (userTypeArr.findIndex( userType => userType === req.user.userType) !== -1)
      return next();
    res.status(403).json({ message: "Logged in,but do not have permission" });
  };
};

module.exports = {authenticate,authorize}