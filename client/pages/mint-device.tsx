import { Default } from 'components/layouts/Default';
import { Input, Button, Text, Textarea } from '@chakra-ui/react';
import React from 'react';

const TransactionsPage = () => {
  return (
    <Default pageName="Mint Device">
      {/* A form for minting a new device */}
      <div>
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Mint a new device
        </Text>
        <form>
          <div>
            <Text mt="20px" mb="8px">
              Device ID
            </Text>
            <Input placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Device Group ID
            </Text>
            <Input defaultValue={'dg_1'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              System name
            </Text>
            <Input defaultValue={'esp8266'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Release Name
            </Text>
            <Input defaultValue={'2.2.0-dev(9422289)'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Firmware Version
            </Text>
            <Input defaultValue={'v1.19.1 on 2022-06-18'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Chip Name
            </Text>
            <Input defaultValue={'ESP module (1M) with ESP8266'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Chip ID / MAC address
            </Text>
            <Input defaultValue={'5c:cf:7f:00:00:00'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="15px">
              Firmware
            </Text>
            <Textarea placeholder="Paste the contents of main.py here" />
          </div>

          <Button mt="20px" colorScheme="teal" variant="outline">
            Mint your Device to the Blockchain
          </Button>
        </form>
      </div>
    </Default>
  );
};

export default TransactionsPage;
