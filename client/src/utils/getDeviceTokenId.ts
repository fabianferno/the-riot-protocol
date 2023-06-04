import contractCall from '../components/metamask/lib/contract-call';

async function getDeviceTokenId(contractAddress: any, currentAccount: any, ABI: any, setDeviceId: any) {
  const deviceTokenId = await contractCall(contractAddress, currentAccount, ABI, [], 0, 'getDevicesCount()', true);
  console.log('DEVICE TOKENID !!!!  ', deviceTokenId);
  setDeviceId(deviceTokenId.toString());
}

export default getDeviceTokenId;
