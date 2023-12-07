import { createSlice } from "@reduxjs/toolkit";
interface TaskList {
  task_list?: {
    id?: number;
    to_do_desc?: string;
    status?: string;
    username?: string;
    dueDate?: string;
    dueTime?: string;
  }[];
}

const initialState: TaskList = { task_list: [] };

const toDoTaskListSlice = createSlice({
  name: "todo_task",
  initialState,
  reducers: {
    createToDo: (state, actions) => {
      state.task_list?.push(actions.payload);
    },
    updateToDo: (state) => {
      console.log("updateToDo");
    },
    deleteToDo: (state) => {
      console.log("deleteToDo");
    },
  },
});

export const { createToDo, updateToDo, deleteToDo } = toDoTaskListSlice.actions;

export default toDoTaskListSlice.reducer;
