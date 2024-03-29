import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "./lib/utils";

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

export interface ISignUpVariables {
  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
}
export interface ISignUpSuccess {
  name: string;
  username: string;
}
export interface ISignUpErrorType {
  usernameError: string;
  passwordError: string;
  passwordConfirmError: string;
}
export interface ISignUpError {
  response: {
    data: ISignUpErrorType;
    status: number;
    statusText: string;
  };
}

export const signUp = ({
  username,
  password,
  passwordConfirm,
  name,
  email,
}: ISignUpVariables) =>
  instance
    .post(
      "users/sign-up",
      {
        username,
        password,
        passwordConfirm,
        name,
        email,
      },
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

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [firstDate, secondDate] = dates;
    const checkIn = formatDate(firstDate);
    const checkOut = formatDate(secondDate);
    return instance
      .get(
        `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
