import React, { useEffect, useState } from 'react'
import './currencyConvertor.css';
import axios from "axios"

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null)
  const[exchangeRate,setExchangeRate]=useState(null);
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        let response = await axios.get(url);
        console.log(response);
        setExchangeRate(response.data.rates[toCurrency])
      } catch (error) {
        console.error("Error" + error)
      }
    }
    getExchangeRate();

  },[fromCurrency,toCurrency]);
  useEffect(()=>{
    if(exchangeRate!==null){
      setConvertedAmount((amount*exchangeRate).toFixed(2));
    }

  },[amount,exchangeRate])
  const handleamountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value); //Nan=Not a number
  }
  const handleFromCurrency = (e) => {
    const value1 = e.target.value;
    setFromCurrency(value1);

  }
  const handleToCurrency = (e) => {
    const value2 = e.target.value;
    setFromCurrency(value2);
  }
  return (
    <div>
      <div className="container">
        <div className="image"></div>
        <div className="heading">
          <h1>CURRENCY CONVERTER</h1>
          <div className="information">
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" value={amount}
              onChange={handleamountChange} />
          </div>
          <div className="information">
            <label htmlFor="fromcurrency">From Currency:</label>
            <select id="fromcurrency" value={fromCurrency}
              onChange={handleFromCurrency}>
              <option value="USD">USD-United States Dollar</option>
              <option value="EUR">EUR-Euro</option>
              <option value="GBP">GBP-Brithish Pound Sterling</option>
              <option value="JPY">JPY-Japanese Yen</option>
              <option value="AUD">AUD-Australian Dollar</option>
              <option value="CAD">CAD-Canadian Dollar</option>
              <option value="CNY">CNY-Chinese Yuan</option>
              <option value="INR">INR-Indian Rupee</option>
              <option value="BRL">BRL-Brazilian Real</option>
              <option value="ZAR">ZAR-South African Rand</option>
            </select>
          </div>

          <div className="information">
            <label htmlFor="tocurrency">To Currency:</label>
            <select id="tocurrency" value={toCurrency}
              onChange={handleToCurrency}>
              <option value="USD">USD-United States Dollar</option>
              <option value="EUR">EUR-Euro</option>
              <option value="GBP">GBP-Brithish Pound Sterling</option>
              <option value="JPY">JPY-Japanese Yen</option>
              <option value="AUD">AUD-Australian Dollar</option>
              <option value="CAD">CAD-Canadian Dollar</option>
              <option value="CNY">CNY-Chinese Yuan</option>
              <option value="INR">INR-Indian Rupee</option>
              <option value="BRL">BRL-Brazilian Real</option>
              <option value="ZAR">ZAR-South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>

        </div>
      </div>
    </div>

  )
}
export default CurrencyConverter;