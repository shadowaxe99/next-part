import React, { useState, useEffect } from 'react';
import { aiAgents, interactions } from '../../database/index.js';

const CollaborationArena = () => {
  const [agents, setAgents] = useState([]);
  const [interactionsList, setInteractionsList] = useState([]);

  useEffect(() => {
    setAgents(aiAgents);
    setInteractionsList(interactions);
  }, []);

  const handleInteraction = (agent1, agent2, message) => {
    const newInteraction = {
      agent1: agent1,
      agent2: agent2,
      message: message,
      timestamp: new Date().getTime()
    };
    setInteractionsList([...interactionsList, newInteraction]);
  };

  return (
    <div id="collaborationArena">
      <h2>Collaboration Arena</h2>
      <div>
        {agents.map((agent, index) => (
          <div key={index}>
            <h3>{agent.name}</h3>
            <p>{agent.description}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Interactions</h2>
        {interactionsList.map((interaction, index) => (
          <div key={index}>
            <p>
              <strong>{interaction.agent1}</strong> to{' '}
              <strong>{interaction.agent2}</strong>: {interaction.message}
            </p>
            <p>Timestamp: {interaction.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationArena;