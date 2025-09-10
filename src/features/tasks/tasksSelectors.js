import { createSelector } from "reselect";

const selectTasksState = (state) => state.tasks;

export const selectAllTasks = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.tasks
);

export const selectTasksByStatus = (status) =>
    createSelector([selectAllTasks], (tasks) =>
        tasks.filter((task) => task.status === status)
    );

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
    return tasks.reduce(
        (stats, task) => {
            stats[task.status] = (stats[task.status] || 0) + 1;
            return stats;
        },
        {}
    );
});

export const selectIsLoading = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.loading
);

export const selectError = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.error
);

export const selectFilters = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.filters
);

export const selectPendingUpdates = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.pendingUpdates
);
