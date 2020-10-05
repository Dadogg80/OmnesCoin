$(document).ready(function() {

//Global object toLocaleString method to format the data into a currency string
const euroObj = {
        style: "currency",
        currency: "EUR"
        }
// variables URL to call the API
const coinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&per_page=100&page=0";
const globalUrl = "https://api.coingecko.com/api/v3/global"
//Created a async funtction that gets API response from coingecko and return the response as a JSON file.
async function getGlobal() {
  const response = await fetch(globalUrl);
  const data = await response.json();
// Create variables to use on flex box
  const markets = data.data.markets;
  const activeCrypto = data.data.active_cryptocurrencies;
  const totalMarketCap = data.data.total_market_cap.eur;
  const totalVolume = data.data.total_volume.eur;
  const dominance = data.data.market_cap_percentage.btc;
// Adding information and style to the flex box
  document.getElementById("currencies").textContent = activeCrypto.toLocaleString(2);
  document.getElementById("currencies").style.color = "#25e8b4";
  document.getElementById("mCap").textContent = totalMarketCap.toLocaleString("en-GB", euroObj);
  document.getElementById("mCap").style.color = "#25e8b4";
  document.getElementById("24v").textContent = totalVolume.toLocaleString("en-GB", euroObj);
  document.getElementById("24v").style.color = "#25e8b4";
  document.getElementById("mark").textContent = markets;
  document.getElementById("mark").style.color = "#25e8b4";
  document.getElementById("dom").textContent = dominance.toFixed(2) + " %";
  document.getElementById("dom").style.color = "#25e8b4";
}
getGlobal();

//Created a funtction that gets API response from coingecko and return the response as a JSON file.
function getDataCoins(){
// return initiates/ call function fetch(url) and gets the response.json in return from the fetch(url) function call.
  return fetch(coinsUrl)
  .then(res => {
      return res.json();
  })
// Created an Error Handling Catch box
  .catch (err => {
    console.log(err);
  });
  }
  getDataCoins();

//Created Async function for creating the table of all coins.
async function createTable () {
// Created a variable coin that is binded to the response.json returned from the getData() function.
    const coin = await getDataCoins();
// Created a loop to iterate through the index
    for(let index = 0; index < 100; index ++){
// Created variables to define the image of each coin and the price percentage change to append later to respective td
      const imgCoin = coin[index].image;
      const change24 = coin[index].price_change_percentage_24h;
// Created a variable list which is the table row I will append the value from price change percentage
      const list = $('<tr class="content-row table-dark"></tr>');
// Function to change the color of the value in the td price percentage change
  function colorChange() {
      if (change24 > 0) {
// Created a variable green that writes green values to the table data if values are positive
        const green = $('<td id = "change24"></td>').text((change24).toFixed(2) + " " + "%").css("color", "#25e8b4").appendTo(list);
// returns calls function colorChange and checks if the value is positive
        return green;

    } else {
// Created a variable red that writes red values to the table data if values are negative
        const red =  $('<td id = "change24"></td>').text((change24).toFixed(2) + " " + "%").css("color", "#db6081").appendTo(list);
// returns calls function colorChange and checks if the value is negative
        return red;
    }
    }
      // Using jQuery to add all information to the table with id "coinTable" in the html file.
      $('#coinTable').append(
        // inside the coinTable, I add a new table row with the rank, name, marketcap, curren_price, total_volume, circulating_supply, and price change percentage for 24h of each coin.
        $('<tr class="content-row table-dark"></tr>').append(
          // insert the rank in the new row.
          $('<td id = "rank"></td>').text(index+1),
          // insert the image in the new row using template literal and a placeholder
          $('<td id = "image"></td>').append(`<img src = "${imgCoin}" width="20" height="20">`),
          // insert the name in the new row.
          $('<td id = "name"></td>').text(coin[index].name),
          // insert the market cap in the new row.
          $('<td id = "marketCap"></td>').text((coin[index].market_cap).toLocaleString("en-GB", euroObj)),
          // insert the current price in the new row.
          $('<td id = "price"></td>').text((coin[index].current_price).toLocaleString("en-GB", euroObj)),
          // insert the total volume in the new row.
          $('<td id = "volume"></td>').text((coin[index].total_volume).toLocaleString("en-GB", euroObj)),
          // insert the circulating supply in the new row.
          $('<td id = "supply"></td>').text((coin[index].circulating_supply).toLocaleString(2)),
          // Insert the price change percentage in the row with respective color by calling the function colorChange
          colorChange(),
          )
        )
}
}
// Call function createTable
createTable();
})
