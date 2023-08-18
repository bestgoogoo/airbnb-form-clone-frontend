import { MenuItem, ToastId, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { logOut } from "../api";

export default function LogOut() {
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const queryClient = useQueryClient();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "Sad to see you go...",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          title: "Done!",
          description: "See you later!",
          status: "success",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };
  return <MenuItem onClick={onLogOut}>Log Out</MenuItem>;
}
