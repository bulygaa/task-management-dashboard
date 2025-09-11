import React, {useMemo} from "react";
import { HStack, Button, Portal, Select, createListCollection } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, fetchTasksRequest } from "../../features/tasks/tasksSlice";
import { selectAllTasks } from "../../features/tasks/tasksSelectors";
import {ALL} from "../../constants/common.js";
import {useColorModeValue} from "../../contexts/ColorModeContext.jsx";

const TaskFilters = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const bgColor = useColorModeValue('#ffffff', '#000000');
    const textColor = useColorModeValue('#000000', '#ffffff');

    const uniqueAssignees = useMemo(
        () => [ALL, ...new Set(tasks?.map((t) => t.assignee))],
        [tasks]
    );

    const statusCollection = createListCollection({
        items: [
            { label: "All Statuses", value: ALL },
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in-progress" },
            { label: "Done", value: "done" },
        ],
    });

    const assigneeCollection = useMemo(
        () =>
            createListCollection({
                items: uniqueAssignees?.map((a) => ({
                    label: a === ALL ? "All Assignees" : a,
                    value: a,
                })),
            }),
        [uniqueAssignees]
    );

    const handleStatusChange = (value) => {
        dispatch(setFilter({ status: value.value[0] }));
        dispatch(fetchTasksRequest());
    };

    const handleAssigneeChange = (value) => {
        dispatch(setFilter({ assignee: value.value[0] }));
        dispatch(fetchTasksRequest());
    };

    const handleClear = () => {
        dispatch(setFilter({ status: ALL, assignee: ALL }));
        dispatch(fetchTasksRequest());
    };

    return (
        <HStack bg={bgColor} color={textColor} spacing={4} alignItems="end">
            <Select.Root collection={statusCollection} onValueChange={handleStatusChange}>
                <Select.HiddenSelect />
                <Select.Label>Status</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="Select status" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                        <Select.ClearTrigger />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content bg={bgColor} color={textColor}>
                            {statusCollection.items?.map((item) => (
                                <Select.Item key={item.value} item={item}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>

            <Select.Root collection={assigneeCollection} onValueChange={handleAssigneeChange}>
                <Select.HiddenSelect />
                <Select.Label>Assignee</Select.Label>
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="Select assignee" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                        <Select.ClearTrigger />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content bg={bgColor} color={textColor}>
                            {assigneeCollection.items?.map((item) => (
                                <Select.Item key={item.value} item={item}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>

            <Button size="sm" onClick={handleClear}>
                Clear Filters
            </Button>
        </HStack>
    );
};

export default TaskFilters;
