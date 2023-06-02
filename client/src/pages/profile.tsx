import React from 'react';
import { Default } from 'components/layouts/Default';
import { Avatar, Badge, Box, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";

const userProfile = {
    name: "John Doe",
    wallet: "0x1234567890abcdef1234567890abcdef12345678",
    devicesOwned: [
        { id: 2, name: "ESP module (1M) with ESP8266" },
        { id: 3, name: "ESP module (4M) with ESP8266" },
        { id: 4, name: "ESP module (4M) with ESP32" },
    ],
    ownershipTransfers: [
        { id: 1, date: "2021-08-01", device: "ESP module (1M) with ESP8266" },
        { id: 2, date: "2021-08-02", device: "ESP module (4M) with ESP8266" },
        { id: 3, date: "2021-08-03", device: "ESP module (4M) with ESP32" },
    ],
};

const Profile = () => {
    return (
        <Default pageName='Profile'>
            <Box p={4}>
                <Stack spacing={4} direction={"row"}  >
                    <Box>
                        <Avatar size="2xl" bg={"#111827"} name={userProfile.name} />

                        <Heading mt={3} size="lg">{userProfile.name}</Heading>
                        <Text>Wallet: {userProfile.wallet}</Text>
                    </Box>

                    <Box >
                        <Box borderRadius={20} p={5} bg={"#111827"} width={"-webkit-fit-content"}>
                            <Heading size="md" mb={3}>Devices Owned</Heading>
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
                        <Box mt={3} borderRadius={20} p={5} bg={"#111827"} width={"-webkit-fit-content"}>
                            <Heading mb={3} size="md">Device Ownership Transfers</Heading>
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
                    </Box>

                </Stack>
            </Box>
        </Default>
    );
};

export default Profile;