var express = require('express');
var router = express.Router();
const { userLogin, home, userSignup, register, loginSubmit ,logout} = require('../controllers/userController');
const { authUser } = require('../middlewares/authMiddleware')


/* GET home page. */
router.get('/',authUser, home); //home page
router.get('/login' ,userLogin); //to get login page
router.get('/signup',userSignup); //to get signup page
router.post('/submit',register); //when submitted signup
router.post('/login',loginSubmit) //when login submitted
router.get('/logout',logout); //to logout

module.exports = router;
