import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPgae from "../components/ProtectedPage";
import { getAmenities, getCategories } from "../api";
import { IAmenity, ICategory } from "../type";

export default function UploadRoom() {
  useHostOnlyPage();
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  return (
    <ProtectedPgae>
      <Box mt={10} px={{ base: 10, lg: 40 }} pb={40}>
        <Container>
          <Heading textAlign="center">Upload Room</Heading>
          <VStack as="form" spacing={10} mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required type="text" />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input required type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input required type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input required type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input required type="number" min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl>
              <Checkbox>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of Room</FormLabel>
              <Select placeholder="Choose a kind">
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
              <FormHelperText>
                Whate kind of the room are you renting?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Choose a category">
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Whate category decribes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Grid templateColumns="1fr 1fr" gap={6}>
                {amenities?.map((amenity) => (
                  <Box key={amenity.pk}>
                    <Checkbox>{amenity.name}</Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            <Button colorScheme="red" size="lg" width="80%">
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPgae>
  );
}
