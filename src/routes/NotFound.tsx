import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg="gray.200" justifyContent="center" minH="100vh">
      <Heading>404</Heading>
      <Text>Page is not found</Text>
      <Link to="/">
        <Button colorScheme="red" variant="solid">
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
