import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box>
      <Flex py={2} borderTop={1} borderStyle="solid" borderColor={useColorModeValue('gray.300', 'gray.500')} align="center" justifyContent="center">
        <Text>Todo List Applicatio Copy Rigth Text - 2023</Text>
      </Flex>
    </Box>
  );
}