const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const res = require("express/lib/response");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p2fe2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const doctorsPortalCollection = client
      .db("doctors_portal")
      .collection("service");

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = doctorsPortalCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening Dotors-portal on port`, port);
});
