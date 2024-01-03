const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// let new_admin =  new admin();
//     user.email = 'admin@gmail.com'
//     user.password =  bcrypt.hash(123, 10);
//     user.name = 'admin'
//     const adminn =  user.save();
//     console.log("new admin:", adminn)



   
module.exports = mongoose.model('admin', adminSchema);

