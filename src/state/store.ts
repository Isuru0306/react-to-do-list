import { configureStore } from "@reduxjs/toolkit";
import ToDoListSlice from "./ToDoListSlice";

export const store = configureStore({
  reducer: {
    toDo: ToDoListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
