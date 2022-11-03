// Write check to throw errors here is value is undefined form the process.env
module.exports = Object.freeze({
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  database: process.env.DBName,
  secret: process.env.SECRET,
  collections: {
    USER: "user",
    RECIPE: "recipe",
  },
});
