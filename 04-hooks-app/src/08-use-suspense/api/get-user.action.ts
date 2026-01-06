export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number): Promise<User> => {
  const user = await new Promise<User>(resolve =>
    setTimeout(() => {
      resolve({
        id,
        name: 'Carlos',
        location: 'Nextlalpan, México',
        role: 'Administrador',
      });
    }, 2000)
  );

  return user;
};
