import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const { toggleColorMode /*colorMode*/ } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
      position: "top",
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      title: "Done!",
      description: "See you later!",
      status: "success",
    });
  };
  return (
    <Stack
      justifyContent={"space-between"}
      py={5}
      px={40}
      alignItems="center"
      spacing={{
        sm: "5",
        md: "0",
      }}
      direction={{
        sm: "column",
        md: "row",
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to="/">
          <FaAirbnb size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />} // icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log In</Button>
              <Button onClick={onSignUpOpen} colorScheme="red">
                Sign Up
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.username} src={user?.avatar} size="md" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}

        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      </HStack>
    </Stack>
  );
}
