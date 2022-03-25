const jwt = require('jsonwebtoken');
const JWT_SECRET = "sm$clg@va";


const fetchUser = (req, res, next) => {
    //Get The user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (token == null) {
        return res.status(401).json({ error: "Please authenicate using email & password" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(400).json({ error: "auth token is not valid" })
    }

}

module.exports = fetchUser;