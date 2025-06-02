const express = require("express")
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const chatcontroller = require('../controllers/chat.controller')

router.get("/", verifyToken, (req, res) => {
    chatcontroller.getChats(req, res);
});
router.get("/:id", verifyToken, (req, res) => {
    chatcontroller.getChat(req, res);
});
router.post("/", verifyToken, (req, res) => {
    chatcontroller.addChat(req, res);
});
router.put("/read/:id", verifyToken, (req, res) => {
    chatcontroller.readChat(req, res);
});

module.exports = router;
