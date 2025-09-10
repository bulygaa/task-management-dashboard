import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import {selectAllTasks, selectIsLoading} from "../../features/tasks/tasksSelectors.js";
import {fetchTasksRequest} from "../../features/tasks/tasksSlice.js";

const BuggyTaskCounter = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLoading);
    const tasks = useSelector(selectAllTasks);

    useEffect(()=>{
        dispatch(fetchTasksRequest());
    }, [])

    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(tasks.length);
    }, [tasks.length]);

    const incrementCount = () => {
        setCount(count+1);
    };

    if (loading) {
        return <>Loading...</>
    }

    return (
        <Box>
            <Text>Total Tasks: {count}</Text>
            <Button onClick={incrementCount}>Add Manual Count</Button>
            {tasks.map(task =>
                <Text key={task.id}>{task.title}</Text>
            )}
        </Box>
    );
};

export default BuggyTaskCounter;