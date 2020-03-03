  import {
    buildInitialLands,
    updateLandsBuild
  } from "./lands/landsModule";
  import configsModule from "./data-modules/configsModule";
  import log from "../common/logger";
  import {getDateTime } from "../common/timestamp";
  
  export async function buildLandsDebug() {
    log("Debug Module...")
  
    const dateTime = getDateTime();
  
    // logger(dateTime)
  
  }