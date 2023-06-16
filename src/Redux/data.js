import { createSlice } from '@reduxjs/toolkit';

export const data = createSlice({
    name: "data",
    initialState: {
        boards: [
            {
                board_id: 0,
                board_name: "Platform Launch",
                board_avaiableStatuses: ["todo", "doing", "done"]
            },
            {
                board_id: 1,
                board_name: "Marketing Plan",
                board_avaiableStatuses: ["todo", "doing", "done", "terminator"]
            },
            {
                board_id: 2,
                board_name: "Roadmap",
                board_avaiableStatuses: ["todo", "doing", "done", "future", "ideas"]
            }
        ],
        tasks: [
            {
                task_id: 0,
                task_parent_id: 0,
                task_title: "Build UI for onboarding flow lorem ipsum dolor sit amet",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "todo",
                subtasks: [
                    {
                        subtask_id: 0,
                        subtask_name: "Lorem ipsum #1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                        isComplete: true
                    },
                    {
                        subtask_id: 1,
                        subtask_name: "Lorem ipsum #2",
                        isComplete: false
                    }
                ]
            },
            {
                task_id: 1,
                task_parent_id: 0,
                task_title: "Add search endpoints",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "todo",
                subtasks: []
            },
            {
                task_id: 2,
                task_parent_id: 0,
                task_title: "Conduct 5 wireframe tests.",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "done",
                subtasks: []
            },
            {
                task_id: 3,
                task_parent_id: 1,
                task_title: "Build UI for onboarding",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "todo",
                subtasks: []
            },
            {
                task_id: 4,
                task_parent_id: 1,
                task_title: "Build UI for search",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "doing",
                subtasks: []
            },
            {
                task_id: 5,
                task_parent_id: 1,
                task_title: "Create wireframe prototype.",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "done",
                subtasks: []
            },
            {
                task_id: 6,
                task_parent_id: 1,
                task_title: "Conduct 5 wireframe tests.",
                task_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                task_status: "terminator",
                subtasks: []
            }
        ]
    },

    reducers: {
        updateTask: (state, action) => {
            const initialState = JSON.parse(JSON.stringify(state.tasks));
            const updatedTasks = initialState.map(task => task.task_id === action.payload.updateAtThisId ? action.payload.updatedTask : task);

            return {
                ...state,
                tasks: [...updatedTasks]
            }
        },
        updateSubtasks: (state, action) => {
            const initialState = JSON.parse(JSON.stringify(state.tasks));

            const updatedTasks = initialState.map(item => {
                if (item.task_id === action.payload.thisTaskId) {
                    return {
                        ...item,
                        subtasks: action.payload.updatedObj
                    }
                }

                return item;
            });

            return {
                ...state,
                tasks: [...updatedTasks]
            }
        },

        updateTaskStatus: (state, action) => {
            const initialState = JSON.parse(JSON.stringify(state.tasks));

            const updatedTasks = initialState.map(item => {
                if (item.task_id === action.payload.thisTaskId) {
                    return {
                        ...item,
                        task_status: action.payload.newStatus
                    }
                }

                return item;
            });

            return {
                ...state,
                tasks: [...updatedTasks]
            }
        },
        addTask: (state, action) => {
            return {
                ...state,
                tasks: [...state.tasks, action.payload.newTask]
            }
        },
        deleteTask: (state, action) => {
            const initialState = JSON.parse(JSON.stringify(state.tasks));
            const updatedTasks = initialState.filter(task => task.task_id !== action.payload.deleteWithId);
            
            return {
                ...state,
                tasks: [...updatedTasks]
            }
        }
    }
})

export const { updateTask, updateSubtasks, updateTaskStatus, addTask, deleteTask } = data.actions;

export default data.reducer;