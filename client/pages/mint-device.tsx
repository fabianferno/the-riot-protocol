import { Default } from 'components/layouts/Default';
import { Input, Button, Text, Textarea, Flex, Box, Badge, SimpleGrid } from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';

import React from 'react';
import crypto from 'crypto';
import { useState, } from 'react';
import { useEffect } from 'react';

const MintDevicePage = () => {
  const [firmwareHash, setFirmwareHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceIdHash, setDeviceIdHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceDataHash, setDeviceDataHash] = useState(crypto.createHash('sha256').update("").digest().toString('hex'));
  const [deviceGroupIdHash, setDeviceGroupIdHash] = useState(crypto.createHash('sha256').update("dg_1").digest().toString('hex'));


  const [systemName, setSystemName] = useState("esp8266");
  const [releaseName, setReleaseName] = useState("2.2.0-dev(9422289)");
  const [firmwareVersion, setFirmwareVersion] = useState("v1.19.1 on 2022-06-18");
  const [chipName, setChipName] = useState("ESP module (1M) with ESP8266");
  const [chipId, setChipId] = useState("5c:cf:7f:00:00:00");


  function computeDeviceDataHash() {
    const deviceData = firmwareVersion + chipName + chipId + systemName + releaseName;
    setDeviceDataHash(crypto.createHash('sha256').update(deviceData).digest().toString('hex'));
  }

  useEffect(() => {
    computeDeviceDataHash();
    console.log("test")
  }, [firmwareHash, deviceIdHash, deviceDataHash, deviceGroupIdHash, systemName, releaseName, firmwareVersion, chipName, chipId]);


  return (
    <Default pageName="Mint Device">
      {/* A form for minting a new device */}
      <div>
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Mint a new device
        </Text>
        <form>
          <SimpleGrid columns={2} spacing={2}>
            <div>
              <Text mt="20px" mb="8px">
                Device ID
              </Text>
              <Input
                onChange={(e) => {
                  setDeviceIdHash(crypto.createHash('sha256').update(e.target.value).digest().toString('hex'))
                }}
                placeholder="Enter the device ID" />
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
              <Input
                onChange={(e) => {
                  setSystemName(e.target.value);
                  computeDeviceDataHash();
                }}
                defaultValue={'esp8266'} placeholder="Enter the system name" />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Release Name
              </Text>
              <Input onChange={(e) => {
                setReleaseName(e.target.value);
                computeDeviceDataHash();
              }}
                defaultValue={'2.2.0-dev(9422289)'} placeholder="Enter the release name" />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Firmware Version
              </Text>
              <Input onChange={(e) => {
                setFirmwareVersion(e.target.value);
                computeDeviceDataHash();
              }} defaultValue={'v1.19.1 on 2022-06-18'} placeholder="Enter the firmware version" />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Chip Name
              </Text>
              <Input onChange={(e) => {
                setChipName(e.target.value);
                computeDeviceDataHash();
              }} defaultValue={'ESP module (1M) with ESP8266'} placeholder="Enter the chip name" />
            </div>


          </SimpleGrid>





          <div>
            <Text mt="20px" mb="8px">
              Chip ID / MAC address
            </Text>
            <Input onChange={(e) => {
              setChipId(e.target.value);
              computeDeviceDataHash();
            }} defaultValue={'5c:cf:7f:00:00:00'} placeholder="Enter the chip ID" />
          </div>





          <div>
            <Text mt="20px" mb="15px">
              Firmware
            </Text>
            <Textarea
              rows={6}
              onChange={(e) => {
                setFirmwareHash(crypto.createHash('sha256').update(e.target.value).digest().toString('hex'))
              }}
              placeholder="Paste the contents of main.py here" />
          </div>

          <Text mt={10} fontSize={"2xl"}>
            <strong>Token Ingredients</strong>
            <Button mx={6} colorScheme="teal" variant="outline">
              Mint your Device to the Blockchain
            </Button>
          </Text>
          <Box my={3}><hr /></Box>

          <SimpleGrid columns={4} spacing={2}>


            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='green'>
                    Firmware Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{getEllipsisTxt(firmwareHash, 6)}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='orange'>
                    Device Metadata Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{getEllipsisTxt(deviceDataHash)}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='purple'>
                    Device Group ID Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{getEllipsisTxt(deviceGroupIdHash, 6)}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth='1px' borderRadius='lg' p={2}>
                <Text fontWeight='bold'>
                  <Badge colorScheme='red'>
                    Device Id Hash
                  </Badge>
                </Text>
                <Text fontSize='sm'>{getEllipsisTxt(deviceIdHash, 6)}</Text>
              </Box>
            </Flex>
          </SimpleGrid>





        </form>
      </div>
    </Default>
  );
};

export default MintDevicePage;
