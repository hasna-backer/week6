var express = require('express');
var router = express.Router();

const { dashboard , login , loginSubmit,logout} = require('../controllers/adminController')


router.get('/', dashboard) 
router.get('/login',login)
router.post('/submit',loginSubmit)
router.get('/logout', logout)


module.exports = router;
