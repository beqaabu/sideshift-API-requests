import React from 'react';
import ReactDOM from 'react-dom';
const fetch = require('node-fetch');

/*
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [  { id: 'BTC', name: 'Bitcoin' },
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
        { id: 'WBTC', name: 'WBTC' } ],

            message: 'loading...'
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    async conponentDidMount(){
        let assets = [];
        try{
            this.setState({message: 'loading'});
            const result = await fetch(url)
                            .then(res => res.json())
                            .then(data => {
                                    for(let key in data){
                                        assets.push(data[key]);
                                    }
                                })
                            
                            .catch((e) => console.log(e));
            
            this.setState({options: result});
            this.setState({message: 'select coins'});
            console.log(assets);
        } catch(error){
            console.log(error)
        }
    }


    render() {
        let{message} = this.state;
        console.log(message);
        return(
            <div className="App">
                <p>
                    {alert(message)}
                </p> 
                <select>
                    {this.state.options.map(coin => (
                        <option key = {coin.id} value = {coin.name}>{coin.id}</option>
                    ))}
                </select>
                <select>
                    {this.state.options.map(coin => (
                        <option key = {coin.id} value = {coin.name}>{coin.id}</option>
                    ))}
                </select>
                <NameForm/>
            </div>
        );
    };
}



class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rate: null
        }
    }
    async conponentDidMount (){
        const url = 'https://sideshift.ai/api/v1/pairs/btc/eth';
        const result = await fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({rate: data})
            })
            .catch((e) => console.log(e));
        this.setState({rate: result})
    }

    render (){
        return(
            <p>
                {alert(this.rate)}
            </p>
        )
    }
}

*/
class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) { this.setState({value: event.target.value});  }
    handleSubmit(event) {
        alert('An address was submitted: ' + this.state.value);
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>        <label>
            Address:
            <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }


class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://sideshift.ai/api/v1/facts")
        .then(res => res.json())
        .then(
          (result) => {
              let assets = [];
              for(let key in result.assets){
                assets.push(result.assets[key]);
              }
            this.setState({
              isLoaded: true,
              items: assets
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="App"> 
                <select>
                    {items.map(coin => (
                        <option key = {coin.id} value = {coin.name}>{coin.id}</option>
                    ))}
                </select>
                <select>
                    {items.map(coin => (
                        <option key = {coin.id} value = {coin.name}>{coin.id}</option>
                    ))}
                </select>
                <NameForm/>
            </div>
        );
      }
    }
  }

ReactDOM.render(<MyComponent />, document.querySelector('#root'));