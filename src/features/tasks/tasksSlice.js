import { createSlice } from "@reduxjs/toolkit";
import {ALL} from "../../constants/common.js";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        filters: {
            status: ALL,
            assignee: ALL,
        },
        pendingUpdates: {},
    },
    reducers: {
        fetchTasksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess(state, action) {
            state.loading = false;
            state.tasks = action.payload;
        },
        fetchTasksFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        updateTaskStatusRequest(state, action) {
            const { taskId, newStatus } = action.payload;

            state.pendingUpdates[taskId] = true;

            const task = state.tasks.find((t) => t.id === taskId);
            if (task) task.status = newStatus;
        },

        updateTaskStatusSuccess(state, action) {
            const { taskId, newStatus } = action.payload;
            delete state.pendingUpdates[taskId];

            const task = state.tasks.find((t) => t.id === taskId);
            if (task) task.status = newStatus;
        },

        updateTaskStatusFailure(state, action) {
            const { taskId, prevStatus } = action.payload;
            delete state.pendingUpdates[taskId];

            const task = state.tasks.find((t) => t.id === taskId);
            if (task) task.status = prevStatus;
        },

        markPendingUpdate(state, action) {
            const { taskId } = action.payload;
            state.pendingUpdates[String(taskId)] = true;
        },

        createTaskRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createTaskSuccess(state, action) {
            state.loading = false;
            state.tasks.push(action.payload);
        },
        createTaskFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        setFilter(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },

        clearError(state) {
            state.error = null;
        },
    },
});

export const {
    fetchTasksRequest,
    fetchTasksSuccess,
    fetchTasksFailure,
    updateTaskStatusRequest,
    updateTaskStatusSuccess,
    updateTaskStatusFailure,
    markPendingUpdate,
    createTaskRequest,
    createTaskSuccess,
    createTaskFailure,
    setFilter,
    clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
