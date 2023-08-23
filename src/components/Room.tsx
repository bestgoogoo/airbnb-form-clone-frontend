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
import { Link } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const grayFont = useColorModeValue("gray.600", "gray.400");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems="flex-start">
        <Box
          w="100%"
          position="relative"
          mb={2}
          overflow="hidden"
          rounded="2xl"
        >
          {imageUrl ? (
            <Image minH={280} src={imageUrl} />
          ) : (
            <Box minH={280} h="100%" p={10} bg="red.400" />
          )}
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
    </Link>
  );
}
