const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const postcontroller = require('../controllers/postcontroller')

router.get("/posts", (req, res) => {
    postcontroller.getPosts(req, res);
});
router.get("/post/:id", (req, res) => {
    postcontroller.getPost(req, res);
});
router.post("/add",verify,(req, res) => {
    postcontroller.addPost(req, res);
});
router.put("/:id",verify, (req, res) => {
    postcontroller.updatePost(req, res);
});
router.delete("/:id",verify, (req, res) => {
    postcontroller.deletePost(req, res);
});

module.exports = router;  
