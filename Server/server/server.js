const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const path = require('path')


const mongoDB= 'mongodb://localhost:27017/crud';
const userRoute = require('../routes/user.route');
const app = express();

mongoose.Promise=global.Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
 () => { console.log('Database is connected') },
 err => { console.log('There is problem while connecting database ' + err) }
 );



app.use(express.json());
app.use(cors());

const port = process.env.port || 3000;

app.use('/users', userRoute);

app.listen(port, ()=>{
    console.log('Server started on port: ' + port)
})