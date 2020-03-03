const fetch = require("node-fetch");
const log = require("../../common/logger");
const _ = require ("lodash")
const secrets = require("../../_secrets")

const AlphaVantage_API_KEY = secrets.alphaVantageKey;

const sizeOfRealms = 30;

const getLiveCommonPopulationUpdate = typeOfCrypto => {
  const endpoint = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${typeOfCrypto}&to_currency=ILS&apikey=${AlphaVantage_API_KEY}`;
  return fetch(endpoint).then(fetchResult => {
    return fetchResult.json().then(JSONPayload => {
      if (JSONPayload.Note) {
        throw "Too many requests from Alpha Vantage, please wait";
      }
      const upToDateExchangeRate =
        JSONPayload["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

      return upToDateExchangeRate;
    });
  });
};

const generateCommonPopulation = async realmPower => {
  const upToDateExchangeRate = await getLiveCommonPopulationUpdate(
    realmPower.typeOfCrypto
  );
  const roundedExchangeRate = Math.ceil(upToDateExchangeRate);
  const commonPopulationWithGameValues =
    roundedExchangeRate * realmPower.rank * sizeOfRealms;

  return commonPopulationWithGameValues;
};

const getUpdateInCommonPopulation = realm => {
  const liveCommonPopulation = generateCommonPopulation(realm.power);

  return realm.population.common - liveCommonPopulation;
};

module.exports = {
  generateCommonPopulation,
  getUpdateInCommonPopulation,
};
