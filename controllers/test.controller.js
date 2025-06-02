const jwt=require('jsonwebtoken');

const shouldBeLoggedIn = async (req, res) => {
    res.status(200).send({ message: "You are Authenticated" });
};

const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).send({ message: "Not Authenticated!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).send({ message: "Token is not Valid!" });
        if (!payload.isAdmin) {
            return res.status(403).send({ message: "Not authorized!" });
        }
    });  //jwt.verify(token, secret, callback);

    res.status(200).send({ message: "You are Authenticated" });
}

module.exports = {

    shouldBeAdmin,
    shouldBeLoggedIn
}