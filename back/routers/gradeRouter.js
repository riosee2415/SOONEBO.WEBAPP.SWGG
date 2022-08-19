const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const models = require("../models");

const router = express.Router();

// 등급 목록
router.post("/allGrades", isAdminCheck, async (req, res, next) => {
  try {
    const selectQ = `
    SELECT	id,
            lvValue,
            possiblePayment,
            CONCAT(FORMAT(possiblePayment, 0), "원")		AS viewPossiblePayment,
            fee,
            CONCAT(fee, "%")                           AS viewFee,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")	     AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")	     AS viewUpdatedAt
     FROM	userGrade
    `;

    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

// 등급 가격 수정
router.patch(
  "/payUpdate",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { possiblePayment, id, fee } = req.body;

    const selectQ = `
              SELECT  *
                FROM  userGrade
               WHERE  id = ${parseInt(id) + 1}
              `;

    try {
      if (parseInt(id) !== 4) {
        const queryResult1 = await models.sequelize.query(selectQ);

        if (
          parseInt(possiblePayment) >=
          parseInt(queryResult1[0][0].possiblePayment)
        ) {
          return res
            .status(401)
            .send("다음 직급의 금액 보다 높은 금액으로 수정할 수 없습니다.");
        }
      }

      const updateQuery = `
    UPDATE	userGrade
       SET	possiblePayment = ${possiblePayment},
            fee = ${fee},
            updatedAt = NOW()
     WHERE	id = ${id}
    `;

      const updateResult = await models.sequelize.query(updateQuery);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("데이터를 수정할 수 없습니다.");
    }
  }
);

module.exports = router;
