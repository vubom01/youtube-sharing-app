import { createContext } from 'react';
import { IUser } from 'src/interfaces/user';

const userMock: IUser = {
  id: 1,
  email: 'test@test.com',
};

interface StoreContextType {
  currentUser?: IUser;
  setCurrentUser: (user: IUser | undefined) => void;
}

export const StoreContext = createContext<StoreContextType>({
  currentUser: userMock,
  setCurrentUser: () => {},
});
