const RIOT_RPC_URL = 'http://192.168.43.141:5000';

const contractAddress = '0x3BB59Fa798A14A56E6fcDCBb8373d27F5Ec2dbF9';
const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'burnDevice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceDataHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceGroupIdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'mintDevice',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'firmwareHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceDataHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceGroupIdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'deviceId',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'sessionSalt',
            type: 'bytes32',
          },
        ],
        internalType: 'struct TheRiotProtocol.Device',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_subscriber',
        type: 'address',
      },
    ],
    name: 'setSubscriberAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'firmwareHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceDataHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceGroupIdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'deviceId',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'sessionSalt',
            type: 'bytes32',
          },
        ],
        internalType: 'struct TheRiotProtocol.Device',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'deviceIdToDevice',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'deviceDataHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'deviceGroupIdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'deviceId',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'subscriber',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'sessionSalt',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'devices',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceDataHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceGroupIdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'generateRiotKeyForDevice',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'generateRiotKeyForSubscriber',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'hashes',
        type: 'bytes32[]',
      },
    ],
    name: 'getMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
const chains = [
  // {
  //   name: 'Ethereum Mainnet',
  //   chainId: 1,
  //   icon: '/ethereum.png',
  //   rpc: 'https://mainnet.infura.io/v3/',
  //   isMainnet: true,
  //   coinName: 'ETH',
  //   blockExplorer: 'https://etherscan.io/',
  // },
  // {
  //   name: 'Polygon Mainnet',
  //   chainId: 137,
  //   icon: '/polygon.png',
  //   rpc: 'https://polygon-rpc.com/',
  //   coinName: 'MATIC',
  //   isMainnet: true,
  //   blockExplorer: 'https://polygonscan.com/',
  // },
  // {
  //   name: 'Gnosis Mainnet',
  //   chainId: 100,
  //   coinName: 'xDAI',
  //   icon: '/gnosis.png',
  //   rpc: 'https://rpc.gnosischain.com',
  //   isMainnet: true,
  //   blockExplorer: 'https://gnosisscan.io/',
  // },
  // {
  //   name: 'Goerli Testnet',
  //   chainId: 5,
  //   coinName: 'tETH',
  //   icon: '/ethereum.png',
  //   rpc: 'https://rpc.ankr.com/eth_goerli',
  //   isMainnet: false,
  //   blockExplorer: 'https://goerli.etherscan.io/',
  // },
  {
    name: 'Mumbai Testnet',
    chainId: 80001,
    coinName: 'tMATIC',
    icon: '/polygon.png',
    rpc: 'https://matic-mumbai.chainstacklabs.com',
    isMainnet: false,
    blockExplorer: 'https://mumbai.polygonscan.com/',
  },
  {
    name: 'Ganache Testnet',
    chainId: 5777,
    icon: '/ganache.png',
    rpc: 'http://192.168.1.7:7545',
    coinName: 'tETH',
    isMainnet: false,
    blockExplorer: '',
  },
  // {
  //   name: 'Chiado Testnet',
  //   chainId: 10200,
  //   icon: '/gnosis.png',
  //   rpc: 'https://rpc.chiado.gnosis.gateway.fm',
  //   coinName: 'txDAI',
  //   isMainnet: false,
  //   blockExplorer: 'https://blockscout.chiadochain.net/',
  // },
];
export { contractAddress, ABI, chains, RIOT_RPC_URL };
