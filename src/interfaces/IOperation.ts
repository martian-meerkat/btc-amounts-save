import { OperationTypes } from '../constants/operationTypes';
import IUser from './IUser';

export interface IOperationData {
  id: number;
  user: IUser;
  amount: number;
  type: OperationTypes;
  date: Date;
}

export default interface IOperation {
  getPayloadData(): IOperationData;
}
