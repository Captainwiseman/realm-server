import * as dataFunctions from "./worldModule";
import log from "../common/logger"

export async function getWorldData(req, res) {
  log("Requesting Realms...", "server");
  const world = await dataFunctions.readWorld();

  return res.json(world);
}