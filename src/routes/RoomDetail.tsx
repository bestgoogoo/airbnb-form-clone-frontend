import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCircle, FaStar } from "react-icons/fa";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../type";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { isLoading: isReviewsLoading, data: reveiwsData } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
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
        <HStack fontSize="lg" alignItems="center" spacing={2}>
          <HStack spacing={1} alignItems="center">
            <FaStar size={14} />
            <Text>{data?.rating}</Text>
          </HStack>
          <FaCircle size={2} />
          <Link variant="link" textDecoration="underline">
            {reveiwsData?.length}{" "}
            {reveiwsData?.length === 1 ? "Review" : "Reviews"}
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
        mb={10}
        gap={2}
        rounded="xl"
        overflow="hidden"
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
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width="50%" justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Skeleton isLoaded={!isLoading} height="30px">
            <Heading fontSize="2xl">
              House hosted by {data?.owner.username}
            </Heading>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            height="20px"
            justifyContent="flex-start"
          >
            <HStack w="100%" alignItems="center" fontSize="lg" spacing={2}>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
              <FaCircle size={2} />
              <Text>
                {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <FaCircle size={2} />
              <Text>and more..</Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar
          size="xl"
          name={data?.owner.username}
          src={data?.owner.avatar}
        />
      </HStack>
      <Box mt={10}>
        <Heading mb={5} fontSize="2xl">
          <HStack spacing={2} alignItems="center">
            <FaStar />
            <Text>{data?.rating}</Text>
            <Text>•</Text>
            <Text>
              {reveiwsData?.length} review{reveiwsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
        <Grid mt={10} rowGap={10} columnGap={20} templateColumns="1fr 1fr">
          {reveiwsData?.map((review, index) => (
            <Skeleton isLoaded={!isLoading}>
              <VStack alignItems="flex-start" key={index}>
                <HStack>
                  <Avatar
                    size="lg"
                    name={review.user.username}
                    src={review.user.avatar}
                  />
                  <VStack alignItems="flex-start">
                    <Heading fontSize="xl">{review.user.username}</Heading>
                    {/* I need syntax date data */}
                    <Text color="gray.400" fontSize="lg">
                      {review.created_at}
                    </Text>
                  </VStack>
                </HStack>
                <Text px={5} fontSize="lg" noOfLines={3}>
                  {review.payload}
                </Text>
              </VStack>
            </Skeleton>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
