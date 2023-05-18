const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const Web3 = require("web3");
const crypto = require("crypto");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const dotenv = require("dotenv");
dotenv.config();

const {
  contractABI,
  contractAddress,
  privateKey,
  providerUrl,
} = require("./constants");

// try {
//   const provider = new HDWalletProvider([privateKey], providerUrl);
//   const web3 = new Web3(provider);
//   const contract = new web3.eth.Contract(contractABI, contractAddress);

//   console.log("Connected to the blockchain.");
// } catch (error) {
//   console.log(error);
// }

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

app.get("/store", async (req, res) => {
  try {
    const Web3 = require("web3");
    const HDWalletProvider = require("@truffle/hdwallet-provider");

    const {
      contractABI,
      contractAddress,
      privateKey,
      providerUrl,
    } = require("./constants");
    const provider = new HDWalletProvider([privateKey], providerUrl);
    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const {
      firmwareHash,
      deviceDataHash,
      subscriberHash,
      deviceGroupIdHash,
      testNo,
    } = req.query;

    // Example function call to store the number '42'
    const storeNumber = async (number) => {
      const accounts = await web3.eth.getAccounts();
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 300000;
      const tx = contract.methods
        .store(number)
        .send({ from: accounts[0], gasPrice, gasLimit });
      return tx;
    };

    // Call the function to store the number '42'
    storeNumber(testNo)
      .then((result) => {
        console.log("Transaction hash:", result.transactionHash);
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/riot-token", async (req, res) => {
  try {
    await contract.methods
      .retrieve()
      .call()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/generate-riot-key", async (req, res) => {
  try {
    const {
      firmwareHash,
      deviceDataHash,
      subscriberHash,
      deviceGroupIdHash,
      deviceId,
    } = req.body;

    // Generate a random bytes32 hash
    const key = "0x2f052ba6c8e962a69b5fc75790ecd504";

    res.status(200).json({
      key,
      body: {
        firmwareHash,
        deviceDataHash,
        subscriberHash,
        deviceGroupIdHash,
        deviceId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/hashify", async (req, res) => {
  try {
    const { contents } = req.body;
    console.log("Contents: ", contents);
    const hash = crypto.createHash("sha256").update(contents).digest("hex");
    console.log("Hash: 0x", hash);

    res.status(200).json({
      hash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/db", async (req, res) => {
  try {
    const { sensorValue, deviceId } = req.body;

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

app.get("/db", async (req, res) => {
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
