const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const bcrypt = require('bcrypt')


//render dashboard
let dashboard = async function (req, res, next) {
  let userData = await User.find({ isBanned: { $ne: true } })
  // console.log("user data:", userData);
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

const updateUserRender = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    const err = req.flash('error')[0]
    res.render('admin/updateUser', { user, error: err })
  } catch (error) {
    console.log(error)
  }
}

const updateUserSubmit = async (req, res, next) => {
  // console.log("update user submit reached")
  try {
    const { username, email, phno } = req.body;
    const userId = req.params.id;
    const isExist = await User.findOne({ email: email, _id: { $ne: userId } })
    if (isExist == null) {

      // Update the existing user
      const updatedUser = await User.updateOne(
        { _id: userId }, { $set: { name: username, email: email, phone: phno } });
      res.redirect('/admin')
      console.log("hiiiiii if not exist")

    }
    else {
      console.log("User already Exist")
      req.flash('error', 'User already Exist!')
      res.redirect(`/admin/updateUser/${userId}`)
    }
  } catch (error) {
    console.log(error)
  }
}

const bannUser = async (req, res, next) => {

  const bann = await User.updateOne(
    { _id: req.params.id },
    { $set: { isBanned: true } });
  const banned = await User.findOne({ _id: req.params.id })
  console.log("banned:", banned)
  res.redirect('/admin')
}

const search = async (req, res, next) => { 
  try {
    const {searchTerm} = req.body;
    const searchResult = await User.find({ isBanned: { $ne: true } ,
      $or:[
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { email: { $regex: new RegExp(searchTerm, 'i') } }
      ]
    })
    console.log("search result:", searchResult)
    res.render('admin/dashboard', { user: searchResult })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  dashboard,
  login,
  loginSubmit,
  logout,
  addUserGet,
  addUserPost,
  updateUserRender,
  updateUserSubmit,
  bannUser,
  search
}