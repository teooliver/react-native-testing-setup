import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type User = null | { username: string };

interface AuthContextDefaults {
  user: User;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextDefaults>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthContextProps {
  // children: React.ReactNode
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser = { username: 'bob' };
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        logout: () => {
          AsyncStorage.removeItem('user');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
