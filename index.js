require("dotenv-safe").config();
const express = require("express");
var cors = require('cors')
require("./config/db");
const { PORT } = require("./constants");

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*.*', express.static('public/frontend', { maxAge: '1y' }));


// app.get('/', (req, res, next) => {
//   console.log('Reached');
//   res.json({})
// })

app.use("/api/v1", require("./router"));

app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: 'public/frontend' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
