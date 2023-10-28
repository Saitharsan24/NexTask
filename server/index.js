const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskRouter = require("./router/taskRouter");
const userRouter = require("./router/userRouter");
const middleware = require("./utility/middleware/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user",userRouter);
app.use("/api/task", taskRouter);

app.use("/", (req, res, next) => {
  res.send("SERVER RUNNING WELL !!!");
});    

app.listen(3001, () =>   {
  console.log('server running on port 3001');
});