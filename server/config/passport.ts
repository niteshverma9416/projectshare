import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const configurePassport = () => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: "http://localhost:3000/api/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value,
          field: 'Software Development'
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};