const { MongoClient } = require("mongodb");
const constants = require("../constants");

let db = (async () => {
  const uri = constants.MONGO_URI;
  const dbName = constants.database;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Conected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.log("Unable to connect to mongo DB" + err);
  }
})();

module.exports = db;
