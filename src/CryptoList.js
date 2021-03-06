import React from 'react';
import './CryptoList.css';

function CryptoList(props) {

    let cryptoList = props.cryptoList;
    let liElements = cryptoList.map((cryptoObj) => {

        return (
            <li key={cryptoObj.currency}>
                <span className='CryptoLabel'>Last Rate: </span>
                <span className={`CryptoRate ${cryptoObj.cssClass}`}>{cryptoObj.lastRate} {cryptoObj.htmlArray}</span>
                <span className='CurrencyTicker'>{cryptoObj.currency}</span>
                <span className='CurrencySymbol'>[{cryptoObj.symbol}]</span>
            </li>
        );

    })

    return (
        <div className='CryptoList'>
            <ul className='the-list'>
                {liElements}
            </ul>
        </div>
    );

}

export default CryptoList;