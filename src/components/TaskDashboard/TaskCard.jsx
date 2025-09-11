import React from "react";
import {
    Card,
    Heading,
    Text,
    Badge,
    HStack,
    Portal,
    Select,
    Spinner,
    createListCollection,
    Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatusRequest } from "../../features/tasks/tasksSlice";
import { selectPendingUpdates } from "../../features/tasks/tasksSelectors";
import {useColorModeValue} from "../../contexts/ColorModeContext.jsx";

const priorityColors = {
    critical: "red",
    high: "orange",
    medium: "yellow",
    low: "green",
};

const TaskCard = React.memo(function ({ task }) {
    const dispatch = useDispatch();
    const pendingUpdates = useSelector(selectPendingUpdates);

    const isUpdating = pendingUpdates[task?.id];
    const isOverdue = new Date(task.dueDate) < new Date();

    const bgColor = useColorModeValue('#ffffff', '#090000');
    const textColor = useColorModeValue('#000000', '#ffffff');

    const statuses = createListCollection({
        items: [
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in-progress" },
            { label: "Done", value: "done" },
        ],
    });

    const handleStatusChange = (value) => {
        dispatch(updateTaskStatusRequest({ taskId: task?.id, newStatus: value.value[0] }));
    };

    return (
        <Card.Root position="relative" bg={bgColor} color={textColor}>
            {isUpdating && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bg="whiteAlpha.600"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    zIndex={10}
                >
                    <Spinner size="md" />
                </Box>
            )}

            <Card.Header>
                <HStack justify="space-between">
                    <Heading size="md">{task.title}</Heading>
                    <Badge colorPalette={priorityColors[task.priority.toLowerCase()] || "gray"}>
                        {task.priority}
                    </Badge>
                </HStack>
            </Card.Header>

            <Card.Body>
                <Text>Status: {task.status}</Text>

                <Select.Root
                    collection={statuses}
                    onValueChange={handleStatusChange}
                    isDisabled={isUpdating}
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content bg={bgColor} color={textColor}>
                                {statuses.items.map((s) => (
                                    <Select.Item key={s.value} item={s}>
                                        {s.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                <Text mt={2}>Assignee: {task.assignee}</Text>
                <Text color={isOverdue ? "red.500" : "gray.600"}>
                    Due: {task.dueDate}
                </Text>
            </Card.Body>
        </Card.Root>
    );
});

export default TaskCard;
