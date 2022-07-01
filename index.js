const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors')
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
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await taskCollection.insertOne(newUser);
            res.send(result)
        })

        // const user = { name: 'Mahi', email: 'fff@gmail.com', phone: '3928383' };
        // const result = await taskCollection.insertOne(user);
        // console.log(`user inserted id:, ${result.insertedId}`)
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