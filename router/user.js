const { addUser, login } = require("../controllers/user");
const { FOUR_HUNDRED, makeError } = require("../helpers/error");

// use JOI for making object models
const router = require("express").Router();

router.get("/", (req, res, next) => {
  // This route can be used for sending API documentation. like swagger.
  res.end("Hello from API auth Endpoint");
});

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    addUser(username, password)
      .then((resp) => {
        res.json(resp);
      })
      .catch(next);
  } else {
    throw makeError(new Error("Invalid Data"), 400);
  }
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    login(username, password)
      .then((resp) => {
        res.json(resp);
      })
      .catch(next);
  } else {
    throw makeError(new Error("Invalid Data"), 400);
  }
});

module.exports = router;
