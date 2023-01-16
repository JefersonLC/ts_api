import boom from '@hapi/boom';
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
      if (!user) return done(boom.notFound('Email is not registered'), false);
      if (!bcrypt.compareSync(password, user.password))
        return done(boom.badData('Incorrect password'), false);
      if (!user.verified)
        return done(boom.unauthorized('Email has not been verified'), false);
      else return done(null, user);
    } catch (error) {
      return done(boom.unauthorized());
    }
  }
);
