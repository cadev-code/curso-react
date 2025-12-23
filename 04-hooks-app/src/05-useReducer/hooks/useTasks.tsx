import React, { useEffect, useReducer, useState } from 'react';
import { getTasksInitialState, tasksReducer } from '../reducer/taskReducer';

export const useTasks = () => {
  const [state, dispatch] = useReducer(tasksReducer, getTasksInitialState());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks-state', JSON.stringify(state));
  }, [state]);

  const addTodo = () => {
    if (inputValue.length === 0) return;

    dispatch({ type: 'ADD TODO', payload: inputValue });
    setInputValue('');
  };

  const toggleTodo = (id: number) =>
    dispatch({ type: 'TOGGLE TODO', payload: id });

  const deleteTodo = (id: number) =>
    dispatch({ type: 'DELETE TODO', payload: id });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return {
    todos: state.todos,
    length: state.length,
    completed: state.completed,
    inputValue,
    setInputValue,
    addTodo,
    toggleTodo,
    deleteTodo,
    handleKeyPress,
  };
};
