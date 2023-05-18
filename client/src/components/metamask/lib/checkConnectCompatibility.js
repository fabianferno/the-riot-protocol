export default function checkConnectCompatibility(isMetamaskExists) {
  if (isMetamaskExists) {
    if (isMetamaskExists != window.ethereum) {
      console.log(
        "Multiple wallets Installed. Disable other wallets to use metamask"
      );
      return "Multiple wallets Installed. Disable other wallets to use metamask";
    } else {
      console.log("MetaMask is installed!");
      return "MetaMask is installed!";
    }
  } else {
    console.log("MetaMask is not installed!");
    return "MetaMask is not installed!";
  }
}
