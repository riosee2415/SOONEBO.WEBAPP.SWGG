const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Qna } = require("../models");
const models = require("../models");

const router = express.Router();

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { listType } = req.body;

  let nanFlag = isNaN(listType);

  if (!listType) {
    nanFlag = false;
  }

  if (nanFlag) {
    return res.status(400).send("잘못된 요청 입니다.");
  }

  let _listType = Number(listType);

  if (_listType > 3 || !listType) {
    _listType = 3;
  }

  try {
    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
            C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  1 = 1
      ${
        _listType === 1
          ? `AND A.isCompleted = FALSE`
          : _listType === 2
          ? `AND A.isCompleted = TRUE`
          : _listType === 3
          ? ``
          : ``
      }
     ORDER  BY A.createdAt DESC
`;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json({ list: list[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다.");
  }
});

router.post("/product/list", async (req, res, next) => {
  const { ProductId, page, orderType } = req.body;

  if (isNanCheck(ProductId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  let _orderType = parseInt(orderType) || 1;

  let orderName = `A.createdAt`;
  let orderSC = `DESC`;

  if (_orderType !== 1) {
    orderName = `A.title`;
    orderSC = `ASC`;
  }

  if (_orderType === 1) {
    orderName = `A.createdAt`;
    orderSC = `DESC`;
  }

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const lengthQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
            C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  A.ProductId = ${ProductId}
    `;

    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,                   
            C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  A.ProductId = ${ProductId}
     ORDER  BY ${orderName} ${orderSC}
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const qnas = await models.sequelize.query(selectQuery);

    const qnaLen = length[0].length;

    const lastPage = qnaLen % LIMIT > 0 ? qnaLen / LIMIT + 1 : qnaLen / LIMIT;

    return res.status(200).json({
      qnas: qnas[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다.");
  }
});

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
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
             C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  A.UserId = ${req.user.id}
    `;

    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
             C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  A.UserId = ${req.user.id}
     ORDER  BY A.createdAt DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const qnas = await models.sequelize.query(selectQuery);

    const qnaLen = length[0].length;

    const lastPage = qnaLen % LIMIT > 0 ? qnaLen / LIMIT + 1 : qnaLen / LIMIT;

    return res.status(200).json({
      qnas: qnas[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다.");
  }
});

router.post("/list", async (req, res, next) => {
  const { page, search, orderType } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  let _orderType = parseInt(orderType) || 1;

  let orderName = `A.createdAt`;
  let orderSC = `DESC`;

  if (_orderType !== 1) {
    orderName = `A.title`;
    orderSC = `ASC`;
  }

  if (_orderType === 1) {
    orderName = `A.createdAt`;
    orderSC = `DESC`;
  }

  try {
    const lengthQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
             C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  1 = 1
       ${_search !== `` ? `AND A.title LIKE '%${_search}%'` : ``}
    `;

    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.content,
            A.isCompleted,
            A.answer,
            DATE_FORMAT(A.answerdAt, "%Y년 %m월 %d일")		AS answerdAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.UserId,
            A.ProductId,
            B.username,
            B.mobile,
            C.thumbnail,
             C.title                                     AS productTitle,
            C.price
      FROM	qnas			A
     INNER
      JOIN	users 				B
        ON	A.UserId = B.id
     INNER
      JOIN	products 			C
        ON	A.ProductId = C.id
     WHERE  1 = 1
       ${_search !== `` ? `AND A.title LIKE '%${_search}%'` : ``}
     ORDER  BY ${orderName} ${orderSC}
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const qnas = await models.sequelize.query(selectQuery);

    const qnaLen = length[0].length;

    const lastPage = qnaLen % LIMIT > 0 ? qnaLen / LIMIT + 1 : qnaLen / LIMIT;

    return res.status(200).json({
      qnas: qnas[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, content, ProductId } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const createResult = await Qna.create({
      title,
      content,
      ProductId: parseInt(ProductId),
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 생성할 수 없습니다. ");
  }
});

router.patch(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, answer } = req.body;

    try {
      const exQna = await Qna.findOne({
        where: { id: parseInt(id) },
      });

      if (!exQna) {
        return res.status(401).send("존재하지 않는 문의 입니다.");
      }

      const updateResult = await Qna.update(
        {
          answer,
          answerdAt: new Date(),
          isCompleted: true,
        },
        {
          where: { id: parseInt(id) },
        }
      );

      if (updateResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send("문의를 처리할 수 없습니다.");
    }
  }
);

module.exports = router;
