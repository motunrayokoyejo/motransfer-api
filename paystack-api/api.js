const {Router} = require ('express');
const { createTransfer } = require('../utils/paystack');

apiRouter = Router()

const account = { account_number: 2209216789, bank_code: '057' };

let create_transfer = createTransfer(account, '1000', 'Holiday Flexing').then(res => {console.log(res)})
// console.log(create_transfer)

module.exports = apiRouter