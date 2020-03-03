import utils from "./realmsUtils";
import { readInitialJSONConfig } from "../data-modules/configsModule";
import dbModule from "../data-modules/dbModule";
import log from "../../common/logger";
import _ from "lodash";
import { buildWorld } from "../worldModule";

export const buildInitialRealms = async extraRealmDetails => {
  const realmsRaw = await readInitialJSONConfig("realms");
  const buildFor = extraRealmDetails.numberOfPlayers

  // Will Add the ability to create and distribute players around realms
  // depends on the number of players and choosen groups
  const numberOfActiveRealms = buildWorld
  const numberOfLandsPerRealm = buildFor

  let lands = extraRealmDetails.lands;

  const realmsBuilt = realmsRaw.map(realm => {
    realm.ownedLands = _.take(lands, 6);
    lands = _.drop(lands, 6);

    realm.overallPopulation = _.sumBy(realm.ownedLands, land => {
      return land.population;
    });
    return realm;
  });

  return realmsBuilt;
};

export const updateRealmsBuild = async currentRealms => {
  const uptoDateRealms = await Promise.all();

  return uptoDateRealms;
};

export const readRealmsData = async () => {
  log("Requested Live Realms", "engine");
  return await dbModule.readAllRealmsDataFromDB();
};

export default {
  buildInitialRealms,
  updateRealmsBuild,
  readRealmsData
}