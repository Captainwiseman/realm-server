const fs = require("fs");
const path = require("path");
const moment = require("moment");
const log = require("../../common/logger");

const filesPaths = {
  _default: path.join(__dirname, "../cfg"),
};

const initialCfgFiles = {
  realms: "realmsConfig.json",
  lands: "landsConfig.json"
}

const realmFiles = {
  _default: "realmsConfig.json",
};

const eventsFiles = {
  _default: "eventsConfig.json"
}

const readEventsJSONConfig = async () => {
  const file = eventsFiles._default;
  const filePath = filesPaths._default;

  const eventsJSON = fs.readFileSync(`${filePath}/${file}`);
  const eventsObject = await JSON.parse(eventsJSON);
  return eventsObject;
};

const readInitialJSONConfig = async (fileName) => {
  const file = initialCfgFiles[fileName];
  const filePath = filesPaths._default;

  const rawJSON = fs.readFileSync(`${filePath}/${file}`);
  const parsedObject = await JSON.parse(rawJSON);
  return parsedObject;
};

module.exports = {
  readEventsJSONConfig,
  readInitialJSONConfig
};
