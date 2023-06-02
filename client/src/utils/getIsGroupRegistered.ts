import contractCall from '../components/metamask/lib/contract-call';

async function getIsGroupRegistered(contractAddress, currentAccount, ABI, hash, setButtonText, chainId) {
  console.log('CHAIN ID!!!!', chainId);
  if (chainId == 80001) return;
  if (hash != '') {
    const isRegistered = await contractCall(
      contractAddress,
      currentAccount,
      ABI,
      [hash],
      0,
      'isGroupRegistered(bytes32)',
      true,
    );

    if (isRegistered) {
      setButtonText('Mint Device');
    } else {
      setButtonText('Register and Mint Device');
    }
  }
}
export default getIsGroupRegistered;
