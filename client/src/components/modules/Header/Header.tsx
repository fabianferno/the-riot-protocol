import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { ColorModeButton, NavBar } from 'components/elements';
import ConnectButton from '../../metamask/ConnectButton';
import Link from 'next/link';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container my="5" maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <Link href="/">
            <Box rounded={"3xl"} bg={"white"}>
              <Text fontSize={"3xl"} mx="5" py="1" color={"black"} fontWeight={"bold"}>the-riot-protocol</Text>
            </Box>
          </Link>
          <NavBar />
          <HStack gap={'10px'}>
            <ConnectButton />
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
