
import { Heading, VStack, Text, Button } from '@chakra-ui/react';
import Link from "next/link"

const Home = () => {
  return (
    <VStack w={'full'}>
      <Heading size="lg" marginBottom={6}>
        RIOT - Decentralized Security Gateway Platform
      </Heading>

      <Text size={"2xl"} textAlign={"center"}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem dignissimos vero distinctio mollitia, laudantium aperiam rerum recusandae unde magni, doloremque modi dolorum quod, illo a eligendi incidunt rem? Deleniti, aspernatur?
      </Text>

      <Link href="/mint-device">
        <Button size={"lg"} style={{ marginTop: "30px" }}>Mint your device</Button>
      </Link>


    </VStack>
  );
};

export default Home;
