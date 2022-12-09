import { UserToken } from '../models/usertoken';

export class Permissions {
    canActivate(user: UserToken, id: string): boolean {
      return true;
    }
  }