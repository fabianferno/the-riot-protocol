const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const {
  contractABI,
  contractAddress,
  privateKey,
  providerUrl,
} = require("./constants");

const db = new sqlite3.Database("./riot.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the riot database.");
});

const provider = new HDWalletProvider([privateKey], providerUrl);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

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

app.get("/store", async (req, res) => {
  try {
    const {
      firmwareHash,
      deviceDataHash,
      subscriberHash,
      deviceGroupIdHash,
      testNo,
    } = req.query;

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

app.post("/sensor-values", async (req, res) => {
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
        res.json({ status: "success" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/retrieve", async (req, res) => {
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

app.get("/test", async (req, res) => {
  try {
    const {
      firmwareHash,
      deviceDataHash,
      subscriberHash,
      deviceGroupIdHash,
      deviceId,
    } = req.query;

    // Generate a random bytes32 hash
    const key = web3.utils.randomHex(16);

    res.status(200).json({ key });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(parseInt(process.env.PORT || "5000"), "0.0.0.0", () => {
  console.log(`Server is listening on port ${process.env.PORT || "5000"}`);
  console.log("http://localhost:5000");
});
