import React, { useEffect, useState } from 'react';
import { Default } from 'components/layouts/Default';
import { Box, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { mumbaiContractAddress, riotDeviceImages } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import extractIdentifier from 'utils/extractIdentifier';
import getTimeDifferenceString from 'utils/getTimeDifference';
import EthAddressResolver from 'components/modules/EthAddressResolver';
import {
  Input,
  Button,
  Text,
  Flex,
  Badge,
  Center,
  SimpleGrid,
  SlideFade,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import web3 from 'web3';
import TransferDeviceModal from 'components/transferDeviceModal';

const Profile = () => {
  const [selected, setSelected] = useState(0);
  const [devices, setDevices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [openSendDeviceModal, setOpenSendDeviceModal] = useState(false);
  const { currentAccount } = useSelector((state: any) => state.metamask);
  const [transferTokenId, setTransferTokenId] = useState('-1');

  useEffect(() => {
    try {
      fetch('/api/get-auth-token', {
        method: 'POST',
        body: JSON.stringify({
          nodeId: process.env.NEXT_PUBLIC_LUNIVERSE_NODE_ID,
          secretKey: process.env.NEXT_PUBLIC_LUNIVERSE_SECRET_KEY,
          accessKey: process.env.NEXT_PUBLIC_LUNIVERSE_ACCESS_KEY,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          const accessToken = data.accessToken;
          setAccessToken(accessToken);
          fetch('/api/get-devices-by-owner', {
            method: 'POST',
            body: JSON.stringify({
              contractAddress: mumbaiContractAddress,
              currentAccount,
              accessToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              response.json().then((data) => {
                console.log('Data: ', data);
                setDevices(data);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } catch (e) {}
  }, []);
  return (
    <Default pageName="Profile">
      <Box p={4}>
        <Stack spacing={4} direction={'column'}>
          {currentAccount ? <EthAddressResolver address={currentAccount} /> : 'anonymous.eth'}
          <div className="flex justify-center ">
            <div
              className="p-3 rounded-lg bg-white flex mt-[20px]"
              onClick={() => {
                window.open('https://luniverse.io');
              }}
            >
              <Image src="/luniverse.jpg" alt="Luniverse" width={25} height={25} />
              <p className="font-semibold ml-3 text-black text-md">Powered by Luniverse</p>
            </div>
          </div>
          <div className="flex justify-center mt-24">
            <div className="  flex">
              <button
                onClick={() => {
                  setSelected(0);
                }}
                className={`mx-2  ${
                  selected == 0 ? 'bg-gray-500' : 'hover:bg-gray-500'
                } text-white p-2 rounded-md font-semibold `}
              >
                Devices
              </button>

              <button
                onClick={() => {
                  fetch('/api/get-activities', {
                    method: 'POST',
                    body: JSON.stringify({
                      contractAddress: mumbaiContractAddress,
                      currentAccount,
                      accessToken,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then((response) => {
                    response.json().then((data) => {
                      console.log(data);
                      setActivities(data);
                    });
                  });
                  setSelected(1);
                }}
                className={`mx-2  ${
                  selected == 1 ? 'bg-gray-500' : 'hover:bg-gray-500'
                } text-white p-2 rounded-md font-semibold `}
              >
                Activity
              </button>
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            {selected == 0 &&
              devices.length > 0 &&
              devices.map((device, index) => (
                <div
                  key={index}
                  className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[220px] text-black mx-2 rounded-xl hover:bg-gray-700 transition ease-in-out delay-100 duration-200 hover:scale-105"
                >
                  <Link href={'/device/' + device} key={index}>
                    <Image
                      src={extractIdentifier(riotDeviceImages[Math.floor(Math.random() * riotDeviceImages.length)])}
                      alt="Image"
                      height={150}
                      width={150}
                      className=" mx-auto my-auto rounded-lg object-cover"
                    />
                  </Link>

                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-lg font-bold pt-2 pl-4 text-white">RioT #{device}</h1>
                      <h1 className="text-md font-semibold text-gray-400 pl-4 pb-2">Owned</h1>
                    </div>
                    <div className="flex flex-col justify-center">
                      <button
                        className="my-auto rounded-lg bg-indigo-500 p-2 mr-2 text-white font-lg font-semibold"
                        onClick={() => {
                          setOpenSendDeviceModal(true);
                          setTransferTokenId(device);
                        }}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {selected == 1 &&
            activities.map(({ type, tokenId, fromAddress, toAddress, transactionHash, timestamp }, index) => {
              return (
                <div className="flex justify-center w-full">
                  <div
                    key={index}
                    className={`flex justify-start p-3 border-2 rounded-lg ${
                      type == 'Minted'
                        ? 'border-green-900'
                        : type == 'Received'
                        ? 'outline-yellow-500'
                        : 'border-red-900'
                    } bg-opacity-30 mb-2 ml-6 `}
                    onClick={() => {
                      window.open(`https://mumbai.polygonscan.com/tx/${transactionHash}`);
                    }}
                  >
                    <Image
                      src={extractIdentifier(riotDeviceImages[Math.floor(Math.random() * riotDeviceImages.length)])}
                      alt="Image"
                      height={150}
                      width={200}
                      className=" rounded-lg"
                    />
                    <div className="">
                      <h1 className="text-lg font-bold pt-2 pl-4 text-white">
                        {type}&nbsp;RioT #{tokenId}
                      </h1>
                      <div>
                        <SimpleGrid columns={1} spacing={2}>
                          <Flex my={'2'}>
                            <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                              <Text fontWeight="bold">
                                <Badge colorScheme="red">From</Badge>
                              </Text>
                              <Text fontSize="sm">{fromAddress}</Text>
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
                                <Badge colorScheme="green">To</Badge>
                              </Text>
                              <Text fontSize="sm">{toAddress}</Text>
                            </Box>
                          </Flex>
                        </SimpleGrid>
                      </div>

                      <p className="my-auto text-xs text-gray-500 text-end">{getTimeDifferenceString(timestamp)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Stack>
      </Box>
      <TransferDeviceModal
        tokenId={transferTokenId}
        isOpen={openSendDeviceModal}
        onClose={() => {
          setOpenSendDeviceModal(false);
        }}
      />
    </Default>
  );
};

export default Profile;
