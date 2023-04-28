import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';


const Footer = () => {
  return (
    <Box textAlign={'center'} w="full" p={6}>
      <Text color={"gray"}>
        <strong>the-riot-protocol</strong> - All rights reserverd - <Link href={"https://github.com/fabianferno/the-riot-protocol"} isExternal>GitHub <ExternalLinkIcon mx="2px" /></Link>
      </Text>
    </Box>
  );
};

export default Footer;
