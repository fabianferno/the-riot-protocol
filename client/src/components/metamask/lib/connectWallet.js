export default async function connectWallet(ethereum) {
  try {
    let accounts = await ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
    console.log("Accounts:");
    console.log(accounts);
    return accounts;
  } catch (err) {
    console.log(err);
    return [];
  }
}
