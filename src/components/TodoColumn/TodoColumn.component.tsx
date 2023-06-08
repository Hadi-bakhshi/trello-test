import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { DeleteTodoAPI, GetTodosAPI, UpdateTodoAPI } from "apis";
import { TodoContext } from "context";
import moment from "jalali-moment";
import { useContext, useEffect, useState } from "react";
import { calcDiffrentTime } from "utils";

export const TodoColumn = ({todoList, headerTitle}: {todoList: any[], headerTitle: string}) => {

  const toast = useToast();
  const { isOpen: deleteIsOpen, onOpen: deleteOpOpen, onClose: deleteOnClose } = useDisclosure();
  const { isOpen: detailsIsOpen, onOpen: detailsOpOpen, onClose: detailsOnClose } = useDisclosure();
  const [ deleteId, setDeleteId ] = useState<number>(-1);
  const [ deleteLoading, setDeleteLoading ] = useState<boolean>(false);
  const { setLoading, setTodos } = useContext(TodoContext);
  const [detailsTodo, setDetailsTodo] = useState<any>({});

  const handleDeleteMenu = (todoId: number) => {
    deleteOpOpen();
    setDeleteId(todoId);
  }

  const handleDeleteTodo = () => {
    setDeleteLoading(true);
    DeleteTodoAPI(deleteId).then(response => {
      if(response.status === 200) {
        toast({ title: 'Todo Deleted !', status: 'success', duration: 3000, isClosable: true })
      }
    }).catch(() => {
      toast({ title: 'Error To Delete Todo !', status: 'error', duration: 3000, isClosable: true })
    }).finally(() => {
      setDeleteLoading(false);
      deleteOnClose();
      setDeleteId(-1);
      getTodos();
    })
  }

  const handleUpdateMenu = (todoId: number, wipTime: string, status: string) => {
    setLoading(true);
    UpdateTodoAPI(todoId, wipTime, status).then(response => {
      if(response.status === 200) {
        toast({ title: 'Todo Updated !', status: 'success', duration: 3000, isClosable: true })
      }
    }).catch(() => {
      toast({ title: 'Error To Update Todo !', status: 'error', duration: 3000, isClosable: true })
    }).finally(() => {
      getTodos();
    })
  }

  const getTodos = () => {
    setLoading(true);
    GetTodosAPI().then(response => {
      if(response.status === 200) {
        setTodos(response.data);
      }
    }).catch(() => {
      toast({ title: 'Error To Get Todos !', status: 'error', duration: 3000, isClosable: true })
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    if(Object.keys(detailsTodo).length > 0) {
      detailsOpOpen();
    }
  },[detailsTodo])

  return (
    <Flex flexDirection="column" w="350px" borderRadius="10px" overflowY="scroll" h="66vh" border="3px solid" position="relative" className="todo-box"
      borderColor={useColorModeValue("#cbd5e0", "#2a3240")}
      bgColor={useColorModeValue("#cbd5e0", "#2a3240")}
    >
      <Text mb="15px" pb="15px" borderBottom="1px solid" position="sticky" bgColor={useColorModeValue("#cbd5e0", "#2a3240")} top="0px" pt="15px" zIndex={1} ml="0.5rem">{headerTitle}</Text>
      {
        todoList.map((todo: any) => (
          <Box key={todo.id} bgColor={useColorModeValue("#e2e8f0", "#1a202c")} borderRadius="10px" mb="15px" p="0px 15px 15px 15px" m="15px" className="todo-item">
            <Text borderBottom="1px solid #718096" py="7.5px" mb="7.5px" fontSize="15px">{todo.title}</Text>
            <Text borderBottom="1px solid #718096" pb="7.5px" mb="15px" fontSize="12px" textAlign="justify" style={{textAlignLast: "center"}} lineHeight="20px">{todo.description}</Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="flex-start" flexDirection="column">
                <Button size="xs" onClick={() => setDetailsTodo(todo)}>Details</Button>
              </Flex>
              <Menu>
                <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' size="xs"/>
                <MenuList w="50px">
                  <MenuItem p="5px" onClick={() => handleDeleteMenu(todo.id)}>Delete</MenuItem>
                  {todo.status !== "done" && <MenuDivider />}
                  {todo.status === "todo" && <MenuItem p="5px" onClick={() => handleUpdateMenu(todo.id, todo.wip_time, "wip")}>WIP</MenuItem>}
                  {todo.status === "wip" && <MenuItem p="5px" onClick={() => handleUpdateMenu(todo.id, todo.wip_time, "todo")}>Todo</MenuItem>}
                  {(todo.status === "wip" || todo.status === "todo") && <MenuItem p="5px" onClick={() => handleUpdateMenu(todo.id, todo.wip_time, "done")}>Done</MenuItem>}
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        ))
      }

      <Modal isOpen={deleteIsOpen} onClose={deleteOnClose} closeOnOverlayClick={false}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent>
          <ModalHeader>Delete Todo</ModalHeader>
          <ModalCloseButton disabled={deleteLoading}/>
          <ModalBody>
            <Text>Are You Sure To Delete This Todo ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={deleteOnClose} disabled={deleteLoading} isLoading={deleteLoading}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDeleteTodo} disabled={deleteLoading} isLoading={deleteLoading}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={detailsIsOpen} onClose={() => {
        detailsOnClose();
        setDetailsTodo({});
      }} closeOnOverlayClick={false}>
        <ModalOverlay backdropFilter='auto' backdropHueRotate='100%'/>
        <ModalContent>
          <ModalHeader>Todo Details</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <hr />
            <Text fontWeight="bold" my="10px">Title: </Text>
            <Text mb="20px">{detailsTodo.title}</Text>
            <hr />
            <Text fontWeight="bold" my="10px">Description</Text>
            <Text mb="20px" fontSize="12px" textAlign="justify" lineHeight="20px">{detailsTodo.description}</Text>
            <hr />
            <Text my="10px"><Text as="span" fontWeight="bold">Create Time : </Text>{moment.unix(detailsTodo.create_time).format("MM/DD/YYYY HH:mm:ss")}</Text>
            {(detailsTodo.status === "wip" || detailsTodo.status === "done") && <Text><Text as="span" fontWeight="bold">WIP Time : </Text>{moment.unix(detailsTodo.wip_time).format("MM/DD/YYYY HH:mm:ss")}</Text>}
            {detailsTodo.status === "done" && <Text my="10px"><Text as="span" fontWeight="bold">Done Time : </Text>{moment.unix(detailsTodo.done_time).format("MM/DD/YYYY HH:mm:ss")}</Text>}
            {detailsTodo.status === "done" && <Text my="10px"><Text as="span" fontWeight="bold">Time In WIP : </Text>{calcDiffrentTime(detailsTodo.done_time, detailsTodo.wip_time)}</Text>}
          </ModalBody>
        </ModalContent>
      </Modal>

    </Flex>
  )
}