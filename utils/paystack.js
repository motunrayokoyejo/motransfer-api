require('dotenv').config()
const fetch = require('node-fetch');
const env = process.env

const accountExist = async({account_number, bank_code}) =>{
     try{
        const accountStatus = await fetch(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.AUTHORIZATION_KEY}`},
     }) 
     .then(res => res.json())
     .then((data) => data)
     return accountStatus
     } 
     catch(err){
         console.log(err)
         return err.message
    }                   
}
// transfer recipient
const transferRecipient = async data=>{
    let response
    let initiateTransfer = await fetch('https://api.paystack.co/transferrecipient', {
         method: 'POST',
         body:    JSON.stringify(data),
         headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.AUTHORIZATION_KEY}`
        }
     })
     .then(res => res.json())
     .then(data => {response=data})
     .catch(err => {
        console.log(err.message)
        response = err.message
    })
    return response
     
 }
 
 
 //initiate transfer 
const transferMoney = async data=>{
    let response;
    const makeTransfer = await fetch('https://api.paystack.co/transfer',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.AUTHORIZATION_KEY}`
}
}).then(res => res.json()) 
.then(data => {response=data}) 
.catch(err => {
    console.log(err.message)
    response = err.message
})
    return response
}

const createTransfer = async (
    {
        account, 
        amount, 
        reason, 
        type, 
        currency, 
        source
    }
) => {
    //Verify details
   let userExists, name
   try {
    let _ = await accountExist(account)
    userExists = _.status
    console.log('response', _)
    if (userExists) {
        name = _.data.account_name
        const data = {type, name, ...account, currency}
        let recipient = await transferRecipient(data)
        recipient = recipient.data
        const payMoney = { 
            source, amount, recipient: recipient.recipient_code, reason
        } 
        let transfer = await transferMoney(payMoney)
        console.log('transfer', transfer)
        return transfer.status ?
             {transfer, name, bankName: recipient.details.bank_name} : 
             'Unable to send money'
    } else {
            console.log('User does not exist')
            return 'Invalid user'
    }
    return _  
   } catch (error) {
       console.log(error)
       return error.message
   }
}
module.exports.createTransfer = createTransfer