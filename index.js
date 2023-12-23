// get JsonData from Database
async function fetchJsonData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching JSON data:', error.message);
      return null;
    }
  }


//Dynamically generate stock cards
async function generateStockCards() {
    const stockCardContainer = document.querySelector('.stock-card');
    // stockCardContainer.innerHTML = ''; // Clear existing content
    const todayPricesData = await fetchJsonData('./Database/today_prices_database.json');
    const yesterdayPricesData = await fetchJsonData('./Database/yesterday_prices_database.json');

    //Make full name for each company
    const companyNames = {
        'AAPL': 'Apple',
        'MSFT': 'Microsoft',
        'AMZN': 'Amazon',
        'META': 'Meta'
    };

    if (todayPricesData) {
        // Create stocks array dynamically from JSON data
        const stocks = Object.keys(todayPricesData).map(symbol => {
            const stock = todayPricesData[symbol];
            const stockYesterday = yesterdayPricesData[symbol];
            const priceChangePercentage = ((stock.todayOpen - stockYesterday.yesterdayOpen) / stockYesterday.yesterdayOpen * 100).toFixed(2);
            const priceChange = `${priceChangePercentage > 0 ? '+' : ''}${priceChangePercentage}%`;
            return {
                name: companyNames[symbol], // Full Name
                symbol: symbol, // Abbreviation
                price: `$${stock.todayOpen.toFixed(2)}`, // Make 2 decimals
                priceChange: priceChange, // Price Change (%)
                logo: `./Images/${symbol}.png` // Images
            };
        });

        // Create for every stocks
        stocks.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'card';

            // Create stock logo section
            const logoSection = document.createElement('div');
            logoSection.className = 'stock-logo-section';
            const logoImage = document.createElement('img');
            logoImage.src = stock.logo;
            logoImage.alt = `${stock.name} Logo`;
            logoImage.className = 'stock-logo';
            logoSection.appendChild(logoImage);

            // Create stock info section
            const infoSection = document.createElement('div');
            infoSection.className = 'stock-info-section';
            const stockName = document.createElement('p');
            stockName.className = 'stock-name';
            stockName.textContent = `${stock.name} (${stock.symbol})`; // Display full name and symbol
            infoSection.appendChild(stockName);

            // Create stock price section
            const priceSection = document.createElement('div');
            priceSection.className = 'stock-price-section';
            const stockPrice = document.createElement('p');
            stockPrice.className = 'stock-price';
            stockPrice.textContent = stock.price;
            priceSection.appendChild(stockPrice);

            // Create price change section
            const changeSection = document.createElement('div');
            changeSection.className = 'price-change-section';
            const priceChange = document.createElement('p');
            priceChange.className = `price-change ${stock.priceChange.includes('-') ? 'negative' : 'positive'}`;
            priceChange.textContent = stock.priceChange;
            changeSection.appendChild(priceChange);

            // Append sections to card
            card.appendChild(logoSection);
            card.appendChild(infoSection);
            card.appendChild(priceSection);
            card.appendChild(changeSection);
            stockCardContainer.appendChild(card);
        });
    }
}

// Run generateStockCards
document.addEventListener('DOMContentLoaded', function() {
    generateStockCards();
});
