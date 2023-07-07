const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const databasePath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDatabase = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at https:localhost.com/books/");
    });
  } catch (e) {
    console.log(`Database error ${e.message}`);
    process.exit(1);
  }
};
initializeDatabase();

app.get("/books/", async (request, response) => {
  const query = `SELECT * FROM book ORDER BY book_id;`;
  const responsed = await db.all(query);
  response.send(responsed);
});
