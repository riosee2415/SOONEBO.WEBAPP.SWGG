const dotenv = require("dotenv");
dotenv.config();
const models = require("../models");

const isBaseCompanyCheck = async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
  } else {
    if (!req.user) {
      return res.status(403).send("로그인이 필요합니다.");
    } else {
      const selectQuery = `
  SELECT	A.id,
          A.userId,
          A.email,
          A.username,
          A.mobile,
          A.level,
          A.postCode,
          A.address ,
          A.detailAddress,
          A.managerId,
          A.userPoint,
          A.AgencyId,
          B.name,
          B.urlName,
          A.UserGradeId,
          C.lvValue
    FROM	users		    A
    LEFT
   OUTER
    JOIN	agencys 	  B
      ON	A.AgencyId  = B.id
    LEFT
   OUTER	
    JOIN	userGrade 	C
      ON	A.UserGradeId = C.id
   WHERE	A.isExit = 0
     AND  A.id = ${req.user.id}
  `;

      const userData = await models.sequelize.query(selectQuery);

      if (userData[0].length === 0) {
        return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
      }

      if (userData[0][0].urlName === "sunaebo") {
        next();
      } else {
        return res
          .status(403)
          .send(
            "본사 소속 직원이 아닙니다. 해당 기능을 사용할 수 있는 권한이 없습니다."
          );
      }
    }
  }
};

module.exports = isBaseCompanyCheck;
