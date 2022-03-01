import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTask = (task) => {
    const loadedTasks = [];

    for (const taskKey in task) {
      loadedTasks.push({ id: taskKey, text: task[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const requestConfig = {
    url: 'https://react-http-3ec4f-default-rtdb.firebaseio.com/tasks.json',
  };

  const { error, isLoading, sendRequest: fetchTasks } = useHttp();

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  useEffect(() => {
    fetchTasks(requestConfig, transformTask);
    console.log('Fetching tasks...');
  }, []);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
