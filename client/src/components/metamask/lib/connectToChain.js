import detectEthereumProvider from '@metamask/detect-provider';
import checkConnectCompatibility from './checkConnectCompatibility';

export default async function connectToChain({ chainId, rpc, name, coinName, explorerURL, icon }) {
  let ethereum = await detectEthereumProvider();
  let ethereumData = checkConnectCompatibility(ethereum);
  if (ethereumData != 'MetaMask is installed!') {
    return;
  }
  console.log('Switching chain....');
  console.log('Received data: ' + chainId + ' ' + rpc);
  const hexChainId = `0x${chainId.toString(16)}`;
  try {
    await switchToChain(hexChainId);
    return {
      chainId,
      rpc,
      name,
      coinName,
      explorerURL,
      icon,
    };
  } catch (e) {
    console.log('CAUGHT');
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            rpcUrls: [rpc],
            chainName: name,
            nativeCurrency: {
              name: coinName,
              symbol: coinName,
              decimals: 18,
            },
            blockExplorerUrls: [explorerURL],
          },
        ],
        jsonrpc: '2.0',
        id: 1,
      });
      await switchToChain(hexChainId);
      return {
        chainId,
        rpc,
        name,
        coinName,
        explorerURL,
        icon,
      };
    } catch (e) {
      console.log(e);
      return {
        chainId: 0,
        rpc: '',
        name: '',
        coinName: '',
        explorerURL: '',
        icon: '',
      };
    }
  }
}

async function switchToChain(chainId) {
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId }],
    jsonrpc: '2.0',
    id: 1,
  });
}
