const fetch = require('node-fetch');
const prompt = require('prompt-sync')({signit: true});
const url = 'https://sideshift.ai/api/v1/pairs/';

const inputCoin = prompt('C1: ');
const outputCoin = prompt('C2: ');

async function getRates(inputCoin, outputCoin){
  let res = await fetch(url + inputCoin + '/' + outputCoin);
  return res.json();
}

getRates(inputCoin, outputCoin)
  .then(res => {return res})
  .then(data => {
    console.log(data);
  })
  .catch((e) => console.log(e));

