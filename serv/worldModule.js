import { rollForEvents } from "./events/eventsModule";
import realmsModule from "./realms/realmsModule";
import landsModule from "./lands/landsModule";
import { getGlobalCurrency } from "./market/marketModule";
import dbModule from "./data-modules/dbModule";
import log from "../common/logger";
import {getDateTime } from "../common/timestamp";
import _ from "lodash";

export async function buildWorld(numberOfPlayers) {
  log("Tabula Raassa...", 'engine');
  log(`Building a New World for ${numberOfPlayers} Players...`, 'engine');

  const dateTime = getDateTime();
  const globalCurrency = await getGlobalCurrency();

  const lands = await createLandsAndDeployToDatabase();

  const extraRealmDetails = {
    lands,
    numberOfPlayers
  };

  const realms = await createRealmsAndDeployToDatabase(extraRealmDetails);

  const genesis = {
    puleNumber: "genesis",
    dateTime,
    numberOfPlayers,
    _game: {
      _realms: realms,
      _lands: lands,
      _world: {
        worldEvents: [],
        globalCurrency
      }
    }
  };

  await dbModule.deleteHistoryDataInDB();
  const genesisInDb = dbModule.createHistoryEventInDb(genesis);
  log("Let there be... Pulse", 'engine');

  return genesisInDb;
}

export async function readWorld() {
  const history = await dbModule.readAllHistoryDataFromDB();
  return history;
}

export async function initiateAnUpdatePulse() {
  const upToDateRealms = await updateRealms();
  const events = await rollForEvents();
}

export async function createRealmsAndDeployToDatabase(extraRealmDetails) {
  const checkForCurrentRealms = await realmsModule.readRealmsData();
  if (checkForCurrentRealms.length > 0) {
    await dbModule.deleteRealmsDataInDB();
  }

  const createdRealms = await realmsModule.buildInitialRealms(extraRealmDetails);
  const realmsInDb = await dbModule.createRealmsDataInDB(createdRealms);
  return realmsInDb;
}

export async function updateRealms() {
  const currentRealms = await realmsModule.readRealmsData();
  const upToDateRealms = await realmsModule.updateRealmsBuild(currentRealms);

  const updatedRealmsInDb = await upToDateRealms.map(async realm => {
    const updatedRealm = await dbModule.updateRealmDataInDB(realm);
    return updatedRealm;
  });

  return updatedRealmsInDb;
}

export async function createLandsAndDeployToDatabase() {
  const createdLands = await landsModule.buildInitialLands();
  const currentLands = await landsModule.readLandsData();
  if (currentLands.length > 0) {
    await dbModule.deleteLandsDataInDB();
  }
  const landsReadyForDb = _.flattenDeep(createdLands);
  const landsInDb = await dbModule.createLandsDataInDB(landsReadyForDb);
  return landsInDb;
}
