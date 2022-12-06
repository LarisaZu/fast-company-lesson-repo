import { useState, useEffect } from 'react';
import users from '../../data/mockData/users.json';
import professions from '../../data/mockData/professions.json';
import qualities from '../../data/mockData/qualities.json';
import { firebaseApi } from '../../services/axios';

const Status = {
  IDLE: 'Not started',
  PENDING: 'In process',
  RESOLVED: 'Ready',
  REJECTED: 'Error occurred',
};

const useMockData = () => {
  const [status, setStatus] = useState(Status.IDLE);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const sumCount = professions.length + users.length + qualities.length;

  useEffect(() => {
    const updateProgress = () => {
      if (count !== 0 && status === Status.IDLE) {
        setStatus(Status.PENDING);
      }

      const newProgress = Math.floor((count / sumCount) * 100);

      if (progress < newProgress) {
        setProgress(() => newProgress);
      }

      if (newProgress === 100) {
        setStatus(Status.RESOLVED);
      }
    };

    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const init = async () => {
    try {
      for (const prof of professions) {
        await firebaseApi.put(`profession/${prof._id}`, prof);
        incrementCount();
      }
      for (const user of users) {
        await firebaseApi.put(`user/${user._id}`, user);
        incrementCount();
      }
      for (const quality of qualities) {
        await firebaseApi.put(`quality/${quality._id}`, quality);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(Status.REJECTED);
    }
  };

  return { error, init, progress, status };
};

export default useMockData;
