const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { User, UserPoint } = require("../models");
const models = require("../models");

const router = express.Router();

router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const lengthQuery = `
    SELECT	A.id,
            A.type,
            A.usePrice,
            CONCAT(FORMAT(A.usePrice, 0), "원")          AS viewUsePoint,
            A.receivePrice,
            CONCAT( FORMAT(A.receivePrice, 0), "원")     AS viewReceivePoint,
            A.content,
            A.remainPrice,
            CONCAT(FORMAT(A.remainPrice, 0), "원")       AS viewRemainPrice,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            B.userId,
            B.username,
            B.mobile 
      FROM	userPoints		A
     INNER
      JOIN	users			B
        ON 	A.UserId = B.id
     WHERE  1 = 1
       AND  A.UserId = ${req.user.id}
`;

    const selectQuery = `
    SELECT	A.id,
            A.type,
            A.usePrice,
            CONCAT(FORMAT(A.usePrice, 0), "원")          AS viewUsePoint,
            A.receivePrice,
            CONCAT( FORMAT(A.receivePrice, 0), "원")     AS viewReceivePoint,
            A.content,
            A.remainPrice,
            CONCAT(FORMAT(A.remainPrice, 0), "원")       AS viewRemainPrice,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            B.userId,
            B.username,
            B.mobile 
      FROM	userPoints		A
     INNER
      JOIN	users			    B
        ON 	A.UserId = B.id
     WHERE  1 = 1
       AND  A.UserId = ${req.user.id}
     ORDER  BY A.createdAt DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
`;

    const length = await models.sequelize.query(lengthQuery);
    const points = await models.sequelize.query(selectQuery);

    const pointLen = length[0].length;

    const lastPage =
      pointLen % LIMIT > 0 ? pointLen / LIMIT + 1 : pointLen / LIMIT;

    return res
      .status(200)
      .json({ points: points[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("포인트 내역을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { UserId, type } = req.body;

  const _UserId = UserId || null;

  const _type = type || ``;

  try {
    const selectQuery = `
    SELECT	A.id,
            A.type,
            A.usePrice,
            CONCAT(FORMAT(A.usePrice, 0), "원")          AS viewUsePoint,
            A.receivePrice,
            CONCAT( FORMAT(A.receivePrice, 0), "원")     AS viewReceivePoint,
            A.content,
            A.remainPrice,
            CONCAT(FORMAT(A.remainPrice, 0), "원")       AS viewRemainPrice,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            B.userId,
            B.username,
            B.mobile 
      FROM	userPoints		A
     INNER
      JOIN	users			B
        ON 	A.UserId = B.id
     WHERE  1 = 1
       ${_UserId ? `AND A.UserId = ${_UserId}` : ``}
       ${_type !== `` ? `AND A.type = '${_type}'` : ``}
     ORDER  BY A.createdAt DESC
`;

    const points = await models.sequelize.query(selectQuery);

    return res.status(200).json({ points: points[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("포인트 내역을 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { userId, point } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    if (exUser.isExit) {
      return res
        .status(401)
        .send("탈퇴한 사용자입니다. 확인 후 다시 시도하여 주십시오.");
    }

    const prevPoint = exUser.userPoint;

    const createResult = await UserPoint.create({
      type: "지급",
      usePrice: 0,
      receivePrice: parseInt(point),
      content: "포인트 지급",
      remainPrice: parseInt(prevPoint) + parseInt(point),
      UserId: parseInt(userId),
    });

    await User.update(
      {
        userPoint: parseInt(prevPoint) + parseInt(point),
      },
      {
        where: { id: parseInt(userId) },
      }
    );

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("포인트를 지급할 수 없습니다.");
  }
});

module.exports = router;
