import passport from 'passport';
import { jwtStrategy } from './jwtStrategy';
import { localStrategy } from './localStrategy';

passport.use(localStrategy);
passport.use(jwtStrategy);
