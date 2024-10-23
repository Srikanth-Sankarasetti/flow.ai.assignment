const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("database connected succefully");
    app.listen(port, () => {
      console.log(`server running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
