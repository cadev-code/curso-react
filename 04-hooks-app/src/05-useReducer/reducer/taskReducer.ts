import { z } from 'zod/v4';

// Schemas

const TodoSchema = z.object({
  id: z.number().positive(),
  text: z.string().min(1),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number().nonnegative(),
  completed: z.number().nonnegative(),
  pending: z.number().nonnegative(),
});

// Types

type Todo = z.infer<typeof TodoSchema>;

type TaskState = z.infer<typeof TaskStateSchema>;

export type TaskAction =
  | { type: 'ADD TODO'; payload: string }
  | { type: 'TOGGLE TODO'; payload: number }
  | { type: 'DELETE TODO'; payload: number };

// Logic
const initialState = {
  todos: [],
  length: 0,
  pending: 0,
  completed: 0,
};

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem('tasks-state');
  if (!localStorageState) return initialState;

  // Validar mediante Zod
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
  if (result.error) return initialState;

  return result.data;
};

const updatePending = (todos: Todo[]): number =>
  todos.filter(todo => !todo.completed).length;

const updateCompleted = (todos: Todo[]): number =>
  todos.filter(todo => todo.completed).length;

export const tasksReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case 'ADD TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      const updatedTodos = [newTodo, ...state.todos];

      return {
        ...state,
        length: updatedTodos.length,
        todos: updatedTodos,
      };
    }

    case 'DELETE TODO': {
      const updatedTodos = state.todos.filter(
        todo => todo.id !== action.payload
      );

      return {
        ...state,
        todos: updatedTodos,
        length: updatedTodos.length,
        pending: updatePending(updatedTodos),
        completed: updateCompleted(updatedTodos),
      };
    }

    case 'TOGGLE TODO': {
      const updatedTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      return {
        ...state,
        todos: updatedTodos,
        pending: updatePending(updatedTodos),
        completed: updateCompleted(updatedTodos),
      };
    }

    default:
      return state;
  }
};
