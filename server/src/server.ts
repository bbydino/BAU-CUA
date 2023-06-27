import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { getDb } from "./db.js";

/* load environment variables */
config();
const PORT = process.env.PORT;
const CONN_STR = process.env.DB_URI || "";
const DB_STR = process.env.DB_NAME || "";
const DB_USER_COLLECTION = process.env.DB_USER_COLLECTION || "";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/* get DB connection */
const db = await getDb(CONN_STR, DB_STR);

/* set up express with CORS */
const app = express();
app.use(cors());

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`GET user (userId: ${userId})`);

  try {
    let collection = await db.collection(DB_USER_COLLECTION);
    let result = await collection.findOne({ userId: userId });
    if (result) {
      res.status(200).json(result);
    } else {
      throw new Error("GET error");
    }
  } catch (e) {
    console.error(e);
    res.status(404).json({ status: 404, error: "ERROR" });
  }
});

app.post("/user/:userId/login", bodyParser.json(), async (req, res) => {
  const { userId, password } = req.body;
  console.log(`GET user (userId: ${userId}, password: ${password})`);

  try {
    let collection = await db.collection(DB_USER_COLLECTION);
    let result = await collection.findOne({ userId: userId });

    // check that account hash matches input password hash
    if (result && (await bcrypt.compare(password, result.hash))) {
      res.status(200).json(result);
    } else {
      throw new Error("GET error");
    }
  } catch (e) {
    console.error(e);
    res.status(404).json({ status: 404, error: "ERROR" });
  }
});

app.post("/user", bodyParser.json(), async (req, res) => {
  const { userId, name, password, lang, money, winStreak, losingStreak } =
    req.body;
  console.log(`POST user`, req.body);

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    let collection = await db.collection(DB_USER_COLLECTION);
    let result = await collection.insertOne({
      userId: userId,
      name: name,
      hash: hash,
      lang: lang,
      money: money,
      winStreak: winStreak,
      losingStreak: losingStreak,
    });
    if (result) {
      res.status(201).json(result);
    } else {
      throw new Error("POST error");
    }
  } catch (e) {
    console.error(e);
    res.status(409).json({ status: 409, error: "ERROR" });
  }
});

app.put("/user/:userId", bodyParser.json(), async (req, res) => {
  const { userId } = req.params;
  const { name, lang, money, winStreak, losingStreak } = req.body;
  console.log(`PUT user (userId: ${userId})`, req.body);

  try {
    const updates = {
      $set: {
        name: name,
        lang: lang,
        money: money,
        winStreak: winStreak,
        losingStreak: losingStreak,
      },
    };

    let collection = await db.collection(DB_USER_COLLECTION);
    let result = await collection.updateOne({ userId: userId }, updates);
    if (result) {
      res.status(200).json(result);
    } else {
      throw new Error("PUT error");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 500, error: "ERROR" });
  }
});

app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`DELETE user (userId: ${userId})`);

  try {
    const collection = db.collection(DB_USER_COLLECTION);
    let result = await collection.deleteOne({ userId: userId });
    if (result) {
      res.status(200).json(result);
    } else {
      throw new Error("DELETE error");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 500, error: "ERROR" });
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
