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
import { ISignUpForm, signUp } from "../api";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Please Log In!😁",
        description: "Nice to meet you!",
        position: "top",
      });
      queryClient.refetchQueries(["me"]);
      reset();
      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = ({
    username,
    password,
    passwordConfirm,
    name,
    email,
  }: ISignUpForm) => {
    mutation.mutate({ username, password, passwordConfirm, name, email });
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
              {/* 모든 Input에 custom error message가 필요함. */}
              <Input
                {...register("username", { required: true })}
                variant={"filled"}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", { required: true })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaCheck />
                  </Box>
                }
              />
              <Input
                {...register("passwordConfirm", {
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "";
                    }
                  },
                })}
                type="password"
                variant={"filled"}
                placeholder="Password Confirm"
              />
            </InputGroup>
            {errors.passwordConfirm ? (
              <Text color="red.500" fontSize="md" textAlign="center">
                Password doesn`t match
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
                {...register("name", { required: true })}
                variant={"filled"}
                placeholder="Name"
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
                {...register("email", { required: true })}
                variant={"filled"}
                placeholder="Email"
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
