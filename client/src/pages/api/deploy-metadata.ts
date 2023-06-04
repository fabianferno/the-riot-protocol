import { NextApiRequest, NextApiResponse } from 'next';
import { NFTStorage } from 'nft.storage';

async function getExampleImage(image: string) {
  const r = await fetch(image);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusText}]: ${r.status}`);
  }
  return r.blob();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, groupId, deviceId, image, deviceDataHash, systemName, releaseName, chipName, chipId } = req.body;
  console.log(req.body);
  const imageBlob = await getExampleImage(image);
  try {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY! });
    const collectionMetadata = {
      name: name,
      description: `This is a IoT device NFT collection of the organization ${groupId} and tokenId ${deviceId}. `,
      image: imageBlob,
      external_url: 'https://the-riot-protocol-devx.vercel.app/',
      attributes: [
        {
          trait_type: 'Device ID',
          value: deviceId,
        },
        {
          trait_type: 'Group ID',
          value: groupId,
        },
        {
          trait_type: 'Device Data Hash',
          value: deviceDataHash,
        },
        {
          trait_type: 'System Name',
          value: systemName,
        },
        {
          trait_type: 'Release Name',
          value: releaseName,
        },
        {
          trait_type: 'Chip Name',
          value: chipName,
        },
        {
          trait_type: 'Chip ID',
          value: chipId,
        },
      ],
    };
    const collectionMetadataHash = await client.store(collectionMetadata);

    console.log('IPFS Hash of Metadata: \n', collectionMetadataHash);
    res.status(200).json({ message: 'NFT deployed successfully', hash: collectionMetadataHash });
  } catch (error) {
    // Handle any errors that occur during the deployment process
    console.error('Error deploying NFT:', error);
    res.status(500).json({ error: 'Failed to deploy NFT' });
  }
}
