import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

// Same with lower const function
// export async function getRooms() {
//   const response = await instance.get("rooms/");
//   return response.data;
// }

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = () =>
  instance.get(`rooms/1`).then((response) => response.data);
