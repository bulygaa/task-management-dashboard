import React from "react";
import {
    SimpleGrid,
    Stack,
    Skeleton,
    Text,
    Button,
    VStack,
} from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import {viewFormat} from "../../enums/viewFormat.js";

const TaskList = ({ tasks, view, loading }) => {
    if (loading) {
        return (
            <Stack>
                {Array(3)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} height="100px" />
                    ))}
            </Stack>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <VStack>
                <Text>No tasks match the filters.</Text>
                <Button onClick={() => window.location.reload()}>Reload</Button>
            </VStack>
        );
    }

    if (view === viewFormat.GRID) {
        return (
            <SimpleGrid gap='10px' columns={[1, 2, 3]} spacing={4}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </SimpleGrid>
        );
    }

    return (
        <Stack spacing={4}>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Stack>
    );
};

export default TaskList;
