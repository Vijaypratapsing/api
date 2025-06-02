const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken'); // OR add .js
const testController = require('../controllers/test.controller');

router.get("/should-be-logged-in", verify, (req, res) => {
    testController.shouldBeLoggedIn(req, res);
});

router.get("/should-be-admin", (req, res) => {
    testController.shouldBeAdmin(req, res);
});

module.exports = router;
