import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import UserService from '../../services/UserService';
import { User } from '../../db/entities/User';

const userService = new UserService();

export const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email: string, password: string, done): Promise<void> => {
    try {
      const user: User | null = await userService.findByEmail(email);
      if (
        !user ||
        !bcrypt.compareSync(password, user.password) ||
        !user.verified
      )
        return done(null, false);
      else return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
