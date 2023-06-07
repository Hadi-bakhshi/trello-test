import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Link, Popover, PopoverTrigger, useColorModeValue, useBreakpointValue, useDisclosure, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, AddIcon } from '@chakra-ui/icons';

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

export default function WithSubnavigation() {

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

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
          <Button colorScheme="telegram" size="sm" h="auto" leftIcon={<AddIcon />}>Add</Button>
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
    </Box>
  );
}