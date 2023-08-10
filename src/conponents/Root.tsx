import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {
  FaAirbnb,
  FaMoon,
  FaUserAlt,
  FaLock,
  FaComment,
  FaGithub,
} from "react-icons/fa";

export default function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={5}
        px={10}
        borderBottomWidth={1}
      >
        <Box color="red.500">
          <FaAirbnb size={"48"} />
        </Box>
        <HStack spacing={2}>
          <IconButton
            variant={"ghost"}
            aria-label="Toggle dark mode"
            icon={<FaMoon />}
          />
          <Button onClick={onOpen}>Log In</Button>
          <Button colorScheme="red">Sign Up</Button>
          <Modal
            motionPreset={"slideInRight"}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Log In</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="2">
                  <InputGroup>
                    <InputLeftElement
                      children={
                        <Box color={"gray.500"}>
                          <FaUserAlt />
                        </Box>
                      }
                    />
                    <Input variant={"filled"} placeholder="Username" />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      children={
                        <Box color={"gray.500"}>
                          <FaLock />
                        </Box>
                      }
                    />
                    <Input variant={"filled"} placeholder="Password" />
                  </InputGroup>
                  <Button mt={4} colorScheme={"red"} w="100%">
                    Log In
                  </Button>
                  <Box w="100%" mb={4}>
                    <HStack mt={4} mb={6}>
                      <Divider />
                      <Text
                        textTransform={"uppercase"}
                        color={"gray.500"}
                        fontSize={"xs"}
                        as={"b"}
                      >
                        or
                      </Text>
                      <Divider />
                    </HStack>
                    <HStack>
                      <Button
                        w="100%"
                        rightIcon={<FaGithub />}
                        colorScheme={"blackAlpha"}
                      >
                        Continue with
                      </Button>
                      <Button
                        w="100%"
                        rightIcon={<FaComment />}
                        colorScheme={"yellow"}
                      >
                        Continue with
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
