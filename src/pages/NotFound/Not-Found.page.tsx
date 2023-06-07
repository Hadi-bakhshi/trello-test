import { Box, Button, Text } from "@chakra-ui/react";
import { PATHS } from "configs";
import { PageContainer } from "layouts";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const Navigate = useNavigate();

  return(
    <PageContainer>
      <Box>
        <Text fontSize="35px" fontWeight="bold" mb="10px">404 Not Found</Text>
        <Button onClick={() => {
          Navigate(PATHS.HOME);
        }}>Goto Home</Button>
      </Box>
    </PageContainer>
  )
}
export default NotFoundPage;