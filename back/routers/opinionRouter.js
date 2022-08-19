const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const { Opinion, OpinionType } = require("../models");
const models = require("../models");

const router = express.Router();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////// - OPINION TYPE- //////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.get("/type/list", async (req, res, next) => {
  try {
    const selectQuery = `
       SELECT	  id,
                value,
                isDelete,
                DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS createdAt,
                DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 		AS updatedAt
        FROM	  opinionTypes
       WHERE    isDelete = FALSE
       ORDER    BY value ASC
      `;

    const types = await models.sequelize.query(selectQuery);

    return res.status(200).json({ type: types[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("의견 유형 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/type/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { value } = req.body;

    try {
      const exType = await OpinionType.findOne({
        where: { value, isDelete: false },
      });

      if (exType) {
        return res.status(401).send("동일한 이름의 유형이 존재합니다.");
      }

      const createResult = await OpinionType.create({
        value,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send(" 유형을 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/type/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, value } = req.body;

    if (isNanCheck(id)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exType = await OpinionType.findOne({
        where: { id: parseInt(id), isDelete: false },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 유형입니다.");
      }

      const updateResult = await OpinionType.update(
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
      return res.status(401).send("유형을 수정할 수 없습니다.");
    }
  }
);

router.patch(
  "/type/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    if (isNanCheck(id)) {
      return res.status(401).send("잘못된 요청입니다.");
    }
    try {
      const exType = await OpinionType.findOne({
        where: { id: parseInt(id) },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 유형입니다.");
      }

      if (exType.isDelete) {
        return res
          .status(401)
          .send("이미 삭제된 유형입니다. 확인 후 다시 시도하여 주십시오.");
      }

      const deleteResult = await OpinionType.update(
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
      return res.status(401).send("유형을 삭제할 수 없습니다.");
    }
  }
);

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/////////////////////// - OPINION- /////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { listType, typeId, searchName } = req.body;

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

  const _searchName = searchName ? searchName : ``;

  try {
    if (typeId) {
      const exType = await OpinionType.findOne({
        where: { id: parseInt(typeId), isDelete: false },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 유형입니다.");
      }
    }

    const selectQuery = `
      SELECT	A.id,
                A.email,
                A.title,
                A.content,
                A.terms,
                A.isComplete,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                A.UserId,
                A.OpinionTypeId,
                B.username,
                B.mobile,
                C.value										AS typeValue
        FROM	opinions								A
       INNER
        JOIN	users									B
          ON    A.UserId = B.id
       INNER
        JOIN	opinionTypes							C
          ON    A.OpinionTypeId = C.id
       WHERE    1 = 1
         ${
           _listType === 1
             ? `AND A.isComplete = FALSE`
             : _listType === 2
             ? `AND A.isComplete = TRUE`
             : _listType === 3
             ? ``
             : ``
         }
         ${_searchName !== `` ? `AND B.username LIKE '%${_searchName}%'` : ``}
         ${typeId ? `AND A.OpinionTypeId = ${typeId}` : ``}
       ORDER    BY A.createdAt DESC
      `;

    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json({ list: list[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("의견 목록을 불러올 수 없습니다.");
  }
});

router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  try {
    const lengthQuery = `
      SELECT	  A.id,
                A.email,
                A.title,
                A.content,
                A.terms,
                A.isComplete,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                A.UserId,
                A.OpinionTypeId,
                B.username,
                B.mobile,
                C.value										AS typeValue
        FROM	  opinions								  A
       INNER
        JOIN	  users									    B
          ON    A.UserId = B.id
       INNER
        JOIN	  opinionTypes							C
          ON    A.OpinionTypeId = C.id
       WHERE    A.UserId = ${req.user.id}
       ORDER    BY A.createdAt DESC
      `;

    const selectQuery = `
      SELECT	  A.id,
                A.email,
                A.title,
                A.content,
                A.terms,
                A.isComplete,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                A.UserId,
                A.OpinionTypeId,
                B.username,
                B.mobile,
                C.value										AS typeValue
        FROM	  opinions								  A
       INNER
        JOIN	  users									    B
          ON    A.UserId = B.id
       INNER
        JOIN	  opinionTypes							C
          ON    A.OpinionTypeId = C.id
       WHERE    A.UserId = ${req.user.id}
       ORDER    BY A.createdAt DESC
       LIMIT    ${LIMIT}
      OFFSET    ${OFFSET}
      `;

    const length = await models.sequelize.query(lengthQuery);
    const lists = await models.sequelize.query(selectQuery);

    const listLen = length[0].length;

    const lastPage =
      listLen % LIMIT > 0 ? listLen / LIMIT + 1 : listLen / LIMIT;

    return res.status(200).json({
      lists: lists[0],
      lastPage: parseInt(lastPage),
      listLen: parseInt(listLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("의견 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { email, title, content, terms, typeId } = req.body;
  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  if (!terms) {
    return res.status(401).send("필수 동의 선택 후 작성이 가능합니다.");
  }

  try {
    const exType = await OpinionType.findOne({
      where: { id: parseInt(typeId), isDelete: false },
    });

    if (!exType) {
      return res.status(401).send("존재하지 않는 유형입니다.");
    }

    const createResult = await Opinion.create({
      email,
      title,
      content,
      terms,
      OpinionTypeId: parseInt(typeId),
      UserId: parseInt(req.user.id),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("의견을 작성할 수 없습니다.");
  }
});

router.patch(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    if (isNanCheck(id)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exType = await Opinion.findOne({
        where: { id: parseInt(id) },
      });

      if (!exType) {
        return res.status(401).send("존재하지 않는 의견 정보입니다.");
      }

      const updateResult = await Opinion.update(
        {
          isComplete: true,
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
      return res.status(401).send("의견을 확인 처리할 수 없습니다.");
    }
  }
);

module.exports = router;
