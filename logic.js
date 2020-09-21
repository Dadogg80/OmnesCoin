src="https://code.jquery.com/jquery-3.5.1.min.js"

// This is the API link used to fetch all the data needed
let marketCap = "https://api.coingecko.com/api/v3/global"
let listOfCoins = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"



fetch(marketCap)
        .then( res => {
            res.json().then( data => {
                console.log(data);
                console.log(data.data.active_cryptocurrencies);


              })
        });

fetch(marketCap)
        .then( res => {
            res.json().then( data => {
                console.log(data);
                console.log(data.data.markets);


              })
        });

fetch(marketCap)
        .then( res => {
            res.json().then( data => {
                console.log(data);
                console.log(data.data.markets);


              })
        });



fetch(listOfCoins)
        .then( res => {
            res.json().then( data => {
                console.log(data[0].current_price);
                  let price = $("#bitcoin").html("BTC: " + data[0].current_price);
                  return price;

              })
        });
