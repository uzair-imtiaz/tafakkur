import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config, { prisma } from "#config";
import constants from "#constants";

const strategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.BASE_URL + constants.GOOGLE_CALLBACK_PATH,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: profile.emails?.[0].value!,
            googleId: profile.id,
            name: profile.displayName,
            role: "USER",
            username: profile.emails?.[0].value?.split("@")[0]!,
          },
        });
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

passport.use(strategy);
