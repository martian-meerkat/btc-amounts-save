import IUser from './IUser';

export type OperationType = 'deposit' | 'widthdrawal';

interface IUserData {
  id: string;
  groupId: string;
}

export interface IOperationData {
  id: number;
  user: IUserData;
  amount: number;
  type: OperationType;
  date: Date;
}

export default interface IOperation {
  getPayloadData(): IOperationData;
}
