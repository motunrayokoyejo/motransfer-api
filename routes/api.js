
const { Router } = require("express");
const Transfer = require("../models/transfer.models");
const { createTransfer } = require("../utils/paystack");
const checkAuth = require("../middleware/check-auth");
const { validateTransferPayload } = require("../utils/validation");
apiRouter = Router();


//Endpoint to search transfer history
apiRouter.get("/search", checkAuth, async (req, res) => {
    let transactions = await Transfer.find();
    res.status(200).json({
      status: true,
      message: "Successfully retrieved transactions",
      data: transactions,
    });
  });

// //Endpoint to create a transfer

apiRouter.post("/create-transfer", checkAuth, async (req, res) => {
    const { error } = validateTransferPayload(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
        data: null,
      });
    }
    let { account, amount, reason, type, currency, source } = req.body;
  
    reason = reason || "..";
    amount = amount.toString();
    currency = currency || "NGN";
    source = source || "balance";
    type = type || "nuban";
  
    let data = {
      account,
      amount,
      reason,
    };
  
    let response = {
      status: true,
      message: "Successfully created transfer",
      data: null,
    };
  
//     let sampleAccount = {account_name: 1111111111, bank_code: "001"}
//     if (!account || !account.account_number || !account.bank_code) { 
//         return res.status(400).json({
//             status: false,
//             message: `You need to pass the account details in the format ${JSON.stringify(sampleAccount)}`,
//             data : null
//         })
//     }
//     if (typeof account.account_number !== 'number' || typeof account.bank_code !== 'string' || account.account_number.toString().length !== 10) {
//         return res.status(400).json({
//             status: false,
//             message: `account_number must be an integer of 10 numbers and bank_code must be a string`,
//             data : null
//         })
//     }
//     if (!amount) {
//         return res.status(400).json({
//             status: false,
//             message: `Please input an amount`,
//             data : null
//         })
//     }
//     if (!reason) {
//         reason = ".."
//     }
//     amount = amount.toString()
//     if(!currency)  {currency = "NGN"}
//     if(!source) {source="balance"}
//     if(!type) {type="nuban"}
//     let data = {
//         account, amount,reason
//     }
//     let response = {
//         status: true,
//         message: 'Successfully created transfer',
//         data : null
//     }
  try {
    let { transfer, name, bankName } = await createTransfer(data);
    if (res === "Invalid user") {
      response.status = false;
      response.message = response.data;
      response.data = null;
      return res.status(400).json(response);
    }
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    date = `${days[date.getDay()]} ${
      month[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    let newTransfer = await Transfer.create({
      reference: transfer.data.reference,
      amount: transfer.data.amount,
      currency: transfer.data.currency,
      date,
      time,
      name,
      bank: bankName,
      reason: transfer.data.reason,
      user: transfer.data.user,
    });
    await newTransfer.save();
    response.data = newTransfer;
  } catch (error) {
    response.message = error.message;
    return res.status(400).json(response);
  }
  res.status(201).json(response);
});
module.exports = apiRouter;