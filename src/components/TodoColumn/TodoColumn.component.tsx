import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"

export const TodoColumn = ({todoList, headerTitle}: {todoList: any[], headerTitle: string}) => {

  return (
    <Flex flexDirection="column" w="350px" p="0px 15px 15px 15px" borderRadius="10px" overflowY="scroll" h="66vh" border="3px solid" position="relative" className="todo-box"
      borderColor={useColorModeValue("#cbd5e0", "#2a3240")}
      bgColor={useColorModeValue("#cbd5e0", "#2a3240")}      
    >
      <Text mb="15px" pb="15px" borderBottom="1px solid" position="sticky" bgColor={useColorModeValue("#cbd5e0", "#2a3240")} top="0px" pt="15px">{headerTitle}</Text>
      {
        todoList.map((todo: any) => (
          <Box key={todo.id} bgColor={useColorModeValue("#e2e8f0", "#1a202c")} borderRadius="10px" mb="15px" p="0px 15px 15px 15px" className="todo-item"
            draggable="true" 
          >
            <Text borderBottom="1px solid" pb="7.5px" mb="7.5px" fontSize="15px">{todo.title}</Text>
            <Text fontSize="12px">{todo.description}</Text>
          </Box>
        ))
      }
    </Flex>
  )
}