import { Default } from 'components/layouts/Default';
import {
  Input,
  Button,
  Text,
  Textarea,
  Flex,
  Box,
  Badge,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  SlideFade,
} from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';
import React from 'react';
import crypto from 'crypto';
import { useState } from 'react';
import { useEffect } from 'react';
import contractCall from '../components/metamask/lib/contract-call';
import {
  zkEVMABI,
  zkEVMContractAddress,
  mumbaiABI,
  mumbaiContractAddress,
  RIOT_RPC_URL,
  riotDeviceImages,
} from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';
import getIsGroupRegistered from 'utils/getIsGroupRegistered';
import getIsDeviceIdMinted from 'utils/getIsDeviceMinted';
import getDeviceTokenId from 'utils/getDeviceTokenId';

const MintDevicePage = () => {
  const { currentAccount, currentChain } = useSelector((state: any) => state.metamask);
  const [contractAddress, setContractAddress] = useState(
    currentChain.chainId == 80001 ? mumbaiContractAddress : zkEVMContractAddress,
  );
  const [ABI, setABI] = useState(currentChain.chainId == 80001 ? mumbaiABI : zkEVMABI);

  const [buttonText, setButtonText] = useState(
    currentChain.chainId == 80001 ? 'Mint Device' : 'Enter Device Group Id Hash',
  );
  const [firmwareHash, setFirmwareHash] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceDataHash, setDeviceDataHash] = useState(
    '0x' + crypto.createHash('sha256').update('').digest().toString('hex'),
  );
  const [deviceGroupIdHash, setDeviceGroupIdHash] = useState(
    '0x' + crypto.createHash('sha256').update('dg_1').digest().toString('hex'),
  );
  const [systemName, setSystemName] = useState('esp8266');
  const [releaseName, setReleaseName] = useState('2.2.0-dev(9422289)');
  const [firmwareVersion, setFirmwareVersion] = useState('v1.19.1 on 2022-06-18');
  const [chipName, setChipName] = useState('ESP module (1M) with ESP8266');
  const [chipId, setChipId] = useState('42c1dd00');
  const [deviceMinted, setDeviceMinted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [status, setStatus] = useState('');

  const closeNotification = () => {
    setShowNotification(false);
  };

  async function hashify(contents: any) {
    const response = await fetch(`${RIOT_RPC_URL}/hashify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });
    const { hash } = await response.json();
    return `0x${hash}`;
  }

  function computeDeviceDataHash() {
    const deviceData = systemName + releaseName + firmwareVersion + chipName + chipId;
    setDeviceDataHash('0x' + crypto.createHash('sha256').update(deviceData).digest().toString('hex'));
  }

  useEffect(() => {
    (async () => {
      if (currentChain.chainId != 80001) {
        console.log('HOW THE FUCK');
        await getIsGroupRegistered(
          contractAddress,
          currentAccount,
          ABI,
          deviceGroupIdHash,
          setButtonText,
          currentChain.chainId,
        );
      } else await getDeviceTokenId(contractAddress, currentAccount, ABI, setDeviceId);
    })();
  }, []);

  useEffect(() => {
    computeDeviceDataHash();
  }, [
    firmwareHash,
    deviceId,
    deviceDataHash,
    deviceGroupIdHash,
    systemName,
    releaseName,
    firmwareVersion,
    chipName,
    chipId,
  ]);

  return (
    <Default pageName="Mint Device">
      {/* A form for minting a new device */}
      <div>
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Mint a new device
        </Text>
        <form>
          {currentChain.chainId != 80001 && (
            <div>
              <Text mt="20px" mb="8px">
                Device ID
              </Text>
              <Input
                onChange={async (e) => {
                  setDeviceId(e.target.value);
                  computeDeviceDataHash();
                  await getIsDeviceIdMinted(
                    contractAddress,
                    currentAccount,
                    ABI,
                    e.target.value,
                    setButtonText,
                    setDeviceMinted,
                    currentChain.chainId,
                  );
                }}
                placeholder="Enter the device address"
              />
            </div>
          )}
          <SimpleGrid columns={2} spacing={2}>
            <div>
              <Text mt="20px" mb="8px">
                Chip ID / MAC address
              </Text>
              <Input
                onChange={(e) => {
                  setChipId(e.target.value);
                  computeDeviceDataHash();
                }}
                defaultValue={'42c1dd00'}
                placeholder="Enter the chip ID"
              />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Device Group ID
              </Text>
              <Input
                onChange={async (e) => {
                  let hash = '0x' + crypto.createHash('sha256').update(e.target.value).digest().toString('hex');
                  setDeviceGroupIdHash(hash);
                  computeDeviceDataHash();
                  if (currentChain.chainId != 80001) {
                    await getIsGroupRegistered(
                      contractAddress,
                      currentAccount,
                      ABI,
                      deviceGroupIdHash,
                      setButtonText,
                      currentChain.chainId,
                    );
                  }
                }}
                defaultValue={'dg_1'}
                placeholder="Enter the device group ID"
              />
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
                defaultValue={'esp8266'}
                placeholder="Enter the system name"
              />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Release Name
              </Text>
              <Input
                onChange={(e) => {
                  setReleaseName(e.target.value);
                  computeDeviceDataHash();
                }}
                defaultValue={'2.2.0-dev(9422289)'}
                placeholder="Enter the release name"
              />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Firmware Version
              </Text>
              <Input
                onChange={(e) => {
                  setFirmwareVersion(e.target.value);
                  computeDeviceDataHash();
                }}
                defaultValue={'v1.19.1 on 2022-06-18'}
                placeholder="Enter the firmware version"
              />
            </div>

            <div>
              <Text mt="20px" mb="8px">
                Chip Name
              </Text>
              <Input
                onChange={(e) => {
                  setChipName(e.target.value);
                  computeDeviceDataHash();
                }}
                defaultValue={'ESP module (1M) with ESP8266'}
                placeholder="Enter the chip name"
              />
            </div>
          </SimpleGrid>

          <div>
            <Text mt="20px" mb="8px">
              Firmware
            </Text>
            <Textarea
              rows={3}
              onChange={(e) => {
                let firmware = e.target.value;
                firmware = firmware.replaceAll(' ', '');
                firmware = firmware.replaceAll('\r', '');

                hashify(firmware).then((hash) => {
                  console.log(hash);
                  setFirmwareHash(hash);
                });
                computeDeviceDataHash();
              }}
              placeholder="Paste the contents of main.py here"
            />
          </div>

          <Box mt={5} mb={3}>
            <hr />
          </Box>

          <SimpleGrid columns={4} spacing={2}>
            <Flex my={'2'}>
              <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                <Text fontWeight="bold">
                  <Badge colorScheme="green">Firmware Hash</Badge>
                </Text>
                <Text fontSize="sm">{getEllipsisTxt(firmwareHash, 10)}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                <Text fontWeight="bold">
                  <Badge colorScheme="orange">Device Metadata Hash</Badge>
                </Text>
                <Text fontSize="sm">{getEllipsisTxt(deviceDataHash, 10)}</Text>
              </Box>
            </Flex>

            <Flex my={'2'}>
              <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                <Text fontWeight="bold">
                  <Badge colorScheme="purple">Device Group ID Hash</Badge>
                </Text>
                <Text fontSize="sm">{getEllipsisTxt(deviceGroupIdHash, 10)}</Text>
              </Box>
            </Flex>

            {currentChain.chainId != 80001 ? (
              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="red">Device Id</Badge>
                  </Text>
                  <Text fontSize="sm">{getEllipsisTxt(deviceId, 10)}</Text>
                </Box>
              </Flex>
            ) : (
              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="red">Device Id</Badge>
                  </Text>
                  <Text fontSize="sm">{deviceId}</Text>
                </Box>
              </Flex>
            )}
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
              isDisabled={
                buttonText === 'Enter Device Group Id Hash' ||
                deviceId === '' ||
                firmwareHash == '' ||
                deviceMinted ||
                buttonText == 'Invalid Device ID'
              }
              onClick={async () => {
                setStatus('Uploading RiotNFT to IPFS...');
                setShowNotification(true);
                let metadataHash;
                try {
                  const response = await fetch('/api/deploy-metadata', {
                    method: 'POST',
                    body: JSON.stringify({
                      name: 'Riot Association',
                      symbol: 'RA',
                      groupId: deviceGroupIdHash,
                      systemName,
                      releaseName,
                      chipName,
                      chipId,
                      deviceId: deviceId,
                      image: riotDeviceImages[Math.floor(Math.random() * riotDeviceImages.length)],
                      deviceDataHash: deviceDataHash,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  const data = await response.json();
                  const { hash } = data;
                  metadataHash = hash.url;
                  console.log('IPFS Hash of the deployed Riot NFT: ' + hash);
                } catch (e) {
                  console.log(e);
                }
                setStatus('Waiting for Confirmation...');
                setShowNotification(true);
                if (currentChain.chainId == 80001) {
                  const response = await contractCall(
                    contractAddress,
                    currentAccount,
                    ABI,
                    [firmwareHash, deviceDataHash, deviceGroupIdHash, metadataHash],
                    0,
                    'addDevice(bytes32,bytes32,bytes32,string)',
                    false,
                  );
                  if (response == 'Execution Complete') {
                    setStatus('Processing Transaction...');
                    setShowNotification(true);
                    setInterval(() => {
                      setStatus('Device minted successfully!');
                      setShowNotification(true);
                    }, 15000);
                  } else {
                    setStatus('Transaction Failed or Cancelled');
                  }
                } else {
                  if (buttonText === 'Register and Mint Device') {
                    const response = await contractCall(
                      contractAddress,
                      currentAccount,
                      ABI,
                      [
                        'Riot Association',
                        'RA',
                        firmwareHash,
                        deviceDataHash,
                        deviceGroupIdHash,
                        deviceId,
                        metadataHash,
                      ],
                      0,
                      'registerGroup(string,string,bytes32,bytes32,bytes32,address,string)',
                      false,
                    );
                    if (response == 'Execution Complete') {
                      setStatus('Processing Transaction...');
                      setShowNotification(true);
                      setInterval(() => {
                        setStatus('Group registered and Device minted successfully!');
                        setShowNotification(true);
                      }, 15000);
                    } else {
                      setStatus('Transaction Failed or Cancelled');
                    }
                  } else {
                    const response = await contractCall(
                      contractAddress,
                      currentAccount,
                      ABI,
                      [firmwareHash, deviceDataHash, deviceGroupIdHash, deviceId, metadataHash],
                      0,
                      'mintDevice(bytes32,bytes32,bytes32,address,string)',
                      false,
                    );

                    if (response == 'Execution Complete') {
                      setStatus('Processing Transaction...');
                      setShowNotification(true);
                      setInterval(() => {
                        setStatus('Device minted successfully!');
                        setShowNotification(true);
                      }, 15000);
                    } else {
                      setStatus('Transaction Failed or Cancelled');
                    }
                  }
                }
              }}
            >
              {buttonText}
            </Button>
          </Flex>
        </form>
        <SlideFade in={showNotification} offsetY="-20px">
          <Box position="fixed" bottom={4} right={4} width="300px">
            <Alert
              status="success"
              variant="subtle"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              boxShadow="md"
              borderRadius="md"
            >
              <AlertIcon boxSize={4} mr={2} />
              <AlertTitle mr={2} fontSize="md">
                {status}
              </AlertTitle>
              <CloseButton size="sm" onClick={closeNotification} />
            </Alert>
          </Box>
        </SlideFade>
      </div>
    </Default>
  );
};

export default MintDevicePage;
