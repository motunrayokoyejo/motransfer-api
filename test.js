const https = require('https')
const params = JSON.stringify({
  "type":"nuban",
  "name" : "Motunrayo Koyejo",
  "account_number": "2209216789",
  "bank_code": "057",
  "currency": "NGN"
})
const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transferrecipient',
  method: 'POST',
  headers: {
    Authorization: 'Bearer sk_test_d5c8b7617afc22a16f97d7d787bbcab1da0d8756',
    'Content-Type': 'application/json'
  }
}
const req = https.request(options, res => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  });
  res.on('end', () => {
    console.log(JSON.parse(data))
  })
}).on('error', error => {
  console.error(error)
})
req.write(params)
req.end()