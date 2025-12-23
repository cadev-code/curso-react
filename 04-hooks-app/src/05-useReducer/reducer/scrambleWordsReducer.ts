import confetti from 'canvas-confetti';

interface ScrambleWordsState {
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
  | { type: 'CHECK_ANSWER' }
  | { type: 'SKIP_WORD' }
  | { type: 'PLAY_AGAIN' };

const GAME_WORDS = [
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

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffleWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffleWords[0],
    errorCounter: 0,
    guess: '',
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffleWords[0]),
    skipCounter: 0,
    words: shuffleWords,
    totalWords: shuffleWords.length,
  };
};

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
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.6 },
        });

        const updatedWords = state.words.filter(
          word => word !== state.currentWord
        );

        return {
          ...state,
          points: state.points + 1,
          guess: '',
          words: updatedWords,
          currentWord: updatedWords[0],
          scrambledWord: scrambleWord(updatedWords[0]),
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
        words: updatedWords,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        skipCounter: state.skipCounter + 1,
        guess: '',
      };
    }

    case 'PLAY_AGAIN': {
      const newWords = shuffleArray(GAME_WORDS);

      return {
        ...state,
        words: newWords,
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
        points: 0,
        errorCounter: 0,
        guess: '',
        skipCounter: 0,
        isGameOver: false,
      };
    }

    default:
      return state;
  }
};
