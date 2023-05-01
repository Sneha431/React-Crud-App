const express = require("express");
const cors = require("cors");
require("./db/config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

const User = require("./db/User");
const Products = require("./db/Product");
const Cartdata = require("./db/Cartdata");
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
    resave: true,

    saveUninitialized: true,
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

  let resultemail = await User.findOne({ email: req.body.email });
  if (resultemail) {
    res.send({ msg: "Email ID already exists" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const passwordupdated = await bcrypt.hash(req.body.password, salt);
    let updated_body = {
      name: req.body.name,
      email: req.body.email,
      password: passwordupdated,
      role: "user",
    };
    let user = new User(updated_body);
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
  }
});

app.post("/login", async (req, res) => {
  let resultemail = await User.find({ email: req.body.email });

  let valuesArray = Object.values(resultemail);

  if (valuesArray.length) {
    for (let value of valuesArray) {
      const data = value.password;

      bcrypt.compare(req.body.password, data).then(function (result) {
        let userId = value._id;
        let username = value.name;
        let role = value.role;

        console.log("result" + result);
        if (result) {
          let updated_result = {
            id: userId,
            name: username,
            email: value.email,

            role: value.role,
          };
          jwt.sign(
            { updated_result },
            jwtkey,
            { expiresIn: "2h" },
            (err, token) => {
              if (err) {
                res.send({ msg: "something went wrong" });
              } else {
                res.send({
                  result,
                  auth: token,
                });

                // res.cookie("id", result._id, { maxAge: 1000 * 24, httpOnly: true });
                // res.setHeader("Set-Cookie", result._id);
              }
            }
          );
        } else {
          res.send({ msg: "something went wrong" });
        }
      });
    }
  } else {
    res.send({ msg: "something went wrong" });
  }

  //  ["The name is Balaji", "The age is 23"]
  // let result = bcrypt.compareSync(req.body.password, hash);
  // console.log(result)
  // if (result) {
  //   jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
  //     if (err) {
  //       res.send({ msg: "something went wrong" });
  //     } else {
  //       res.send({ result, auth: token });

  //       // res.cookie("id", result._id, { maxAge: 1000 * 24, httpOnly: true });
  //       // res.setHeader("Set-Cookie", result._id);
  //     }
  //   });
  // var randomNumber = Math.random().toString();
  // res.cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true });
  // req.session.userid = result._id.valueOf();
  // req.session.userEmail = result.email;
  // } else {
  //   res.send({ msg: "No result found" });
  // }
});

app.put("/forgetpassword", async (req, res) => {
  let result = await User.findOne({ email: req.body.email });
  if (result) {
    bcrypt
      .compare(req.body.password, result.password)
      .then(async function (resultdata) {
        const salt = await bcrypt.genSalt(10);
        const passwordupdated = await bcrypt.hash(req.body.newpassword, salt);
        let updatedpass = {
          password: passwordupdated,
        };

        if (resultdata) {
          let resultupdated = await User.updateOne(
            { email: req.body.email, password: result.password },
            { $set: updatedpass }
          );
          console.log(resultupdated);
          if (resultupdated.modifiedCount === 1) {
            res.send({ acknowledged: resultupdated.acknowledged });
          } else {
            res.send({ acknowledged: resultupdated.acknowledged });
          }
        } else {
          res.send({ acknowledged: false });
        }
      });
  } else {
    res.send({ acknowledged: false });
  }
});

app.post("/add-product", verifytoken, async (req, res) => {
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});
// app.get("/products", verifytoken, async (req, res) => {
//   let products = await Products.find();

//   if (products.length > 0) {
//     res.send(products);
//   } else {
//     res.send({ result: "No Products Found" });
//   }
// });

app.get("/products/:userid", verifytoken, async (req, res) => {
  let userId = req.params.userid;
  console.log(userId);
  let products = await Products.find({ userId: userId });
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
  // console.log(req.body);
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

/////for outside public///
app.get("/allproduct", async (req, res) => {
  let products = await Products.find();
  if (products) {
    res.send(products);
  } else {
    res.send({ msg: "No result found" });
  }
});

app.get("/sendmail", async (req, res) => {
  //   let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "carlotta82@ethereal.email",
      pass: "JSrPfwrBqp6kZF8H1y",
    },
  });
  let info = await transporter.sendMail({
    from: '"Sneha Goswami" <snehagoswami431@gmail.com>', // sender address
    to: "snehagoswami431@gmail.com", // list of receivers
    subject: "Hello Nodemailer", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  res.json(info);
});

////cart////
app.post("/addtocart", verifytoken, async (req, res) => {
  let resultemail = await Cartdata.findOne({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    company: req.body.company,
  });

  if (!resultemail) {
    let cartdata = new Cartdata(req.body);
    let result = await cartdata.save();
    res.send(result);
  } else {
    res.send({ msg: "Item already added in the cart" });
  }
});
app.get("/getcartdata/:userid", verifytoken, async (req, res) => {
  let userId = req.params.userid;
  console.log(userId);
  let cartdata = await Cartdata.find({ userId: userId });
  if (cartdata.length > 0) {
    res.send(cartdata);
  } else {
    res.send({ result: "No Products Found" });
  }
});
