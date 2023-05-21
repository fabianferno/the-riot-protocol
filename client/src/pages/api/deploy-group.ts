import { NextApiRequest, NextApiResponse } from 'next';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the required data from the request body
  const { name, symbol } = req.body;
  const RIOT_CONTRACT = '';
  try {
    // Create an instance of Auth and SDK with the provided credentials
    const auth = new Auth({
      projectId: process.env.INFURA_API_KEY,
      secretId: process.env.INFURA_API_KEY_SECRET,
      privateKey: process.env.WALLET_PRIVATE_KEY,
      chainId: 80001,
    });
    const sdk = new SDK(auth);
    const newContract = await sdk.deploy({
      template: TEMPLATES.ERC721Mintable,
      params: {
        name,
        symbol,
        contractURI: 'https://bafkreickhtgvmkibcufhfoopnvsaryu7jmvik3e5w333r7i2xoahcxqsoi.ipfs.nftstorage.link/',
      },
    });
    console.log('contract address: \n', newContract.contractAddress);
    // Perform the NFT deployment using the sdk
    // ...
    // Add your deployment logic here

    // Return a success response
    res.status(200).json({ message: 'NFT deployed successfully', address: newContract.contractAddress });
  } catch (error) {
    // Handle any errors that occur during the deployment process
    console.error('Error deploying NFT:', error);
    res.status(500).json({ error: 'Failed to deploy NFT' });
  }
}
