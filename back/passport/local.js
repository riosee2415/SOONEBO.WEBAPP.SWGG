const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await User.findOne({
            where: { userId },
          });

          if (!user) {
            return done(null, false, {
              reason: "존재하지 않는 사용자 정보입니다.",
            });
          }

          if (user.isExit) {
            return done(null, false, {
              reason: "탈퇴한 회원은 로그인할 수 없습니다.",
            });
          }

          if (user.level < 5) {
            if (user.AgencyId === 1 || user.AgencyId === 5) {
              const result = await bcrypt.compare(password, user.password);

              if (result) {
                return done(null, user);
              }

              return done(null, false, {
                reason: "비밀번호가 일치하지 않습니다.",
              });
            } else {
              return done(null, false, {
                reason: "해당 대리점 소속 회원이 아닙니다.",
              });
            }
          }

          const result = await bcrypt.compare(password, user.password);

          if (result) {
            return done(null, user);
          }

          return done(null, false, {
            reason: "비밀번호가 일치하지 않습니다.",
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
