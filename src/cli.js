import arg from "arg";
import { startServer } from "./cli-functions";
import * as dataFunctions from "../serv/worldModule";
import * as debug from "../serv/debug";
import log from "../common/logger";
import { validateNumberOfPlayers } from "../common/handlers";
import logger from "../common/logger";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--help": Boolean,
      "--start": Boolean,
      "--details": Boolean,
      "--update": Boolean,
      "--build": Boolean,
      "--debug": Boolean,
      "-b": "--build",
      "-u": "--update"
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    help: args["--help"] || false,
    start: args["--start"] || false,
    details: args["--details"] || false,
    update: args["--update"] || false,
    build: args["--build"] || false,
    debug: args["--debug"] || false,
    extraInput: args._[0]
  };
}
export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  log(options, "cli", "json");

  if (options.help) {
    log(
      {
        "--help": "Display Commands",
        "--start": "Starts the Server",
        "--details": "Gets World Log",
        "--update": "Gets online World Log",
        "--build": "Reset and Build Initial World"
      },
      "cli",
      "json"
    );
  }
  if (options.start) {
    startServer();
  }
  if (options.details) {
    const world = await dataFunctions.readWorld();
    log(`World State:, ${JSON.stringify(world)}`);
  }
  if (options.build) {
    const maximumNumberOfPlayers = 12; // Need to extract these to a worldCfg file
    const defaultNumberOfPlayers = 12;

    let numberOfPlayers = options.extraInput
      ? options.extraInput
      : defaultNumberOfPlayers;
    numberOfPlayers = validateNumberOfPlayers(
      numberOfPlayers,
      maximumNumberOfPlayers
    );
    numberOfPlayers = numberOfPlayers
      ? numberOfPlayers
      : defaultNumberOfPlayers;

    const world = await dataFunctions.buildWorld(numberOfPlayers);
    log("GENESIS", "cli");
  }

  if (options.update) {
    await dataFunctions.initiateAnUpdatePulse();
  }
  if (options.debug) {
    await debug.buildLandsDebug();
  }
}
