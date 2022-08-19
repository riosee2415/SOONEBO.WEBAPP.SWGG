const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");
const axios = require("axios");

const router = express.Router();

router.post("/user/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT	A.id,
          A.type,
          CASE
			        WHEN  A.type = 0 THEN "결제완료"
			        WHEN	A.type = 1 THEN "취소신청"
			        WHEN	A.type = 2 THEN "교환신청"
			        WHEN	A.type = 3 THEN "환불신청"
			        ELSE	A.type
          END											                        AS	cancelType,
          A.reason,
          A.isComplete,
          DATE_FORMAT(A.completedAt,   "%Y년 %m월 %d일")		AS	viewCompletedAt,
          DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일")		AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일") 		AS	viewUpdatedAt,
          A.BoughtHistoryId,
          A.bankName,
          A.bankNo,
          B.boughtName,
          B.payWay,
          B.price,
          CONCAT(FORMAT(B.price, 0), "원")                   AS viewPrice,
          B.usePoint,
          B.pointPrice,
          B.name,
          B.mobile,
          B.isSubmit,
          B.merchantUid,
          B.impUid,
          (
            SELECT	COUNT(id)
              FROM	wishItems
             WHERE	BoughtHitstoryId = A.BoughtHistoryId
          )		AS productCnt,
          (
            SELECT	title
              FROM	products
             WHERE	id =	(
              SELECT	ProductId 
                        FROM	wishItems	W
                       WHERE	BoughtHitstoryId = A.BoughtHistoryId
                       LIMIT	1              	 				
                     )
          )		AS productName
    FROM	boughtCancels			      A
   INNER
    JOIN	boughtHistorys 			    B
      ON	A.BoughtHistoryId = B.id
   WHERE	1 = 1
     AND  B.isSubmit = TRUE
     AND  A.UserId = ${req.user.id}
  `;

  const selectQuery = `
  SELECT	A.id,
          A.type,
          CASE
			        WHEN  A.type = 0 THEN "결제완료"
			        WHEN	A.type = 1 THEN "취소신청"
			        WHEN	A.type = 2 THEN "교환신청"
			        WHEN	A.type = 3 THEN "환불신청"
			        ELSE	A.type
          END											                        AS	cancelType,
          A.reason,
          A.isComplete,
          DATE_FORMAT(A.completedAt,   "%Y년 %m월 %d일")		AS	viewCompletedAt,
          DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일")		AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일") 		AS	viewUpdatedAt,
          A.BoughtHistoryId,
          A.bankName,
          A.bankNo,
          B.boughtName,
          B.payWay,
          B.price,
          CONCAT(FORMAT(B.price, 0), "원")                   AS viewPrice,
          B.usePoint,
          B.pointPrice,
          B.name,
          B.mobile,
          B.isSubmit,
          B.merchantUid,
          B.impUid,
          (
            SELECT	COUNT(id)
              FROM	wishItems
             WHERE	BoughtHitstoryId = A.BoughtHistoryId
          )		AS productCnt,
          (
            SELECT	title
              FROM	products
             WHERE	id =	(
              SELECT	ProductId 
                        FROM	wishItems	W
                       WHERE	BoughtHitstoryId = A.BoughtHistoryId
                       LIMIT	1              	 				
                     )
          )		AS productName
    FROM	boughtCancels			      A
   INNER
    JOIN	boughtHistorys 			    B
      ON	A.BoughtHistoryId = B.id
   WHERE	1 = 1
     AND  B.isSubmit = TRUE
     AND  A.UserId = ${req.user.id}
   ORDER  BY A.createdAt DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const cancel = await models.sequelize.query(selectQuery);

    const cancelLen = lengths[0].length;

    const lastPage =
      cancelLen % LIMIT > 0 ? cancelLen / LIMIT + 1 : cancelLen / LIMIT;

    return res.status(200).json({
      cancels: cancel[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("주문 취소/교환/환불 목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { listType, cancelType, agencyId } = req.body;
  // cancelType은 1 === 취소, 2 === 교환, 3 === 환불 입니다.
  let nanFlag = isNaN(listType);

  if (!listType) {
    nanFlag = false;
  }

  if (nanFlag) {
    return res.status(400).send("잘못된 요청 입니다.");
  }

  let _listType = Number(listType);

  if (_listType > 4 || !listType) {
    _listType = 4;
  }

  let _cancelType = cancelType || null;

  try {
    const selectQuery = `
        SELECT	A.id,
                A.type,
                CASE
                    WHEN  A.type = 0 THEN "결제완료"
                    WHEN	A.type = 1 THEN "취소신청"
                    WHEN	A.type = 2 THEN "교환신청"
                    WHEN	A.type = 3 THEN "환불신청"
                    ELSE	A.type
                END											                        AS	cancelType,
                A.reason,
                A.isComplete,
                DATE_FORMAT(A.completedAt,   "%Y년 %m월 %d일")		AS	viewCompletedAt,
                DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일")		AS	viewCreatedAt,
                DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일") 		AS	viewUpdatedAt,
                A.BoughtHistoryId,
                A.bankName,
                A.bankNo,
                B.boughtName,
                B.payWay,
                B.price,
                CONCAT(FORMAT(B.price, 0), "원")                   AS viewPrice,
                B.usePoint,
                B.pointPrice,
                B.name,
                B.mobile,
                B.isSubmit,
                B.merchantUid,
                B.impUid,
                C.userId,
                (
                  SELECT	COUNT(id)
                    FROM	wishItems
                   WHERE	BoughtHitstoryId = A.BoughtHistoryId
                )		AS productCnt,
                (
                  SELECT	title
                    FROM	products
                   WHERE	id =	(
                    SELECT	ProductId 
                              FROM	wishItems	W
                             WHERE	BoughtHitstoryId = A.BoughtHistoryId
                             LIMIT	1              	 				
                           )
                )		AS productName
          FROM	boughtCancels			      A
         INNER
          JOIN	boughtHistorys 			    B
            ON	A.BoughtHistoryId = B.id
         INNER
          JOIN	users	C
            ON	A.UserId = C.id
         WHERE	1 = 1
           AND	A.UserId IN	(
                        SELECT	id
                          FROM	users
                         WHERE	AgencyId = ${agencyId}
                        )
           AND  B.isSubmit = 1
                ${
                  _listType === 1
                    ? `AND A.isComplete = 0`
                    : _listType === 2
                    ? `AND A.isComplete = 1`
                    : _listType === 3
                    ? ``
                    : ``
                }
                ${
                  parseInt(_cancelType) === 1
                    ? `AND A.type = 1`
                    : parseInt(_cancelType) === 2
                    ? `AND A.type = 2`
                    : parseInt(_cancelType) === 3
                    ? `AND A.type = 3`
                    : parseInt(_cancelType) === 4
                    ? ``
                    : ``
                }
          ORDER BY A.createdAt DESC
        `;

    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json(lists[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("취소/교환/환불 목록을 불러올 수 없습니다.");
  }
});

router.post("/detail", isAdminCheck, async (req, res, next) => {
  const { boughtId } = req.body;

  try {
    const cancelQuery = `
        SELECT	A.id,
                A.type,
                CASE
                    WHEN  A.type = 0 THEN "결제완료"
                    WHEN	A.type = 1 THEN "취소신청"
                    WHEN	A.type = 2 THEN "교환신청"
                    WHEN	A.type = 3 THEN "환불신청"
                    ELSE	A.type
                END											                        AS	cancelType,
                A.reason,
                A.isComplete,
                DATE_FORMAT(A.completedAt,   "%Y년 %m월 %d일")		AS	viewCompletedAt,
                DATE_FORMAT(A.createdAt,     "%Y년 %m월 %d일")		AS	viewCreatedAt,
                DATE_FORMAT(A.updatedAt,     "%Y년 %m월 %d일") 		AS	viewUpdatedAt,
                A.BoughtHistoryId,
                A.bankName,
                A.bankNo,
                B.boughtName,
                B.payWay,
                B.postCode,
                B.address,
                B.detailAddress,
                B.deliveryPrice,
                CONCAT(FORMAT(B.deliveryPrice, 0), "원")                   AS viewDelPrice,
                B.price,
                CONCAT(FORMAT(B.price, 0), "원")                   AS viewPrice,
                B.usePoint,
                B.pointPrice,
                B.name,
                B.mobile,
                B.isSubmit,
                B.merchantUid,
                B.impUid,
                (
                  SELECT	COUNT(id)
                    FROM	wishItems
                   WHERE	BoughtHitstoryId = A.BoughtHistoryId
                )		AS productCnt,
                (
                  SELECT	title
                    FROM	products
                   WHERE	id =	(
                    SELECT	ProductId 
                              FROM	wishItems	W
                             WHERE	BoughtHitstoryId = A.BoughtHistoryId
                             LIMIT	1              	 				
                           )
                )		AS productName
          FROM	boughtCancels			      A
         INNER
          JOIN	boughtHistorys 			    B
            ON	A.BoughtHistoryId = B.id
         WHERE	1 = 1
           AND  B.isSubmit = 1
           AND  B.id = ${boughtId}
    `;

    const selectQuery = `
      SELECT	A.id,
              A.ProductId,
              A.productPrice,
              CONCAT(FORMAT(A.productPrice, 0), "원")								                                AS viewProductPrice,
              A.productDiscount,
              CONCAT(A.productDiscount, "%")                                                        AS viewProductDiscount,
              A.productTitle,
              A.productThumbnail,
              A.optionString,
              A.optionPrice,
              CONCAT(FORMAT(A.optionPrice, 0), "원")								                                AS viewOptionPrice,
              A.qun,
              FORMAT((A.productPrice * (A.productDiscount / 100)), 0)					                      AS calDiscount,
              CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100)), 0), "원")		               AS viewDiscount,
              CASE
                  WHEN	A.productDiscount IS NULL THEN	CONCAT(FORMAT(A.productPrice * A.qun, 0), "원")
                  ELSE	CONCAT(FORMAT(A.productPrice - (A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")
              END														                                          	            AS realPrice
        FROM	wishItems			A
       WHERE	A.BoughtHitstoryId IS NOT NULL
         AND  A.BoughtHitstoryId = ${boughtId}
          `;

    const cancel = await models.sequelize.query(cancelQuery);
    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json({ cancel: cancel[0], items: lists[0] });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("취소/교환/환불 요청 상세정보를 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    type,
    payWay,
    reason,
    boughtHistoryId,
    bankName,
    bankNo,
    impUid,
    merchantUid,
  } = req.body;

  //해당 주문 내역 정보 조회 쿼리
  const boughtHistoryInfo = `
  SELECT	A.id,
          A.boughtName,
          A.deliveryNo,
          A.deliveryCom,
          A.toSales,
          A.etc,
          A.name,
          A.mobile,
          A.payWay,
          A.createdAt,
          A.updatedAt,
          A.postCode,
          A.address,
          A.detailAddress,
          A.deliveryStatus,
          A.price,
          CONCAT(FORMAT(A.price, 0), "원")             AS viewPrice,
          A.usePoint,
          A.pointPrice,
          CONCAT(FORMAT(A.pointPrice, 0), "원")        AS viewPointPrice,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
          A.UserId,
          C.lvValue 									 AS userGrade,
          D.name 										 AS agencyName,
          D.urlName 			
    FROM	boughtHistorys			A
   INNER
    JOIN	users					      B
      ON	A.UserId = B.id
   INNER
    JOIN	userGrade 				  C
      ON	B.UserGradeId = C.id
   INNER
    JOIN	agencys					    D
      ON	B.AgencyId = D.id
   WHERE  A.id = ${boughtHistoryId}
  `;

  // 현재 유저 정보 쿼리
  const currentUserInfoQuery = `
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
    FROM	users		A
    LEFT
   OUTER
    JOIN	agencys 	B
      ON	A.AgencyId  = B.id
    LEFT
   OUTER	
    JOIN	userGrade 	C
      ON	A.UserGradeId = C.id
   WHERE	A.isExit = 0
     AND    A.id = ${req.user.id}
  `;

  /// 취소내역 생성 쿼리
  const insertQuery = `
  INSERT INTO boughtCancels
  (
    type, reason, createdAt, updatedAt, BoughtHistoryId, UserId, bankName, bankNo
  )
  VALUES
  (
    "${type}",
    "${reason}",
    now(),
    now(),
    ${boughtHistoryId},
    ${req.user.id},
    ${bankName ? `"${bankName}"` : null},
    ${bankNo ? `"${bankNo}"` : null} 
  )
  `;

  // 해당하는 내역 수정 쿼리
  const historyUpdateQuery = `
  UPDATE    boughtHistorys
     SET    isSubmit = 1,
            submitedAt = now()
   WHERE    id = ${boughtHistoryId}
  `;

  try {
    // 주문내역 불러오기
    const historyInfo = await models.sequelize.query(boughtHistoryInfo);

    if (historyInfo[0].length === 0) {
      return res.status(401).send("존재하지 않는 주문내역 정보입니다.");
    }

    if (historyInfo[0][0].isSubmit) {
      return res.status(401).send("이미 신청된 내역입니다.");
    }

    // 취소 내역 생성하기
    const insertResult = await models.sequelize.query(insertQuery);

    const getToken = await axios({
      // 토큰 발급
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API 키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });

    const { access_token } = getToken.data.response; // 인증 토큰

    if (payWay !== "nobank") {
      if (type === 1) {
        await axios({
          url: `https://api.iamport.kr/payments/cancel?_token=${access_token}`,
          method: "post",
          headers: { Authorization: access_token }, // 인증 토큰을 Authorization header에 추가
          data: {
            customer_uid: impUid,
            merchant_uid: merchantUid,
            // amount를 안적으면 전액환불이고 적을시 부분환불이다.
            // amount: 0
          },
        });
      }
    }

    // 사용자정보 불러오기
    const userInfo = await models.sequelize.query(currentUserInfoQuery);

    // 해당 주문내역 제출 완료 처리
    const historyUpdateResult = await models.sequelize.query(
      historyUpdateQuery
    );

    if (parseInt(type) === 1) {
      if (historyInfo[0][0].toSales) {
        // 환불내역 정산 쌓기 쿼리
        const saleInsertQuery = `
        INSERT INTO sales 
        (
          content,  price,  gradeString,  createdAt,  updatedAt,  UserId
        )
        VALUES
        (
          "환불", ${historyInfo[0][0].price},	"${userInfo[0][0].lvValue}", now(), now(), ${req.user.id}
        )
        `;

        // 정산 내역 인서트돌리기
        const result = await models.sequelize.query(saleInsertQuery);
      }

      if (historyInfo[0][0].usePoint) {
        //point 내역 생성 쿼리
        const pointInsertQuery = `
        INSERT INTO userPoints
        (
          type, usePrice, receivePrice, content, remainPrice, createdAt, updatedAt, UserId
        )
        VALUES
        (
          "환급",
          0,
          ${historyInfo[0][0].pointPrice},
          "구매취소",
          ${req.user.userPoint + historyInfo[0][0].pointPrice},
          now(),
          now(),
          ${req.user.id}
        )
      `;
        // 사용자 포인트 변경 쿼리
        const userUpdateQuery = `
          UPDATE  users
             SET  userPoint = ${
               req.user.userPoint + historyInfo[0][0].pointPrice
             },
                  updatedAt = now()
           WHERE  id = ${req.user.id}
      `;
        // query Result
        const pointResult = await models.sequelize.query(pointInsertQuery);
        const userResult = await models.sequelize.query(userUpdateQuery);
      }
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문 취소/교환/환불을 할 수 없습니다.");
  }
});

router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, type, payWay, impUid, merchantUid } = req.body;

  const getToken = await axios({
    // 토큰 발급
    url: "https://api.iamport.kr/users/getToken",
    method: "post", // POST method
    headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
    data: {
      imp_key: process.env.IMP_KEY, // REST API 키
      imp_secret: process.env.IMP_SECRET, // REST API Secret
    },
  });

  const { access_token } = getToken.data.response; // 인증 토큰

  if (payWay !== "nobank") {
    if (type === 3) {
      await axios({
        url: `https://api.iamport.kr/payments/cancel?_token=${access_token}`,
        method: "post",
        headers: { Authorization: access_token }, // 인증 토큰을 Authorization header에 추가
        data: {
          customer_uid: impUid,
          merchant_uid: merchantUid,
          // amount를 안적으면 전액환불이고 적을시 부분환불이다.
          // amount: 0
        },
      });
    }
  }

  const selectQuery = `
  SELECT	A.id,
          A.type,
          A.reason,
          A.isComplete,
          A.completedAt,
          A.createdAt,
          A.updatedAt,
          A.BoughtHistoryId,
          A.UserId,
          B.boughtName,
          B.toSales,
          B.impUid,
          B.merchantUid,
          B.price,
          B.usePoint,
          B.pointPrice,
          B.name,
          B.mobile,
          B.payWay,
          B.impUid,
          B.merchantUid 
    FROM	boughtCancels 	A 
   INNER
    JOIN	boughtHistorys 	B
      ON	A.BoughtHistoryId = B.id
   WHERE  A.id = ${id}
     AND  B.isSubmit = 1
  `;

  const updateQuery = `
  UPDATE  boughtCancels
     SET  isComplete = 1,
          completedAt = now()
   WHERE  id = ${id}
  `;

  try {
    const boughtInfo = await models.sequelize.query(selectQuery);

    if (boughtInfo[0].length === 0) {
      return res
        .status(401)
        .send("존재하지 않는 주문 취소/교환/환불 내역입니다.");
    }

    const updateResult = await models.sequelize.query(updateQuery);

    // 환불일 때
    // 환불 시 포인트 환급
    if (parseInt(boughtInfo[0][0].type) === 3) {
      const findUserQuery = `
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
        FROM	users		A
        LEFT
       OUTER
        JOIN	agencys 	B
          ON	A.AgencyId  = B.id
        LEFT
       OUTER	
        JOIN	userGrade 	C
          ON	A.UserGradeId = C.id
       WHERE	A.id = ${boughtInfo[0][0].UserId}
         AND  A.isExit = 0
      `;

      const userData = await models.sequelize.query(findUserQuery);

      //
      if (boughtInfo[0][0].toSales) {
        // 환불내역 정산 쌓기 쿼리
        const saleInsertQuery = `
        INSERT INTO sales 
        (
          content,  price,  gradeString,  createdAt,  updatedAt,  UserId
        )
        VALUES
        (
          "환불", ${boughtInfo[0][0].price},	"${userData[0][0].lvValue}", now(), now(), ${userData[0][0].id}
        )
        `;

        // 정산 내역 인서트돌리기
        const result = await models.sequelize.query(saleInsertQuery);
      }
      // 구매내역의 포인트 사용 여부가 true 라면

      if (boughtInfo[0][0].usePoint) {
        //point 내역 생성 쿼리
        const pointInsertQuery = `
        INSERT INTO userPoints
        (
          type, usePrice, receivePrice, content, remainPrice, createdAt, updatedAt, UserId
        )
        VALUES
        (
          "환급",
          0,
          ${boughtInfo[0][0].pointPrice},
          "상품 환불",
          ${userData[0][0].userPoint + boughtInfo[0][0].pointPrice},
          now(),
          now(),
          ${userData[0][0].id}
        )
      `;
        // 사용자 포인트 변경 쿼리
        const userUpdateQuery = `
          UPDATE  users
             SET  userPoint = ${
               userData[0][0].id + boughtInfo[0][0].pointPrice
             },
                  updatedAt = now()
           WHERE  id = ${userData[0][0].id}
      `;
        // query Result
        const pointResult = await models.sequelize.query(pointInsertQuery);
        const userResult = await models.sequelize.query(userUpdateQuery);
      }
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("주문 취소/교환/환불 요청을 처리할 수 없습니다.");
  }
});

module.exports = router;
