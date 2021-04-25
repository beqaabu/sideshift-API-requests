const url = 'https://sideshift.ai/api/v1/orders';
const fetch = require('node-fetch');
const data = {
    "type": "fixed",
    "quoteId": "e1c4a6fe-5bfb-4043-b920-20c88ac118c7",
    "settleAddress": "MRHrYyu9H5dFXvqHcUMfY3h7Nsyt1dhR5T",
    "affiliateId": "FYmcsJLUdb",
    "refundAddress": "19dENFt4wVwos6xtgwStA6n8bbA57WCS58"
}

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(result => {result.json()})
.then(response => {console.log('success:', response)})
.catch(err => {console.log(err)});