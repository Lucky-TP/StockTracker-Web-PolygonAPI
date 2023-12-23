# StockTracker-Web-PolygonAPI
StockTracker-Web-PolygonAPI is a simple stock tracking website created using HTML, CSS, and JavaScript.And using Polygon.io API to get stock prices data, including the opening prices for today and the price changes between today and yesterday.

## Motivation
I created this project to learn the basics of fetching data from an API, dynamically rendering content, and improving proficiency in HTML, CSS, and JavaScript.

## Features
- Dynamically generates stock cards displaying company logos, names, symbols, prices, and price changes.
- Fetches stock data from the Polygon.io API.
- Supports multiple stocks with data stored in JSON format, so it only has to feches only once a day.

## Project Structure
- `index.html`: Main HTML file.
- `styles.css`: Stylesheet for the website.
- `index.js`: JavaScript file for dynamically generating stock cards.
- `todayPrice.js`: Script to fetch and store today's stock prices in a JSON file.
- `yesterdayPrice.js`: Similar script for yesterday's stock prices.

## API Key
To use the Polygon.io API, you need to obtain an API key. Replace 'Your_Polygon_Token' in the code with your actual API key.

## How to use
1. Clone the repository.
2. Open the terminal and navigate to the project directory.
3. Run `node todayPrice.js` and `node yesterdayPrice.js` to make database.
4. Run `npx live-server` to start the development server.
5. Open your web browser and navigate to the provided URL (usually http://127.0.0.1:8080/).

![StockTracker-Web-PolygonAPI Screenshot](./Stock%20Tracker%20Website.png)
