const prompt = require('prompt-sync')({signit:true});
const fetch = require('node-fetch');
const getRatesUrl = 'https://sideshift.ai/api/v1/pairs/';
const postOrderUrl = 'https://sideshift.ai/api/v1/orders';
const requestQuoteUrl = 'https://sideshift.ai/api/v1/quotes';

const inputCoin = prompt('Enter input coin: ');
const outputCoin = prompt('Enter output coin: ');

/*function that gets exchange rates*/
async function getRates(url){
  //return new Promise((reject, resolve) => {
    let response = await fetch(getRatesUrl + url);
    if(response == undefined)
      throw new Error("This pair is not defined");
    
    console.log('Minimum amount: ', response.min),
    console.log('Maximum amount: ', response.max);
    console.log('Exchange rate: ', response.rate);
    return await response.json;
    
}

let quoteId = '';
const orderType = prompt('Enter the type of order (fixed/variable): ');

/*check for the type of the order*/
switch(orderType){
    case 'fixed':
        doFixedOrder()
        break;
    case 'variable':
        createVariableOrder(inputCoin, outputCoin);    
        break;
    default: 
        console.log('sorry that type is note defined');
        break;
}


/*post a quote for fixed rate exchange*/
async function requestQuote(inputCoin, outputCoin, depositAmount){
    const data = {
        "depositMethodId": inputCoin,
        "settleMethodId": outputCoin,
        "depositAmount": depositAmount
    }

    let response = await fetch(requestQuoteUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
    if(response.error)
      throw new Error('Request not posted (in quote) ');
    
    console.log('Success, request posted! (in quote) ', response);
    return response.id;
    /*
    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in request quote: ', res);
        quoteId = res.id;
        console.log(quoteId);
    })
    .catch((e) => {
        console.log('Error: ', e)
    })*/
}

/*function that creates the fixed order*/

async function createFixedOrder(){
    const settleAddr = prompt('Enter your address: ');
    const depositAmount = prompt('Enter deposit amount: ');
    let quoteId =  await requestQuote(inputCoin, outputCoin, depositAmount);
    const data = {
        "type": "fixed",
        "quoteId": quoteId,//this value should be obtained from requestQuote function
        "settleAddress": settleAddr,
        "affiliateId": "FYmcsJLUdb",
        "refundAddress": "19dENFt4wVwos6xtgwStA6n8bbA57WCS58"
    }

    let response = await fetch(postOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(response.error)
      //console.log('The order was posted successfully!', data.json());
      throw new Error('Error, order was not posted :(')

    console.log('Order was posted successful! :)', response);
    return response;/*

    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in fixed order: ', res)
    })
    .catch((e) => {
        console.log(e)
    })*/
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
        "affiliateId": "FYmcsJLUdb",
        "refundAddress": "19dENFt4wVwos6xtgwStA6n8bbA57WCS58"
    }

    let response = await fetch(postOrderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if(response.hasOwnProperty('error'))
      throw new Error('Order not posted :(');
    
    console.log('Order posted successfully!', response);
    return response;
    /*
    .then(data => {return data.json()})
    .then(res => {
        console.log('Success in variable order: ', res);
    })
    .catch((e) => {
        console.log('Error: ', e);
    })*/
}

//0x32Be343B94f860124dC4fEe278FDCBD38C102D88
async function doFixedOrder(){
  getRates(inputCoin + '/' + outputCoin)
    .then(res => {return res})
    .then(data => {
      console.log(data);
    })
  //let quoteID = await requestQuote(inputCoin, outputCoin, depositAmount);
  createFixedOrder()
    .then(res => {return res})
    .then(date => {
      console.log(data);
    })
}

    /*
    .then(data => {return data.json()})
    .then(res => {
      if(res === undefined)
        reject(new Error("We dont have the given pair of coins"));
    
      console.log('Minimum amount: ', res.min);
      console.log('Maximum amount: ', res.max);
      console.log('Exchange rate: ', res.rate);
      console.log(res);
      resolve(res);
    })    
    .catch(e => console.log(e));*/
  /*
  return getRates(inputCoin + '/' + outputCoin)
    .then(
      result => console.log(result),
      error => console.log(error)
    )
    .catch((error) => console.log(error));*/
