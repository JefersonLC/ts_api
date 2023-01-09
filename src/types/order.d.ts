import { User } from '../db/entities/User';

export type NewOrder = {
  address: string;
  user: User;
};
