const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/api/user/index");
const tripRouter = require("./routes/api/trip")

mongoose
  .connect("mongodb://localhost:27017/fs05-xedike", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Thanh Cong"))
  .catch(err => console.log(err));

const app = express();

//middleware parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware serve static files
// app.use('/uploads/avatars',express.static('./uploads/avatars'))

//middleware route handler
app.use("/api/users", userRouter);
app.use("/api/trip",tripRouter)
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`App running on port ${port}`);
});
