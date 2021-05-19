const express = require('express');
const app = express();
const fetch = require('node-fetch');


const body = { account_number: "2209216789", bank_code: "057" };
 
const accountExist = async({account_number, bank_code}) =>{ 
   let response
    try{
       const accountStatus = await fetch(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sk_test_d5c8b7617afc22a16f97d7d787bbcab1da0d8756' },
    }) 
    .then(res => res.json())
    .then((data) => data)
    return accountStatus
    } 
    catch(err){console.log(err)}
        
} 
const any = async()=>{ 
   return await accountExist(body)
} 
any()

module.exports = app