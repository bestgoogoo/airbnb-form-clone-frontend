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
          <Button w="100%" rightIcon={<FaGithub />} colorScheme={"blackAlpha"}>
            Continue with
          </Button>
        </LightMode>
        <Button w="100%" rightIcon={<FaComment />} colorScheme={"yellow"}>
          Continue with
        </Button>
      </HStack>
    </Box>
  );
}
