import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

export async function getRooms() {
  const response = await instance.get("rooms/");
  return response.data;
}
// Same with upper const but it has error
// export const getRooms = async () =>
//   await instance.get("rooms").then((response) => response.data);
