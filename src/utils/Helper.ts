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

/**
 *
 * @param param0
 * @returns
 */
export function callAPI({ path, method, fetchOptions }: CallAPI) {
  return fetch(`${path}`, {
    method,
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 *
 * @param response
 * @returns
 */
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

/**
 *
 * @param min
 * @param max
 * @returns
 */

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param obj
 * @returns
 */

export const isEmptyObject = (
  obj: Record<string, any> | null | undefined
): boolean => {
  return obj !== null && obj !== undefined && Object.keys(obj).length === 0;
};

/**
 *
 * @param value
 * @returns
 */

export const isEmptyOrNot = (value: any): boolean => {
  return (
    value !== undefined && value !== null && value.toString().trim() !== ""
  );
};

/**
 *
 * @param arrayObj
 * @returns
 */
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
      priority: "",
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
  const firstTenRecords: any[] = tempDataList.slice(0, 1);
  return firstTenRecords;
};

/**
 *
 * @param key
 * @param value
 * @param dataSet
 * @param searchValue
 * @returns
 */
export const search = (
  key: string,
  value: any,
  dataSet: any,
  searchValue?: any
) => {
  //TO DO
  let tempDataList: any[] = [];
  dataSet.forEach((list: any) => {
    if (list[key] === value) {
      tempDataList.push(list);
    }
  });
  return tempDataList;
};

/**
 *
 * @param data
 */
export const storeDataInLocal = (data: any) => {
  if (localStorage.getItem("dataList") != null) {
    let localStorageData = localStorage.getItem("dataList");
    if (localStorageData != null) {
      localStorageData = JSON.parse(localStorageData);
      if (Array.isArray(localStorageData)) {
        let newObj = localStorageData;
        let find = false;
        localStorageData.forEach((item, index) => {
          if (data.id === item.id) {
            newObj[index] = data;
            find = true;
          }
        });
        if (find) {
          localStorage.setItem("dataList", JSON.stringify(newObj));
        } else {
          newObj.push(data);
          localStorage.setItem("dataList", JSON.stringify(newObj));
        }
      }
    }
  } else {
    localStorage.setItem("dataList", JSON.stringify([data]));
  }
};

/**
 *
 * @param id
 */
export const removeDataInLocal = (id: any) => {
  if (localStorage.getItem("dataList") != null) {
    let localStorageData = localStorage.getItem("dataList");
    if (localStorageData != null) {
      localStorageData = JSON.parse(localStorageData);
      if (Array.isArray(localStorageData)) {
        const taskIndex = localStorageData.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          localStorageData.splice(taskIndex, 1);
          localStorage.setItem("dataList", JSON.stringify(localStorageData));
        }
      }
    }
  }
};
