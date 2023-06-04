import { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { Footer, Header } from 'components/modules';
import Head from 'next/head';
import { useColorModeValue } from '@chakra-ui/react';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => {
  const bgColor = useColorModeValue('blackAlpha.200', 'blackAlpha.500');
  // const textColor = useColorModeValue("#000000", "#FFFFFF");

  return (
    <>
      <Head>
        <title>{`${pageName} | the-riot-protocol`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container
        maxW="container.xl"
        borderRadius={40}
        bg={bgColor}
        p={3}
        marginTop={50}
        as="main"
        minH="70vh"
        padding={10}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Default;
