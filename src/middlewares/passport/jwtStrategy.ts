import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../config';

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  },
  (payload, done) => {
    return done(null, payload);
  }
);
