const { MongoClient } = require("mongodb");
const { env } = require("./config");

let db = {
  salesCollection: null,
};

const connectDB = async () => {
  //async function connectDB() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  // console.log("start of db");
  //console.log("URL : " + env.MONGO_URI);
  const client = new MongoClient(env.MONGO_URI, {
    socketTimeoutMS: 500,
    maxPoolSize: 100,
  });

  try {
    // Connect to the MongoDB cluster
    const mongoClient = await client.connect();
    console.log("Connected successfully to server");
    //console.log("db : " + env.DB_NAME);
    db.salesCollection = mongoClient.db(env.DB_NAME).collection("restaurants");
    // console.log("Success " + db.salesCollection.findOne());
  } catch (e) {
    console.error(e);
  }
};

connectDB();
//console.log("end of db");
module.exports = db;
