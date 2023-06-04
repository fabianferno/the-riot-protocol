import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Input,
  SimpleGrid,
  SlideFade,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { mumbaiABI, mumbaiContractAddress } from './metamask/lib/constants';
import contractCall from './metamask/lib/contract-call';

const TransferDeviceModal = ({ tokenId, isOpen, onClose }: {
  tokenId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { currentAccount } = useSelector((state: any) => state.metamask);
  const [showNotification, setShowNotification] = useState(false);
  const [subscriber, setSubscriber] = useState('');
  const [status, setStatus] = useState('');
  const closeNotification = () => {
    setShowNotification(false);
  };
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
      <div className="bg-black border-2 border-white rounded-lg p-6">
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Assign devices to users
        </Text>
        <form>
          <div>
            <Text mt="20px" mb="8px">
              Subscriber Address
            </Text>
            <Input
              onChange={(e) => {
                setSubscriber(e.target.value);
              }}
              placeholder="Enter the device address"
              value={subscriber}
            />
          </div>

          <Flex mt={5} justifyContent={'space-between'}>
            <Text fontSize={'2xl'}>
              <strong>Token Ingredients</strong>
            </Text>
            <div>
              <Button colorScheme="red" onClick={onClose}>
                X
              </Button>
              <Button
                mx={3}
                colorScheme="teal"
                variant="outline"
                isDisabled={subscriber == ''}
                onClick={async () => {
                  setStatus('Waiting for Confirmation...');
                  setShowNotification(true);
                  let response = await contractCall(
                    mumbaiContractAddress,
                    currentAccount,
                    mumbaiABI,
                    [tokenId, subscriber],
                    0,
                    'setSubscriberAddress(uint,address)',
                    false,
                  );
                  if (response == 'Execution Complete') {
                    setStatus('Processing Transaction...');
                    setShowNotification(true);
                    onClose();
                    setInterval(() => {
                      setStatus(`Device Subscriber changed to\n ${subscriber}}`);
                      setShowNotification(true);
                    }, 15000);
                  } else {
                    setStatus('Transaction Failed or Cancelled');
                  }
                }}
              >
                Set Subscriber Address
              </Button>
            </div>
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
    </div>
  );
};

export default TransferDeviceModal;
