import React, {useEffect, useState} from "react";
import {
    Container,
    VStack,
    Heading,
    Button,
    Alert,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTasksRequest,
    clearError,
} from "../../features/tasks/tasksSlice";
import {
    selectError,
    selectIsLoading,
    selectAllTasks,
} from "../../features/tasks/tasksSelectors";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import {viewFormat} from "../../enums/viewFormat.js";

const TaskDashboard = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const tasks = useSelector(selectAllTasks);
    const loading = useSelector(selectIsLoading);

    useEffect(()=>{
        dispatch(fetchTasksRequest());
    }, [])

    const [view, setView] = useState(viewFormat.LIST);

    const handleRetry = () => {
        dispatch(clearError());
        dispatch(fetchTasksRequest());
    };

    const renderFormat = view === viewFormat.LIST ? viewFormat.GRID : viewFormat.LIST;

    return (
        <Container maxW="6xl" py={8}>
            <VStack spacing={6} align="stretch">
                <Heading>Task Dashboard</Heading>

                {error && (
                    <Alert status="error">
                        {error}
                        <Button ml={4} size="sm" onClick={handleRetry}>
                            Retry
                        </Button>
                    </Alert>
                )}

                <TaskFilters />

                <Button
                    alignSelf="flex-end"
                    size="sm"
                    onClick={() => setView(renderFormat)}
                >
                    Switch to {renderFormat} view
                </Button>

                <TaskList tasks={tasks} view={view} loading={loading} />
            </VStack>
        </Container>
    );
};

export default TaskDashboard;
