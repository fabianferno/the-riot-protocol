export default async function getAccounts(provider) {
  try {
    const accounts = await provider.request({ method: "eth_accounts" });
    return accounts;
  } catch (err) {
    console.log(err);
    return [];
  }
}
