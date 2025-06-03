const express = require('express');
const mongoose = require('mongoose');

const app = express()
const port = 3000

require('dotenv').config();

app.use(express.json());
app.use('/api/tasks', require('./routes/tasks.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

mongoose
    .connect("mongodb://" + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE_NAME)
    .then(() => {
        console.log("MongoDB connected !");
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.error(err);
    });