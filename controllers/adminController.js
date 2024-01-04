const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const bcrypt = require('bcrypt')


//render dashboard
let dashboard = async function (req, res, next) {
  let userData = await User.find({})
  console.log("user data:", userData);
  res.render('admin/dashboard', { title: 'Express', user: userData });
}

// get login page
let login = (req, res, next) => {
  const err = req.flash('error')[0]
  console.log("error: ", err)
  res.render('admin/login', { error: err })
}

//function for submit in login
let loginSubmit = async (req, res, next) => {
  const { email, pass } = req.body;
  const isExist = await Admin.findOne({ email: email })
  if (isExist == null) {
    req.flash('error', 'email is not registered');
    res.redirect('/admin/login')
  }
  else {
    const isPasswordMatch = await bcrypt.compare(pass, isExist.password)
    console.log('isPasswordMatch:', isPasswordMatch);
    if (isPasswordMatch) {
      delete isExist.password;
      res.redirect('/admin');
    }
    else {
      req.flash('error', 'wrong password');
      res.redirect('/admin/login')
    }
  }
}

//logout
let logout = (req, res, next) => {
  res.redirect('/admin/login');
}

//render add user page
let addUserGet = async (req, res, next) => {
  const err = req.flash('error')[0];
  // const users = User.find()

  res.render('admin/addUser', { error: err })
}

//submit add user
let addUserPost = async (req, res, next) => {
  const { username, email, pwd, phno } = req.body;
  const isExist = await User.findOne({ email: email });
  if (isExist == null) {

    let user = new User();
    user.name = username;
    user.email = email;
    user.password = await bcrypt.hash(pwd, 10);
    user.phone = phno;
    const newUser = await user.save()
    console.log("new user :", newUser)
    res.redirect('/admin')
  }
  else {
    req.flash('error', 'User already Exist!')
    res.redirect('/admin/add')
  }
}

module.exports = {
  dashboard,
  login,
  loginSubmit,
  logout,
  addUserGet,
  addUserPost
}