import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type User = null | { username: string };

interface AuthContextDefaults {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextDefaults>({
  user: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

interface AuthContextProps {
  // children: React.ReactNode
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = (username: string, password: string) => {
    if (username === 'teo@test.com' && password === '123qweasd') {
      let fakeUser = { username };
      setUser(fakeUser);
      AsyncStorage.setItem('user', JSON.stringify(fakeUser));
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: login,
        logout: logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
