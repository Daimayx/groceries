const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const Grocery = require("./grocery");
const Cart = require("./cart");
const Order = require("./order");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const fs = require("fs");
const cart = require("./cart");

// connecting to mongodb
mongoose.connect(
  "mongodb://localhost:27017/groceries",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
  },
  function () {
    console.log("Mongoose Is Connected");
  }
);

// creating multer to handle multipart file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/groceries");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/register", (req, res) => {
  console.log("new user");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) throw err("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.send("error");
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ username: user.username });
        console.log(req.user);
      });
    } else {
      res.status = 401;
      res.send("Invalid username or password");
    }
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.get("/user", (req, res) => {
  if (req.user)
    User.findOne({ username: req.user.username }, function (err, user) {
      res.send({ user: { username: user.username, role: user.role } });
    });
  else res.send({});
});

// uploading a new grocery
app.post("/grocery", upload.single("img"), (req, res) => {
  if (req.user == null) {
    res.status(405);
    res.send("Login first");
    return;
  }
  console.log(req);

  const grocery = new Grocery({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    quantity: req.body.quantity,
    price: req.body.price,
    picture: "http://localhost:4000/grocery_pic/" + req.file.filename,
  });

  grocery.save().then(() => {
    res.status = 200;
    res.send("Success");
  });
});

app.use("/", (req, res, next) => {
  console.log(req.body);
  next();
});

app.post("/addtocart", (req, res) => {
  Cart.findOne({ username: req.user.username }).then((data) => {
    let cart = data;
    if (!data) {
      cart = new Cart({
        username: req.user.username,
        cart: [],
      });
    }
    cart.cart.push(req.body.grocery.id);
    cart.save().then((data) => {
      res.send("success");
    });
  });
});

app.get("/cart", (req, res) => {
  if(req.user){
    Cart.findOne({ username: req.user.username }).populate('cart')
    .exec((err, data) => {
      if(!err){
        res.send(data.cart);
      }else{
        res.send([])
      }
    });
  }else{
    res.send([])
  }
});

app.get("/grocery_pic/:file", (req, res) => {
  const path = "static/groceries/" + req.params.file;
  res.download(path);
});

app.post("/confirm", (req, res) => {
  const order = new Order({
    user: req.user.username,
    groceries: req.body.orderItems,
    street: req.body.shippingAddress.street,
    city: req.body.shippingAddress.city,
    province: req.body.shippingAddress.province,
    postalCode: req.body.shippingAddress.postalCode,
    country: req.body.shippingAddress.country,
    paymentMethod: req.body.paymentMethod,
    status: "pending",
  });

  order.save().then((obj) => {
    res.send("Order created");
  });
});

// returns a list of all the bikes
app.get("/groceries", (req, res) => {
  Grocery.find({}).then((groceries) => {
    res.send(groceries);
  });
});

// TODO
// returns a list of all the bikes
app.get("/groceriesByLocation", (req, res) => {
  const location = req.query.location;
  console.log(location);
  Bike.find(
    { location: { $regex: location, $options: "i" } },
    function (err, bikes) {
      res.send(bikes);
    }
  );
});

app.get("/orders", (req, res) => {
  Order.find({}).populate("groceries").exec( function (err, orders) {
    res.send(orders);
  });
});

app.get("/myorders", (req, res) => {
  Order.find({ user: req.user.username }).populate("groceries").exec(function (err, orders) {
    res.send(orders);
  });
});

app.get("/acceptOrder", (req, res) => {
  const id = req.query.id;
  Order.findOne({ _id: id }, function (err, order) {
    order.status = "Accepted";
    order.save();
    res.send("Order Accepted");
  });
});
app.get("/declineOrder", (req, res) => {
  const id = req.query.id;
  Order.findOne({ _id: id }, function (err, order) {
    order.status = "Declined";
    order.save();
    res.send("Order declined");
  });
});

//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
