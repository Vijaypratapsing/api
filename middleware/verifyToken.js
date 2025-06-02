const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ success: false, message: "Not Authenticated!" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).send({ success: false, message: "Token is not valid!" });
        req.userId = payload.id;
        next();
    });
}

module.exports = verifyToken;
