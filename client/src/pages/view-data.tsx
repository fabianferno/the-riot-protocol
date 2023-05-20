import { Default } from 'components/layouts/Default';
import { Button, Flex, Box, Text, Input, Progress, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import React from 'react';
const aesjs = require('aes-js');
import { useState, useEffect } from 'react';
import axios from "axios";

import contractCall from '../components/metamask/lib/contract-call';
import { ABI, RIOT_RPC_URL, contractAddress } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';

const DatabaseTable = ({ data }) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Device ID</Th>
                    <Th>Created At</Th>
                    <Th>Sensor Value</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((row) => (
                    <Tr key={row.id}>
                        <Td>{row.id}</Td>
                        <Td>{row.deviceId}</Td>
                        <Td>{row.created_at}</Td>
                        <Td>{row.sensorValue}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};



const ViewDataPage = () => {
    const [riotKey, setRiotKey] = useState("");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [deviceId, setDeviceId] = useState('');

    const { currentAccount } = useSelector((state: any) => state.metamask);


    useEffect(() => {
        // Make a axios get call
        (async () => {
            await axios.get(`${RIOT_RPC_URL}/data`).then((response) => {
                // console.log(response.data);
                setData(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            });
        })();
    }, []);

    async function DecryptData() {
        setLoading(true);
        console.log("Device ID: ", deviceId);

        // const contract_response = await contractCall(
        //     contractAddress,
        //     currentAccount,
        //     ABI,
        //     [deviceId],
        //     0,
        //     'generateRiotKeyForSubscriber(address)',
        //     false,
        // );
        // console.log(contract_response);
        // const riotKeyHex = "0x" + contract_response.substr(2, 16);
        const riotKeyHex = "0x2f052ba6c8e962a69b5fc75790ecd504";
        const riotKeyBytes = Buffer.from(riotKeyHex.slice(2), 'hex');
        const subscriberRiotKey = riotKeyBytes.toString('hex');
        console.log(riotKeyHex, riotKeyBytes, subscriberRiotKey);
        setRiotKey(subscriberRiotKey);
        setLoading(false);

        const decrypted_data = data.map((item) => {
            const encryptedBuffer = Buffer.from(item.sensorValue, 'hex');
            console.log("Encrypted Buffer", encryptedBuffer)
            // Create AES ECB cipher
            const aesEcb = new aesjs.ModeOfOperation.ecb(riotKeyBytes);

            // Perform decryption
            const decryptedBytes = aesEcb.decrypt(encryptedBuffer);
            const decryptedText = decryptedBytes.toString('utf-8').replace(/\0+$/, ''); // Remove null padding
            // Unhexlify decrypted text
            const unhexlifiedText = Buffer.from(decryptedText, 'hex');
            console.log(decryptedText, decryptedBytes);

            item.sensorValue = unhexlifiedText;
            return item;
        });
        setData(decrypted_data);
        console.log(decrypted_data);
    }

    return (
        <Default pageName="View Device Data">
            <div>
                <Text fontSize="5xl" fontWeight="bold" mb="20px">
                    View Device Data
                </Text>

                <div>
                    <Text mt="20px" mb="8px">
                        Device ID
                    </Text>
                    <Flex>
                        <Input
                            onChange={(e) => {
                                setDeviceId(e.target.value);
                            }}
                            placeholder="Enter the device address"
                        />
                        <Button colorScheme='teal' size='md'
                            onClick={DecryptData}
                        >
                            Decrypt Device
                        </Button>
                    </Flex>

                </div>


                <Box mt={5} mb={3}>
                    <hr />
                </Box>


                {loading ?
                    <Progress size='xs' isIndeterminate /> : <DatabaseTable data={data} />
                }
            </div>
        </Default>
    );
};

export default ViewDataPage;
