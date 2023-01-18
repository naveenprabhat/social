const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const path = require("path");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

const CLIENT_URL = "https://test-naveen.onrender.com";

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.use(express.static(path.join(__dirname,"./build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./build/index.html"))
})

app.listen("3000", () => {
  console.log("Server is running!");
});