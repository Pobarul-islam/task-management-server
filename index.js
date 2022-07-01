const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.zyufm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('task management app connected');
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
    res.send('Surver is Running')
});

app.listen(port, () => {
    console.log('Listening to port', port);
})