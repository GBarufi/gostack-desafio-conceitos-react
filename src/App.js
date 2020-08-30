import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: 'https://github.com/GBarufi/',
      techs: ['ReactJS', 'NodeJS']
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(
        repository => repository.id != id
      ))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
