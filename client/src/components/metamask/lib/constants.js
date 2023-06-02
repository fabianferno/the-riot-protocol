const RIOT_RPC_URL = process.env.RIOT_RPC_URL || 'https://riot-rpc-server.adaptable.app';

const riotDeviceImages = [
  'https://bafkreidmkpibpkguvrnzuqgmudacxji4fl6g437wrtb74t5uliqihuhede.ipfs.nftstorage.link/',
  'https://bafkreibufkhlr6kaq4mhb4tpczbwtzm7jx2q7nrnwed2ndk6klrv6da54u.ipfs.nftstorage.link/',
  'https://bafybeideoqd4mya6div4c3drz3sfq5kbrp2p6mytcbwh6gpvgvexwf7wl4.ipfs.nftstorage.link/',
  'https://bafybeice6wite46sx5ztubkuafmxhjmacq6iivhlvl23fokf6ql3mqwc44.ipfs.nftstorage.link/',
];
const zkEVMContractAddress = '0xf04a238705B726Bcb1eeC39d8B7529944376C6c3';
const mumbaiContractAddress = '0x1FA3bd42da66fdC0B343FA723D12b71F926AB948';
const ABI = [
  {
    inputs: [
      { internalType: 'bytes32', name: '_firmwareHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceDataHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceGroupIdHash', type: 'bytes32' },
      { internalType: 'address', name: '_deviceId', type: 'address' },
    ],
    name: 'generateRiotKeyForDevice',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_deviceId', type: 'address' }],
    name: 'generateRiotKeyForSubscriber',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_deviceId', type: 'address' }],
    name: 'getDevice',
    outputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'firmwareHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'deviceDataHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'deviceGroupIdHash', type: 'bytes32' },
          { internalType: 'address', name: 'deviceId', type: 'address' },
          { internalType: 'address', name: 'subscriber', type: 'address' },
          { internalType: 'bytes32', name: 'sessionSalt', type: 'bytes32' },
          { internalType: 'address', name: 'nftContract', type: 'address' },
          { internalType: 'bool', name: 'exists', type: 'bool' },
        ],
        internalType: 'struct TheRiotProtocol.Device',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDevicesCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '_deviceGroupIdHash', type: 'bytes32' }],
    name: 'getGroupContract',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32[]', name: 'hashes', type: 'bytes32[]' }],
    name: 'getMerkleRoot',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_deviceId', type: 'address' }],
    name: 'isDeviceMinted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '_deviceGroupIdHash', type: 'bytes32' }],
    name: 'isGroupRegistered',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: '_firmwareHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceDataHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceGroupIdHash', type: 'bytes32' },
      { internalType: 'address', name: '_deviceId', type: 'address' },
      { internalType: 'string', name: '_uri', type: 'string' },
    ],
    name: 'mintDevice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'bytes32', name: '_firmwareHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceDataHash', type: 'bytes32' },
      { internalType: 'bytes32', name: '_deviceGroupIdHash', type: 'bytes32' },
      { internalType: 'address', name: '_deviceId', type: 'address' },
      { internalType: 'string', name: '_uri', type: 'string' },
    ],
    name: 'registerGroup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_deviceId', type: 'address' },
      { internalType: 'address', name: '_subscriber', type: 'address' },
    ],
    name: 'setSubscriberAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: '_firmwareHash', type: 'bytes32' },
      { internalType: 'address', name: '_deviceId', type: 'address' },
    ],
    name: 'updateFirmware',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const chains = [
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
    name: 'Polygon zkEVM Testnet',
    chainId: 1442,
    coinName: 'ETH',
    icon: '/polygon.png',
    rpc: 'https://rpc.public.zkevm-test.net',
    isMainnet: false,
    blockExplorer: 'https://explorer.public.zkevm-test.net',
  },
];
export { zkEVMContractAddress, mumbaiContractAddress, ABI, chains, RIOT_RPC_URL, riotDeviceImages };
