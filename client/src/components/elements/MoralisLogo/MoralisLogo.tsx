import { Box } from '@chakra-ui/react'


const Logo = () => {
  return (
    <Box rounded={"2xl"} bg='#ffffff' w="-moz-fit-content" m={5} px={3} py={1} color='white' >
      <h1 style={{
        fontSize: "25px",
        fontWeight: "bold",
        fontFamily: "monospace",
        color: "black",
        textAlign: "center",
      }}>
        the-riot-protocol
      </h1>
    </Box >
  );
};

export default Logo;
