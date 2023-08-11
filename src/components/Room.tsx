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
    <VStack alignItems="flex-start" spacing={1}>
      <Box position="relative" mb={2} overflow="hidden" rounded="lg">
        <Image minH={280} src={imageUrl} />
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
        <Grid gap={2} templateColumns="5fr 1fr">
          <Text as="b" noOfLines={1} fontSize="mb">
            {name}
          </Text>
          <HStack spacing={1} justifyContent={"end"}>
            <FaStar size={10} />
            <Text fontSize="mb">{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize="mb" color={grayFont}>
          {city}, {country}
        </Text>
      </Box>
      <Box>
        <Text fontSize="mb" color={grayFont}>
          <Text as="b">₩{price}</Text> / night
        </Text>
      </Box>
    </VStack>
  );
}
