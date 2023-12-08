import moment from "moment";

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

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isEmptyObject = (
  obj: Record<string, any> | null | undefined
): boolean => {
  return obj !== null && obj !== undefined && Object.keys(obj).length === 0;
};

export const isEmptyOrNot = (value: any): boolean => {
  return (
    value !== undefined && value !== null && value.toString().trim() !== ""
  );
};

export const ApiDataConvertToDoApp = (arrayObj: {}[]) => {
  const currentDateAndTime = moment();
  const formattedDate = currentDateAndTime.format("YYYY-MM-DD");
  const formattedTime = currentDateAndTime.format("HH:mm");
  let tempDataList: any[] = [];
  let tempObj: any;
  arrayObj.forEach((indexData: any) => {
    tempObj = {
      id: getRandomInt(1000, 9999),
      to_do_desc: indexData.title,
      username: indexData.userId.toString(),
      dueDate: formattedDate,
      dueTime: formattedTime,
    };
    if (indexData.completed) {
      tempObj = {
        ...tempObj,
        status: "COMPLETED",
      };
    } else {
      tempObj = {
        ...tempObj,
        status: "NOT_START",
      };
    }

    tempDataList.push(tempObj);
  });
  const firstTenRecords: any[] = tempDataList.slice(0, 3);
  return firstTenRecords;
};
