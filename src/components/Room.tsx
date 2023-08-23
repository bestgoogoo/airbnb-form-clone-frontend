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
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const grayFont = useColorModeValue("gray.600", "gray.400");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
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
            onClick={onCameraClick}
            top={0}
            right={0}
            color="white"
          >
            {isOwner ? <FaCamera size="20px" /> : <FaRegHeart size="20px" />}
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
