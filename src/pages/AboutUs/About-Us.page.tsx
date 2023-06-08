import { Box, Text } from "@chakra-ui/react";
import { PageContainer } from "layouts";

const AboutUsPage = () => {
  return(
    <PageContainer>
      <Box>
        <Text fontSize="25px" fontWeight="bold" borderBottom="1px solid white" w="fit-content" m="0 auto">Behineh Kavan Keyfiat</Text>
        <Text borderBottom="1px solid white" w="fit-content" m="0 auto">Mohammad Reza Ebrahimi</Text>
        <Box mt="25px">
          <Text fontSize="14px">React + Vite + TS + Chakra UI + Mock API</Text>
        </Box>
      </Box>
    </PageContainer>
  )
}
export default AboutUsPage;