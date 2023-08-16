import {
  Box,
  Button,
  Divider,
  HStack,
  LightMode,
  Text,
} from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box w="100%" mb={4}>
      <HStack my={6}>
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
        <LightMode>
          <Button
            as="a"
            href="https://github.com/login/oauth/authorize?client_id=72af9d41820cb7329816&scope=read:user,user:email"
            rightIcon={<FaGithub />}
            w="100%"
            colorScheme={"blackAlpha"}
          >
            Continue with
          </Button>
        </LightMode>
        <Button rightIcon={<FaComment />} w="100%" colorScheme={"yellow"}>
          Continue with
        </Button>
      </HStack>
    </Box>
  );
}
