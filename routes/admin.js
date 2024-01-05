var express = require('express');
var router = express.Router();

const { dashboard , login , loginSubmit,logout , addUserGet ,addUserPost,updateUserSubmit,updateUserRender,bannUser} = require('../controllers/adminController')


router.get('/', dashboard) 
router.get('/login',login)
router.post('/submit',loginSubmit)
router.get('/logout', logout) 
// user management
router.get('/add',addUserGet)
router.post('/addUser',addUserPost)
router.get('/updateUser/:id',updateUserRender)
router.post('/updateUser/:id',updateUserSubmit)
router.get('/delete/:id',bannUser)



module.exports = router;
