const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { User } = require("./app/models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  await User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/find/:id", async (req, res) => {
  await User.findAll({ where: { id: req.params.id } })
    .then((findUser) => {
      res.json(findUser);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/findall", async (req, res) => {
  await User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.put("/update/:id", async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
  };

  await User.update(data, { where: { id: req.params.id } })
    .then((updateUser) => {
      res.json(updateUser);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.delete("/delete/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } })
    .then((deleteUser) => {
      res.json(deleteUser);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(3000);
