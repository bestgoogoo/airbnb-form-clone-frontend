import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const grayFont = useColorModeValue("gray.600", "gray.400");
  return (
    <VStack alignItems="flex-start" spacing={1}>
      <Box position="relative" mb={2} overflow="hidden" rounded="lg">
        <Image
          minH={280}
          src="https://a0.muscache.com/im/pictures/6b3f1fe9-833f-449e-aacb-c2e9a2466ce7.jpg?im_w=720"
        />
        <Button
          variant="unstyled"
          position="absolute"
          top={0}
          right={0}
          color="white"
          cursor="pointer"
        >
          <FaRegHeart />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns="4fr 1fr">
          <Text as="b" noOfLines={1} fontSize="mb">
            Brooklin,NewYork,United State
          </Text>
          <HStack spacing={1}>
            <FaStar size={10} />
            <Text fontSize="mb">5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize="mb" color={grayFont}>
          Brooklin, New York
        </Text>
      </Box>
      <Box>
        <Text fontSize="mb" color={grayFont}>
          <Text as="b">$72</Text> / night
        </Text>
      </Box>
    </VStack>
  );
}
