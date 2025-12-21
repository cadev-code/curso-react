import { useState } from 'react';

// import './ItemCounter.css';
import styles from './ItemCounter.module.css';

interface Props {
  name: string;
  quantity?: number;
}

export const ItemCounter = ({ name, quantity = 1 }: Props) => {
  const [count, setCount] = useState<number>(quantity);

  const handleAdd = () => setCount(count + 1);
  const handleSubtract = () => count > 1 && setCount(count - 1);

  return (
    <section className={styles['item-row']}>
      <span
        className={styles['item-text']}
        style={{
          color: count === 1 ? 'red' : 'black',
        }}>
        {name}
      </span>
      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
    </section>
  );
};
