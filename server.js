const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/AuthRoutes");
const PostRouter = require("./routes/PostRoute");
const UserRouter = require("./routes/UserRoutes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/blog", PostRouter);
app.use("/", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor Rodando na Porta ${process.env.PORT || 3000}`);
});
