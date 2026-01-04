import { useEffect, useReducer } from 'react';

import {
  GAME_WORDS,
  scrambleWordsReducer,
  type ScrambleWordsState,
} from '../reducer/scrambleWordsReducer';

import confetti from 'canvas-confetti';

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

const getNextWord = (words: string[], currentWord: string) => {
  const remainingWords = words.filter(word => word !== currentWord);
  return remainingWords[0] ?? null;
};

const getInitialState = (): ScrambleWordsState => {
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

export const useScrambleWords = () => {
  const [state, dispatch] = useReducer(
    scrambleWordsReducer,
    undefined, // si lo coloco aquí se ejecutara en cada render, aunque no servirá de nada por que el reducer se queda solo con el estado de la primera vez que se ejecuto
    getInitialState // usar forma lazy pasando directamente la función sin ejecutar ya que el reducer sera quien la ejecute solo la una unica vez y evitando la ejecución en cada render
  );

  useEffect(() => {
    if (state.points === 0) return;

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, [state.points]);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextWord = getNextWord(state.words, state.currentWord);

    dispatch({
      type: 'CHECK_ANSWER',
      payload: nextWord ? scrambleWord(nextWord) : '',
    });
  };

  const handleSkip = () => {
    const nextWord = getNextWord(state.words, state.currentWord);

    dispatch({
      type: 'SKIP_WORD',
      payload: nextWord ? scrambleWord(nextWord) : '',
    });
  };

  const handlePlayAgain = () => {
    dispatch({ type: 'PLAY_AGAIN', payload: getInitialState() });
  };

  return {
    state,
    handleGuessSubmit,
    handlePlayAgain,
    handleSkip,
    dispatch,
  };
};
