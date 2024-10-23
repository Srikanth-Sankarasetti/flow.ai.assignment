const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");

exports.routeProtector = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];

  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401).send({
      status: "fail",
      message: "Invalid JWT Token",
    });
  } else {
    jwt.verify(jwtToken, "srikanth", async (error, payload) => {
      if (error) {
        res.status(401).send({
          status: "fail",
          message: "Invalid JWT Token",
        });
      } else {
        req.id = payload.id;
        req.email = payload.email;
        next();
      }
    });
  }
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).send({
    status: "success",
    users,
  });
});

exports.registerUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).send({
    status: "success",
    message: "user registered",
    user,
  });
});

exports.userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).send({
      status: "Fail",
      message: "User doesn't Exits",
    });
  }
  console.log(user.password);
  const isPasswordMatch = await user.comparepassword(user.password, password);
  const payload = {
    id: user.id,
    email,
  };
  if (isPasswordMatch) {
    const token = await jwt.sign(payload, "srikanth", { expiresIn: "1h" });
    res.status(200).send({
      status: "success",
      token,
    });
  }
});
