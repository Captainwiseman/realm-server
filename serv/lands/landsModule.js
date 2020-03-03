import utils from "./landsUtils";
import { readInitialJSONConfig } from "../data-modules/configsModule";
import dbModule from "../data-modules/dbModule";
import _ from "lodash";
import log from "../../common/logger";

const populationPerClusterOfLands = 300000;

export const buildInitialLands = async () => {
  const lands = await readInitialJSONConfig("lands");
  const shuffledLands = _.shuffle(lands);
  const dividedLands = _.chunk(shuffledLands, 6);
  const populatedDividedLands = utils.evenlyDistributePopulation(
    dividedLands,
    populationPerClusterOfLands
  );
  return populatedDividedLands;
};

export const updateLandsBuild = async () => {};

export const readLandsData = async () => {
  log("Requested Live Lands", "engine");
  return await dbModule.readAllLandsDataFromDB();
};

export default {
  buildInitialLands,
  updateLandsBuild,
  readLandsData
}