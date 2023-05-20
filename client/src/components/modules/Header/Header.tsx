import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { ColorModeButton, MoralisLogo, NavBar } from 'components/elements';
import ConnectButton from '../../metamask/ConnectButton';
import Link from 'next/link';

const Header = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <Link href="/"><MoralisLogo /></Link>
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
