import type { CSSProperties } from 'react';

const firstName = 'Carlos';
const lastName = 'Escobedo';

const favoriteGames = [
  'Elden Ring',
  'Ghost of Tsushima',
  'Red Dead Redemption 2',
  'The Legend Of Zelda Twilight Princess',
];
const isActive = true;

const address = {
  street: '123 Main St',
  city: 'Springfield',
  country: 'USA',
};

const myStyle: CSSProperties = {
  backgroundColor: '#d3d3d3',
  borderRadius: 20,
  padding: '10px',
};

export const MyAwesomeApp = () => {
  return (
    <div data-testid="my-awesome-app">
      <h1 data-testid="first-name-title">{firstName}</h1>
      <h3>{lastName}</h3>

      <p className="black">{favoriteGames.join(', ')}</p>

      <h1>{isActive ? 'Active' : 'Inactive'}</h1>

      <p style={myStyle}>{JSON.stringify(address)}</p>
    </div>
  );
};
