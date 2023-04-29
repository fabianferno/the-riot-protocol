import { Default } from 'components/layouts/Default';
import { Input, Button, Text, Textarea, Flex, Box, Badge, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import crypto from 'crypto';
import { useState, useRef } from 'react';

const MintDevicePage = () => {
  const [firmwareHash, setFirmwareHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceIdHash, setDeviceIdHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceDataHash, setDeviceDataHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceGroupIdHash, setDeviceGroupIdHash] = useState(crypto.createHash('sha256').update("dg_1").digest().toString('hex'));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const systemNameRef = useRef("esp8266");
  // const releaseNameRef = useRef("2.2.0-dev(9422289)");
  // const firmwareVersionRef = useRef("v1.19.1 on 2022-06-18");
  // const chipNameRef = useRef("ESP module (1M) with ESP8266");
  // const chipIdRef = useRef("5c:cf:7f:00:00:00");

  const systemNameRef = useRef(null);
  const releaseNameRef = useRef(null);
  const firmwareVersionRef = useRef(null);
  const chipNameRef = useRef(null);
  const chipIdRef = useRef(null);

  function computeDeviceDataHash() {
    const deviceData = systemNameRef.current + releaseNameRef.current + firmwareVersionRef.current + chipNameRef.current + chipIdRef.current;
    setDeviceDataHash(crypto.createHash('sha256').update(deviceData).digest().toString('hex'));
  }


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
            <Input
              onChange={(e) => {
                setDeviceIdHash(crypto.createHash('sha256').update(e.target.value).digest().toString('hex'))
              }}
              placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Device Group ID
            </Text>
            <Input
              onChange={(e) => {
                setDeviceGroupIdHash(crypto.createHash('sha256').update(e.target.value).digest().toString('hex'))
              }}
              defaultValue={'dg_1'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              System name
            </Text>
            <Input onChange={computeDeviceDataHash} ref={systemNameRef} defaultValue={'esp8266'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Release Name
            </Text>
            <Input onChange={computeDeviceDataHash} ref={releaseNameRef} defaultValue={'2.2.0-dev(9422289)'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Firmware Version
            </Text>
            <Input onChange={computeDeviceDataHash} ref={firmwareVersionRef} defaultValue={'v1.19.1 on 2022-06-18'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Chip Name
            </Text>
            <Input onChange={computeDeviceDataHash} ref={chipNameRef} defaultValue={'ESP module (1M) with ESP8266'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="8px">
              Chip ID / MAC address
            </Text>
            <Input onChange={computeDeviceDataHash} ref={chipIdRef} defaultValue={'5c:cf:7f:00:00:00'} placeholder="Enter the device group ID" />
          </div>

          <div>
            <Text mt="20px" mb="15px">
              Firmware
            </Text>
            <Textarea
              onChange={(e) => {
                setFirmwareHash(crypto.createHash('sha256').update(e.target.value).digest().toString('hex'))
              }}
              placeholder="Paste the contents of main.py here" />
          </div>

          <Text mt={10} fontSize={"2xl"}>
            <strong>Generated Token Ingredients</strong>
          </Text>
          <Box my={3}><hr /></Box>

          <SimpleGrid columns={2} spacing={2}>
            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='green'>
                    Firmware Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{firmwareHash}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='orange'>
                    Device Metadata Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{deviceDataHash}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='purple'>
                    Device Group ID Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{deviceGroupIdHash}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='red'>
                    Device Id Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{deviceIdHash}</Text>
              </Box>
            </Flex>
          </SimpleGrid>




          <Button mt="20px" colorScheme="teal" variant="outline">
            Mint your Device to the Blockchain
          </Button>
        </form>
      </div>
    </Default>
  );
};

export default MintDevicePage;
