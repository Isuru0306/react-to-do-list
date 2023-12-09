# Technical Assessment : To DO List App

## Setup Instructions

```
node -v # v18.15.0
npm version #9.5.0
npm view react version # 18.2.0
```

### Install node modules

```
npm i or  npm install
```

### Start project

```
npm run start #Run development server
```

## User Instructions

<ul>
    <li>Initially loaded without dummy data. If you want to obtain dummy data, check the box by clicking.</li>
    <li>Users can create, edit, update, and delete tasks.</li>
    <li>The task can be marked as "in progress" or "complete".</li>
    <li>Users can search for tasks that are in progress, not started, or completed.</li>
    <li>Users can prioritize the task by double-clicking the row, and they can also remove prioritization by double-clicking the row again.</li>
</ul>

## Redux Toolkit's role

### Centralized task management:

The "todo_task" Redux slice acts as a centralized and well-structured hub for managing task state.

The TaskList interface provides a blueprint for maintaining consistency and clarity in representing tasks.

Reducers act as specialized helpers, each with a different role in creating, updating, and deleting functions.

Redux slices improve the flexibility of task management, providing seamless integration and efficient handling of operations related to an application's task.
