import http from './http-common';
import { OperationTypes } from '../constants/operationTypes';

export const getAllOperations = (): Promise<void> => {
  return http.get('/btc-operations');
};

export const btcDeposit = (userid: number, amount: number): Promise<void> => {
  const body = {
    userid,
    amount,
    type: OperationTypes.WITHDRAWAL,
  };
  return http.post('/btc-operations', body);
};

export const btcWidthdraval = (userid: number, amount: number): Promise<void> => {
  console.log('btcWithdrawal');
  const body = {
    userid,
    amount,
    type: OperationTypes.WITHDRAWAL,
  };
  return http.post('/btc-operations', body);
};
