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

function postQuote(data){
  return new Promise((resolve, reject) => {
    fetch('https://sideshift.ai/api/v1/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(Data => {
      if(Data.error.message === 'Internal Server Error'){
        reject(new Error("... Error while handling the qoute"));
      }
      
      console.log('Success:', Data);
      quoteId = Data.id;
      console.log(quoteId);
      resolve(quoteId);
    })
    .catch((error) => {
      console.error('Error:', error);
      reject(new Error(error));
    });
  })
}

return postQuote(data)
  .then(
    res => console.log(res),
    error => console.log(error)
  )
  .catch((e) => {
    console.log(e);
  });


/*const fetch = require("node-fetch");
const readline = require('readline');
const queryUrl = 'https://sideshift.ai/api/v1/pairs/';
const postUrl = 'https://sideshift.ai/api/v1/quotes';

function getInput (msg){
  return new Promise((reject, resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: msg 
  });

  rl.prompt();
  rl.on('line', input => {
    resolve(input)    
  })
  .on('close', () => {
    console.log(input);
    process.exit(0);
  });
})
}
let inputCoin 
let outputCoin
let outputAddr
return getInput ('Please enter input coin')
.then(res => {
  inputCoin = res
  return getInput ('Please enter the output coin')
})
.then(res => {
  outputCoin = res;
  return getInput('Please enter the output address')
})
.then(res =>{
  outputAddr = res
  console.log(inputCoin, outputCoin, outputAddr)
}).catch(console.log)

/*
const outputCoin = getInput ('')
const outputAddr = getInput ('')
console.log(inputCoin, outputCoin, outputAddr)
*/

/*
rl.question('enter coin: ', (answer) =>{
  inputCoin = answer;
  console.log(inputCoin);
})


rl.question('enter coin: ', (answer) =>{
  outputCoin = answer;
  console.log(outputCoin);
})*/


//rl.setPrompt('Enter coin1: ');
/*
//rl.setPrompt('Enter coin2: ');
rl.prompt();
rl.on('line', (answer) => {
  outputCoin = answer;
})
.on('close', () => {
  process.exit(0);
});*/

//console.log(inputCoin, outputCoin);
/*
rl.setPrompt('Choose your address: ');
rl.prompt();
rl.on('line',)

let queryUrl = '';
let counter = 0;

rl.setPrompt(`Enter coin N${counter+1}:`);
rl.prompt();
rl.on('line', (answer) =>{
    if(counter == 2){
        getExchangeRate(queryUrl);
        console.log(queryUrl);
        rl.setPrompt('enter wallet address');
        rl.prompt();
        rl.on('line', (ans) => {
            console.log(ans);
        })
        rl.close();
    }
    else{
        counter++;
        queryUrl += answer + '/';
        rl.setPrompt(`Enter coin N${counter+1}:`);
        rl.prompt();
       
    }    
});
/*
rl.setPrompt('Enter wallet address');
rl.prompt();/*
rl.on('line', (answer) =>{
            console.log(answer);
            rl.close();
});

function getExchangeRate(num){
    let queryUrl = url + num;
    console.log(queryUrl);
    fetch(queryUrl)
    .then(data => {return data.json()})
    .then(res => {
      const mininumAmount = res.min;
      const maximumAmount = res.max;
      const currentRate = res.rate;
      console.log(mininumAmount);
      console.log(maximumAmount);
      console.log(currentRate);
    }).catch(e=>console.log('QUERY ERROR: ', e));
  }*/