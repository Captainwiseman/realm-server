const chalk = require("chalk");

const logOrigins = {
  database: chalk.white.bgGreen.bold,
  server: chalk.white.bgBlack.bold,
  cli: chalk.white.bgCyan.bold,
  engine: chalk.white.bgBlue.bold,
  debug: chalk.white.bgRed.bold
};

function log(log, origin = "debug", type = "default") {
  const output = type === "json" ? JSON.stringify(log) : log;

  console.info(logOrigins[origin](output));
}

export default log;
