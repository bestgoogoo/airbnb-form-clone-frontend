import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(githubLogIn, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "Welcome!😁",
        description: "Happy to have you back!",
        position: "top",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent="center" mt={20}>
      <Heading>Processing Log In...</Heading>
      <Text>Don`t go anywhere</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
