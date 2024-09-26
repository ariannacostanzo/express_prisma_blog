const jtw = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw new Error("token non fornito")
    }

    jtw.verify(token, process.env.JTW_SECRET_KEY, (err, data) => {
        if (err) throw new Error("token non valido")
        
        req.user = data;
        next();
    })
}