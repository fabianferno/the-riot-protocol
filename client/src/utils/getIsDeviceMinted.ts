import contractCall from '../components/metamask/lib/contract-call';
import getIsGroupRegistered from './getIsGroupRegistered';

async function getIsDeviceIdMinted(
  contractAddress: any,
  currentAccount: any,
  ABI: any,
  hash: any,
  setButtonText: any,
  setDeviceMinted: any,
  chainId: any,
) {
  if (hash != '') {
    const isDeviceMinted = await contractCall(
      contractAddress,
      currentAccount,
      ABI,
      [hash],
      0,
      chainId == 80001 ? 'isDeviceMinted(uint)' : 'isDeviceMinted(address)',
      true,
    );
    console.log(isDeviceMinted);
    if (isDeviceMinted == 'Invalid Params') {
      setButtonText('Invalid Device ID');
    } else if (isDeviceMinted == true) {
      setButtonText('Device already minted');
      setDeviceMinted(true);
    } else if (isDeviceMinted == false) {
      await getIsGroupRegistered(contractAddress, currentAccount, ABI, hash, setButtonText, chainId);
    }
  }
}

export default getIsDeviceIdMinted;
