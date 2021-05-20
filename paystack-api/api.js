const {Router} = require ('express');
const { createTransfer } = require('../utils/paystack');

apiRouter = Router()

apiRouter.post('/' , async (req, res) => {
    console.log(req.body)
    res.send('I work')
})

apiRouter.get('/search' , async (req, res) => {
    res.status(200).json({
        status: true,
        message: "Successfully retrieved transactions",
        data : {}
    })
})

apiRouter.post('/create-transfer' , async (req, res) => {
    let {
        account, amount, reason, 
        type, 
        currency, 
        source
    } = req.body
    let sampleAccount = {account_name: 1111111111, bank_code: "001"}
    if (!account || !account.account_number || !account.bank_code) { 
        return res.status(400).json({
            status: false,
            message: `You need to pass the account details in the format ${JSON.stringify(sampleAccount)}`,
            data : null
        })
    }
    if (typeof account.account_number !== 'number' || typeof account.bank_code !== 'string' || account.account_number.toString().length !== 10) {
        return res.status(400).json({
            status: false,
            message: `account_name must be an integer of 10 numbers and bank_code must be a string`,
            data : null
        })
    }
    if (!amount) {
        return res.status(400).json({
            status: false,
            message: `Please input an amount`,
            data : null
        })
    }
    if (!reason) {
        reason = ""
    }
    amount = amount.toString()
    if(!currency)  {currency = "NGN"}
    if(!source) {source="balance"}
    if(!type) {type="nuban"}
    let data = {
        account, amount,reason
    }
    let response = {
        status: true,
        message: 'Successfully created transfer',
        data : null
    }
    try {
        response.data = await createTransfer(data)
        if (response.data === 'Invalid user') {
            response.status = false
            response.message = response.data
            response.data = null
            return res.status(400).json(response)
        }
    } catch (error) {
        response.message = error.message
    }
    res.status(200).json(response)
})
module.exports = apiRouter

// name
// bank
// amounnt transfer
// time 
// date
// reason
// id
// reference"2021-05-20T15:16:02.363Z