const { config } = require('dotenv');
const express = require('express');
const { connect } = require('mongoose');

const transferRoutes = require('./routes/api');
const userRoutes = require('./routes/users')


const app = express();
config()

connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected....'))
.catch(err => console.log(err));
app.use(express.json());

//routes 
app.use('/api', transferRoutes)
app.use('/user', userRoutes)

module.exports = app