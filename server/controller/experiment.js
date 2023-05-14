const UserModel = require("../model/bloguser.model");
const connectDb = require("../config/db.js");

let arr = [
  { name: "Abcd", username: "xyz", image: "noimg" },
  { name: "Abcd", username: "xyz", image: "noimg" },
];

const addNewdata = async () => {
  let resp = await UserModel.create({
    name: "superman",
    username: "xyz",
    image: "noimg",
  });
  console.log(resp);
};

let books = [
    { name: "sapience", username: "xyz", image: "noimg" },
    { name: "rich", username: "xyz", image: "noimg" },
  ];


const cbMethod = async () => {
    let bookdata = await UserModel.insertMany(books)
    console.log(bookdata)
}   


connectDb().then(() => {
//   addNewdata();
    cbMethod()
});
