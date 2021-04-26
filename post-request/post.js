const fetch = require('node-fetch');
const prompt = require('prompt-sync')({signit: true});

const inputCoin = prompt('C1: ');
const outputCoin = prompt('C2: ');
const amount = prompt('Amount: ');
const data = {
    "depositMethod": inputCoin,
    "settleMethod": outputCoin,
    "depositAmount": amount
};
let quoteId = '';

fetch('https://sideshift.ai/api/v1/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  quoteId = data.id;
  console.log(quoteId);
})
.catch((error) => {
  console.error('Error:', error);
});

//console.log(quoteId);