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
    updateToDo: (state, actions) => {
      const updatedTask = actions.payload;
      const taskList = state.task_list as {
        id: number;
        to_do_desc?: string;
        status?: string;
        username?: string;
        dueDate?: string;
        dueTime?: string;
      }[];
      const taskIndex = taskList.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (taskIndex !== -1) {
        taskList[taskIndex] = updatedTask;
      }
    },
    deleteToDo: (state, actions) => {
      const taskIdToDelete = actions.payload;
      const taskList = state.task_list as {
        id: number;
        to_do_desc?: string;
        status?: string;
        username?: string;
        dueDate?: string;
        dueTime?: string;
      }[];
      const taskIndex = taskList.findIndex(
        (task) => task.id === taskIdToDelete
      );

      if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
      }
    },
  },
});

export const { createToDo, updateToDo, deleteToDo } = toDoTaskListSlice.actions;

export default toDoTaskListSlice.reducer;
