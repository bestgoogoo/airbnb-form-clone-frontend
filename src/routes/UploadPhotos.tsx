import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";

export default function UploadPhotos() {
  useHostOnlyPage();
  const { register, watch } = useForm();
  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign="center">Upload Photos</Heading>
          <VStack as="form" spacing={5} mt={10}>
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button type="submit" w="full" colorScheme="red">
              Upload Photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
