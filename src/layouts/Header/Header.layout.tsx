import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Link, Popover, PopoverTrigger, useColorModeValue, useDisclosure, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons';
import { AddTodoAPI, GetTodosAPI } from 'apis';
import { useContext, useState } from 'react';
import { TodoContext } from 'context';

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  }
];

export const Header = () => {

  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: addOpen, onOpen, onClose } = useDisclosure();
  const [disableAddBtn, setDisableAddBtn] = useState<boolean>(false);
  const [todoData, setTodoData] = useState<{title: string, desc: string}>({
    title: "",
    desc: ""
  })
  const { setLoading, setTodos } = useContext(TodoContext);

  const addNewTodo = () => {
    setDisableAddBtn(true);
    AddTodoAPI(todoData.title, todoData.desc).then(response => {      
      if(response.status === 201) {
        toast({ title: 'Todo Added.', status: 'success', duration: 3000, isClosable: true })
      }
    }).catch(() => {
      toast({ title: 'error', status: 'error', duration: 3000, isClosable: true })
    }).finally(() => {
      getTodos();
      setDisableAddBtn(false);
      setTodoData({ title: "", desc: "" });
      onClose();
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

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTodoData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  return (
    <Box>
      <Flex py={2} borderBottom={1} borderStyle="solid" borderColor={useColorModeValue('gray.300', 'gray.500')} align="center">
        
        <Flex  display={{ base: 'flex', md: 'none' }}>
          <IconButton onClick={onToggle} icon={ isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} /> } variant="outline" aria-label="Toggle Navigation" />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text textAlign="left" ml="5px" fontFamily="heading" color={useColorModeValue('gray.800', 'white')}>Todo App</Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction="row" spacing={4}>
              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  <Popover trigger="hover" placement="bottom-start">
                    <PopoverTrigger>
                      <Link p={2} href={navItem.href ?? '#'} fontSize="sm" fontWeight={500} color={useColorModeValue('gray.600', 'gray.200')} _hover={{ textDecoration: 'none', color: useColorModeValue('gray.800', 'white'), }}>{navItem.label}</Link>
                    </PopoverTrigger>
                  </Popover>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={2}>
          <Button colorScheme="telegram" size="sm" h="auto" leftIcon={<AddIcon />} onClick={onOpen}>Add</Button>
          <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
        </Stack>

      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
          {NAV_ITEMS.map((navItem) => (
            <Stack spacing={4} key={navItem.label}>
              <Flex py={2} as={Link} href={navItem.href ?? '#'} justify="space-between" align="center" _hover={{ textDecoration: 'none' }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>{navItem.label}</Text>
              </Flex>
            </Stack>
          ))}
        </Stack>
      </Collapse>

      <Modal isOpen={addOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton disabled={disableAddBtn}/>
          <ModalBody>
            <FormControl>
              <Input type="text" placeholder="Todo Title" disabled={disableAddBtn} value={todoData.title} onChange={handleNewTodo} name="title"/>
              <Textarea placeholder="Todo Description" my="10px" disabled={disableAddBtn} value={todoData.desc} onChange={handleNewTodo} name="desc"/>
              <Button colorScheme="telegram" size="sm" h="40px" disabled={disableAddBtn} isLoading={disableAddBtn} w="100%" leftIcon={<AddIcon />} mb="10px" onClick={addNewTodo}>Add Todo</Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  );
}