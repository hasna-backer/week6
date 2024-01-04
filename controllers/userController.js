const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// get login page
let userLogin = function (req, res, next) {
  const err = req.flash('error')[0]
  if (req.session.user && req.session.user.isLoggedin) {
    res.redirect('/')
  } else {

    res.render('login', { title: 'Express', error: err });
  }
}
//function for submit in login
let loginSubmit = async (req, res, next) => {
  const { email, pass } = req.body;
  const isExist = await User.findOne({ email: email })

  if (isExist == null) {
    console.log("is exist", isExist)

    req.flash('error', 'email is not registered');
    res.redirect('/login')
  }
  else {
    const isPasswordMatch = await bcrypt.compare(pass, isExist.password)
    if (isPasswordMatch) {
      delete isExist.password;
      req.session.user = { user: isExist, isLoggedin: true }
      console.log("is exist", isExist)
      res.render('home', { title: 'Express' });

    } else {

      req.flash('error', 'Wrong password')
      res.redirect('/login')
    }
  }

}
// home page
let home = function (req, res, next) {
  res.render('home', { title: 'Express' });
}

//render signup page
let userSignup = function (req, res, next) {
  const err = req.flash('error')[0]
  res.render('signup', { title: 'Express', error: err });
}

//function for submit in signup page
let register = async (req, res, next) => {
  const { name, email, pass, phone } = req.body
  const isExist = await User.findOne({ email: email })
  // console.log('is exist : ', isExist)
  if (isExist == null) {
    let user = new User();
    user.email = email
    user.password = await bcrypt.hash(pass, 10);
    user.name = name
    user.phone = phone
    const newUser = await user.save();
    console.log("new user:", newUser)
    if (newUser) {
      res.redirect('/login')
    }
  }
  else {
    console.log('flash triggered')
    req.flash('error', 'Email already exist!')
    res.redirect('/signup')

  }
}

//logout
const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}


module.exports = {
  userLogin,
  home,
  userSignup,
  register,
  loginSubmit,
  logout
}