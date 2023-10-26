const express = require("express");
const bodyParser = require("body-parser");

// const taskRouter = require("./router/taskRouter");
const userRouter = require("./router/userRouter");
// const middleware = require("./utility/middleware/auth");

const app = express();

app.listen(3001, () =>   {
  console.log('server running on port 3001');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(middleware);

// app.use("/api", taskRouter);
app.use("/api", userRouter);

app.use("/", (req, res, next) => {
  res.send("SERVER RUNNING WELL !!!");
});    