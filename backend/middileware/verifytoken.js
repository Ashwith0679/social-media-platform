require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Correct way to access the Authorization header
  //const bearerToken = req.body.headers.Authorization;
  const bearerToken = req.headers['authorization'];
  // If bearerToken not found
  if (!bearerToken) {
    return res.status(401).send({ message: "Please login" });
  }

  // If bearerToken is found
  const token = bearerToken.split(' ')[1]; // Extract the token from the "Bearer <token>" string

  // console.log(token); // Debugging line to check the token

  try {
    // Verify the token using the secret key
    jwt.verify(token, process.env.SECRET_KEY); 
    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    // Handle token verification errors
    return res.status(403).send({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
