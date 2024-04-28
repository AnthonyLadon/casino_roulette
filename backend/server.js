const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const cors = require("cors");
require("dotenv").config();

const gameController = require("./controllers/gameController");

const app = express();
const PORT = process.env.PORT;
const sessionSecret = process.env.SECRET_KEY;

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: sessionSecret,
    resave: false, // doesn't save session if unmodified
    saveUninitialized: false, // doesn't save empty sessions
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, //! secure: true for https -> disabled in dev environment
  })
);

app.get("/session-data", gameController.getSessionData);
app.get("/start-game", gameController.getGame);
app.get("/roll", gameController.roll);
app.get("/cash-out", gameController.cashOut);

app.use((req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
});

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
