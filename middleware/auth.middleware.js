const jwt = require("jsonwebtoken")

function authenticate(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret_key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.userId = decodedToken.userId;
      next();
    });
}

module.exports=authenticate;