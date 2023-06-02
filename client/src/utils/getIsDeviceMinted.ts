import contractCall from '../components/metamask/lib/contract-call';
import getIsGroupRegistered from './getIsGroupRegistered';

async function getIsDeviceIdMinted(
  contractAddress,
  currentAccount,
  ABI,
  hash,
  setButtonText,
  setDeviceMinted,
  chainId,
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
      await getIsGroupRegistered(contractAddress, currentAccount, ABI, hash, setButtonText);
    }
  }
}

export default getIsDeviceIdMinted;
