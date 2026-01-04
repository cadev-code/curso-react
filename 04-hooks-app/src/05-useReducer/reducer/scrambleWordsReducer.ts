export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

type ScrambleWordsAction =
  | { type: 'SET_GUESS'; payload: string }
  | { type: 'CHECK_ANSWER'; payload: string }
  | { type: 'SKIP_WORD'; payload: string }
  | { type: 'PLAY_AGAIN'; payload: ScrambleWordsState };

export const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];

export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case 'SET_GUESS':
      return {
        ...state,
        guess: !state.isGameOver ? action.payload.trim().toUpperCase() : '',
      };

    case 'CHECK_ANSWER': {
      if (state.isGameOver) return state;

      if (state.guess === '') return state;

      if (state.guess === state.currentWord) {
        const updatedWords = state.words.filter(
          word => word !== state.currentWord
        );

        return {
          ...state,
          currentWord: updatedWords[0],
          guess: '',
          points: state.points + 1,
          scrambledWord: action.payload,
          words: updatedWords,
        };
      }

      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: '',
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case 'SKIP_WORD': {
      if (state.isGameOver) return state;

      if (state.skipCounter >= state.maxSkips) return state;

      const updatedWords = state.words.filter(
        word => word !== state.currentWord
      );

      return {
        ...state,
        currentWord: updatedWords[0],
        guess: '',
        scrambledWord: action.payload,
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
      };
    }

    case 'PLAY_AGAIN':
      return action.payload;

    default:
      return state;
  }
};
