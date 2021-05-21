const Joi = require("joi");

function validateTransferPayload(payload) {
  let { account, amount } = payload;
  const params = {
    bank_code: account.bank_code,
    account_number: account.account_number,
    amount,
  };
  const schema = Joi.object({
    account_number: Joi.string().min(10).max(10).required(),
    bank_code: Joi.string().min(3).max(5).required(),
    amount: Joi.number().required(),
  });
  return schema.validate(params);
}

exports.validateTransferPayload = validateTransferPayload;