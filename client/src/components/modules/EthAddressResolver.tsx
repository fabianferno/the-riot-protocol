import React, { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { Avatar, Box, Center, Heading, Text } from '@chakra-ui/react';

const EthAddressResolver = ({ address }: {
  address: string;
}) => {
  const [ensDomain, setEnsDomain] = useState(null);


  useEffect(() => {
    const resolveEthAddress = async () => {
      try {
        const provider = new providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/OkO6gyf9gmK_AMpePLa1NUjAZYWPvzNO"); // Replace with your own provider
        console.log("Provider: ", provider);

        let domain: any = await provider.lookupAddress(address);
        console.log("Domain: ", domain);

        setEnsDomain(domain || 'No ENS domain found');

      } catch (error) {
        console.error('Error resolving ENS domain:', error);
      }
    };

    resolveEthAddress();
  }, [address]);

  return (
    <div>
      {ensDomain ? (
        <Box>
          <Center>
            <Avatar size="2xl" bg={'#111827'} name={ensDomain} />
          </Center>
          <Center>
            <Heading mt={3} size="lg" className="mb-2">
              {
                address ? <p>
                  <strong>{ensDomain}</strong>
                </p> : 'No Account Connected'
              }
            </Heading>
          </Center>

          <Center>
            <Text>{address}</Text>
          </Center>
        </Box>
      ) : (
        <Box>
          <Center>
            <Avatar size="2xl" bg={'#111827'} name={"👀"} />
          </Center>
          <Center>
            <Heading mt={3} size="lg" className="mb-2">
              {
                address ? <p>
                  <strong>{"Resolving ENS Profile..."}</strong>
                </p> : 'No Account Connected'
              }
            </Heading>
          </Center>

          <Center>
            <Text>{address}</Text>
          </Center>
        </Box>
      )}
    </div>
  );
};

export default EthAddressResolver;
