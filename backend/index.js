const express = require("express");
const cors = require("cors");
require("./db/config");

// const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const User = require("./db/User");
const Products = require("./db/Product");

// Set up Global configuration access
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "config.env" });

const jwtkey = process.env.JWT_SECRET_KEY;

/////session/////
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
console.log(MongoDBstore);
const store = new MongoDBstore({
  uri: "mongodb://localhost:27017/e-commerce",
  collection: "sessions",
});
app.use(
  session({
    secret: "my secret",
    resave: false,

    saveUninitialized: false,
    store: store,
  })
);
/////session/////

////cookies///
var cookieParser = require("cookie-parser");
app.use(cookieParser());
/////

app.post("/register", async (req, res) => {
  // let resultp = await User.findOne(JSON.parse(req.body.email));
  // console.log(resultp);
  let user = new User(req.body);
  let result = await user.save();

  result = result.toObject();
  delete result.password;
  if (result) {
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ msg: "something went wrong" });
      } else {
        res.send({ result, auth: token });
      }
    });
  } else {
    res.send({ msg: "something went wrong" });
  }
});
app.post("/login", async (req, res) => {
  let result = await User.findOne(req.body).select("-password");
  // req.session.isloggedIn = true;

  // res.setHeader("Set-Cookie", "loggiedIn=true");

  if (result) {
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ msg: "something went wrong" });
      } else {
        res.send({ result, auth: token });
        console.log(jwtkey);
      }
    });
    var randomNumber = Math.random().toString();
    res.cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true });
    req.session.userEmail = result.email;
  } else {
    res.send({ msg: "No result found" });
  }
});
app.post("/add-product", verifytoken, async (req, res) => {
  console.log(req.body);
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});
app.get("/products", verifytoken, async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products Found" });
  }
});

app.delete("/product/:id", verifytoken, async (req, res) => {
  let r = req.params.id;
  const result = await Products.deleteOne({ _id: r });
  res.send(result);
});
app.listen(5000);

app.get("/product/:id", verifytoken, async (req, res) => {
  let prod_id = req.params.id;
  let products = await Products.findOne({ _id: prod_id });
  if (products) {
    res.send(products);
  } else {
    res.send({ msg: "No result found" });
  }
});
app.put("/update/:id", verifytoken, async (req, res) => {
  let product = req.body;
  console.log(req.body);
  let result = await Products.updateOne(
    { _id: req.params.id },
    { $set: product }
  );
  res.send(result);
});

app.get("/search/:key", verifytoken, async (req, res) => {
  let result = await Products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  if (result) {
    res.send(result);
  } else {
    res.send({ msg: "No result found" });
  }
});
function verifytoken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ msg: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ msg: "Please provide valid token" });
  }
}

app.get("/setcookies", async (req, res) => {
  // res.setHeader("Set-Cookie", "newuser=true");
  // res.cookie("newuser", false, { maxAge: 1000 * 24, secure: true });

  res.cookie("newuser", false, { maxAge: 1000 * 24, httpOnly: true });
  res.send("setting cookies");
});

app.get("/readcookies", async (req, res) => {
  // res.setHeader("Set-Cookie", "newuser=true");
  // res.cookie("newuser", false, { maxAge: 1000 * 24, secure: true });

  const cookies = req.cookies;
  console.log(cookies.newuser);
});
