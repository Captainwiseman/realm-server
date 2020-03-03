import { readEventsJSONConfig } from "../data-modules/configsModule";
const log = require("../../common/logger");

export const rollForEvents = async () => {
  const cfg = await readEventsJSONConfig();
  log(`Events, ${JSON.stringify(cfg)}`);
};
