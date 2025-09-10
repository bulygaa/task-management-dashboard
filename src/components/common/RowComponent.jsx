import {Box} from "@chakra-ui/react";
import TaskCard from "../TaskDashboard/TaskCard.jsx";
import React from "react";

const RowComponent = React.memo(function({ index, style, tasks }) {
    return (
    <Box style={style}>
        <TaskCard key={tasks[index].id} task={tasks[index]} />
    </Box>
    )
});

export default RowComponent;
