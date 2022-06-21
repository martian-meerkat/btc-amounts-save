import IOperation, { IOperationData } from '../interfaces/IOperation';
import IUser from '../interfaces/IUser';
import { UserState } from '../redux/user/userSlice';
import { OperationsState } from '../redux/operations/operationsSlice';
import { OperationTypes } from '../constants/operationTypes';
import { RootState } from '../redux/store';

// The class for REST API deposit/withdrawal request contruction
// Create an instance, then get all payload data by getPayloadData() call.
class Operation implements IOperation {
  private _store: {operations: OperationsState, user: UserState};
  private _id: number;
  private _user: IUser;
  private _type: OperationTypes;
  private _amount: number;

  constructor(type: OperationTypes, amount: number, getState: () => RootState) {
    this._store = getState();
    this._id = this.generateId();
    this._user = this._store.user.userData;
    this._type = type;
    this._amount = amount;
  }

  private generateId(): number {
    const ids = this._store.operations.data.map((operation: IOperationData) => operation.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }

  public getPayloadData(): IOperationData {
    return {
      id: this._id,
      user: this._user,
      amount: this._amount,
      type: this._type,
      date: new Date(),
    };
  }
}

export default Operation;
