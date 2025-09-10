import {Box} from "@chakra-ui/react";
import TaskCard from "../TaskDashboard/TaskCard.jsx";
import React from "react";

const CellComponent = React.memo(function({ columnIndex, rowIndex, style, tasks, columnCount }) {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= tasks.length) return null;

    return (
        <Box style={style}>
            <TaskCard key={tasks[index].id} task={tasks[index]} />
        </Box>
    );
});

export default CellComponent;
