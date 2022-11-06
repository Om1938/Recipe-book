require("dotenv-safe").config();
const express = require("express");
const app = express();

const { PORT } = require("./constants");

require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", require("./router"));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
