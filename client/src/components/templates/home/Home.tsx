
import { Heading, VStack, Text, Button, Image, Box, Container, Stack, } from '@chakra-ui/react';
import Link from "next/link"
const Home = () => {
  return (
    <VStack w={'full'}>
      <Box py={5}>
        <Container maxW="container.lg">

          <Box textAlign="center" mt={20} marginBottom={150}>
            <Heading as="h2" mb={4}>
              Get Started with Riot Protocol
            </Heading>
            <Text fontSize="xl">
              Experience the secure and reliable communication offered by the Riot protocol. Join us today and protect your IoT networks from security threats.
            </Text>
            <Button colorScheme="blue" size="lg" mt={6}>
              Sign Up Now
            </Button>
          </Box>



          <Stack direction={{ base: 'column', md: 'row' }} spacing={8} mb={10}>
            <Box flex="1">
              <Image src="/stock1.webp" alt="Image 1" rounded="lg" shadow="md" />
              <Heading as="h3" mt={4} mb={2}>
                Authentication & Encryption
              </Heading>
              <Text>
                The Riot protocol provides robust device authentication and data encryption mechanisms to secure the communication between IoT devices and users.
              </Text>
            </Box>

            <Box flex="1">
              <Image src="/stock2.webp" alt="Image 2" rounded="lg" shadow="md" />
              <Heading as="h3" mt={4} mb={2}>
                Decentralized Key Generation
              </Heading>
              <Text>
                With decentralized key generation, the Riot protocol ensures that cryptographic keys are generated securely and distributed in a decentralized manner.
              </Text>
            </Box>
          </Stack>


          <Box textAlign="center" mt={100}>
            <Heading as="h1" mb={4}>
              Decentralized Security Gateway Platform
            </Heading>
            <Text fontSize="xl" textAlign={"justify"}>
              The Internet of Things (IoT) has seen widespread adoption in recent years, connecting numerous devices to the internet. However, current IoT networks are vulnerable to various security threats such as data breaches, unauthorized access, and cyber-attacks. To address these security challenges, we propose the Riot protocol - a comprehensive solution for securing IoT networks by providing device authentication, data encryption, decentralized key generation, scalability, and more with cryptographic wallet-based authentication. This protocol ensures the confidentiality, integrity, and authenticity of the data exchanged between IoT devices (publishers) or users (subscribers). The Riot protocol aims to provide a secure and reliable communication between devices, offering an extensive solution to the challenges of IoT security using blockchain technology.
            </Text>
          </Box>
        </Container>
      </Box>
      <Link href="/mint-device">
        <Button size={"lg"} margin={5} >Get started</Button>
      </Link>



    </VStack>
  );
};

export default Home;
