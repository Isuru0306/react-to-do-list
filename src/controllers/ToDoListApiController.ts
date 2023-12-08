import {
  callAPI,
  formatResponseFromAPI,
  ApiDataConvertToDoApp,
} from "../utils/Helper";

const baseURL = "https://jsonplaceholder.typicode.com/todos";

export async function getAllToDoList() {
  try {
    const response = await callAPI({
      path: baseURL,
      method: "GET",
      fetchOptions: {},
    });
    const data = await formatResponseFromAPI(response);
    if (data.success) {
      return ApiDataConvertToDoApp(data.data);
    } else {
      throw new Error(` Error! : ${data.error}`);
    }
  } catch (error) {
    throw new Error(` Error! : ${error}`);
  }
}
