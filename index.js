
const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; 
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middle ware
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://taskapp:GjG2mARp9vM3jzCC@cluster0.zyufm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('taskManagement').collection('task');

        // get users 

        app.get('/user', async(req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.findOne(query);
            res.send(result);
        })

        // Post user 

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await taskCollection.insertOne(newUser);
            res.send(result)
        })

        // delete a task
        
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        })

    }

    finally {
        
    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Surver is Running')
});

app.listen(port, () => {
    console.log('Listening to port', port);
})