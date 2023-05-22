const contractAddress = "0x1FA3bd42da66fdC0B343FA723D12b71F926AB948";
const contractABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "_firmwareHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceDataHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceGroupIdHash", type: "bytes32" },
      { internalType: "address", name: "_deviceId", type: "address" },
    ],
    name: "generateRiotKeyForDevice",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_deviceId", type: "address" }],
    name: "generateRiotKeyForSubscriber",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_deviceId", type: "address" }],
    name: "getDevice",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "firmwareHash", type: "bytes32" },
          { internalType: "bytes32", name: "deviceDataHash", type: "bytes32" },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          { internalType: "address", name: "deviceId", type: "address" },
          { internalType: "address", name: "subscriber", type: "address" },
          { internalType: "bytes32", name: "sessionSalt", type: "bytes32" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "bool", name: "exists", type: "bool" },
        ],
        internalType: "struct TheRiotProtocol.Device",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDevicesCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_deviceGroupIdHash", type: "bytes32" },
    ],
    name: "getGroupContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32[]", name: "hashes", type: "bytes32[]" }],
    name: "getMerkleRoot",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_deviceId", type: "address" }],
    name: "isDeviceMinted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_deviceGroupIdHash", type: "bytes32" },
    ],
    name: "isGroupRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_firmwareHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceDataHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceGroupIdHash", type: "bytes32" },
      { internalType: "address", name: "_deviceId", type: "address" },
      { internalType: "string", name: "_uri", type: "string" },
    ],
    name: "mintDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "bytes32", name: "_firmwareHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceDataHash", type: "bytes32" },
      { internalType: "bytes32", name: "_deviceGroupIdHash", type: "bytes32" },
      { internalType: "address", name: "_deviceId", type: "address" },
      { internalType: "string", name: "_uri", type: "string" },
    ],
    name: "registerGroup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_deviceId", type: "address" },
      { internalType: "address", name: "_subscriber", type: "address" },
    ],
    name: "setSubscriberAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_firmwareHash", type: "bytes32" },
      { internalType: "address", name: "_deviceId", type: "address" },
    ],
    name: "updateFirmware",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = {
  contractABI,
  contractAddress,
};
