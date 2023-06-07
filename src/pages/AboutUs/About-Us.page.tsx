import { Box, Text } from "@chakra-ui/react";
import { PageContainer } from "layouts";

const AboutUsPage = () => {
  return(
    <PageContainer>
      <Box>
        <Text fontSize="25px" fontWeight="bold" borderBottom="1px solid white" w="fit-content" m="0 auto">Behineh Kavan Keyfiat</Text>
        <Text>Mohammad Reza Ebrahimi</Text>
      </Box>
    </PageContainer>
  )
}
export default AboutUsPage;