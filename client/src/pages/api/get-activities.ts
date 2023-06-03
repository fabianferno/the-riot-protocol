import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contractAddress, currentAccount, accessToken } = req.body;
  console.log(req.body);
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ contractAddress: contractAddress, disableCount: false }),
    };
    fetch('https://web3.luniverse.io/v1/polygon/mumbai/nft/listNftTransferByContract', options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.items);
        const returnData = response.data.items
          .filter(
            (item: any) =>
              item.to.toLowerCase() === currentAccount.toLowerCase() ||
              item.from.toLowerCase() === currentAccount.toLowerCase(),
          )
          .map((item: any) => {
            console.log(item.to, currentAccount);
            if (item.to.toLowerCase() === currentAccount.toLowerCase()) {
              if (item.from == '0x0000000000000000000000000000000000000000') {
                return {
                  type: 'Minted',
                  tokenId: item.tokenId,
                  fromAddress: item.from,
                  toAddress: item.to,
                  transactionHash: item.transactionHash,
                  timestamp: item.blockTimestamp,
                };
              } else {
                return {
                  type: 'Received',
                  tokenId: item.tokenId,
                  fromAddress: item.from,
                  toAddress: item.to,
                  transactionHash: item.transactionHash,
                  timestamp: item.blockTimestamp,
                };
              }
            } else if (item.from.toLowerCase() === currentAccount.toLowerCase()) {
              return {
                type: 'Sent',
                tokenId: item.tokenId,
                fromAddress: item.from,
                toAddress: item.to,
                transactionHash: item.transactionHash,
                timestamp: item.blockTimestamp,
              };
            }
          });
        console.log(returnData);

        res.status(200).json(returnData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  } catch (error) {
    // Handle any errors that occur during the deployment process
    console.error('Error getting data:', error);
    res.status(500).json({ error });
  }
}
