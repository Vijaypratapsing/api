const express=require("express")
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const msgcontroller = require('../controllers/msg.controller')

router.post("/:chatId", verifyToken, (req, res) => {
msgcontroller.addMessage(req, res);
});

module.exports =router;
