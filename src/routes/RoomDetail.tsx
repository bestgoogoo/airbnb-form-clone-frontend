import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { FaCircle, FaStar } from "react-icons/fa";
import { getRoom } from "../api";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery(["rooms", roomPk], getRoom);
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton
        rounded="lg"
        height="43px"
        width="30%"
        isLoaded={!isLoading}
        mb={1}
      >
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Skeleton
        rounded="md"
        height="27px"
        width="25%"
        isLoaded={!isLoading}
        mb={8}
      >
        <HStack fontSize="lg" alignItems={"center"} spacing={2}>
          <HStack spacing={1} alignItems="center">
            <FaStar size={14} />
            <Text>{data?.rating}</Text>
          </HStack>
          <FaCircle size={2} />
          <Link variant="link" textDecoration="underline">
            {data?.total === 1 ? "Review" : "Reviews"}: {data?.total_reviews}
          </Link>
          <FaCircle size={2} />
          <Link variant="link" textDecoration="underline">
            {data?.owner.username}
          </Link>
          <FaCircle size={2} />
          <Link variant="link" textDecoration="underline">
            {data?.address}
          </Link>
        </HStack>
      </Skeleton>
      <Grid
        gap={2}
        rounded={"xl"}
        overflow={"hidden"}
        height="60vh"
        templateRows="1fr 1fr"
        templateColumns="repeat(4, 1fr)"
      >
        {[0, 1, 2, 3, 4].map((index: number) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow="hidden"
            key={index}
          >
            <Skeleton isLoaded={!isLoading} w="100%" h="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
