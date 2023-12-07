interface CallAPI {
  path?: string;
  method?: string;
  fetchOptions?: RequestInit;
  returnData?: {
    success: boolean;
    data: [];
    error: string[];
  };
}

export function callAPI({ path, method, fetchOptions }: CallAPI) {
  return fetch(`${path}`, {
    method,
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function formatResponseFromAPI(response: Response) {
  const { returnData }: CallAPI = {
    returnData: { success: false, data: [], error: [] },
  };
  try {
    if (response.ok) {
      const data = await response.json();
      returnData.success = true;
      returnData.data = data;
    } else {
      returnData.error = [`Error! HTTP Status: ${response.status}`];
    }
  } catch (error: any) {
    returnData.error = [`Error! ${error.message}`];
  }

  return returnData;
}


export function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


