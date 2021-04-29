import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
/*
  { id: 'BCH', name: 'Bitcoin Cash' },
  { id: 'LTC', name: 'Litecoin' },
  { id: 'ZEC', name: 'Zcash' },
  { id: 'USDT', name: 'USDt' },
  { id: 'XMR', name: 'Monero' },
  { id: 'DASH', name: 'Dash' },
  { id: 'ETC', name: 'Ethereum Classic' },
  { id: 'ETH', name: 'Ethereum' },
  { id: 'BNB', name: 'Binance Coin' },
  { id: 'USDC', name: 'USDC' },
  { id: 'DAI', name: 'Dai' },
  { id: 'TUSD', name: 'TrueUSD' },
  { id: 'SAI', name: 'Sai' },
  { id: 'SPANK', name: 'SpankChain' },
  { id: 'BSV', name: 'Bitcoin (SV)' },
  { id: 'GRIN', name: 'Grincoin' },
  { id: 'L-BTC', name: 'Bitcoin (Liquid)' },
  { id: 'GRS', name: 'Groestlcoin' },
  { id: 'TBTC', name: 'Bitcoin Testnet' },
  { id: 'DOGE', name: 'Dogecoin' },
  { id: 'VIA', name: 'Viacoin' },
  { id: 'PPC', name: 'Peercoin' },
  { id: 'USD', name: 'US Dollar' },
  { id: 'OMNI', name: 'Omni Token' },
  { id: 'PAX', name: 'Paxos Standard' },
  { id: 'BTC2', name: 'Bitcoin (Core Cash)' },
  { id: 'USDH', name: 'HonestCoin' },
  { id: 'L-BCH', name: 'Bitcoin Cash (Liquid)' },
  { id: 'SPICE', name: 'Spice Token' },
  { id: 'XLM', name: 'Lumen' },
  { id: 'FOX', name: 'ShapeShift' },
  { id: 'HNS', name: 'Handshake' },
  { id: 'XAUT', name: 'XAUt' },
  { id: 'XTZ', name: 'Tezos' },
  { id: 'FTT', name: 'FTX Token' },
  { id: 'SRM', name: 'Serum' },
  { id: 'COMP', name: 'Compound' },
  { id: 'SUSHI', name: 'Sushi' },
  { id: 'YFI', name: 'yearn.finance' },
  { id: 'UNI', name: 'Uniswap' },
  { id: 'XAI', name: 'SideShift Token' },
  { id: 'flexUSD', name: 'flexUSD' },
  { id: 'WBTC', name: 'WBTC' } ];*/

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            options: [ 
                { id: 'BTC', name: 'Bitcoin'},           
                { id: 'BCH', name: 'Bitcoin Cash' },
                { id: 'LTC', name: 'Litecoin' },
                { id: 'ZEC', name: 'Zcash' },
                { id: 'USDT', name: 'USDt' },
                { id: 'XMR', name: 'Monero' },
                { id: 'DASH', name: 'Dash' },
                { id: 'ETC', name: 'Ethereum Classic' },
                { id: 'ETH', name: 'Ethereum' },
                { id: 'BNB', name: 'Binance Coin' },
                { id: 'USDC', name: 'USDC' },
                { id: 'DAI', name: 'Dai' },
                { id: 'TUSD', name: 'TrueUSD' },
                { id: 'SAI', name: 'Sai' },
                { id: 'SPANK', name: 'SpankChain' },
                { id: 'BSV', name: 'Bitcoin (SV)' },
                { id: 'GRIN', name: 'Grincoin' },
                { id: 'L-BTC', name: 'Bitcoin (Liquid)' },
                { id: 'GRS', name: 'Groestlcoin' },
                { id: 'TBTC', name: 'Bitcoin Testnet' },
                { id: 'DOGE', name: 'Dogecoin' },
                { id: 'VIA', name: 'Viacoin' },
                { id: 'PPC', name: 'Peercoin' },
                { id: 'USD', name: 'US Dollar' },
                { id: 'OMNI', name: 'Omni Token' },
                { id: 'PAX', name: 'Paxos Standard' },
                { id: 'BTC2', name: 'Bitcoin (Core Cash)' },
                { id: 'USDH', name: 'HonestCoin' },
                { id: 'L-BCH', name: 'Bitcoin Cash (Liquid)' },
                { id: 'SPICE', name: 'Spice Token' },
                { id: 'XLM', name: 'Lumen' },
                { id: 'FOX', name: 'ShapeShift' },
                { id: 'HNS', name: 'Handshake' },
                { id: 'XAUT', name: 'XAUt' },
                { id: 'XTZ', name: 'Tezos' },
                { id: 'FTT', name: 'FTX Token' },
                { id: 'SRM', name: 'Serum' },
                { id: 'COMP', name: 'Compound' },
                { id: 'SUSHI', name: 'Sushi' },
                { id: 'YFI', name: 'yearn.finance' },
                { id: 'UNI', name: 'Uniswap' },
                { id: 'XAI', name: 'SideShift Token' },
                { id: 'flexUSD', name: 'flexUSD' },
                { id: 'WBTC', name: 'WBTC' } ]
        }
    }


render() {
    return(
        <select>
            {this.state.options.map(coin => (
                <option key = {coin.id} value = {coin.name}>{coin.name}</option>
            ))}
        </select>
    );
};
}

ReactDOM.render(<App />, document.querySelector('#root'));
