import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded="2xl" height="280px" mb={4} />
      <HStack justifyContent="space-between" mb={2}>
        <Skeleton rounded="lg" width="75%" height={4} />
        <Skeleton rounded="lg" width="15%" height={4} />
      </HStack>
      <Skeleton rounded="lg" width="60%" height={4} mb={2.5} />
      <Skeleton rounded="lg" width="35%" height={4} />
    </Box>
  );
}
