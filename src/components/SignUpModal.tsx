import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  FaLock,
  FaUserAlt,
  FaCheck,
  FaLanguage,
  FaEnvelope,
} from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ISignUpError, ISignUpSuccess, ISignUpVariables, signUp } from "../api";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISignUpVariables>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<ISignUpSuccess, ISignUpError, ISignUpVariables>(
    signUp,
    {
      onSuccess: (data) => {
        toast({
          status: "success",
          title: `Hello, ${data.name}(${data.username})`,
          description: " Nice to meet you!😁",
          position: "top",
        });
        queryClient.refetchQueries(["me"]);
        reset();
        onClose();
      },
    }
  );
  const onSubmit = ({
    username,
    password,
    passwordConfirm,
    name,
    email,
  }: ISignUpVariables) => {
    mutation.mutate({
      username,
      password,
      passwordConfirm,
      name,
      email,
    });
  };
  return (
    <Modal motionPreset={"slideInRight"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="2">
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserAlt />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username)}
                {...register("username", { required: "Please Write" })}
                variant={"filled"}
                placeholder={
                  errors.username ? errors.username?.message : "Username"
                }
                _placeholder={
                  errors.username
                    ? { opacity: 1, color: "crimson" }
                    : { opacity: 0.6, color: "inherit" }
                }
              />
            </InputGroup>
            {mutation.error?.response.data ? (
              <Text
                color="red.500"
                fontWeight="bold"
                fontSize="md"
                textAlign="center"
              >
                {mutation.error?.response.data.usernameError}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password)}
                {...register("password", { required: "Please Write" })}
                type="password"
                variant={"filled"}
                placeholder={
                  errors.password ? errors.password?.message : "Password"
                }
                _placeholder={
                  errors.password
                    ? { opacity: 1, color: "crimson" }
                    : { opacity: 0.6, color: "inherit" }
                }
              />
            </InputGroup>
            {mutation.error?.response.data ? (
              <Text
                color="red.500"
                fontWeight="bold"
                fontSize="md"
                textAlign="center"
              >
                {mutation.error?.response.data.passwordError}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaCheck />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.passwordConfirm)}
                {...register("passwordConfirm", { required: "Please Write" })}
                type="password"
                variant={"filled"}
                placeholder={
                  errors.passwordConfirm
                    ? errors.passwordConfirm?.message
                    : "Password Confirm"
                }
                _placeholder={
                  errors.passwordConfirm
                    ? { opacity: 1, color: "crimson" }
                    : { opacity: 0.6, color: "inherit" }
                }
              />
            </InputGroup>
            {mutation.error?.response.data ? (
              <Text
                color="red.500"
                fontWeight="bold"
                fontSize="md"
                textAlign="center"
              >
                {mutation.error?.response.data.passwordConfirmError}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLanguage />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name)}
                {...register("name", { required: "Please Write" })}
                variant={"filled"}
                placeholder={errors.name ? errors.name?.message : "Name"}
                _placeholder={
                  errors.name
                    ? { opacity: 1, color: "crimson" }
                    : { opacity: 0.6, color: "inherit" }
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email)}
                {...register("email", { required: "Please Write" })}
                variant={"filled"}
                placeholder={errors.email ? errors.email?.message : "Email"}
                _placeholder={
                  errors.email
                    ? { opacity: 1, color: "crimson" }
                    : { opacity: 0.6, color: "inherit" }
                }
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
          >
            Sign Up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
