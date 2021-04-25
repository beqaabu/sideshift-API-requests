const fetch = require('node-fetch');
const data = {
    "depositMethod": "btc",
    "settleMethod": "eth",
    "depositAmount": "0.15"
};

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
})
.catch((error) => {
  console.error('Error:', error);
});