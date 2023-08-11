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

interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const grayFont = useColorModeValue("gray.600", "gray.400");
  return (
    <VStack alignItems="flex-start">
      <Box position="relative" mb={2} overflow="hidden" rounded="2xl">
        <Image minH={280} src={imageUrl} />
        <Button
          variant="unstyled"
          position="absolute"
          top={0}
          right={0}
          color="white"
        >
          <FaRegHeart />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"20fr 1fr"}>
          <Text display={"block"} as="b" noOfLines={1} fontSize="md">
            {name}
          </Text>
          <HStack spacing={1} alignItems="center">
            <FaStar size={10} />
            <Text fontSize="sm">{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize="sm" color={grayFont}>
          {city}, {country}
        </Text>
      </Box>
      <Box>
        <Text fontSize="sm" color={grayFont}>
          <Text as="b">₩{price}</Text> / night
        </Text>
      </Box>
    </VStack>
  );
}
