
$(document).ready(function() {

//Global object toLocaleString method to format the data into a currency string
const euroObj = {
        style: "currency",
        currency: "EUR"
        }
        // variable url is the url for the API we can to call
        const coinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&per_page=100&page=0";
        const globalUrl = "https://api.coingecko.com/api/v3/global"

        // Created an async function to get the global data
        async function getGlobal() {
          const response = await fetch(globalUrl);
          const data = await response.json();

          // Create variables taking values from Object
          let markets = data.data.markets;
          let activeCrypto = data.data.active_cryptocurrencies;


          console.log(markets);
          console.log(activeCrypto);
          console.log(data);

          // Adding information to the flex box
          document.getElementById("mark").textContent = markets;
          document.getElementById("currencies").textContent = activeCrypto.toLocaleString(2);


        }
        getGlobal();


        //Created a funtction that get a API response from coingecko and return the response as a JSON file.
        function getDataCoins(){
          // return initiates/ call function fetch(url) and gets the response.json in return from the fetch(url) function call.
          return fetch(coinsUrl)
          .then(res => {
              return res.json();
          })
          .catch (err => {
            console.log(err);
          });
          }
          getDataCoins();

        //Created Async function for creating the table of all coins.
        async function createTable () {
        // Created a variable coin that is binded to the response.json returned from the getData() function.
            let coin = await getDataCoins();

            for(let index = 0; index < 100; index ++){
        // Created a variable to find the image of each coin
              let imgCoin = coin[index].image;
              let change24 = coin[index].price_change_percentage_24h;



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
                $('<td id = "change24"></td>').text((change24).toFixed(2) + " " + "%"),


              )
)
}
}
createTable();
})
