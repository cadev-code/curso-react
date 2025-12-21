import { ItemCounter } from './shopping-cart/ItemCounter';

export interface Item {
  productName: string;
  quantity: number;
}

const itemsInCart: Item[] = [
  {
    productName: 'Nintendo Switch 2',
    quantity: 2,
  },
  {
    productName: 'Pro Controller',
    quantity: 3,
  },
  {
    productName: 'Super Smash',
    quantity: 1,
  },
  {
    productName: 'Super Mario',
    quantity: 7,
  },
];

export const FirstStepsApp = () => {
  return (
    <>
      <h1>Carrito de Compras</h1>

      {itemsInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}
    </>
  );
};
