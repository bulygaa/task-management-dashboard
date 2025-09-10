
## Installation Guide

1. Install dependencies:

```
npm install
# or
yarn install
```
2. Run the development server:

```
npm run dev
# or
yarn dev
```

3. Open your browser at `http://localhost:5173` (default Vite port).

---

## Part 1: Core Implementation (Required)

### Task 1: Redux Store Setup (30 minutes)

**Implemented:**

* `tasksSlice.js` with initial state:

```js
{
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: "all",
    assignee: "all",
  },
  pendingUpdates: {}, // for optimistic updates
}
```

* Actions & reducers:

    * `fetchTasksRequest`, `fetchTasksSuccess`, `fetchTasksFailure`
    * `updateTaskStatusRequest`, `updateTaskStatusSuccess`, `updateTaskStatusFailure`
    * `setFilter` (status & assignee)
    * `clearError`
    * `markPendingUpdate` for showing loading spinner on individual task updates

* Selectors in `tasksSelectors.js`:

    * `selectAllTasks`
    * `selectTasksByStatus` (memoized with reselect)
    * `selectTaskStats` (count by status)
    * `selectIsLoading`
    * `selectError`

---

### Task 2: Redux Saga Implementation (45 minutes)

**Implemented:**

* `tasksSaga.js` with:

    * `fetchTasksSaga`: Fetch tasks with current filters, retries up to 3 times, exponential backoff
    * `updateTaskStatusSaga`: Optimistic status updates
    * `watchTasksSaga`: Root watcher saga with:

        * `takeLatest` for `fetchTasksRequest`
        * `takeEvery` for `updateTaskStatusRequest` and `createTaskRequest`
        * `debounce` 300ms for filter changes

* Proper error handling: dispatches `fetchTasksFailure` or `updateTaskStatusFailure` on error

* Optimistic updates: `pendingUpdates` used to show loading state for individual task cards

---

### Task 3: React Components with Chakra UI (60 minutes)

**Implemented Components:**

* **TaskDashboard.jsx**

    * Main container
    * Chakra `Container`, `VStack`, `Heading`
    * Local state for `view` (grid/list)
    * Error boundary with retry button

* **TaskFilters.jsx**

    * Status filter: Chakra `Select` with `all`, `todo`, `in-progress`, `done`
    * Assignee filter: unique assignees with "All Assignees" label for `all`
    * Clear filters button
    * Dispatches Redux actions on change

* **TaskList.jsx**

    * Renders tasks in grid (`SimpleGrid`) or list (`Stack`) view
    * Loading state using Chakra `Skeleton`
    * Empty state when no tasks match filters
    * Error state with retry button

* **TaskCard.jsx**

    * Shows task title, priority badge (color-coded)
    * Status dropdown (updates via saga)
    * Assignee & due date
    * Overdue date indication (red text)
    * Loading spinner during status update (`pendingUpdates[task.id]`)

---

## Bonus Task 1: Performance Optimization

**Implemented:**

* Virtualization for large task lists (100+ items)
* `React.memo` and `useMemo` applied where appropriate
* Code splitting for the dashboard feature

## Bonus Task 2: Advanced Redux Saga Pattern

**Implemented:**

* Implement task creation with optimistic updates and rollback on failure

### Documented Bugs Found in `BuggyTaskCounter.jsx`

1. **Missing dependency in `useEffect`**

```js
useEffect(() => {
    setCount(tasks.length);
});
```

2. **Direct state mutation in `incrementCount`**

```js
const incrementCount = () => {
    count = count + 1;
    setCount(count);
};
```

3. **Function called immediately in `onClick`**

```js
<Button onClick={incrementCount()}>Add Manual Count</Button>
```

4. **Missing key prop in `map`**

```js
{tasks.map(task =>
    <Text>{task.title}</Text>
)}
```
