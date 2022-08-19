const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const isNanCheck = require("../middlewares/isNanCheck");
const { FaqType, Faq, sequelize } = require("../models");
const models = require("../models");

const router = express.Router();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////// - FAQ TYPE- /////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.post("/type/faqGet", isAdminCheck, async (req, res, next) => {
  const { faqTypeId } = req.body;

  const selectQ = `
    SELECT  id,
            question,
            answer,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")      AS updatedAt
      FROM  faqs
     WHERE  faqTypeId = ${faqTypeId}
       AND  isDelete = 0
     ORDER  BY  createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("등록된 데이터를 조회할 수 없습니다.");
  }
});

router.post("/type/list", async (req, res, next) => {
  const { searchTab } = req.body;

  let order = "";

  if (parseInt(searchTab) === 1) {
    order = "ORDER  BY createdAt DESC";
  } else {
    order = "ORDER  BY value ASC";
  }

  try {
    const selectQuery = `
        SELECT  ROW_NUMBER () OVER(ORDER BY createdAt)	AS num,
                id,
                value,
                DATE_FORMAT(createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
                DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")      AS updatedAt
          FROM  faqTypes
         WHERE  isDelete = 0
         ${order}
      `;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json({ list: list[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 유형 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/type/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { value } = req.body;

    try {
      const exType = await FaqType.findOne({
        where: { value, isDelete: false },
      });

      if (exType) {
        return res.status(401).send("동일한 이름의 FAQ유형이 존재합니다.");
      }

      const createResult = await FaqType.create({
        value,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ 유형을 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/type/update",
  isAdminCheck,
  isBaseCompanyCheck,
  async (req, res, next) => {
    const { id, value } = req.body;

    try {
      const exType = await FaqType.findOne({
        where: { id: parseInt(id), isDelete: false },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 FAQ유형입니다.");
      }

      const updateResult = await FaqType.update(
        {
          value,
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
      return res.status(401).send("FAQ유형을 수정할 수 없습니다.");
    }
  }
);

router.patch(
  "/type/delete",
  isAdminCheck,
  isBaseCompanyCheck,
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const exType = await FaqType.findOne({
        where: { id: parseInt(id) },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 FAQ유형입니다.");
      }

      if (exType.isDelete) {
        return res
          .status(401)
          .send("이미 삭제된 FAQ유형입니다. 확인 후 다시 시도하여 주십시오.");
      }

      const deleteResult = await FaqType.update(
        {
          isDelete: true,
        },
        {
          where: { id: parseInt(id) },
        }
      );

      if (deleteResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ유형을 삭제할 수 없습니다.");
    }
  }
);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////////// - FAQ - ///////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.post("/list", async (req, res, next) => {
  const { page, search, orderType, typeId } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  let _orderType = parseInt(orderType) || 1;

  let orderName = `A.createdAt`;
  let orderSC = `DESC`;

  if (_orderType !== 1) {
    orderName = `A.question`;
    orderSC = `ASC`;
  }

  if (_orderType === 1) {
    orderName = `A.createdAt`;
    orderSC = `DESC`;
  }

  try {
    if (typeId) {
      const exType = await FaqType.findOne({
        where: { id: parseInt(typeId), isDelete: false },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 유형입니다.");
      }
    }

    const lengthQuery = `
      SELECT	  ROW_NUMBER () OVER(ORDER BY A.createdAt)	AS num,
                A.id,
                A.question,
                A.answer,
                A.isDelete,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                A.FaqTypeId,
                B.value										AS typeValue
        FROM	faqs				A
       INNER
        JOIN	faqTypes 			B
          ON	A.FaqTypeId = B.id
       WHERE	A.isDelete = FALSE
         AND	B.isDelete = FALSE
         ${_search !== `` ? `AND A.question LIKE '%${_search}%'` : ``}
         ${typeId ? `AND A.FaqTypeId = ${typeId}` : ``}
      `;

    const selectQuery = `
      SELECT	  ROW_NUMBER () OVER(ORDER BY A.createdAt)	AS num,
                A.id,
                A.question,
                A.answer,
                A.isDelete,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                A.FaqTypeId,
                B.value										AS typeValue
        FROM	faqs				A
       INNER
        JOIN	faqTypes 			B
          ON	A.FaqTypeId = B.id
       WHERE	A.isDelete = FALSE
         AND	B.isDelete = FALSE
         ${_search !== `` ? `AND A.question LIKE '%${_search}%'` : ``}
         ${typeId ? `AND A.FaqTypeId = ${typeId}` : ``}
       ORDER    BY  ${orderName} ${orderSC}
       LIMIT    ${LIMIT}
      OFFSET    ${OFFSET}
      `;

    const length = await models.sequelize.query(lengthQuery);
    const faqs = await models.sequelize.query(selectQuery);

    const faqLen = length[0].length;

    const lastPage = faqLen % LIMIT > 0 ? faqLen / LIMIT + 1 : faqLen / LIMIT;

    return res
      .status(200)
      .json({ faqs: faqs[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/graph", isAdminCheck, async (req, res, next) => {
  const selectQ = `
      SELECT	B.value,
              COUNT(A.id)			AS	cnt
        FROM	faqs		A
      INNER 
        JOIN	faqTypes 	B
          ON	A.FaqTypeId = B.id
      WHERE	A.isDelete = 0
        AND  B.isDelete = 0
      GROUP	BY	A.FaqTypeId
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).send("그레프 정보를 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { typeId } = req.body;

  let addQuery = "";

  if (parseInt(typeId) !== 0) {
    addQuery += `AND  A.FaqTypeId = ${typeId}`;
  }

  let selectQ = `
  SELECT	A.id,
          ROW_NUMBER() OVER(ORDER BY A.createdAt)	AS	num,
          A.question,
          A.answer,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          B.value,
          A.FaqTypeId
    FROM	faqs		A
    INNER
    JOIN	faqTypes 	B
      ON	A.FaqTypeId = B.id
   WHERE	A.isDelete = 0
     AND  B.isDelete = 0
    ${addQuery}
   ORDER  BY  A.createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

router.post(
  "/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { question, answer, typeId } = req.body;

    if (isNanCheck(typeId)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exType = await FaqType.findOne({
        where: { id: parseInt(typeId), isDelete: false },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 유형입니다.");
      }

      const createResult = await Faq.create({
        question,
        answer,
        FaqTypeId: parseInt(typeId),
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ를 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, question, answer, typeId } = req.body;

    const updateQ = `
    UPDATE  faqs
       SET  question = "${question}",
            answer = "${answer}",
            FaqTypeId = ${typeId},
            updatedAt = now()
     WHERE  id = ${id}
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ를 수정할 수 없습니다.");
    }
  }
);

router.patch(
  "/delete",
  isAdminCheck,
  isBaseCompanyCheck,
  async (req, res, next) => {
    const { id } = req.body;

    try {
      const exFaq = await Faq.findOne({
        where: { id: parseInt(id), isDelete: false },
      });

      if (!exFaq) {
        return res.status(401).send("존재하지 않는 FAQ게시글 입니다.");
      }

      const updateResult = await Faq.update(
        {
          isDelete: true,
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
      return res.status(401).send("FAQ를 수정할 수 없습니다.");
    }
  }
);

module.exports = router;
