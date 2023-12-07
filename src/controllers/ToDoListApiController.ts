import { callAPI, formatResponseFromAPI } from "../utils/Helper";

const baseURL = "https://jsonplaceholder.typicode.com/todos";

export async function getAllToDoList() {
  try {
    const response = await callAPI({
      path: baseURL,
      method: "GET",
      fetchOptions: {},
    });
    return formatResponseFromAPI(response);
  } catch (error) {
    throw new Error(` Error! : ${error}`);
  }
}
