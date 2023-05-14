const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const axios = require("axios");
const UserModel = require("./model/bloguser.model.js");
const { addNewUser } = require("./controller/user.controller.js");

app.use(cors());
const connectDb = require("./config/db.js");

const PORT = 3000;

// app.get('*', async (req, res, next) => {
//   await UserModel.watch.on('change' , data => console.log(new Date(), data));
//   next()
// })

app.get("/", (req, res) => {
  res.status(200).send("working");
});

const clientId = process.env.GIT_HUB_CLIENT_ID;
const clientSecret = process.env.GIT_HUB_CLIENT_SECRET;

app.get("/getAccessToken", async (req, res) => {
  const requestToken = req.query.code;
  try {
    let url = `https://github.com/login/oauth/access_token`;
    let response = await axios.post(
      url,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: requestToken,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token, token_type } = response.data;
    // return res.send(access_token)

    const userData = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    let essentialUserData = {
      name: userData.data.name,
      username: userData.data.login,
      image: userData.data.avatar_url,
    };
    addNewUser(essentialUserData).then(() => {
      res.send({ data: userData.data });
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// axios.get('/success', (req, res) => {
//   axios({
//     method: 'get',
//     url: `https://api.github.com/user`,
//     headers: {
//       Authorization: 'token ' + access_token
//     }
//   }).then((response) => {
//     return res.status(200).send(response.data)
//   })
// })

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server running ", PORT);
  });
});
