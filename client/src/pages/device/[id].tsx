import React, { useEffect, useState } from 'react';
import { Default } from 'components/layouts/Default';
import { Box, Center, Table, Tbody, Tr, Td, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { mumbaiContractAddress } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';
import getTimeDifferenceString from 'utils/getTimeDifference';
import { useRouter } from 'next/router';
import UpdateFirmwareModal from 'components/elements/UpdateFirmwareModal';

type Metadata = {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
};


const Profile = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [selected, setSelected] = useState(0);
  const [metadata, setMetadata] = useState<Metadata>({} as Metadata);
  const [activities, setActivities] = useState([]);
  const [tokenOwner, setTokenOwner] = useState('');
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
          fetch('/api/get-nft-metadata', {
            method: 'POST',
            body: JSON.stringify({
              contractAddress: mumbaiContractAddress,
              tokenId: id,
              accessToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            response.json().then((data) => {
              console.log('NFT METADATA');
              console.log(data);
              setMetadata(data);
            });
          });
          fetch('/api/get-nft-owner', {
            method: 'POST',
            body: JSON.stringify({
              contractAddress: mumbaiContractAddress,
              tokenId: id,
              accessToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            response.json().then((data) => {
              console.log('NFT OWNER');
              console.log(data);
              setTokenOwner(data.ownerAddress);
            });
          });
          fetch('/api/get-nft-transfers', {
            method: 'POST',
            body: JSON.stringify({
              contractAddress: mumbaiContractAddress,
              tokenId: id,
              accessToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            response.json().then((data) => {
              console.log('NFT TRANSFERS');
              console.log(data);
              setActivities(data);
            });
          });
        });
      });
    } catch (e) { }
  }, []);
  return (
    <Default pageName="Device">
      <Box p={4}>
        <Stack spacing={4} direction={'column'}>
          <Center>
            <Image
              src={metadata.image != undefined ? 'https://ipfs.io/ipfs/' + metadata.image.slice(7) : '/riot.jpg'}
              width={150}
              height={150}
              alt="NFT Image"
              className="rounded-lg"
            />
          </Center>
          <div>
            <h1 className="text-center font-bold text-2xl">RioT #{id}</h1>
            <p className="text-gray-400 text-md text-center">{metadata.name}</p>
          </div>

          <div className="flex justify-center ">
            <div
              className="p-3 rounded-lg bg-white flex mt-[20px] mb-[10px]"
              onClick={() => {
                window.open('https://luniverse.io');
              }}
            >
              <Image src="/luniverse.jpg" alt="Luniverse" width={25} height={25} />
              <p className="font-semibold ml-3 text-black text-md">Powered by Luniverse</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex">
              <button
                onClick={() => {
                  setSelected(0);
                }}
                className={`mx-2  ${selected == 0 ? 'bg-gray-500' : 'hover:bg-gray-500'
                  } text-white p-2 rounded-md font-semibold `}
              >
                Device Info
              </button>

              <button
                onClick={() => {
                  setSelected(1);
                }}
                className={`mx-2  ${selected == 1 ? 'bg-gray-500' : 'hover:bg-gray-500'
                  } text-white p-2 rounded-md font-semibold `}
              >
                Transfers
              </button>

              <UpdateFirmwareModal deviceId={id} />
            </div>
          </div>
          {selected == 0 && (
            <Table variant="simple">
              <Tbody>
                {metadata.attributes != undefined &&
                  metadata.attributes.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.trait_type}</Td>
                      <Td>{item.value}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )}

          {selected == 1 &&
            activities.map(({ type, fromAddress, toAddress, transactionHash, timestamp }, index) => {
              return (
                <div className="flex justify-center w-full">
                  <div
                    key={index}
                    className={`flex justify-start p-3  rounded-lg ${type == 'Minted' ? 'bg-lime-600' : 'bg-yellow-500'
                      } bg-opacity-30 mb-2 ml-6 `}
                    onClick={() => {
                      window.open(`https://mumbai.polygonscan.com/tx/${transactionHash}`);
                    }}
                  >
                    <div className="">
                      <h1 className="text-xl text-center font-bold mb-2 px-4 text-white">{type}</h1>
                      <div>
                        <h1 className="text-md font-semibold text-gray-400 px-4 pb-2">
                          <span className="font-bold text-gray-500">from ⬅️</span>&nbsp;{fromAddress}
                        </h1>
                        <h1 className="text-md font-semibold text-gray-400 px-4 pb-2">
                          <span className="font-bold text-gray-500">to ➡️</span>&nbsp;{toAddress}
                        </h1>
                      </div>
                      <p className="my-auto text-xs text-gray-500 text-end">{getTimeDifferenceString(timestamp)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Stack>
      </Box>
    </Default>
  );
};

export default Profile;
