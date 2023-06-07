import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { GetTodosAPI } from "apis";
import { Loading } from "components";
import { PageContainer } from "layouts";
import { useEffect, useState } from "react";
import "assets/styles/Home.page.css";

const HomePage = () => {

  const toast = useToast();
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTodos = () => {
    setLoading(true);
    GetTodosAPI().then(response => {
      if(response.status === 200) {
        console.log("response.data : ", response.data);
        setTodos(response.data);
      }
    }).catch(error => {
      toast({
        title: 'Error To Get Todos !',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getTodos();
  }, [])

  return(
    <PageContainer>
      {
        loading ? <Loading/> :
        <Flex justifyContent="center" alignItems="center" gap="25px" py="25px" h="100%" flexWrap="wrap">

          <Flex flexDirection="column" w="350px" bgColor="#2a3240" p="0px 15px 15px 15px" borderRadius="10px" overflowY="scroll" h="66vh" border="3px solid #2a3240" position="relative" className="todo-box">
            <Text mb="15px" pb="15px" borderBottom="1px solid" position="sticky" bgColor="#2a3240" top="0px" pt="15px">Todo</Text>
            {
              todos.map((todo: any) => {
                if(todo.status === "todo") {
                  return (
                    <Box key={todo.id} bgColor="#1a202c" borderRadius="10px" mb="15px" p="0px 15px 15px 15px">
                      <Text borderBottom="1px solid" pb="7.5px" mb="7.5px">{todo.title}</Text>
                      <Text>{todo.description}</Text>
                    </Box>
                  );
                }
              })
            }
          </Flex>

          <Flex flexDirection="column" w="350px" bgColor="#2a3240" p="0px 15px 15px 15px" borderRadius="10px" overflowY="scroll" h="66vh" border="3px solid #2a3240" position="relative" className="todo-box">
            <Text mb="15px" pb="15px" borderBottom="1px solid" position="sticky" bgColor="#2a3240" top="0px" pt="15px">In Progress</Text>
            {
              todos.map((todo: any) => {
                if(todo.status === "wip") {
                  return (
                    <Box key={todo.id} bgColor="#1a202c" borderRadius="10px" minH="100px" mb="15px">
                      <Text>{todo.title}</Text>
                      <Text>{todo.description}</Text>
                    </Box>
                  );
                }
              })
            }
          </Flex>

          <Flex flexDirection="column" w="350px" bgColor="#2a3240" p="0px 15px 15px 15px" borderRadius="10px" overflowY="scroll" h="66vh" border="3px solid #2a3240" position="relative" className="todo-box">
            <Text mb="15px" pb="15px" borderBottom="1px solid" position="sticky" bgColor="#2a3240" top="0px" pt="15px">Done</Text>
            {
              todos.map((todo: any) => {
                if(todo.status === "done") {
                  return (
                    <Box key={todo.id} bgColor="#1a202c" borderRadius="10px" minH="100px" mb="15px">
                      <Text>{todo.title}</Text>
                      <Text>{todo.description}</Text>
                    </Box>
                  );
                }
              })
            }
          </Flex>

        </Flex>
      }
    </PageContainer>
  )
}
export default HomePage;