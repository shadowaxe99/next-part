import React, { useState } from 'react';

const SearchFilter = ({ interactions, tasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('interactions');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const searchInteraction = () => {
    return interactions.filter(interaction =>
      interaction.includes(searchTerm)
    );
  };

  const filterInteraction = () => {
    return tasks.filter(task =>
      task.status === filterType
    );
  };

  return (
    <div id="searchFilter">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filterType} onChange={handleFilterChange}>
        <option value="interactions">Interactions</option>
        <option value="tasks">Tasks</option>
      </select>
      <div>
        {filterType === 'interactions' ? searchInteraction().map(interaction => (
          <p key={interaction.id}>{interaction.content}</p>
        )) : filterInteraction().map(task => (
          <p key={task.id}>{task.description}</p>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;