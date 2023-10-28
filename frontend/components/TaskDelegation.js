import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskDelegation = () => {
    const [aiAgents, setAIAgents] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAIAgents();
        fetchTasks();
    }, []);

    const fetchAIAgents = async () => {
        const response = await axios.get('/api/aiAgents');
        setAIAgents(response.data);
    };

    const fetchTasks = async () => {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
    };

    const assignTask = async (taskId, aiAgentId) => {
        const response = await axios.post('/api/assignTask', { taskId, aiAgentId });
        if (response.status === 200) {
            fetchTasks();
            fetchAIAgents();
        }
    };

    return (
        <div id="taskDelegation">
            <h2>Task Delegation</h2>
            <div>
                {tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.name}</h3>
                        <select onChange={(e) => assignTask(task.id, e.target.value)}>
                            <option value="">Select AI Agent</option>
                            {aiAgents.map(agent => (
                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskDelegation;