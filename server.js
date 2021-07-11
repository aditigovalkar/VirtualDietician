const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

//declare app
const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Sever is running...",
  })
);

const addUserInformation = async (userInfo) => {
  fs.writeFile("./src/components/Data/demo.json", userInfo, (err) => {
    console.log(userInfo);
    if (err) {
      console.log(err);
    } else {
      console.log("done adding user information...");
    }
  });
};

// Declare post / write route

app.post("/addInformation", async (req, res, next) => {
  //take the body from incoming req
  const requestContent = JSON.stringify(req.body);
  await addUserInformation(requestContent);
});

const addPatientDietList = async (dietList) => {
  fs.writeFile("./src/components/Data/dietlist.json", dietList, (err) => {
    console.log(dietList);
    if (err) {
      console.log(err);
    } else {
      console.log("done adding dietList information...");
    }
  });
};

// Declare post / write route

app.post("/addDietList", async (req, res, next) => {
  //take the body from incoming req
  const requestContent = JSON.stringify(req.body);
  await addPatientDietList(requestContent);
});

const addRegiteredUser = async (user) => {
  fs.writeFile("./src/components/Data/user.json", user, (err) => {
    console.log(user);
    if (err) {
      console.log(err);
    } else {
      console.log("done adding user...");
    }
  });
};

app.post("/addUser", async (req, res, next) => {
  const user = JSON.stringify(req.body);
  await addRegiteredUser(user);
});

app.use((req, res, next) =>
  res.status(404).send({
    message: "could not find requested route",
  })
);

app.listen(port, () => {
  console.log(
    `
        !!! Server is running
        !!! Listening to requests on port ${port}
        !!! http://localhost:5000
        `
  );
});
