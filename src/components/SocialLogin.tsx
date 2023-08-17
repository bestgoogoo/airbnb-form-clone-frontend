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
  const kakaoParams = {
    client_id: "d7fe98d70f4dac645708afc3086b987f",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
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
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          rightIcon={<FaComment />}
          w="100%"
          colorScheme={"yellow"}
        >
          Continue with
        </Button>
      </HStack>
    </Box>
  );
}
