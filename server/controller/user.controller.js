
const UserModel = require('../model/bloguser.model.js');
const addNewUser = async (userData) => {
    console.log('new0,0,', userData)
    const newUserData = UserModel.create(userData);
    console.log("user added");
    return newUserData;   
}

module.exports = {addNewUser}