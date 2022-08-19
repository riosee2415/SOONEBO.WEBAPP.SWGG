const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

// 생성하기
// 매출 또는 환불 기준으로 userId랑, 금액 받아서 INSERT쿼리 돌리기

router.post("/grlist", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate, searchValue } = req.body;

  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY Z.agencyName ASC)							AS	num,
            Z.agencyName,
            SUM(Z.price)                            AS originTotalPrice,
            AVG(Z.price)                            AS originAvgPrice,
            CONCAT(FORMAT(SUM(Z.price), 0), "원")		AS 	totalSale,
            CONCAT(FORMAT(AVG(Z.price), 0), "원")		AS	avgSale,
            COUNT(*)                                    AS cnt
    FROM	(
                SELECT	A.content,
                        A.price,
                        CONCAT("[", B.AgencyId, "]", C.name)	AS	agencyName,
                        B.AgencyId
                 FROM	sales	A
                INNER
                 JOIN	users	B
                   ON	A.UserId = B.id
                 LEFT
                OUTER
                 JOIN	agencys C
                   ON	B.AgencyId = C.id
                WHERE	A.content = "매출"
                  AND	DATE_FORMAT(A.createdAt, "%Y%m") >= "${startDate}"
                  AND	DATE_FORMAT(A.createdAt, "%Y%m") <= "${endDate}"
            )	Z
    WHERE	Z.agencyName LIKE "%${searchValue}%"
    GROUP	BY	Z.agencyName
  
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/persnalData", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate, userId, dataSort } = req.body;

  const _userId = userId ? userId : "";

  const _dataSort = dataSort ? parseInt(dataSort) : 1;

  let selectQ = `
  SELECT	ROW_NUMBER() OVER()							AS	num,
            A.id,
            A.content,
            A.price,
            CONCAT(FORMAT(A.price, 0), "원")		AS  viewPrice,
            A.gradeString,
            A.createdAt,
            A.UserId,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            B.userId,
            B.username,
            C.name
     FROM 	sales		A
    INNER
     JOIN	users	B
      ON	A.UserId = B.id
     LEFT
    OUTER
     JOIN	agencys C
       ON	B.AgencyId = C.id
    WHERE	A.content = "매출"
      AND	DATE_FORMAT(A.createdAt, "%Y%m") >= "${startDate}"
      AND	DATE_FORMAT(A.createdAt, "%Y%m") <= "${endDate}"\n
      ${_userId ? `AND	A.UserId = ${_userId}` : ""}
    ORDER   BY  A.createdAt ${_dataSort === 1 ? "DESC" : "ASC"}
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/myemplist", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate, userId } = req.body;

  let selectQ = `
  SELECT	ROW_NUMBER() OVER()							AS	num,
            A.id,
            A.content,
            A.price,
            CONCAT(FORMAT(A.price, 0), "원")		AS  viewPrice,
            A.gradeString,
            A.createdAt,
            A.UserId,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            B.userId,
            B.username,
            C.name
     FROM 	sales		A
    INNER
     JOIN	users	B
      ON	A.UserId = B.id
     LEFT
    OUTER
     JOIN	agencys C
       ON	B.AgencyId = C.id
    WHERE	A.content = "매출"
      AND	DATE_FORMAT(A.createdAt, "%Y%m") >= "${startDate}"
      AND	DATE_FORMAT(A.createdAt, "%Y%m") <= "${endDate}"\n
      AND	A.UserId IN (
                            SELECT	id
                              FROM	users
                             WHERE	managerId = ${userId}
                        )
    ORDER   BY  A.createdAt DESC
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/history/create", async (req, res, next) => {
  const { userId, content, price, gradeString } = req.body;

  const insertQuery = `
  INSERT INTO sales 
  (
  	content,  price,  gradeString,  createdAt,  updatedAt,  UserId
  )
  VALUES
  (
  	"${content}", ${price},	"${gradeString}", now(), now(), ${userId}
  )
  `;

  try {
    const result = await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("매출 내역을 생성할 수 없습니다.");
  }
});

// 최근 1개월 나의 매출 보기 (나의 바로 밑에 세일즈 포함)
router.post("/perflist", isAdminCheck, async (req, res, next) => {
  const { userId } = req.body;

  const selectQ = `
  SELECT	Z.id,
          Z.content,
          Z.price,
          CONCAT(FORMAT(Z.price, 0),"원")    AS viewPrice,
          Z.gradeString,
          Z.createdAt,
          Z.updatedAt,
          DATE_FORMAT(Z.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(Z.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          Z.UserId,
          B.username
    FROM	(
            SELECT	id,
                    content,
                    price,
                    gradeString,
                    createdAt,
                    updatedAt,
                    UserId 
              FROM 	sales s 
             WHERE 	UserId = ${userId}
             UNION	ALL
            SELECT	id,
                    content,
                    price,
                    gradeString,
                    createdAt,
                    updatedAt,
                    UserId 
              FROM 	sales s 
             WHERE	UserId IN 	(
                                 SELECT	 id
                                   FROM	 users
                                  WHERE	 managerId  = ${userId}
                                )
         )	Z 
    INNER
     JOIN 	users	B
       ON 	Z.UserId = B.id
     WHERE	DATE_FORMAT(Z.createdAt, "%Y%m%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), "%Y%m%d")
  `;

  const selectQ2 = `
              
SELECT	SUM(price)								AS	sumPrice,
        CONCAT(FORMAT(SUM(price), 0),"원")		AS	viewPrice,
        CASE
          WHEN	SUM(price) >= 	(
                        SELECT	possiblePayment 
                          FROM	userGrade
                        WHERE	lvValue = "TM"
                      )		THEN "TM(으)로 승급 가능"	
          WHEN	SUM(price) >= 	(
                        SELECT	possiblePayment 
                          FROM	userGrade
                        WHERE	lvValue = "M"
                      )	THEN "M(으)로 승급 가능"
          WHEN	SUM(price) >= 	(
                        SELECT	possiblePayment 
                          FROM	userGrade
                        WHERE	lvValue = "TS"
                      )	THEN "TS(으)로 승급 가능"
          WHEN	SUM(price) >= 	(
                        SELECT	possiblePayment 
                          FROM	userGrade
                        WHERE	lvValue = "S"
                      )	THEN "S(으)로 승급 가능"
          ELSE	"승급 가능여부 없음"
      END		AS	canUp
  FROM	(
          SELECT	id,
                  content,
                  price,
                  gradeString,
                  createdAt,
                  updatedAt,
                  UserId 
            FROM 	sales s 
           WHERE 	UserId = ${userId}
           UNION	ALL
          SELECT	id,
                  content,
                  price,
                  gradeString,
                  createdAt,
                  updatedAt,
                  UserId 
            FROM 	sales s 
           WHERE	UserId IN 	(
                                SELECT	 id
                                  FROM	 users
                                 WHERE	 managerId  = ${userId}
                              )
          )	Z
    INNER
     JOIN	 users	B
       ON	 Z.UserId = B.id
    WHERE  DATE_FORMAT(Z.createdAt, "%Y%m%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), "%Y%m%d")
  `;

  try {
    const result1 = await models.sequelize.query(selectQ);
    const result2 = await models.sequelize.query(selectQ2);

    return res.status(200).json({
      list: result1[0],
      perf: result2[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("매출 내역을 조회할 수 없습니다.");
  }
});

router.post("/inAgencySales", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate } = req.body;

  const selectQ = `
  SELECT	ROW_NUMBER() OVER()					AS	num,
          A.id,
          A.content,
          A.price,
          CONCAT(FORMAT(A.price, 0), "원") 	AS viewPrice,
          A.gradeString,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
              B.username,
              B.userId,
              B.email,
              B.mobile,
              (
                SELECT	lvValue
                  FROM	userGrade
                WHERE	id = B.UserGradeId
              )	AS	currentGrade
      FROM	sales	A
     INNER
      JOIN	users	B
        ON	A.UserId = B.id
     WHERE	A.content = "매출"
       AND	A.UserId IN	(
                        SELECT	id
                          FROM	users
                         WHERE	AgencyId = 5
                        )
       AND	DATE_FORMAT(A.createdAt, "%Y%m") >= "${startDate}"
       AND	DATE_FORMAT(A.createdAt, "%Y%m") <= "${endDate}"
     ORDER  BY  A.createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("매출 내역을 조회할 수 없습니다.");
  }
});

// 개인 별 정산관리 리스트
// 기본이 미정산 리스트
router.post("/persnal/cal", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate, searchName, comp } = req.body;

  const selectQ = `
  SELECT	A.id,
          A.content,
          A.price,
          CONCAT(FORMAT(A.price, 0), "원") 	                                 AS viewPrice,
          A.gradeString,  
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")	      	                AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		                      AS viewUpdatedAt,
          A.isCompleted,
          IFNULL(A.completedAt, "-")					            	                AS completedAt,
          DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일 %H:%i:%s") 		          AS viewCompletedAt,
          A.UserId,
          (
            SELECT	lvValue 
              FROM	userGrade
             WHERE	id = B.UserGradeId 
          )												                                          AS currentGrade,
          B.username,
          B.email,
          B.mobile,
          IFNULL(B.bank, "-")								                                AS bank,
          IFNULL(B.accountNo, "-")					                	              AS accountNo,
          C.fee																                              AS feePercent,
          A.price * (C.fee / 100)												                    AS fee,
          CONCAT(FORMAT(A.price * (C.fee / 100), 0), "원")						       AS viewFee,
          A.price - (A.price * (C.fee / 100))									              AS remainPrice,
          CONCAT(FORMAT(A.price - (A.price * (C.fee / 100)), 0), "원")		 	 AS viewRemainPrice
    FROM	sales	A
   INNER
    JOIN	users	B
      ON	A.UserId = B.id
   INNER
    JOIN	userGrade C
      ON	A.gradeString = C.lvValue
   WHERE	1=1
     AND  B.AgencyId = 5
     AND	DATE_FORMAT(A.createdAt, "%Y%m") >= "${startDate}"
     AND	DATE_FORMAT(A.createdAt, "%Y%m") <= "${endDate}"
     AND	B.username LIKE "%${searchName}%"
     AND 	A.isCompleted = ${comp}
     AND  B.UserGradeId != 	(
                                SELECT	id
                                  FROM	userGrade
                                WHERE	lvValue = "any"
                            )
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("정산 내역을 조회할 수 없습니다.");
  }
});

router.post("/persnal/cal/completed", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
    UPDATE  sales
       SET  isCompleted = 1,
            completedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    const result = await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정산 내역을 조회할 수 없습니다.");
  }
});

module.exports = router;
