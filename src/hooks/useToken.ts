import { useState } from 'react';

export default function useToken(): {} {
  const getToken = (): string => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string) => {
    sessionStorage.setItem('token', token);
    setToken(token);
  };

  return { token, setToken: saveToken };
}
