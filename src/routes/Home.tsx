import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={5}
      rowGap={10}
      templateColumns="repeat(5, 1fr)"
    >
      {[
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ].map((index) => (
        <VStack key={index} alignItems="flex-start" spacing={1}>
          <Box
            position="relative"
            mb={2}
            overflow="hidden"
            rounded="lg"
            h={220}
          >
            <Image src="https://a0.muscache.com/im/pictures/6b3f1fe9-833f-449e-aacb-c2e9a2466ce7.jpg?im_w=720" />
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
              <Text as="b" noOfLines={1} fontSize="xs">
                Brooklin,NewYork,United State
              </Text>
              <HStack spacing={1}>
                <FaStar size={10} />
                <Text fontSize="xs">5.0</Text>
              </HStack>
            </Grid>
            <Text fontSize="xs" color="gray.600">
              Brooklin, New York
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="gray.600">
              <Text as="b">$72</Text> / night
            </Text>
          </Box>
        </VStack>
      ))}
    </Grid>
  );
}
