const prompt = require('prompt-sync')({signit:true});
const fetch = require('node-fetch');
const getRatesUrl = 'https://sideshift.ai/api/v1/pairs/';
const postOrderUrl = 'https://sideshift.ai/api/v1/orders';
const requestQuoteUrl = 'https://sideshift.ai/api/v1/quotes';

const inputCoin = prompt('Enter input coin: ');
const outputCoin = prompt('Enter output coin: ');

getRates(inputCoin + '/' + outputCoin);


/*function that gets exchange rates*/
function getRates(url){
    fetch(getRatesUrl + url)
    .then(data => {return data.json()})
    .then(res => {
        const mininumAmount = res.min;
        const maximumAmount = res.max;
        const currentRate = res.rate;
        console.log('Minimum amount: ', mininumAmount);
        console.log('Maximum amount: ', maximumAmount);
        console.log('Exchange rate: ', currentRate);
    })    
    .catch(e => console.log(e));
}

let quoteId = '';
const orderType = prompt('Enter the type of order (fixed/variable): ');


/*check for the type of the order*/
switch(orderType){
    case 'fixed':
        createFixedOrder()
        break;
    case 'variable':
        createVariableOrder(inputCoin, outputCoin);    
        break;
    default: 
        console.log('sorry that type is note defined');
        break;
}


/*post a quote for fixed rate exchange*/
function requestQuote(inputCoin, outputCoin, depositAmount){
    const data = {
        "depositMethodId": inputCoin,
        "settleMethodId": outputCoin,
        "depositAmount": depositAmount
    }

    fetch(requestQuoteUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in request quote: ', res);
        quoteId = res.id;
        console.log(quoteId);
    })
    .catch((e) => {
        console.log('Error: ', e)
    })
}

/*function that creates the fixed order*/

function createFixedOrder(){
    const settleAddr = prompt('Enter your address: ');
    const depositAmount = prompt('Enter deposit amount: ');
    requestQuote(inputCoin, outputCoin, depositAmount);
    const data = {
        "type": "fixed",
        "quoteId": quoteId,//this value should be obtained from requestQuote function
        "settleAddress": settleAddr,
        "affiliateId": "FYmcsJLUdb",
        "refundAddress": "19dENFt4wVwos6xtgwStA6n8bbA57WCS58"
    }

    fetch(postOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in fixed order: ', res)
    })
    .catch((e) => {
        console.log(e)
    })
}

/*function to create a variable order*/
function createVariableOrder(inputCoin, outputCoin){
    const settleAddr = prompt('Enter your address: ');
    const depositAmountVariable = prompt('Enter deposit amount: ');
    const data = {
        "type": "variable",
        "depositMethodId": inputCoin,
        "settleMethodId": outputCoin,
        "settleAddress": settleAddr,
        "affiliateId": "FYmcsJLUdb",
        "refundAddress": "19dENFt4wVwos6xtgwStA6n8bbA57WCS58"
    }

    fetch(postOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in variable order: ', res);
    })
    .catch((e) => {
        console.log('Error: ', e);
    })
}

//0x32Be343B94f860124dC4fEe278FDCBD38C102D88
