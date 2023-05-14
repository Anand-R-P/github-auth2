const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    image: {type: String}
},{collection: 'blogUser'})

const UserModel = mongoose.model('UserModel',userSchema);
module.exports = UserModel;