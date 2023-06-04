const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const Web3 = require("web3");
const crypto = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

// WEB3 CONFIG
const {
  zkEVMContractAddress,
  mumbaiContractAddress,
  zkEVMABI,
  mumbaiABI,
  chains,
} = require("./constants");
const { getEnabledCategories } = require("trace_events");

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the riot database.");
});

// Add the error handler middleware function to the app's middleware stack
app.use((err, req, res, next) => {
  console.error(err); // Log the error to the console

  // Set the response status code based on the error
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500); // Internal server error
  }

  // Send a JSON response with the error message
  res.json({ error: err.message });
});

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post("/generate-riot-key-for-device", async (req, res) => {
  try {
    const {
      firmwareHash,
      deviceDataHash,
      deviceGroupIdHash,
      deviceId,
      chainId,
    } = req.body[0];

    let chain = chains.filter((c) => c.chainId === parseInt(chainId))[0];

    const web3 = new Web3(chain.rpc);
    const contract = new web3.eth.Contract(chain.abi, chain.contract);

    let key = await contract.methods
      .generateRiotKeyForDevice(
        firmwareHash,
        deviceDataHash,
        deviceGroupIdHash,
        deviceId
      )
      .call();
    riotKey = "0x" + key.substr(2, 32);
    res.status(200).json({
      key: riotKey,
      // key: "0x2f052ba6c8e962a69b5fc75790ecd504",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/hashify", async (req, res) => {
  try {
    const { contents } = req.body;
    // console.log("Contents: ", contents);
    const hash = crypto.createHash("sha256").update(contents).digest("hex");
    // console.log("Hash: 0x", hash);

    res.status(200).json({
      hash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/data", async (req, res) => {
  try {
    const { sensorValue, deviceId } = req.body;

    console.log(req.body);

    db.run(
      "INSERT INTO sensor_data (deviceId, sensorValue) VALUES (?, ?)",
      [deviceId, sensorValue],
      function (err) {
        if (err) {
          console.error(err.message);
          res.status(500).send("Internal server error");
        }
        // Return the record as response
        db.get(
          `SELECT * FROM sensor_data WHERE id = ${this.lastID}`,
          (err, row) => {
            if (err) {
              console.error(err.message);
              res.status(500).send("Internal server error");
            }
            res.status(200).json(row);
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    // Return the record as response
    db.all(`SELECT * FROM sensor_data`, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/flush", async (req, res) => {
  try {
    // Delete all records
    db.run(`DELETE FROM sensor_data`, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/time-util-midnight-timmestamp", async (req, res) => {
  try {
    // Get the current timestamp
    const endTime = Date.now();

    // Get the timestamp of 12 AM (midnight) of the current day
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startTime = currentDate.getTime();

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    res.status(200).json({
      startTime,
      endTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/web3-config", async (req, res) => {
  try {
    res.status(200).json({
      zkEVMContractAddress,
      mumbaiContractAddress,
      zkEVMABI,
      mumbaiABI,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Listen with error handler
const server = app.listen(
  parseInt(process.env.PORT || "5000"),
  "0.0.0.0",
  () => {
    console.log(`Server is listening on port ${process.env.PORT || "5000"}`);
    console.log("http://localhost:5000");
  }
);

server.on("error", (err) => {
  console.error(err);
});
