import { Spinner, Stack } from "@chakra-ui/react"

export const Loading = () => {
  return (
    <Stack direction='row' spacing={4} h="100vh" w="100vw" top={0} left={0} pos="absolute" justifyContent="center" alignItems="center">
      <Spinner size='xl' />
    </Stack>
  )
}