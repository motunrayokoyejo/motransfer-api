const { config } = require('dotenv');
const express = require('express');
const { connect } = require('mongoose');
const apiRouter = require('./paystack-api/api');

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
app.use('/api/v1', apiRouter)
app.use('/user', userRoutes)

module.exports = app