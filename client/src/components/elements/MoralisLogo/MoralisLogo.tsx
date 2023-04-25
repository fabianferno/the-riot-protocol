import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const MoralisLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <h1 style={{
      fontSize: "35px",
      fontWeight: "bold",
      fontFamily: "monospace",
    }}>RIOT PROTOCOL</h1>
  );
};

export default MoralisLogo;
