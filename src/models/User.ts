import IUser from '../interfaces/IUser';

class User implements IUser {
  private _id: string;
  private _groupId: string;

  constructor(userId: string, groupId: string) {
    this._id = userId;
    this._groupId = groupId;
  }

  public getUserId(): string {
    return this._id;
  }

  public getUserGroupId(): string {
    return this._groupId;
  }
}

export default User;
