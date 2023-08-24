import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

// Same with lower const function
// export async function getRooms() {
//   const response = await instance.get("rooms/");
//   return response.data;
// }

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [rooms, roomPk] = queryKey;
  return instance.get(`${rooms}/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [rooms, roomPk] = queryKey;
  return instance
    .get(`${rooms}/${roomPk}/reviews/`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get("users/me").then((response) => response.data);

export const logOut = () =>
  instance
    .post("users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      "users/github",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      "users/kakao",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUsernameLogInVariables {
  username: string;
  password: string;
}
export interface IUsernameLogInSuccess {
  ok: string;
}
export interface IUsernameLogInError {
  response: {
    data: { error: string };
    status: number;
    statusText: string;
  };
}

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLogInVariables) =>
  instance
    .post(
      "users/log-in",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface ISignUpForm {
  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
}

export const signUp = ({ username, password, name, email }: ISignUpForm) =>
  instance
    .post(
      "users/sign-up",
      { username, password, name, email },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get("rooms/amenities/").then((response) => response.data);

export const getCategories = () =>
  instance.get("categories/").then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  address: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  pet_friendly: boolean;
  kind: string;
  category: number;
  amenities: number[];
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post("rooms/", variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
