import React, { useEffect, useState } from "react";
import {
    Container,
    VStack,
    Heading,
    Button,
    Alert,
    Box,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from '../../contexts/ColorModeContext'
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
import { viewFormat } from "../../enums/viewFormat.js";
import TaskCreateModal from "./TaskCreateModal.jsx";
import { AnimatePresence, motion } from "framer-motion";

const MotionContainer = motion(Container);

const TaskDashboard = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const tasks = useSelector(selectAllTasks);
    const loading = useSelector(selectIsLoading);
    const { colorMode, toggleColorMode } = useColorMode();

    const buttonText = useColorModeValue('🌙 Dark', '☀️ Light');
    const buttonVariant = useColorModeValue('outline', 'solid');
    const bgColor = useColorModeValue('#ffffff', '#000000');
    const textColor = useColorModeValue('#000000', '#ffffff');

    useEffect(() => {
        dispatch(fetchTasksRequest());
    }, []);

    const [view, setView] = useState(viewFormat.LIST);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === "y" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setDialogOpen(true);
            }

            if (e.key.toLowerCase() === "c" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setView((prev) =>
                    prev === viewFormat.LIST ? viewFormat.GRID : viewFormat.LIST
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleRetry = () => {
        dispatch(clearError());
        dispatch(fetchTasksRequest());
    };

    const renderFormat = view === viewFormat.LIST ? viewFormat.GRID : viewFormat.LIST;

    return (
        <MotionContainer
            py={8}
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            bg={bgColor}
            minH="100vh"
            px={10}
            m={0}
            w='100%'
            maxWidth='unset'
        >
            <VStack spacing={6} align="stretch">
                <Heading color={textColor}>Task Dashboard</Heading>

                <Button
                    onClick={toggleColorMode}
                    size="sm"
                    variant={buttonVariant}
                    colorScheme="brand"
                    alignSelf="flex-start"
                >
                    {buttonText} Mode
                </Button>

                {error && (
                    <Alert status="error" borderRadius="md">
                        <Button ml={4} size="sm" onClick={handleRetry} colorScheme="red">
                            Retry
                        </Button>
                    </Alert>
                )}

                <Box
                    p={4}
                    borderRadius="md"
                    borderWidth="1px"
                >
                    <TaskFilters bgColor={bgColor} textColor={textColor} />
                </Box>

                <Button
                    size="sm"
                    colorScheme="brand"
                    onClick={() => setDialogOpen(true)}
                    alignSelf="flex-start"
                >
                    + New Task
                </Button>

                <Button
                    alignSelf="flex-end"
                    size="sm"
                    onClick={() => setView(renderFormat)}
                >
                    Switch to {renderFormat} view
                </Button>

                <AnimatePresence>
                    {dialogOpen && (
                        <TaskCreateModal
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                            bgColor={bgColor}
                            textColor={textColor}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    <TaskList tasks={tasks} view={view} loading={loading} bgColor={bgColor} textColor={textColor} />
                </motion.div>
            </VStack>
        </MotionContainer>
    );
};

export default TaskDashboard;
