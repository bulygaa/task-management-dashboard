import React, { useState, useMemo } from "react";
import {
    Dialog,
    Button,
    Field,
    Input,
    Select,
    Portal,
    createListCollection,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createTaskRequest } from "../../features/tasks/tasksSlice";

const TaskCreateDialog = ({ open, onOpenChange }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("todo");
    const [priority, setPriority] = useState("medium");

    const statusCollection =
            createListCollection({
                items: [
                    { label: "Todo", value: "todo" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Done", value: "done" },
                ],
            });

    const priorityCollection =
            createListCollection({
                items: [
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                    { label: "Critical", value: "critical" },
                ],
            });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTaskRequest({ title, assignee, status, priority }));
        onOpenChange(false);
        setTitle("");
        setAssignee("");
        setStatus("todo");
        setPriority("medium");
    };

    return (
        <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <form onSubmit={handleSubmit}>
                        <Dialog.Header>
                            <Dialog.Title>Create Task</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Field.Root mb={4} required>
                                <Field.Label>Title</Field.Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task title"
                                />
                            </Field.Root>

                            <Field.Root mb={4}>
                                <Field.Label>Assignee</Field.Label>
                                <Input
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                    placeholder="Enter assignee"
                                />
                            </Field.Root>

                            <Field.Root mb={4}>
                                <Field.Label>Status</Field.Label>
                                <Select.Root
                                    collection={statusCollection}
                                    value={[status]}
                                    onValueChange={(val) => setStatus(val.value[0])}
                                >
                                    <Select.HiddenSelect />
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
                                            <Select.Content style={{ zIndex: 9999 }}>
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
                            </Field.Root>

                            <Field.Root mb={4}>
                                <Field.Label>Priority</Field.Label>
                                <Select.Root
                                    collection={priorityCollection}
                                    value={[priority]}
                                    onValueChange={(val) => setPriority(val.value[0])}
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Select priority" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                            <Select.ClearTrigger />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner style={{ zIndex: 9999 }}>
                                            <Select.Content>
                                                {priorityCollection.items.map((item) => (
                                                    <Select.Item key={item.value} item={item}>
                                                        {item.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Field.Root>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button variant="outline" mr={3} onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Create
                            </Button>
                        </Dialog.Footer>
                    </form>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};

export default TaskCreateDialog;
