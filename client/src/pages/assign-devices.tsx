import { Default } from 'components/layouts/Default';
import { Input, Button, Text, Flex, Box, Badge, Center, SimpleGrid } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import contractCall from 'components/metamask/lib/contract-call';
import React from 'react';
import { useState } from 'react';
import { ABI, contractAddress } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';

const AssignDevicesPage = () => {
  const [deviceId, setDeviceId] = useState('0x0000000000000000000000000000000000000000 ');
  const [subscriber, setSubscriber] = useState('0x0000000000000000000000000000000000000000 ');
  const { currentAccount } = useSelector((state: any) => state.metamask);
  const [loading, setLoading] = useState(0);

  return (
    <Default pageName="Assign devices">
      {/* A form for minting a new device */}
      <div>
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Assign devices to subscribers (users)
        </Text>
        <form>
          <div>
            <Text mt="20px" mb="8px">
              Device ID
            </Text>
            <Input
              onChange={(e) => {
                setDeviceId(e.target.value);
              }}
              placeholder="Enter the device address"
            />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Subscriber Address
            </Text>
            <Input
              onChange={(e) => {
                setSubscriber(e.target.value);
              }}
              placeholder="Enter the device address"
            />
          </div>

          <Box mt={5} mb={3}>
            <hr />
          </Box>

          <SimpleGrid columns={1} spacing={2}>
            <Flex my={'2'}>
              <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                <Text fontWeight="bold">
                  <Badge colorScheme="red">Device Id</Badge>
                </Text>
                <Text fontSize="sm">{deviceId}</Text>
              </Box>
            </Flex>
            <Flex>
              <Center>
                <ArrowDownIcon boxSize={10} />
              </Center>
            </Flex>
            <Flex my={'2'}>
              <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                <Text fontWeight="bold">
                  <Badge colorScheme="green">Device Subscriber</Badge>
                </Text>
                <Text fontSize="sm">{subscriber}</Text>
              </Box>
            </Flex>
          </SimpleGrid>

          <Box mt={3} mb={3}>
            <hr />
          </Box>

          <Flex mt={5} justifyContent={'space-between'}>
            <Text fontSize={'2xl'}>
              <strong>Token Ingredients</strong>
            </Text>
            <Button
              mx={6}
              colorScheme="teal"
              variant="outline"
              onClick={async () => {
                await contractCall(
                  contractAddress,
                  currentAccount,
                  ABI,
                  [deviceId, subscriber],
                  0,
                  'setSubscriberAddress(address,address)',
                  false,
                );

                setLoading(1);
                setInterval(() => {
                  setLoading(2);
                }, 15000);
              }}
            >
              Set Subscriber Address
            </Button>
          </Flex>
        </form>
      </div>
    </Default>
  );
};

export default AssignDevicesPage;
