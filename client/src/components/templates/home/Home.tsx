
import { Heading, VStack, Text, Button, Image, Box } from '@chakra-ui/react';
import Link from "next/link"

const Home = () => {
  return (
    <VStack w={'full'}>
      <Heading size="lg" marginBottom={6}>
        RIOT - Decentralized Security Gateway Platform
      </Heading>

      <Text size={"2xl"} textAlign={"center"}>
        The Internet of Things (IoT) has seen widespread
        adoption in recent years, connecting numerous devices to the
        internet. However, current IoT networks are vulnerable to
        various security threats such as data breaches, unauthorized
        access, and cyber-attacks. To address these security challenges,
        we propose the Riot protocol - a comprehensive solution for
        securing IoT networks by providing device authentication, data
        encryption, decentralized key generation, scalability, and more
        with cryptographic wallet-based authentication. This protocol
        ensures the confidentiality, integrity, and authenticity of the data
        exchanged between IoT devices (publishers) or users
        (subscribers). The Riot protocol aims to provide a secure and
        reliable communication between devices, offering an extensive
        solution to the challenges of IoT security using blockchain
        technology.
      </Text>

      <Link href="/mint-device">
        <Button size={"lg"} style={{ marginTop: "30px" }}>Get started</Button>
      </Link>

      <Box style={{ marginTop: "30px" }} bg="white" p="20px" ><Image src="riot.png" w="700px" /></Box>


    </VStack>
  );
};

export default Home;
