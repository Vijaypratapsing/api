const express = require('express');
const route = express.Router();// create router object
const authcontroller = require('../controllers/auth.controller')

route.post('/register', (req, res) => {
    authcontroller.register(req, res);
})
route.post('/login', (req, res) => {
    authcontroller.login(req, res);
})
route.post('/logout', (req, res) => {
    authcontroller.logout(req, res);
})
module.exports = route;