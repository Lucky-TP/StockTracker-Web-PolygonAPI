// Using to create file on server side, not client
// Have to run first to make today_prices_database.json
// Run node todayPrice.js in terminal to get .json file
const fetch = require('node-fetch');
const fs = require('fs');

// Polygon.io Token
const apiToken = 'Your_Polygon_Token';
const symbols = ['AAPL','MSFT','AMZN','META']; // Stock symbol, you can add more of it

// Set date, I acctually use the day before current day because this is the demo and to make price available in case market in USA is closed
const today = new Date();
today.setDate(today.getDate() - 1);
const todayDate = today.toISOString().split('T')[0];


// Function to get Open and Close Price for today in JSON file
async function getOpenAndClosePrices() {
  try {
    let result = {};

    for (const symbol of symbols){

      const response = await fetch(`https://api.polygon.io/v1/open-close/${symbol}/${todayDate}?adjusted=true&apiKey=${apiToken}`);
      const todayData = await response.json();

      const todayOpen = todayData.open;
      const todayClose = todayData.close;

      result[symbol] = {
          todayOpen: todayOpen,
          todayClose: todayClose
      };

      console.log(`Open price for ${symbol} today: $${todayOpen}`);
      console.log(`Close price for ${symbol} today: $${todayClose}`);
    }
  
    
    // Convert result to JSON
    const jsonString = JSON.stringify(result, null, 2);
    //Save to local file
    fs.writeFileSync('./Database/today_prices_database.json', jsonString);
    console.log('Data saved to today_prices_database.json');

  } catch (error) {
    console.error('Error fetching open prices:', error.message);
  }
}

getOpenAndClosePrices();
