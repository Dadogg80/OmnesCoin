
$(document).ready(function() {

//Global object toLocaleString method to format the data into a currency string
const euroObj = {
        style: "currency",
        currency: "EUR"
        }

//Created a funtction that get a API response from coingecko and return the response as a JSON file.
function getData(){
  // variable url is the url for the API we can to call
  let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&per_page=100&page=0";
  // return initiates/ call function fetch(url) and gets the response.json in return from the fetch(url) function call.
  return fetch(url)
  .then(res => {
      return res.json();
  })
  .catch (err => {
    console.log(err);
  });
  }

//Created Async function for creating the table of all coins.
async function createTable () {
// Created a variable coin that is binded to the response.json returned from the getData() function.
    let coin = await getData();

    for(let index = 0; index < 100; index ++){
// Created a variable to find the image of each coin
      let imgCoin = coin[index].image;

      console.log(imgCoin);

      //adding all information to the table with id "coinTable" in the html file.
      $('#coinTable').append(
        // inside the coinTable, add a new table row with the rank, name, marketcap, curren_price, total_volume, circulating_supply, and price change presentage for 24h of each coin.
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
          // insert the 24 hopur change in the new row.
          $('<td id = "change24"></td>').text((coin[index].price_change_percentage_24h).toFixed(2) + " " + "%"),
        )
)
}
}
createTable();






})
