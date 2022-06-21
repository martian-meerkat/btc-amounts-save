import http from './http-common';
import { OperationTypes } from '../constants/operationTypes';
import Operation from '../models/Operation';
import { RootState } from '../redux/store';

export const getAllOperations = (): Promise<any> => {
  return http.get('/btc-operations');
};

export const btcDeposit = (amount: number, getState: () => RootState): Promise<any> => {
    const body = new Operation(OperationTypes.DEPOSIT, amount, getState).getPayloadData();
    return http.post('/btc-operations', body);
};

export const btcWithdrawal = (amount: number, getState: () => RootState): Promise<any> => {
    const body = new Operation(OperationTypes.WITHDRAWAL, amount, getState).getPayloadData();
    return http.post('/btc-operations', body);
};
