import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState('user1'); // Change as needed

  useEffect(() => {
    // Fetch user stocks
    axios.get(`http://127.0.0.1:8000/api/user-stocks/?user=${user}`)
      .then(response => setStocks(response.data))
      .catch(error => console.error(error));
  }, [user]);

  const addStock = () => {
    axios.post('http://127.0.0.1:8000/api/stocks/', { symbol: newStock, user })
      .then(response => {
        // Update the state to include the new stock
        setStocks([...stocks, response.data]);
        setNewStock(''); // Clear the input field after adding the stock
      })
      .catch(error => {
        console.error('There was an error adding the stock!', error);
      });
  };
  

  const addAlert = (symbol, threshold, alertType) => {
    axios.post('http://127.0.0.1:8000/api/alerts/', { stock: symbol, threshold, alert_type: alertType })
      .then(response => setAlerts([...alerts, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Personalized Stock Ticker</h1>
      <div>
        <input 
          type="text" 
          value={newStock} 
          onChange={(e) => setNewStock(e.target.value)} 
          placeholder="Add stock symbol" 
        />
        <button onClick={addStock}>Add Stock</button>
      </div>
      <div>
        <h2>Your Stocks</h2>
        <ul>
          {stocks.map(stock => (
            <li key={stock.id}>{stock.symbol}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Set Alerts</h2>
        <input type="text" placeholder="Stock symbol" />
        <input type="number" placeholder="Threshold" />
        <select>
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <button onClick={() => addAlert('AAPL', 150, 'above')}>Set Alert</button>
      </div>
    </div>
  );
}

export default App;
