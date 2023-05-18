const contractAddress = "0x758C68fe6a5ABd67E10625ac988D9A38A36f8A61";

const contractABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceDataHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceGroupIdHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "mintDevice",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "firmwareHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceDataHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "deviceId",
            type: "address",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "sessionSalt",
            type: "bytes32",
          },
        ],
        internalType: "struct RiotV2.Device",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_subscriber",
        type: "address",
      },
    ],
    name: "setSubscriberAddress",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "firmwareHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceDataHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "deviceId",
            type: "address",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "sessionSalt",
            type: "bytes32",
          },
        ],
        internalType: "struct RiotV2.Device",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "checkIfDeviceIsMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "hashes",
        type: "bytes32[]",
      },
    ],
    name: "computeMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deviceIdToDevice",
    outputs: [
      {
        internalType: "bytes32",
        name: "firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "deviceDataHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "deviceGroupIdHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "deviceId",
        type: "address",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "sessionSalt",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "devices",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceDataHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceGroupIdHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "generateRiotKeyForDevice",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_subscriber",
        type: "address",
      },
    ],
    name: "generateRiotKeyForSubscriber",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
