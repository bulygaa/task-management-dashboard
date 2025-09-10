import React, { Suspense, lazy } from "react";
import { Spinner, Center } from "@chakra-ui/react";

const TaskDashboard = lazy(() => import("./components/TaskDashboard/TaskDashboard.jsx"));

function App() {
    return (
        <Suspense
            fallback={
                <Center w="100%" h="100vh">
                    <Spinner size="xl" />
                </Center>
            }
        >
            <TaskDashboard />
        </Suspense>
    );
}

export default App;
