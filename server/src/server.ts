import { config } from "dotenv";
import express from "express";
import { getDb } from "./db.js";

/* load environment variables */
config();
const PORT = process.env.PORT;
const CONN_STR = process.env.DB_URI || "";
const DB_STR = process.env.DB_NAME || "";
const DB_USER_COLLECTION = process.env.DB_USER_COLLECTION || "";

/* get DB connection */
const db = await getDb(CONN_STR, DB_STR);

/* set up express */
const app = express();

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`GET user (userId: ${userId})`);

  let collection = await db.collection(DB_USER_COLLECTION);
  let result = await collection.findOne({ userId: userId });
  if (!result) {
    res.json({ status: 404, error: "ERROR" }).status(404);
    console.error("GET error");
  } else {
    res.json(result).status(200);
  }
});

app.post("/user", async (req, res) => {
  const { userId, name, lang, money, winStreak, losingStreak } = req.body;
  console.log(`POST user (userId: ${userId})`);

  let collection = await db.collection(DB_USER_COLLECTION);
  let result = await collection.insertOne({
    userId: userId,
    name: name,
    lang: lang,
    money: money,
    winStreak: winStreak,
    losingStreak: losingStreak,
  });
  if (!result) {
    res.json({ status: 500, error: "ERROR" }).status(500);
    console.error("POST error");
  } else {
    res.json(result).status(201);
  }
});

app.put("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, lang, money, winStreak, losingStreak } = req.body;
  console.log(`PUT user (userId: ${userId})`);

  const updates = {
    $push: { name, lang, money, winStreak, losingStreak },
  };

  let collection = await db.collection(DB_USER_COLLECTION);
  let result = await collection.updateOne({ userId: userId }, updates);
  if (!result) {
    res.json({ status: 500, error: "ERROR" }).status(500);
    console.error("PUT error");
  } else {
    res.json(result).status(200);
  }
});

app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`DELETE user (userId: ${userId})`);

  const collection = db.collection(DB_USER_COLLECTION);
  let result = await collection.deleteOne({ userId: userId });
  if (!result) {
    res.json({ status: 500, error: "ERROR" }).status(500);
    console.error("DELETE error");
  } else {
    res.json(result).status(200);
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
