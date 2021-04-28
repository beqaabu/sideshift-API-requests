const fetch = require('node-fetch');
const prompt = require('prompt-sync')({signit: true});
const url = 'https://sideshift.ai/api/v1/pairs/';

const inputCoin = prompt('C1: ');
const outputCoin = prompt('C2: ');

function getRates(inputCoin, outputCoin){
  return new Promise((resolve, reject) => {
    fetch(url + inputCoin + '/' + outputCoin)
    .then(data => {return data.json()})
    .then(res => {
      if(res.hasOwnProperty('error') == true)
        reject(new Error("We dont have the given pair of coins"));
    
      resolve(
        console.log('Minimum amount: ', res.min),
        console.log('Maximum amount: ', res.max),
        console.log('Exchange rate: ', res.rate)
      );
    })    
    .catch((e) => e);
  });
}

async function doRates(){
  try{
    const res = await getRates(inputCoin, outputCoin);
    
  }
  catch(err){
    console.log(err);
  }
}

doRates();

