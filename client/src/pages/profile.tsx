import React, { useEffect, useState } from 'react';
import { Default } from 'components/layouts/Default';
import { Avatar, Badge, Box, Center, Heading, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { mumbaiContractAddress, riotDeviceImages } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import extractIdentifier from 'utils/extractIdentifier';
import { nodeId, secretKey, accessKey } from '../utils/luniverse';
import EthAddressResolver from 'components/modules/EthAddressResolver';

import web3 from 'web3';


const Profile = () => {
  const [selected, setSelected] = useState(0);
  const [devices, setDevices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const { currentAccount } = useSelector((state: any) => state.metamask);

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
          }).then((response) => {
            response.json().then((data) => {
              console.log("Data: ", data);
              setDevices(data);
            });
          }).catch((err) => {
            console.log(err);
          });
        });
      });
    } catch (e) { }
  }, []);
  return (
    <Default pageName="Profile">
      <Box p={4}>
        <Stack spacing={4} direction={'column'}>
          {
            currentAccount ? <EthAddressResolver address={currentAccount} /> : 'No Account Connected'
          }
          <div className="flex justify-center ">
            <div className="p-3 rounded-lg bg-white flex mt-[20px]">
              <Image src="/luniverse.jpg" alt="Luniverse" width={25} height={25} />
              <p className="font-semibold ml-3 text-black text-md">Powered by Luniverse</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="  flex">
              <button
                onClick={() => {
                  setSelected(0);
                }}
                className={`mx-2  ${selected == 0 ? 'bg-gray-500' : 'hover:bg-gray-500'
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
                      console.log("Activities: ", data);
                      // setDevices(data);
                    });
                  });
                  setSelected(1);
                }}
                className={`mx-2  ${selected == 1 ? 'bg-gray-500' : 'hover:bg-gray-500'
                  } text-white p-2 rounded-md font-semibold `}
              >
                Activity
              </button>
            </div>
          </div>
          <div className="flex flex-row  flex-wrap">
            {selected == 0
              ? devices.length > 0 &&
              devices.map((device, index) => (
                <Link href={'/device/' + (index + 1)} key={index}>
                  <div
                    key={index}
                    className="flex-col bg-gray-800 bg-opacity-30 h-[240px] pt-3 w-[180px] text-black mx-2 rounded-md hover:bg-gray-700 transition ease-in-out delay-100 duration-200 hover:scale-105"
                  >
                    <Image
                      src={extractIdentifier(riotDeviceImages[Math.floor(Math.random() * riotDeviceImages.length)])}
                      alt="Image"
                      height={150}
                      width={150}
                      className="mx-auto rounded-lg"
                    />
                    <h1 className="text-lg font-bold pt-2 pl-4 text-white">RioT #{device}</h1>
                    <h1 className="text-md font-semibold text-gray-400 pl-4 pb-2">Owned</h1>
                  </div>
                </Link>
              ))
              : activities.map(({ type, tokenId, fromAddress, toAddress, transactionHash }, index) => {
                return (
                  <div key={index} className="flex justify-start p-3 rounded-lg bg-gray-800 bg-opacity-30 mb-2 ml-6 ">
                    <Image src={image} alt="Image" height={80} width={80} className=" rounded-lg" />
                    <div>
                      <h1 className="text-lg font-bold pt-2 pl-4 text-white">{name}</h1>
                      <h1 className="text-md font-semibold text-gray-400 pl-4 pb-2">{artist}</h1>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <Box>
            <Box borderRadius={20} p={5} bg={'#111827'} width={'-webkit-fit-content'}>
              <Heading size="md" mb={3}>
                Devices Owned
              </Heading>
              <List spacing={2}>
                {userProfile.devicesOwned.map((device) => (
                  <ListItem key={device.id}>
                    <Badge colorScheme="blue" variant="subtle" mr={2}>
                      Device ID: {device.id}
                    </Badge>
                    {device.name}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box mt={3} borderRadius={20} p={5} bg={'#111827'} width={'-webkit-fit-content'}>
              <Heading mb={3} size="md">
                Device Ownership Transfers
              </Heading>
              <List spacing={2}>
                {userProfile.ownershipTransfers.map((transfer) => (
                  <ListItem key={transfer.id}>
                    <Badge colorScheme="green" variant="subtle" mr={2}>
                      Transfer ID: {transfer.id}
                    </Badge>
                    {transfer.date}: {transfer.device}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box> */}
        </Stack>
      </Box>
    </Default >
  );
};

export default Profile;
