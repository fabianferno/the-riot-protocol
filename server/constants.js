const contractAddress = "0x15262D7Af54f21840ABA96f0e47542C423EeDb44";

const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "burnDevice",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "struct TheRiotProtocol.Device",
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
        internalType: "struct TheRiotProtocol.Device",
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
        internalType: "bytes32[]",
        name: "hashes",
        type: "bytes32[]",
      },
    ],
    name: "getMerkleRoot",
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
];

const privateKey =
  "0x5b914da275fad3fab9d5685e4695e41282088dc203af4ed1890f91b6b24cd246";
const providerUrl = "http://192.168.1.7:7545";

module.exports = {
  contractABI,
  contractAddress,
  privateKey,
  providerUrl,
};
