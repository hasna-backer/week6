const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')

// const new_admin = new Admin({
//   name: 'admin',
//   email:'admin@gmail.com',
//   password: 123
// });

let dashboard = function (req, res, next) {
  res.render('admin/dashboard', { title: 'Express' });
}

let login = (req, res, next) => {
  console.log("hiiii")

  const err = req.flash('error')[0]
  console.log("error: ", err)
  res.render('admin/login', { error: err })
}


let loginSubmit = async (req, res, next) => {
  console.log("hiiii")
  const { email, pass } = req.body;
  const isExist = await Admin.findOne({ email: email })
  console.log("isexist :", isExist)
  if (isExist == null) {
    req.flash('error', 'email is not registered');
    res.redirect('/admin/login')
  }
  else {
    res.render('admin/dashboard', { title: 'Express' });
  }
}

let logout = (req, res, next) => {
  res.redirect('/admin/login');
}



module.exports = {
  dashboard,
  login,
  loginSubmit,
  logout
}