import React, { useState, useEffect } from "react";
import {
    Stack,
    Skeleton,
    Text,
    Button,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import { List, Grid } from "react-window";
import TaskCard from "./TaskCard";
import { viewFormat } from "../../enums/viewFormat.js";
import CellComponent from "../common/CellComponent.jsx";
import RowComponent from "../common/RowComponent.jsx";
import {useColorModeValue} from "../../contexts/ColorModeContext.jsx";

const TaskList = React.memo(function ({ tasks, view, loading }) {
    const [columnCount, setColumnCount] = useState(3);
    const responsiveColumnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const bgColor = useColorModeValue('#ffffff', '#000000');
    const textColor = useColorModeValue('#000000', '#ffffff');

    useEffect(() => {
        setColumnCount(responsiveColumnCount || 3);
    }, [responsiveColumnCount]);

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
            <VStack bg={bgColor} color={textColor}>
                <Text>No tasks match the filters.</Text>
                <Button onClick={() => window.location.reload()}>Reload</Button>
            </VStack>
        );
    }

    if (view === viewFormat.LIST && tasks.length > 0) {
        return (
            <List
                rowComponent={RowComponent}
                rowCount={tasks.length}
                rowHeight={180}
                rowProps={{ tasks }}
                style={{
                    maxHeight: "700px",
                    background: bgColor,
                    color: textColor,
                }}
                width="100%"
            />
        );
    }

    if (view === viewFormat.GRID && tasks.length > 0) {
        return (
            <Grid
                cellComponent={CellComponent}
                columnCount={columnCount}
                columnWidth={350}
                rowCount={Math.ceil(tasks.length / columnCount)}
                rowHeight={200}
                cellProps={{ tasks, columnCount }}
                style={{
                    maxHeight: "700px",
                    background: bgColor,
                    color: textColor,
                }}
                width="100%"
            />
        );
    }

    return (
        <Stack spacing={4}>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </Stack>
    );
});

export default TaskList;
