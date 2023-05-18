import detectEthereumProvider from "@metamask/detect-provider";
import checkConnectCompatibility from "./checkConnectCompatibility";

export default async function getBalance(address) {
  let ethereum = await detectEthereumProvider();
  let ethereumData = checkConnectCompatibility(ethereum);
  if (ethereumData != "MetaMask is installed!") {
    return;
  }
  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  console.log("Balance: ", balance);
  return balance;
}
