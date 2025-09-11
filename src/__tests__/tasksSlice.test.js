import { describe, it, expect } from "vitest";
import reducer, {
    fetchTasksRequest,
    fetchTasksSuccess,
    fetchTasksFailure,
    updateTaskStatusRequest,
    updateTaskStatusFailure,
    setFilter,
    clearError,
    createTaskSuccess,
} from "../features/tasks/tasksSlice.js";
import { ALL } from "../constants/common.js";

describe("tasks reducer", () => {
    const initialState = {
        tasks: [],
        loading: false,
        error: null,
        filters: { status: ALL, assignee: ALL },
        pendingUpdates: {},
    };

    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle fetchTasksRequest", () => {
        const nextState = reducer(initialState, fetchTasksRequest());
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchTasksSuccess", () => {
        const tasks = [{ id: 1, title: "Test", status: "todo" }];
        const nextState = reducer(initialState, fetchTasksSuccess(tasks));
        expect(nextState.loading).toBe(false);
        expect(nextState.tasks).toEqual(tasks);
    });

    it("should handle fetchTasksFailure", () => {
        const nextState = reducer(initialState, fetchTasksFailure("Error"));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error");
    });

    it("should handle setFilter", () => {
        const nextState = reducer(initialState, setFilter({ status: "done" }));
        expect(nextState.filters.status).toBe("done");
    });

    it("should handle clearError", () => {
        const stateWithError = { ...initialState, error: "Oops" };
        const nextState = reducer(stateWithError, clearError());
        expect(nextState.error).toBeNull();
    });

    it("should handle createTaskSuccess", () => {
        const newTask = { id: 1, title: "New Task" };
        const nextState = reducer(initialState, createTaskSuccess(newTask));
        expect(nextState.tasks).toContainEqual(newTask);
    });

    it("should handle updateTaskStatusRequest", () => {
        const state = { ...initialState, tasks: [{ id: 1, status: "todo" }], pendingUpdates: {} };
        const nextState = reducer(state, updateTaskStatusRequest({ taskId: 1, newStatus: "done" }));
        expect(nextState.tasks[0].status).toBe("done");
        expect(nextState.pendingUpdates[1]).toBe(true);
    });

    it("should handle updateTaskStatusFailure", () => {
        const state = { ...initialState, tasks: [{ id: 1, status: "done" }], pendingUpdates: { 1: true } };
        const nextState = reducer(state, updateTaskStatusFailure({ taskId: 1, prevStatus: "todo" }));
        expect(nextState.tasks[0].status).toBe("todo");
        expect(nextState.pendingUpdates[1]).toBeUndefined();
    });
});
