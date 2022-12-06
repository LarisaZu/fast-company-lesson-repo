import React from 'react';
import useMockData from '../hooks/testHooks/useMockData';

const MockDataView = () => {
  const { error, init, status, progress } = useMockData();
  const handleInit = () => {
    init();
  };
  return (
    <div>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleInit}>
        Инициализация
      </button>
    </div>
  );
};

export default MockDataView;
