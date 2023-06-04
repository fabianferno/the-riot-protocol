import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contractAddress, tokenId, accessToken } = req.body;
  console.log(req.body);
  try {
    const options: any = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ contractAddress: contractAddress, tokenId: tokenId }),
    };

    fetch('https://web3.luniverse.io/v1/polygon/mumbai/nft/listNftTransferByTokenId', options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        const responseData = response.data.items.map((item: any) => {
          if (item.from == '0x0000000000000000000000000000000000000000') {
            return {
              type: 'Minted',
              fromAddress: item.from,
              toAddress: item.to,
              transactionHash: item.transactionHash,
              timestamp: item.blockTimestamp,
            };
          } else {
            return {
              type: 'Transferred',
              fromAddress: item.from,
              toAddress: item.to,
              transactionHash: item.transactionHash,
              timestamp: item.blockTimestamp,
            };
          }
        });
        res.status(200).json(responseData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error('Error getting data:', error);
    res.status(500).json({ error });
  }
}
