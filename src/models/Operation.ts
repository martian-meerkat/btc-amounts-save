import IOperation, { IOperationData, OperationType } from '../interfaces/IOperation';
import IUser from '../interfaces/IUser';

class Operation implements IOperation {
  private _id: number;
  private _user: { id: string; groupId: string };
  private _type: OperationType;
  private _amount: number;

  constructor(user: IUser, type: OperationType, amount: number) {
    this._id = null;
    this._user = { id: user.getUserId(), groupId: user.getUserGroupId() };
    this._type = type;
    this._amount = amount;
  }

  public getPayloadData(): IOperationData {
    return {
      id: this._id,
      user: this._user,
      type: this._type,
      amount: this._amount,
      date: new Date(),
    };
  }
}

export default Operation;
