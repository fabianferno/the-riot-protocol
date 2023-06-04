import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nodeId, accessKey, secretKey } = req.body;

  console.log('Config: ', nodeId, accessKey, secretKey);
  console.log(req.body);
  try {
    const authOptions: any = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        accept: 'application/json',
        'X-NODE-ID': nodeId,
        'X-Key-ID': accessKey,
        'X-Key-Secret': secretKey,
      },
    };
    fetch('https://web3.luniverse.io/v1/auth-token', authOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log('RESPONSE!!!!!!! ' + JSON.stringify(response));
        res.status(200).json({ accessToken: response.access_token });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err });
      });
  } catch (error) {
    // Handle any errors that occur during the deployment process
    console.error('Error getting access Token:', error);
    res.status(500).json({ error });
  }
}
