const express = require('express');
const apiRouter = require('./paystack-api/api');

const app = express(); 
// verify - create transfer recipient - initiate transfer
// app.use('node --trace-warnings')
app.use(express.json());

app.use('/api/v1', apiRouter)

module.exports = app