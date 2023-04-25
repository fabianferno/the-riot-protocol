const contractAddress = "0x97079d7d0785477292B05E4471b8f4f5E29A956d";

const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const privateKey =
  "0x5b914da275fad3fab9d5685e4695e41282088dc203af4ed1890f91b6b24cd246";
const providerUrl = "http://localhost:7545";

module.exports = {
  contractABI,
  contractAddress,
  privateKey,
  providerUrl,
};
