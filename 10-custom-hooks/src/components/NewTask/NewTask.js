import { useState } from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { error, isLoading, sendRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: 'https://react-http-3ec4f-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText },
    };

    const applyData = (task) => {
      const generatedId = task.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };

    sendRequest(requestConfig, applyData);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
