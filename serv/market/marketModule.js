const fetch = require("node-fetch");
const AlphaVantage_API_KEY = "VARQQG8Y9U4P7UAG";
const typeOfCrypto = "ETH";

export function getGlobalCurrency() {
  const endpoint = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${typeOfCrypto}&to_currency=ILS&apikey=${AlphaVantage_API_KEY}`;
  return fetch(endpoint).then(fetchResult => {
    return fetchResult.json().then(JSONPayload => {
      if (JSONPayload.Note) {
        throw "Too many requests from Alpha Vantage, please wait";
      }
      const upToDateExchangeRate = Math.ceil(
        JSONPayload["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
      );

      return upToDateExchangeRate;
    });
  });
}
