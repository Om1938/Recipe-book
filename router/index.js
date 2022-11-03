const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/recipes", require("./recipes"));

module.exports = router;
