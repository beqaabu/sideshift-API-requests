const fetch = require("node-fetch");
const url = 'https://sideshift.ai/api/v1/pairs/';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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
});*/

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
  }