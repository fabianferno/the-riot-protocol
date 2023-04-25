const contractAddress = "0xD7d682C1c983B3D0747aB4DA588AfBB2f629bC0e";

const contractABI = [
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
    outputs: [],
    stateMutability: "view",
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
        internalType: "struct Riot.Device",
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
        internalType: "struct Riot.Device",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
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
