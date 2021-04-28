const prompt = require('prompt-sync')({signit:true});
const fetch = require('node-fetch');
const getRatesUrl = 'https://sideshift.ai/api/v1/pairs/';
const postOrderUrl = 'https://sideshift.ai/api/v1/orders';
const requestQuoteUrl = 'https://sideshift.ai/api/v1/quotes';

const inputCoin = prompt('Enter input coin: ');
const outputCoin = prompt('Enter output coin: ');

/*function that gets exchange rates*/
async function getRates(inputCoin, outputCoin){
    return new Promise((resolve, reject) => {
      fetch(getRatesUrl + inputCoin + '/' + outputCoin)
      .then(data => {return data.json()})
      .then(res => {
        if(res.hasOwnProperty('error') == true)
          reject(new Error("We dont have the given pair of coins"));
        
        console.log('Minimum amount: ', res.min);
        console.log('Maximum amount: ', res.max);
        console.log('Exchange rate: ', res.rate);
        resolve();
      })
      .catch((e) => e);
    })
}

/*post a quote for fixed rate exchange*/
async function requestQuote(inputCoin, outputCoin, depositAmount){
    return new Promise((resolve, reject) => {    
        const data = {
            "depositMethod": inputCoin,
            "settleMethod": outputCoin,
            "depositAmount": depositAmount
        }

        fetch(requestQuoteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(Data => {return Data.json()})
        .then(res => {
            if(res.hasOwnProperty('error') == true)
                reject(new Error('Your order was not posted'))

            resolve(res.id);
        })
        .catch((e) => {
            console.log('Error: ', e);
        });
    })
}

/*function that creates the fixed order*/
async function createFixedOrder(){
        const settleAddr = prompt('Enter your address: ');
        const depositAmount = prompt('Enter deposit amount: ');
        const quoteId = await requestQuote(inputCoin, outputCoin, depositAmount);
        const data = {
            "type": "fixed",
            "quoteId": quoteId,//this value should be obtained from requestQuote function
            "settleAddress": settleAddr,
            //"affiliateId": "FYmcsJLUdb",
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
        });
    //})
}

/*function to create a variable order*/
async function createVariableOrder(inputCoin, outputCoin){
        const settleAddr = prompt('Enter your address: ');
        const depositAmountVariable = prompt('Enter deposit amount: ');
        const data = {
            "type": "variable",
            "depositMethodId": inputCoin,
            "settleMethodId": outputCoin,
            "settleAddress": settleAddr,
            //"affiliateId": "FYmcsJLUdb",
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

async function doItAll(){
    try{
        const Rates = await getRates(inputCoin, outputCoin);
        const orderType = prompt('Enter the type of order (fixed/variable): ');
        switch(orderType){
            case 'fixed':
                 createFixedOrder();
                break;
            case 'variable':
                createVariableOrder(inputCoin,outputCoin);
                break;
            default:
                console.log('That order type is not defined');
        }
    } catch (err){
        console.log(err)
    }
}

doItAll();