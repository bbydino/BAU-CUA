import express from "express";

const app = express();
const PORT = 6969;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
