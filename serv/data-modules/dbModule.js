import log from "../../common/logger";
import { mongoUri } from "../../_secrets";
import moment from "moment";

import { MongoClient } from "mongodb";
const uri = mongoUri;

const DATABASE_NAME = "World";

const HISTORY_COLLECTION_NAME = "History";
const REALMS_COLLECTION_NAME = "Realms";
const LANDS_COLLECTION_NAME = "Lands";

async function connectToDb() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const clientConnection = await client.connect();
  return clientConnection;
}

async function terminateConnection(client) {
  return client.close();
}

async function createHistoryEventInDb(historyEvent) {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, adding an History Event to ${HISTORY_COLLECTION_NAME} Collection`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(HISTORY_COLLECTION_NAME)
      .insertOne(historyEvent);

    return results.ops;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function readAllHistoryDataFromDB() {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, looking for all records in ${HISTORY_COLLECTION_NAME} Collection`,
    "database"
  );

  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(HISTORY_COLLECTION_NAME)
      .find({})
      .toArray();
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function deleteHistoryDataInDB() {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, REMOVING all records in ${HISTORY_COLLECTION_NAME} Collection`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(HISTORY_COLLECTION_NAME)
      .deleteMany({});
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function createRealmsDataInDB(realms) {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, creating realms in ${REALMS_COLLECTION_NAME} Collection`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(REALMS_COLLECTION_NAME)
      .insertMany(realms);

    return results.ops;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function readAllRealmsDataFromDB() {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, looking for all records in ${REALMS_COLLECTION_NAME} Collection`,
    "database"
  );

  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(REALMS_COLLECTION_NAME)
      .find({})
      .toArray();
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function updateRealmDataInDB(realm) {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, updatings all records in ${REALMS_COLLECTION_NAME} Collection`,
    "database"
  );
  try {
    const updatedRealm = await client
      .db(DATABASE_NAME)
      .collection(REALMS_COLLECTION_NAME)
      .updateOne(
        { _id: realm._id },
        {
          $set: {
            _lastUpdated: moment().format()
          }
        }
      );
    return updatedRealm;
  } catch (e) {
    log(e, "database");
  } finally {
    log("Ended", database);
    await terminateConnection(client);
  }
}

async function deleteRealmsDataInDB() {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, REMOVING all records in ${REALMS_COLLECTION_NAME} Collection`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(REALMS_COLLECTION_NAME)
      .deleteMany({});
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function createLandsDataInDB(lands) {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, creating lands in ${LANDS_COLLECTION_NAME} Collection.`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(LANDS_COLLECTION_NAME)
      .insertMany(lands);

    return results.ops;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function readAllLandsDataFromDB() {
  const client = await connectToDb();

  log(`Connecting to ${DATABASE_NAME} Database, looking for all records in ${LANDS_COLLECTION_NAME} Collection.`,
    "database"
  );

  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(LANDS_COLLECTION_NAME)
      .find({})
      .toArray();
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

async function updateLandDataInDB(land) {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, updatings all records in ${LANDS_COLLECTION_NAME} Collection.`,
    "database"
  );
  try {
    const updatedland = await client
      .db(DATABASE_NAME)
      .collection(REALMS_COLLECTION_NAME)
      .updateOne(
        { _id: land._id },
        {
          $set: {
            _lastUpdated: moment().format()
          }
        }
      );
    return updatedRealm;
  } catch (e) {
    log(e, "database");
  } finally {
    log("ended", "database");
    await terminateConnection(client);
  }
}

async function deleteLandsDataInDB() {
  const client = await connectToDb();

  log(
    `Connecting to ${DATABASE_NAME} Database, REMOVING all records in ${LANDS_COLLECTION_NAME} Collection.`,
    "database"
  );
  try {
    const results = await client
      .db(DATABASE_NAME)
      .collection(LANDS_COLLECTION_NAME)
      .deleteMany({});
    return results;
  } catch (e) {
    log(e, "database");
  } finally {
    await terminateConnection(client);
  }
}

export default {
  createHistoryEventInDb,
  readAllHistoryDataFromDB,
  deleteHistoryDataInDB,
  createRealmsDataInDB,
  readAllRealmsDataFromDB,
  updateRealmDataInDB,
  deleteRealmsDataInDB,
  createLandsDataInDB,
  readAllLandsDataFromDB,
  updateLandDataInDB,
  deleteLandsDataInDB
};
