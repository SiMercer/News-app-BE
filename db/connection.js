const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

// Load the correct .env file once
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const db = new Pool(config);

module.exports = db;
