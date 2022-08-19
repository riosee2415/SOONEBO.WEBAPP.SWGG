const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { WishItem, WishList, BoughtHistory } = require("../models");
const models = require("../models");
const axios = require("axios");

const router = express.Router();

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH ITEM 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

router.post("/item/create", async (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  let createItemId = [];

  try {
    for (let i = 0; i < items.length; i++) {
      const insertQuery = `
      INSERT INTO wishItems
      (
        ProductId,
        productPrice,
        productDiscount,
        productDelPrice,
        productTitle,
        productThumbnail,
        optionString,
        optionPrice,
        qun,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${items[i].ProductId},
        ${items[i].productPrice},
        ${items[i].productDiscount},
        ${items[i].productDelPrice},
        "${items[i].productTitle}",
        "${items[i].productThumbnail}",
        ${items[i].optionString ? `"${items[i].optionString}"` : null},
        ${items[i].optionPrice ? `${items[i].optionPrice}` : null},
        ${items[i].qun},
        now(),
        now()
      )
      `;

      const createResult = await models.sequelize.query(insertQuery);

      createItemId.push(createResult[0]);
    }

    return res.status(201).json(createItemId);
  } catch (error) {
    console.error(error);
    return res.status(400).send("장바구니에 상품을 추가할 수 없습니다.");
  }
});

router.patch("/item/update", async (req, res, next) => {
  // wishItem ID
  const { id, count } = req.body;

  try {
    const exItem = await WishItem.findOne({ where: { id: parseInt(id) } });

    if (!exItem) {
      return res.status(400).send("존재하지 않는 등록상품 입니다.");
    }

    const updateResult = await WishItem.update(
      {
        qun: parseInt(count),
      },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("수량을 수정할 수 없습니다.");
  }
});

// 장바구니 상품 전체 삭제
router.post("/item/deleteAll", async (req, res, next) => {
  const { itemId } = req.body;
  // 배열로 받아주세요.

  if (!Array.isArray(itemId)) {
    return res.status(400).send("잘못 된 요청입니다. 다시 시도해주세요.");
  }

  try {
    await Promise.all(
      itemId.map(async (data) => {
        WishItem.destroy({
          where: {
            id: parseInt(data),
          },
        });
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.delete("/item/delete/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  try {
    if (isNanCheck(itemId)) {
      return res.status(400).send("잘못된 요청 입니다. 다시 시도해주세요.");
    }

    const exItem = await WishItem.findOne({ where: { id: parseInt(itemId) } });

    if (!exItem) {
      return res.status(400).send("존재하지 않는 등록상품 입니다.");
    }

    await WishItem.destroy({ where: { id: parseInt(itemId) } });

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잘못된 요청 입니다.");
  }
});

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH LIST 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

router.post("/list/add", isLoggedIn, async (req, res, next) => {
  // 배열로 받아야 함 (wishItemId만)
  const { wishItemId } = req.body;

  if (!Array.isArray(wishItemId)) {
    return res.status(400).send("잘못 된 요청입니다. 다시 시도해주세요.");
  }

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    if (!req.user.id) {
      return res.status(401).send("로그인 후 이용 가능합니다.");
    }

    const exWishList = await WishList.findOne({
      where: { UserId: parseInt(req.user.id) },
    });

    let createResult = [];

    if (!exWishList) {
      createResult = await WishList.create({
        UserId: parseInt(req.user.id),
      });
    }

    await Promise.all(
      wishItemId.map(async (item) => {
        await WishItem.update(
          {
            WishListId: exWishList ? exWishList.id : createResult.id,
          },
          {
            where: { id: parseInt(item) },
          }
        );
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

router.get("/list/view", isLoggedIn, async (req, res, next) => {
  try {
    const exWishList = await WishList.findOne({
      where: { UserId: parseInt(req.user.id) },
    });

    if (!exWishList) {
      return res.status(200).json([]);
    }

    if (!req.user) {
      return res.status(403).send("로그인 후 이용 가능합니다.");
    }

    const selectQuery = `
    SELECT	A.id,
            A.ProductId,
            A.productPrice,
            CONCAT(FORMAT(A.productPrice, 0), "원")								                                AS viewProductPrice,
            A.productDiscount,
            CONCAT(A.productDiscount, "%")                                                        AS viewProductDiscount,
            A.productDelPrice,
            CONCAT(FORMAT(A.productDelPrice, 0),"원")                                              AS viewProdDelPrice,
            A.productTitle,
            A.productThumbnail,
            A.optionString,
            A.optionPrice,
            A.optionPrice * A.qun                                                                 AS optionRealPrice,
            CONCAT(FORMAT(A.optionPrice, 0), "원")								                                AS viewOptionPrice,
            A.qun,
            (A.productPrice * (A.productDiscount / 100) * A.qun)					                                AS originCalDiscount,
            FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0)					                      AS calDiscount,
            CONCAT(FORMAT((A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")		               AS viewDiscount,
            CASE
                WHEN	A.productDiscount IS NULL THEN	(A.productPrice * A.qun)
                ELSE	A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun)
            END														                                          	            AS originRealPrice,
            CASE
                WHEN	A.productDiscount IS NULL THEN	CONCAT(FORMAT(A.productPrice * A.qun, 0), "원")
                ELSE	CONCAT(FORMAT(A.productPrice * A.qun - (A.productPrice * (A.productDiscount / 100) * A.qun), 0), "원")
            END														                                          	            AS realPrice
      FROM	wishItems			A
     INNER
      JOIN  wishLists     B
        ON  A.WishListId = B.id
     WHERE	A.BoughtHitstoryId IS NULL
       AND  A.WishListId = ${exWishList.id}
        `;

    const myLists = await models.sequelize.query(selectQuery);

    return res.status(200).json(myLists[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

router.post("/order/list", async (req, res, next) => {
  const { wishItemId } = req.body;

  if (!Array.isArray(wishItemId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const itemQuery = `
  SELECT	A.id,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y-%m-%d")                                                  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y-%m-%d")                                                  AS viewUpdatedAt,
          A.ProductId,
          A.productPrice,
          CONCAT(FORMAT(A.productPrice, 0), "원")								                                AS viewProductPrice,
          A.productDiscount,
          CONCAT(A.productDiscount, "%")                                                        AS viewProductDiscount,
          A.productDelPrice,
          CONCAT(FORMAT(A.productDelPrice, 0),"원")                                              AS viewProdDelPrice,
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
          END														                                          	            AS realPrice,
          B.deliveryPrice,
          CONCAT(FORMAT(B.deliveryPrice, 0), "원")								                               AS viewDelPrice
    FROM	wishItems			A
   INNER
    JOIN  wishLists     B
      ON  A.WishListId = B.id
   WHERE	A.BoughtHitstoryId IS NULL
     AND  A.id IN (${wishItemId})
      `;

  try {
    const items = await models.sequelize.query(itemQuery);

    return res.status(200).json(items[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 목록을 불러올 수 없습니다.");
  }
});

////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/// BOUGHT LIST 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

router.post("/bought/list", isLoggedIn, async (req, res, next) => {
  const { page, searchDate, startDate, endDate } = req.body;

  let _start = startDate || null;
  let _end = endDate || null;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  if (parseInt(searchDate) > 5) {
    searchDate === ``;
  }

  const date =
    searchDate === "1"
      ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d')`
      : searchDate === "2"
      ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -1  MONTH ) AND NOW()`
      : searchDate === "3"
      ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -3  MONTH ) AND NOW()`
      : searchDate === "4"
      ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -6  MONTH ) AND NOW()`
      : searchDate === "5"
      ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -12  MONTH ) AND NOW()`
      : ``;

  try {
    const lengthQuery = `
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
              A.vBankDate,
              A.vbankHolder,
              A.vbankName,
              A.vbankNum,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedAt,
              A.detailAddress,
              A.deliveryStatus,
              CASE
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 0 THEN "입금대기"
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 1 THEN "결제완료"
                WHEN	A.deliveryStatus = 1 THEN "배송준비중"
                WHEN	A.deliveryStatus = 2 THEN "집화완료"
                WHEN	A.deliveryStatus = 3 THEN "배송중"
                WHEN	A.deliveryStatus = 4 THEN "지점 도착"
                WHEN	A.deliveryStatus = 5 THEN "배송출발"
                WHEN	A.deliveryStatus = 6 THEN "배송 완료"
                ELSE	A.deliveryStatus
              END	                                        AS viewDeliveryStatus,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")             AS viewPrice,
              A.deliveryPrice,
              CONCAT(FORMAT(A.deliveryPrice, 0), "원")     AS deliveryPrice,
              usePoint,
              CONCAT(FORMAT(A.pointPrice, 0), "원")        AS viewPointPrice,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              A.UserId,
              C.lvValue 										              AS userGrade,
              D.name 										                	AS agencyName,
              D.urlName,
              (
              	SELECT	COUNT(id)
              	  FROM	wishItems
              	 WHERE	BoughtHitstoryId = A.id
              )		AS productCnt,
              (
              	SELECT	title
              	  FROM	products
              	 WHERE	id =	(
									SELECT	ProductId 
					              	  FROM	wishItems	W
					              	 WHERE	BoughtHitstoryId = A.id
					              	 LIMIT	1              	 				
              	 				)
              )		AS productName,
              CASE
                WHEN 	A.vBankDate IS NOT NULL AND DATE_FORMAT(A.vBankDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d")	THEN 1
                ELSE	0
              END                                         AS dateFlag
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
       WHERE  A.UserId = ${req.user.id}
         AND  A.isSubmit = 0
              ${date}
                ${
                  _start
                    ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') >= DATE_FORMAT('${_start}', '%Y-%m-%d') `
                    : ``
                }
                ${
                  _end
                    ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') <= DATE_FORMAT('${_end}', '%Y-%m-%d') `
                    : ``
                }
    `;

    const selectQuery = `
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
              A.vBankDate,
              A.vbankHolder,
              A.vbankName,
              A.vbankNum,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedAt,
              A.detailAddress,
              A.deliveryStatus,
              CASE
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 0 THEN "입금대기"
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 1 THEN "결제완료"
                WHEN	A.deliveryStatus = 1 THEN "배송준비중"
                WHEN	A.deliveryStatus = 2 THEN "집화완료"
                WHEN	A.deliveryStatus = 3 THEN "배송중"
                WHEN	A.deliveryStatus = 4 THEN "지점 도착"
                WHEN	A.deliveryStatus = 5 THEN "배송출발"
                WHEN	A.deliveryStatus = 6 THEN "배송 완료"
                ELSE	A.deliveryStatus
              END	                                        AS viewDeliveryStatus,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")             AS viewPrice,
              A.deliveryPrice,
              CONCAT(FORMAT(A.deliveryPrice, 0), "원")     AS deliveryPrice,
              usePoint,
              CONCAT(FORMAT(A.pointPrice, 0), "원")        AS viewPointPrice,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              A.UserId,
              C.lvValue 										              AS userGrade,
              D.name 										                	AS agencyName,
              D.urlName,
              (
              	SELECT	COUNT(id)
              	  FROM	wishItems
              	 WHERE	BoughtHitstoryId = A.id
              )		AS productCnt,
              (
              	SELECT	title
              	  FROM	products
              	 WHERE	id =	(
									SELECT	ProductId 
					              	  FROM	wishItems	W
					              	 WHERE	BoughtHitstoryId = A.id
					              	 LIMIT	1              	 				
              	 				)
              )		AS productName,
              CASE
                WHEN 	A.vBankDate IS NOT NULL AND DATE_FORMAT(A.vBankDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d")	THEN 1
                ELSE	0
              END                                         AS dateFlag
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
       WHERE  A.UserId = ${req.user.id}   
         AND  A.isSubmit = 0    
              ${date}
                ${
                  _start
                    ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') >= DATE_FORMAT('${_start}', '%Y-%m-%d') `
                    : ``
                }
                ${
                  _end
                    ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') <= DATE_FORMAT('${_end}', '%Y-%m-%d') `
                    : ``
                }
       ORDER  BY A.createdAt DESC 
       LIMIT  ${LIMIT}
      OFFSET  ${OFFSET}
    `;

    const lengths = await models.sequelize.query(lengthQuery);
    const boughts = await models.sequelize.query(selectQuery);

    const boughtsLen = lengths[0].length;

    const lastPage =
      boughtsLen % LIMIT > 0 ? boughtsLen / LIMIT + 1 : boughtsLen / LIMIT;

    return res.status(200).json({
      boughts: boughts[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("주문내역 정보를 불러올 수 없습니다.");
  }
});

router.post("/bought/detail", async (req, res, next) => {
  const { boughtId } = req.body;

  try {
    const selectQuery = `
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
            A.vBankDate,
            A.vbankHolder,
            A.vbankName,
            A.vbankNum,
            A.impUid,
            A.merchantUid,
            A.isCompleted,
            A.completedAt,
            A.detailAddress,
            A.deliveryStatus,
            CASE
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 0 THEN "입금대기"
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 1 THEN "결제완료"
                WHEN	A.deliveryStatus = 1 THEN "배송준비중"
                WHEN	A.deliveryStatus = 2 THEN "집화완료"
                WHEN	A.deliveryStatus = 3 THEN "배송중"
                WHEN	A.deliveryStatus = 4 THEN "지점 도착"
                WHEN	A.deliveryStatus = 5 THEN "배송출발"
                WHEN	A.deliveryStatus = 6 THEN "배송 완료"
                ELSE	A.deliveryStatus
            END	                                        AS viewDeliveryStatus,
            A.price,
            CONCAT(FORMAT(A.price - A.deliveryPrice, 0), "원")             AS viewPrice,
            A.deliveryPrice,
            CONCAT(FORMAT(A.deliveryPrice, 0), "원")     AS deliveryPrice,
            usePoint,
            CONCAT(FORMAT(A.pointPrice, 0), "원")        AS viewPointPrice,
            A.price - A.pointPrice                      AS intFinalPrice,
            CONCAT(FORMAT((A.price - A.pointPrice), 0), "원") AS viewFinalPrice,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
            A.UserId,
            CASE
                WHEN 	A.vBankDate IS NOT NULL AND DATE_FORMAT(A.vBankDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d")	THEN 1
                ELSE	0
            END                                         AS dateFlag
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
     WHERE  A.id = ${boughtId}
    `;

    const itemQuery = `
    SELECT	A.id,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y-%m-%d")                                                  AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y-%m-%d")                                                  AS viewUpdatedAt,
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

    const boughtData = await models.sequelize.query(selectQuery);

    const lists = await models.sequelize.query(itemQuery);

    return res
      .status(200)
      .json({ boughtData: boughtData[0][0], items: lists[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매내역 정보를 불러올 수 없습니다.");
  }
});

router.post("/bought/create", isLoggedIn, async (req, res, next) => {
  const {
    wishItemId, // 그저 배열
    toSales, // 결제한사람이 any가 아니면 true
    etc, // 배송메세지
    price, // 전체 결제 가격
    deliveryPrice, // 배송비
    usePoint, // 사용여부
    pointPrice, // 사용한 포인트
    postCode, // 우편번호
    address, // 주소
    detailAddress, // 상세주소
    name, // 이름
    mobile, // 전화번호
    payWay, // 뭘로 결제 햇는지
    impUid, // 아임포트
    merchantUid, // 아임포트
    vBankDate, // 가상계좌
    vbankHolder, // 가상계좌
    vbankName, // 가상계좌
    vbankNum, // 가상계좌
  } = req.body;

  const D = new Date();

  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const date = D.getDate();
  const hour = D.getHours();
  const min = D.getHours();
  const sec = D.getSeconds();
  const nSec = D.getMilliseconds();

  const result = String("" + year + month + date + hour + min + sec + nSec);

  if (!Array.isArray(wishItemId)) {
    return res.status(400).send("잘못된 요청입니다. 다시 시도해주세요.");
  }

  const insertQuery = `
  INSERT INTO boughtHistorys
  (
    boughtName,
    toSales,
    price,
    deliveryPrice,
    etc,
    createdAt,
    updatedAt,
    usePoint,
    pointPrice,
    UserId,
    postCode,
    address,
    detailAddress,
    name,
    mobile,
    payWay,
    impUid,
    merchantUid,
    vBankDate,
    vbankHolder,
    vbankName,
    vbankNum,
    isCompleted,
    completedAt
  )
  VALUES
  (
    "${result}",
    ${toSales},
    ${price},
    ${deliveryPrice},
    "${etc}",
    now(),
    now(),
    ${usePoint},
    ${usePoint ? pointPrice : 0},
    ${req.user.id},
    "${postCode}",
    "${address}",
    "${detailAddress}",
    "${name}",
    "${mobile}",
    "${payWay}",
    ${payWay !== "nobank" ? `"${impUid}"` : null},
    ${payWay !== "nobank" ? `"${merchantUid}"` : null},
    ${payWay === "vbank" ? `"${vBankDate}"` : null},
    ${payWay === "vbank" ? `"${vbankHolder}"` : null},
    ${payWay === "vbank" ? `"${vbankName}"` : null},
    ${payWay === "vbank" ? `"${vbankNum}"` : null},
    ${payWay === "nobank" || payWay === "vbank" ? `0` : `1`},
    ${payWay === "nobank" || payWay === "vbank" ? null : `now()`}
  )
  `;

  const findBoughtHistoryQuery = `
  SELECT id
    FROM boughtHistorys
   WHERE boughtName = "${result}"
  `;

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
     AND  A.id = ${req.user.id}
  `;

  try {
    const findResult = await models.sequelize.query(findBoughtHistoryQuery);

    if (findResult[0].length !== 0) {
      return res.status(401).send("동일한 주문 번호가 존재합니다.");
    }

    const insertResult = await models.sequelize.query(insertQuery);

    const updateQuery = `
      UPDATE  wishItems
         SET  BoughtHitstoryId = ${insertResult[0]}
       WHERE  id IN (${wishItemId})
      `;

    const updateResult = await models.sequelize.query(updateQuery);

    if (usePoint) {
      const pointInsertQuery = `
      INSERT INTO userPoints
      (
        type, usePrice, receivePrice, content, remainPrice, createdAt, updatedAt, UserId
      )
      VALUES
      (
        "사용",
        ${pointPrice},
        0,
        "상품 결제",
        ${req.user.userPoint - pointPrice},
        now(),
        now(),
        ${req.user.id}
      )
    `;

      const userUpdateQuery = `
        UPDATE  users
           SET  userPoint = ${req.user.userPoint - pointPrice},
                updatedAt = now()
         WHERE  id = ${req.user.id}
    `;

      const pointResult = await models.sequelize.query(pointInsertQuery);
      const userResult = await models.sequelize.query(userUpdateQuery);
    }

    if (toSales) {
      const userInfo = await models.sequelize.query(currentUserInfoQuery);

      const saleInsertQuery = `
      INSERT INTO sales 
      (
        content,  price,  gradeString,  createdAt,  updatedAt,  UserId
      )
      VALUES
      (
        "매출", ${price},	"${userInfo[0][0].lvValue}", now(), now(), ${req.user.id}
      )
      `;

      const result = await models.sequelize.query(saleInsertQuery);
    }

    return res
      .status(201)
      .json({ result: true, resultId: parseInt(insertResult[0]) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품을 구매할 수 없습니다.");
  }
});

router.post("/bought/admin/list", isAdminCheck, async (req, res, next) => {
  const {
    // userId,
    searchDate,
    startDate,
    endDate,
    agencyId,
    deliveryStatus,
    payWay,
    // listType,
  } = req.body;

  // let _userId = userId || null;

  // ${_userId ? `AND  A.UserId = ${_userId}` : ``}

  let _agencyId = agencyId ? agencyId : false;

  let _payWay = payWay ? payWay : ``;

  let _start = startDate || null;
  let _end = endDate || null;

  let _deliveryStatus = parseInt(deliveryStatus);

  // let _listType = parseInt(listType) || 3;

  if (parseInt(_deliveryStatus) > 8) {
    _deliveryStatus = 8;
  }

  // if (parseInt(_listType) > 3) {
  //   _listType = 3;
  // }

  if (parseInt(searchDate) > 5) {
    searchDate === ``;
  }

  // status === 0 무통장결제 및 가상계좌 입금 대기 목록 (운송장  X) (미처리)
  // status === 1 결제완료 목록 (운송장  X)

  try {
    const date =
      searchDate === "1"
        ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') = DATE_FORMAT(now(), '%Y-%m-%d')`
        : searchDate === "2"
        ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -1  MONTH ) AND NOW()`
        : searchDate === "3"
        ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -3  MONTH ) AND NOW()`
        : searchDate === "4"
        ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -6  MONTH ) AND NOW()`
        : searchDate === "5"
        ? `AND  A.createdAt BETWEEN DATE_ADD(NOW(),INTERVAL -12  MONTH ) AND NOW()`
        : ``;

    const selectQuery = `
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
            A.vBankDate,
            A.vbankHolder,
            A.vbankName,
            A.vbankNum,
            A.impUid,
            A.merchantUid,
            A.isCompleted,
            A.completedAt,
            A.postCode,
            A.address,
            A.detailAddress,
            A.deliveryStatus,
            CASE
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 0 THEN "입금대기"
                WHEN	A.deliveryStatus = 0 AND A.isCompleted = 1 THEN "결제완료"
                WHEN	A.deliveryStatus = 1 THEN "배송준비중"
                WHEN	A.deliveryStatus = 2 THEN "집화완료"
                WHEN	A.deliveryStatus = 3 THEN "배송중"
                WHEN	A.deliveryStatus = 4 THEN "지점 도착"
                WHEN	A.deliveryStatus = 5 THEN "배송출발"
                WHEN	A.deliveryStatus = 6 THEN "배송 완료"
                ELSE	A.deliveryStatus
            END	                                        AS viewDeliveryStatus,
            A.price,
            CONCAT(FORMAT(A.price, 0), "원")             AS viewPrice,
            A.deliveryPrice,
            CONCAT(FORMAT(A.deliveryPrice, 0), "원")     AS deliveryPrice,
            usePoint,
            CONCAT(FORMAT(A.pointPrice, 0), "원")        AS viewPointPrice,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
            A.UserId,
            C.lvValue 										              AS userGrade,
            D.name 										                	AS agencyName,
            D.urlName,
            CASE
                WHEN 	A.vBankDate IS NOT NULL AND DATE_FORMAT(A.vBankDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d")	THEN 1
                ELSE	0
            END                                         AS dateFlag
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
     WHERE  1 = 1
       AND  A.isSubmit = 0
            ${date}
            ${_agencyId ? `AND  D.id = ${_agencyId}` : ``}
            ${_payWay !== `` ? `AND  A.payWay LIKE '%${_payWay}%'` : ``}
            ${
              _start
                ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') >= DATE_FORMAT('${_start}', '%Y-%m-%d') `
                : ``
            }
            ${
              _end
                ? `AND DATE_FORMAT(A.createdAt, '%Y-%m-%d') <= DATE_FORMAT('${_end}', '%Y-%m-%d') `
                : ``
            }
            ${
              _deliveryStatus === 0
                ? `AND A.isCompleted = 0
                   AND A.deliveryStatus = 0
                   AND A.deliveryCom IS NULL
                   AND A.deliveryNo IS NULL`
                : _deliveryStatus === 1
                ? `AND A.isCompleted = 1
                   AND A.deliveryStatus = 0
                   AND A.deliveryCom IS NULL
                   AND A.deliveryNo IS NULL`
                : _deliveryStatus === 2
                ? `AND A.deliveryStatus = 1`
                : _deliveryStatus === 3
                ? `AND A.deliveryStatus = 2`
                : _deliveryStatus === 4
                ? `AND A.deliveryStatus = 3`
                : _deliveryStatus === 5
                ? `AND A.deliveryStatus = 4`
                : _deliveryStatus === 6
                ? `AND A.deliveryStatus = 5`
                : _deliveryStatus === 7
                ? `AND A.deliveryStatus = 6`
                : _deliveryStatus === 8
                ? ``
                : ``
            }
     ORDER   BY A.createdAt DESC;
      `;
    const lists = await models.sequelize.query(selectQuery);

    return res.status(200).json(lists[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

router.post("/get/status", async (req, res, next) => {
  const { id } = req.body; // <-BoughtHistory의 id

  const selectQuery = `
  SELECT  deliveryCom,
          deliveryNo
    FROM  boughtHistorys
   WHERE  id = ${id}
  `;

  try {
    const boughtInfo = await models.sequelize.query(selectQuery);

    if (boughtInfo[0].length === 0) {
      return res.status(401).send("존재하지 않는 구매내역 정보입니다.");
    }

    const value = await axios({
      url: `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${process.env.SWEET_TRACKER_KEY}&t_code=08&t_invoice=${boughtInfo[0][0].deliveryNo}`,
      method: "get",
    });

    if (!value.data.level) {
      return res.status(401).send(`${value.data.msg}`);
    }

    const updateQuery = `
    UPDATE  boughtHistorys
       SET  deliveryStatus = ${value.data.level},
            updatedAt = now()
     WHERE  id = ${id}
    `;

    const updateResult = await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("배송상태를 불러올 수 없습니다.");
  }
});

router.post("/allDeliverySearch", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT  id,
          deliveryCom,
          deliveryNo
    FROM  boughtHistorys
   WHERE  isSubmit = 0
     AND	deliveryStatus NOT IN (0, 6)
     AND	deliveryNo IS NOT NULL
     AND	deliveryCom IS NOT NULL
  `;

  try {
    const queryResult = await models.sequelize.query(selectQuery);

    queryResult[0].forEach((item) => {
      const value = axios({
        url: `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${process.env.SWEET_TRACKER_KEY}&t_code=08&t_invoice=${item.deliveryNo}`,
        method: "get",
      });

      if (!value.data.level) {
        return res.status(401).send(`${value.data.msg}`);
      }

      const updateQuery = `
      UPDATE  boughtHistorys
         SET  deliveryStatus = ${value.data.level},
              updatedAt = now()
       WHERE  id = ${item.id}
      `;

      const updateResult = models.sequelize.query(updateQuery);
    });

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("배송조회를 할 수 없습니다.");
  }
});

router.post("/checkBank", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const validationQuery = `
  SELECT  *
    FROM  boughtHistorys
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  boughtHistorys
     SET  isCompleted = 1,
          completedAt = now()
   WHERE  id = ${id}
  `;

  try {
    const validate = await models.sequelize.query(validationQuery);

    if (validate[0].length === 0) {
      return res.status(401).send("존재하지 않는 결제내역 정보입니다.");
    }

    if (validate[0][0].isCompleted) {
      return res.status(401).send("이미 처리된 결제내역 입니다.");
    }

    const updateResult = await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("해당 결제내역을 처리할 수 없습니다.");
  }
});

router.patch("/bought/admin/update", isAdminCheck, async (req, res, next) => {
  const { id, deliveryCom, deliveryNo } = req.body;

  const findHistroyQuery = `
  SELECT  *
    FROM  boughtHistorys
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findHistroyQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 결제내역 입니다.");
    }

    const value = await axios({
      url: `https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=${process.env.SWEET_TRACKER_KEY}&t_code=08&t_invoice=${deliveryNo}`,
      method: "get",
    });

    if (!value.data.level) {
      return res.status(401).send(`${value.data.msg}`);
    }

    const updateQuery = `
    UPDATE  boughtHistorys
       SET  deliveryCom = "${deliveryCom}",
            deliveryNo = "${deliveryNo}",
            deliveryStatus = ${value.data.level},
            updatedAt = now()
     WHERE  id = ${id}
    `;

    const updateResult = await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제 정보를 수정할 수 없습니다.");
  }
});

module.exports = router;
