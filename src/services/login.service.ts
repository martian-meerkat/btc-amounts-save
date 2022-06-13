import http from './http-common';

export const login = (username: string, password: string): Promise<any> => {
  return http.post('/login', { username, password });
};
