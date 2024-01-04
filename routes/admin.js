var express = require('express');
var router = express.Router();

const { dashboard , login , loginSubmit,logout , addUserGet ,addUserPost} = require('../controllers/adminController')


router.get('/', dashboard) 
router.get('/login',login)
router.post('/submit',loginSubmit)
router.get('/logout', logout) 
// user management
router.get('/add',addUserGet)
router.post('/addUser',addUserPost)



module.exports = router;
