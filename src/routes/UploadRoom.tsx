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
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPgae from "../components/ProtectedPage";
import {
  IUploadRoomVariables,
  getAmenities,
  getCategories,
  uploadRoom,
} from "../api";
import { IAmenity, ICategory, IRoomDetail } from "../type";

export default function UploadRoom() {
  useHostOnlyPage();
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Upload Success",
        position: "top",
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPgae>
      <Box mt={10} px={{ base: 10, lg: 40 }} pb={40}>
        <Container>
          <Heading textAlign="center">Upload Room</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={10}
            mt={5}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input
                  {...register("price", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly")}>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of Room</FormLabel>
              <Select
                {...register("kind", { required: true })}
                placeholder="Choose a kind"
              >
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
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a category"
              >
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
                    <Checkbox
                      value={amenity.pk}
                      {...register("amenities", { required: true })}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme="red"
              size="lg"
              width="80%"
            >
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPgae>
  );
}
