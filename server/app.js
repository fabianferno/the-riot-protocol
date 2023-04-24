const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const axios = require("axios");

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

app.get("/auth", async (req, res) => {
  try {
    const { firmwareHash, deviceDataHash, subscriberHash, deviceGroupIdHash } =
      req.query;
    const response = null;

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(parseInt(process.env.PORT || "5000"), "0.0.0.0", () => {
  console.log(`Server is listening on port ${process.env.PORT || "5000"}`);
  console.log("http://localhost:5000");
});
