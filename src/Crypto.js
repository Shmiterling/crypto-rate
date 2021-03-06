import React, { Component } from 'react';
import './Crypto.css';
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cryptoList: [],
            filteredCryptoList: [],
        };

    }

    componentDidMount() {
        this.getCryptoData();
        this.timerID = setInterval(() => this.getCryptoData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCryptoData = () => {

        axios.get('https://blockchain.info/ticker', {
            mode: 'cors'
        })
            .then(res => {
                const tickers = res.data;

                console.log(res.data)

                this.setState((state) => {
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {

                        let lastCryptoObj = state.cryptoList.find((cryptoObj) => {

                            return (cryptoObj.currency === ticker);

                        })

                        // console.log(lastCryptoObj);



                        let newCryptoObject = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last

                        }

                        // console.log(lastCryptoObj);

                        // console.log(newCryptoObject);

                        if (lastCryptoObj !== undefined) {
                            if (newCryptoObject.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObject.cssClass = 'green';
                                newCryptoObject.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObject.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObject.cssClass = 'red';
                                newCryptoObject.htmlArray = String.fromCharCode(8595);
                            } else {
                                newCryptoObject.cssClass = 'blue';
                                newCryptoObject.htmlArray = String.fromCharCode(8596);
                            }
                        } else {
                            newCryptoObject.cssClass = 'blue';
                            newCryptoObject.htmlArray = String.fromCharCode(8596);
                        }

                        newCryptoList.push(newCryptoObject);

                    }

                    // console.log(newCryptoList);

                    return ({
                        cryptoList: newCryptoList
                        
                    })
                    
                })
                
                this.filteredCryptoList()
            });


    }

    filteredCryptoList = () => {
        this._inputFilter.value = this._inputFilter.value.trim().toUpperCase();

        this.setState((state) => {
            let newFilteredCryptoList = state.cryptoList.filter((cryptoObj) => {
                return(cryptoObj.currency.includes(this._inputFilter.value))
            })

            return({
                filteredCryptoList: newFilteredCryptoList
            })
        })


        console.log(this._inputFilter.value);

    }

    render() {

        return (

            <div className='crypto'>
                <input type='text' placeholder='Filter' onChange={this.filteredCryptoList} ref={element => this._inputFilter = element} />
                <CryptoList cryptoList={this.state.filteredCryptoList} />
            </div>

        )

    }

};

export default Crypto;