const express = require('express');
const fetch = require('node-fetch');

const app = express(); 
// verify - create transfer recipient - initiate transfer
//create transfer recipient 
 const data = {type: "nuban", name:'Motunrayo Koyejo', account_number: '2209216789', bank_code: '057', currency: 'NGN'}

//Authenticating with otp but I have it disabled right now.
// const data = { "transfer_code": "TRF_y6nwkapw1zv5lw1" }
// const finalizeTransfer = async()=> {
//     const sendMoney = await fetch('https://api.paystack.co/transfer/finalize_transfer',{
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {'Content-Type': 'application/json',
//                    Authorization: 'Bearer sk_test_d5c8b7617afc22a16f97d7d787bbcab1da0d8756'}
//     }).then(res => res.json())
//     .then((data) => data)
//     console.log(sendMoney)
// }  
// finalizeTransfer()

module.exports = app