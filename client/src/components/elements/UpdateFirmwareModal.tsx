
import {
    Input,
    Button,
    Text,
    Textarea,
    Flex,
    Box,
    Badge,
    Center,
    SimpleGrid,
    SlideFade,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import contractCall from 'components/metamask/lib/contract-call';
import React from 'react';
import { useState } from 'react';
import { mumbaiABI, mumbaiContractAddress, RIOT_RPC_URL } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';

const UpdateFirmwareModal = (
    props: {
        deviceId: string;
    }
) => {
    const [firmwareHash, setFirmwareHash] = useState('0x0000000000000000000000000000000000000000 ');
    const { currentAccount } = useSelector((state: any) => state.metamask);
    const [loading, setLoading] = useState(0);
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

    return (
        < div >
            <form>
                <div>
                    <Text mb="8px">
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
                        }}
                        placeholder="Paste the contents of main.py here"
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
                            <Text fontSize="sm">{props.deviceId}</Text>
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
                                <Badge colorScheme="green">Updated Device Firmware Hash</Badge>
                            </Text>
                            <Text fontSize="sm">{firmwareHash}</Text>
                        </Box>
                    </Flex>
                </SimpleGrid>

                <Box mt={3} mb={3}>
                    <hr />
                </Box>

                <Flex mt={5} justifyContent={'space-between'}>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        isDisabled={props.deviceId === '' || firmwareHash == ''}
                        onClick={async () => {
                            setStatus('Waiting for Confirmation...');
                            setShowNotification(true);

                            let response = await contractCall(
                                mumbaiContractAddress,
                                currentAccount,
                                mumbaiABI,
                                [firmwareHash, props.deviceId],
                                0,
                                'updateFirmware(bytes32,address)',
                                false,
                            );
                            if (response == 'Execution Complete') {
                                setStatus('Processing Transaction...');
                                setShowNotification(true);
                                setInterval(() => {
                                    setStatus(`Device FirmwareHash changed to\n ${firmwareHash}}`);
                                    setShowNotification(true);
                                }, 15000);
                            } else {
                                setStatus('Transaction Failed or Cancelled');
                            }
                        }}
                    >
                        Update Firmware Hash
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
        </ div>
    );
};


const FirmwareUpdateButton = (
    props: {
        deviceId: string;
    },
) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    return (
        <>
            <Button onClick={onOpen}>Update Firmware</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"2xl"}>
                    <ModalHeader>Update Device Firmware</ModalHeader>
                    <ModalBody>
                        <UpdateFirmwareModal deviceId={props.deviceId} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FirmwareUpdateButton;


