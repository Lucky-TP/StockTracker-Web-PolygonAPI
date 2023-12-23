// Using to create file on server side, not client
// Have to run first to make yesterday_prices_database.json
// Run node yesterdayPrice.js in terminal to get .json file
const fetch = require('node-fetch');
const fs = require('fs');

// Polygon.io Token
const apiToken = 'Your_Polygon_Token';
const symbols = ['AAPL','MSFT','AMZN','META']; // Stock symbol, you can add more of it

// Set Date
const today = new Date();
today.setDate(today.getDate() - 1);
const todayDate = today.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayDate = yesterday.toISOString().split('T')[0];

// Function to get Open and Close Price for yesterday in JSON file
async function getOpenAndClosePrices() {
  try {
    let result = {};

    for (const symbol of symbols){

      const response = await fetch(`https://api.polygon.io/v1/open-close/${symbol}/${yesterdayDate}?adjusted=true&apiKey=${apiToken}`);
      const yesterdayData = await response.json();

      const yesterdayOpen = yesterdayData.open;
      const yesterdayClose = yesterdayData.close;
      
      result[symbol] = {
          yesterdayOpen: yesterdayOpen,
          yesterdayClose: yesterdayClose
      };

      console.log(`Open price for ${symbol} yesterday: $${yesterdayOpen}`);
      console.log(`Close price for ${symbol} yesterday: $${yesterdayClose}`);
    }


    // Convert result to JSON
    const jsonString = JSON.stringify(result, null, 2);
    //Save to local file
    fs.writeFileSync('./Database/yesterday_prices_database.json', jsonString);
    console.log('Data saved to yesterday_prices_database.json');

  } catch (error) {
    console.error('Error fetching open prices:', error.message);
  }
}

getOpenAndClosePrices();
