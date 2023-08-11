import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={5}
      rowGap={10}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton rounded="2xl" minH={280} mb={2} />
        <SkeletonText noOfLines={3} w="50%" />
      </Box>
      <Room />
    </Grid>
  );
}
