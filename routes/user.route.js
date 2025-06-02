const express = require('express');
const router = express.Router();// create router object
const usercontroller = require('../controllers/usercontroller')
const verifyToken = require('../middleware/verifyToken');

router.get('/', (req, res) => {
    usercontroller.getUsers(req, res);
})
router.get("/search/:id", verifyToken, (req, res) => {
    usercontroller.getUser(req, res);
});
router.put("/:id", verifyToken,(req, res) => {
    usercontroller.updateUser(req, res);
});
router.delete("/:id", verifyToken, (req, res) => {
    usercontroller.deleteUser(req, res);
});
 router.post("/save", verifyToken, (req, res) => {
    usercontroller.savePost(req, res);
});
 router.get("/profilePosts", verifyToken, (req, res) => {
    usercontroller.profilePosts(req, res);
});
router.get("/notification", verifyToken,  (req, res) => {
    usercontroller.getNotificationNumber(req, res);
});

module.exports=router;