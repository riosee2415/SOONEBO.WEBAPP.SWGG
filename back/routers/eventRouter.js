const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { Event, EventResult } = require("../models");
const isNanCheck = require("../middlewares/isNanCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//////////////////////////// - EVENT - /////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

router.post("/user/list", async (req, res, next) => {
  const { page, orderType } = req.body;

  // orderType === 1 일 땐 진행중
  // orderType === 2 일 땐 진행완료
  // orderType === 3 일 땐 전체

  const LIMIT = 9;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 9;

  let _orderType = orderType ? parseInt(orderType) : 3;

  if (parseInt(_orderType) > 3) {
    _orderType = 3;
  }

  try {
    const lengthQuery = `
    SELECT *
      FROM (
            SELECT	A.id,
                    A.thumbnail,
                    A.file,
                    A.title,
                    A.content,
                    A.startDate,
                    A.endDate,
                    CONCAT(DATE_FORMAT(A.startDate, "%Y년 %m월 %d일"),' ~ ',DATE_FORMAT(A.endDate, "%Y년 %m월 %d일"))		AS viewDate,
                    A.isDelete,
                    DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		  AS viewCreatedAt,
                    DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS updatedAt,
                    (
                      SELECT 	CASE
                                  WHEN	 DATE_FORMAT(startDate, "%Y-%m-%d") > DATE_FORMAT(now(), "%Y-%m-%d") THEN 0
                                  WHEN   DATE_FORMAT(endDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d") THEN 1
                              ELSE	 2
                              END
                        FROM	events
                       WHERE	id = A.id
                    )		AS flag
              FROM	events		A
             WHERE  A.isDelete = 0
            )	Z
      WHERE	1 = 1
       ${
         _orderType === 1
           ? `AND Z.flag = 2`
           : _orderType === 2
           ? `AND Z.flag = 1`
           : _orderType === 3
           ? ``
           : ``
       }
      `;

    const selectQuery = `
    SELECT *
      FROM (
            SELECT	A.id,
                    A.thumbnail,
                    A.file,
                    A.title,
                    A.content,
                    A.startDate,
                    A.endDate,
                    CONCAT(DATE_FORMAT(A.startDate, "%Y년 %m월 %d일"),' ~ ',DATE_FORMAT(A.endDate, "%Y년 %m월 %d일"))		AS viewDate,
                    A.isDelete,
                    DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		  AS viewCreatedAt,
                    DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS updatedAt,
                    (
                      SELECT 	CASE
                                  WHEN	 DATE_FORMAT(startDate, "%Y-%m-%d") > DATE_FORMAT(now(), "%Y-%m-%d") THEN 0
                                  WHEN   DATE_FORMAT(endDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d") THEN 1
                              ELSE	 2
                              END
                        FROM	events
                       WHERE	id = A.id
                    )		AS flag
              FROM	events		A
             WHERE  A.isDelete = 0
            )	Z
      WHERE	1 = 1
       ${
         _orderType === 1
           ? `AND Z.flag = 2`
           : _orderType === 2
           ? `AND Z.flag = 1`
           : _orderType === 3
           ? ``
           : ``
       }
       ORDER   BY Z.startDate ASC
       LIMIT   ${LIMIT}
      OFFSET   ${OFFSET}
      `;

    const length = await models.sequelize.query(lengthQuery);
    const events = await models.sequelize.query(selectQuery);

    const eventLen = length[0].length;

    const lastPage =
      eventLen % LIMIT > 0 ? eventLen / LIMIT + 1 : eventLen / LIMIT;

    return res
      .status(200)
      .json({ events: events[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("진행중인 이벤트 목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", async (req, res, next) => {
  const { orderType } = req.body;

  let _orderType = orderType ? parseInt(orderType) : 4;

  if (parseInt(_orderType) > 4) {
    _orderType = 4;
  }

  // orderType === 1 일 땐 진행예정
  // orderType === 2 일 땐 진행완료
  // orderType === 3 일 땐 진행중
  // orderType === 4 일 땐 전체

  try {
    const selectQuery = `
    SELECT *
      FROM (
            SELECT	A.id,
                    A.thumbnail,
                    A.file,
                    A.title,
                    A.content,
                    A.startDate,
                    A.endDate,
                    CONCAT(DATE_FORMAT(A.startDate, "%Y년 %m월 %d일"),' ~ ',DATE_FORMAT(A.endDate, "%Y년 %m월 %d일"))		AS viewDate,
                    A.isDelete,
                    DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		  AS viewCreatedAt,
                    DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		  AS updatedAt,
                    (
                      SELECT 	CASE
                                  WHEN	 DATE_FORMAT(startDate, "%Y-%m-%d") > DATE_FORMAT(now(), "%Y-%m-%d") THEN 0
                                  WHEN   DATE_FORMAT(endDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d") THEN 1
                              ELSE	 2
                              END
                        FROM	events
                       WHERE	id = A.id
                    )		AS flag
              FROM	events		A
             WHERE  A.isDelete = 0
            )	Z
      WHERE	1 = 1
       ${
         _orderType === 1
           ? `AND Z.flag = 0`
           : _orderType === 2
           ? `AND Z.flag = 1`
           : _orderType === 3
           ? `AND Z.flag = 2`
           : _orderType === 4
           ? ``
           : ``
       }
      ORDER BY Z.startDate ASC
      `;

    const events = await models.sequelize.query(selectQuery);

    return res.status(200).json(events[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("진행중인 이벤트 목록을 불러올 수 없습니다.");
  }
});

router.get("/detail/:eventId", async (req, res, next) => {
  const { eventId } = req.params;

  // orderType === 0 일 땐 진행중
  // orderType === 1 일 땐 진행 완료

  try {
    const exEvent = await Event.findOne({
      where: { id: parseInt(eventId) },
    });

    if (!exEvent) {
      return res.status(401).send("존재하지 않는 이벤트 게시글 입니다.");
    }

    const selectQuery = `
    SELECT	A.id,
            A.thumbnail,
            A.file,
            A.title,
            A.content,
            A.startDate,
            A.endDate,
            CONCAT(DATE_FORMAT(A.startDate, "%Y년 %m월 %d일"),' ~ ',DATE_FORMAT(A.endDate, "%Y년 %m월 %d일"))		AS viewDate,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS createdAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            (
              SELECT 	CASE
                          WHEN   DATE_FORMAT(endDate, "%Y-%m-%d") < DATE_FORMAT(now(), "%Y-%m-%d") THEN 1
                          ELSE	 0
                      END
                FROM	events
               WHERE	id = A.id
            )		AS flag
      FROM	events       A
     WHERE	A.isDelete = FALSE
       AND  A.id = ${eventId}
    `;

    const data = await models.sequelize.query(selectQuery);

    return res.status(200).json({ event: data[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글 정보를 불러올 수 없습니다.");
  }
});

router.post(
  "/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { thumbnail, file, title, content, startDate, endDate } = req.body;
    try {
      if (new Date(startDate) > new Date(endDate)) {
        return res.status(401).send("형식에 맞지 않는 데이터 입니다.");
      }

      const createResult = await Event.create({
        thumbnail,
        file,
        title,
        content,
        startDate,
        endDate,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("이벤트 게시글을 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, thumbnail, file, title, content, startDate, endDate } =
      req.body;

    try {
      const exEvent = await Event.findOne({
        where: { id: parseInt(id), isDelete: false },
      });

      if (!exEvent) {
        return res.status(401).send("존재하지 않는 이벤트 게시글입니다.");
      }

      if (new Date(startDate) > new Date(endDate)) {
        return res.status(401).send("형식에 맞지 않는 데이터 입니다.");
      }

      const updateResult = await Event.update(
        {
          thumbnail,
          file,
          title,
          content,
          startDate,
          endDate,
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
      return res.status(401).send("이벤트 게시글을 수정할 수 없습니다.");
    }
  }
);

router.patch(
  "/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    if (isNanCheck(id)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exEvent = await Event.findOne({
        where: { id: parseInt(id) },
      });

      if (!exEvent) {
        return res.status(401).send("존재하지 않는 이벤트 게시글입니다.");
      }

      if (exEvent.isDelete) {
        return res
          .status(401)
          .send("이미 삭제된 게시글입니다. 확인 후 다시 시도하여 주십시오.");
      }

      const deleteResult = await Event.update(
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
      return res.status(401).send("이벤트 게시글을 삭제할 수 없습니다.");
    }
  }
);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/////////////////////////// - RESULT - /////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

router.post("/result/list", async (req, res, next) => {
  const { page, search, orderType } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  let orderName = `A.createdAt`;
  let orderSC = `DESC`;

  if (orderType) {
    orderName = `B.title`;
    orderSC = `ASC`;
  }

  try {
    const lengthQuery = `
          SELECT	A.id,
                  A.content,
                  A.isDelete,
                  DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS createdAt,
                  DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                  A.EventId,
                  B.thumbnail,
                  B.title
            FROM	eventResults		A
           INNER
            JOIN	events 				B
              ON	A.EventId = B.id
           WHERE	1 = 1
             AND  A.isDelete = FALSE
             ${_search !== `` ? `AND B.title LIKE '%${_search}%'` : ``}
    `;

    const selectQuery = `
          SELECT	A.id,
                  A.content,
                  A.isDelete,
                  DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS createdAt,
                  DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
                  A.EventId,
                  B.thumbnail,
                  B.title
            FROM	eventResults		A
           INNER
            JOIN	events 				B
              ON	A.EventId = B.id
           WHERE	1 = 1
             AND  A.isDelete = FALSE
             ${_search !== `` ? `AND B.title LIKE '%${_search}%'` : ``}
           ORDER  BY ${orderName} ${orderSC}
           LIMIT  ${LIMIT}
          OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const results = await models.sequelize.query(selectQuery);

    const resultLen = length[0].length;

    const lastPage =
      resultLen % LIMIT > 0 ? resultLen / LIMIT + 1 : resultLen / LIMIT;

    return res
      .status(200)
      .json({ results: results[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("당첨 결과 목록을 불러올 수 없습니다.");
  }
});

router.get("/result/detail/:resultId", async (req, res, next) => {
  const { resultId } = req.params;

  if (isNanCheck(resultId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const selectQuery = `
    SELECT	A.id,
            A.content,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS createdAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt,
            A.EventId,
            B.thumbnail,
            B.title
      FROM	eventResults		A
     INNER
      JOIN	events 				B
        ON	A.EventId = B.id
     WHERE	1 = 1
       AND  A.isDelete = FALSE
       AND  A.id = ${resultId}
`;

    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json({ result: result[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("당첨 결과 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/result/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { eventId, content } = req.body;

    try {
      const exEvent = await Event.findOne({
        where: { id: parseInt(eventId) },
      });

      if (!exEvent) {
        return res.status(401).send("존재하지 않는 이벤트 입니다.");
      }

      if (exEvent.isDelete) {
        return res
          .status(401)
          .send("삭제된 이벤트입니다. 확인 후 다시 시도하여 주십시오.");
      }

      const createResult = await EventResult.create({
        EventId: parseInt(eventId),
        content,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("당첨 결과 게시글을 작성할 수 없습니다.");
    }
  }
);

router.patch(
  "/result/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    if (isNanCheck(id)) {
      return res.status(401).send("잘못된 요청입니다.");
    }

    try {
      const exEventResult = await EventResult.findOne({
        where: { id: parseInt(id) },
      });

      if (!exEventResult) {
        return res.status(401).send("존재하지 않는 당첨 결과 게시글입니다.");
      }

      if (exEventResult.isDelete) {
        return res
          .status(401)
          .send("이미 삭제된 게시글입니다. 확인 후 다시 시도하여 주십시오.");
      }

      const deleteResult = await EventResult.update(
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
      return res.status(401).send("당첨 결과 게시글을 삭제할 수 없습니다.");
    }
  }
);

module.exports = router;
