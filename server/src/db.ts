import { MongoClient } from "mongodb";

export async function getDb(dbUri: string, dbName: string) {
  console.log(`connecting to db with uri '${dbUri}'...`);
  const client = new MongoClient(dbUri);
  const conn = await client.connect();
  const db = conn.db(dbName);

  // check that the db actually exists in list of db
  const dbList = await db.admin().listDatabases();
  if (dbList.databases.some((e) => e.name === dbName)) {
    console.log(`connected to '${dbName}'`);
  } else {
    console.error("ERROR");
    throw Error(`error connecting to db '${dbName}'`);
  }
  return db;
}
