const express = require("express");
const axios = require("axios");
const Papa = require("papaparse");

const router = express();

router.get("/csv-data", async (req, res) => {
  const csvUrl =
    "https://raw.githubusercontent.com/aistico-jhr/maltasdatagen/master/month_of_sample_data_room1.csv"; // Provided CSV URL

  try {
    const response = await axios.get(csvUrl);

    const csvData = response.data;

    const results = Papa.parse(csvData, {
      header: true,
    });
    res.json({ results });
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    res.status(500).json({ error: "Failed to fetch or parse CSV" });
  }
});

module.exports = router;
