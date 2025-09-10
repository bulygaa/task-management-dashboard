import {
    call,
    put,
    select,
    takeLatest,
    takeEvery,
    debounce,
    delay,
    all,
} from "redux-saga/effects";
import {
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
} from "./tasksSlice";
import { tasksAPI } from "../../api/tasksApi";
import { selectFilters } from "./tasksSelectors";
import {ALL} from "../../constants/common.js";

function* fetchTasksSaga() {
    const filters = yield select(selectFilters);

    const apiFilters = { ...filters };
    if (apiFilters.status === ALL) delete apiFilters.status;
    if (apiFilters.assignee === ALL) delete apiFilters.assignee;

    let attempts = 0;
    const maxAttempts = 3;
    const baseDelay = 500;

    while (attempts < maxAttempts) {
        try {
            const tasks = yield call([tasksAPI, tasksAPI.fetchTasks], apiFilters);
            yield put(fetchTasksSuccess(tasks));
            return;
        } catch (err) {
            attempts++;
            if (attempts >= maxAttempts) {
                yield put(fetchTasksFailure(err.message));
                return;
            }
            const wait = baseDelay * 2 ** (attempts - 1);
            yield delay(wait);
        }
    }
}

// tasksSaga.js
function* updateTaskStatusSaga(action) {
    const { taskId, newStatus } = action.payload;
    const tasks = yield select((state) => state.tasks.tasks);
    const prevStatus = tasks.find((t) => t.id === taskId)?.status;

    try {
        yield put(markPendingUpdate({ taskId }));

        const updated = yield call(tasksAPI.updateTaskStatus, taskId, newStatus);

        yield put(updateTaskStatusSuccess({ taskId: updated.id, newStatus: updated.status }));
    } catch (err) {
        yield put(updateTaskStatusFailure({ taskId, prevStatus, error: err.message }));
    }
}

function* createTaskSaga(action) {
    try {
        const newTask = yield call([tasksAPI, tasksAPI.createTask], action.payload);
        yield put(createTaskSuccess(newTask));
    } catch (err) {
        yield put(createTaskFailure(err.message));
    }
}

function* filterChangeSaga() {
    yield put(fetchTasksRequest());
}

export function* watchTasksSaga() {
    const delay = 300;
    yield all([
        takeLatest(fetchTasksRequest.type, fetchTasksSaga),
        takeEvery(updateTaskStatusRequest.type, updateTaskStatusSaga),
        takeEvery(createTaskRequest.type, createTaskSaga),
        debounce(delay, setFilter.type, filterChangeSaga),
    ]);
}
