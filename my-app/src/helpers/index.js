import { baseAPI } from "./api-config";
export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user"));
  return token;
};
export const getChartData = async () => {
  try {
  } catch (error) {
    console.log("error");
  }
  const response = await baseAPI.get("/data");
  return response.data;
};
export const authRequestHandler = async (url, values) => {
  const response = await baseAPI.post(url, values);
  return response;
};
