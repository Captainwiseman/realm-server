import { getWorldData } from "./server-functions";
import moment from "moment";
import log from "../common/logger";
import _ from "lodash";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const CronJob = require("node-cron");

const port = 3000;

app.use(cors());

//Pulse

let pulseStatus = {
  pulseCounter: 0
};

const pulse = () => {
  pulseStatus.pulseCounter = pulseStatus.pulseCounter + 1;
  pulseStatus.lastTimestamp = moment(new Date()).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  log(
    `Tu-Tum! Pu-Pum! Pulse Number: ${pulseStatus.pulseCounter} at ${pulseStatus.lastTimestamp}`,
    "server"
  );
  // Will initiate the pulse here,
  // throwing random events and calc immediatly
};

const pulseCronTab = "0 */10 * * * *"; // Production, Every 10 Minutes
const pulseDebugCronTab = "* * * * *"; // Debug, Every Minute

CronJob.schedule(pulseCronTab, () => {
  pulse();
});

//Routes
app.get("/world", (req, res) => getWorldData(req, res));

app.get("/", (req, res) => {
  res.send("Live and Incharge...");
});

//Sockets

let activeConnectionsStatus = {
  anons: {
    quantity: 0,
    sockets: []
  }
};

io.on("connection", socket => {
  log("an Anonymous User has connected", "server");

  activeConnectionsStatus.anons.sockets.push(socket.id);
  activeConnectionsStatus.anons.quantity =
    activeConnectionsStatus.anons.sockets.length;

  log(activeConnectionsStatus, "server", "json");

  socket.on("disconnect", reason => {
    log(`an Anonymous User has disconnected: ${reason}`, "server");

    _.pull(activeConnectionsStatus.anons.sockets, socket.id);
    activeConnectionsStatus.anons.quantity =
      activeConnectionsStatus.anons.sockets.length;

    log(activeConnectionsStatus, "server", "json");
  });
});

http.listen(port, () => {
  const initialTimestamp = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
  log(`Chorus Server Initiated on ${initialTimestamp}!`, "server");
  log(`Listening on port ${port}!`, "server");
});