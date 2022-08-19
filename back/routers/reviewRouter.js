const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const {
  Review,
  Product,
  BoughtItem,
  BoughtHistory,
  WishItem,
} = require("../models");
const models = require("../models");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");

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

const router = express.Router();

router.post("/list", isLoggedIn, async (req, res, next) => {
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
            A.rate,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")						AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 					  AS	updatedAt,
            A.UserId,
            A.ProductId,
            B.thumbnail,
            B.title                                                      AS productTitle,
            B.price
      FROM	reviews			A
     INNER
      JOIN	products 		B
        ON	A.ProductId = B.id
     WHERE  A.UserId = ${req.user.id}
       AND  A.isDelete = FALSE
    `;

    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.rate,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")						AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 					  AS	updatedAt,
            A.UserId,
            A.ProductId,
            B.thumbnail,
            B.title                                                      AS productTitle,
            B.price
      FROM	reviews			A
     INNER
      JOIN	products 		B
        ON	A.ProductId = B.id
     WHERE  A.UserId = ${req.user.id}
       AND  A.isDelete = FALSE
     ORDER  BY A.createdAt DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const review = await models.sequelize.query(selectQuery);

    const reviewLen = length[0].length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    return res.status(200).json({
      list: review[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.post("/product/list", async (req, res, next) => {
  const { productId, page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  try {
    const lengthQuery = `
    SELECT	A.id,
            A.title,
            A.rate,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")						AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 					  AS	updatedAt,
            A.UserId,
            A.ProductId,
            B.thumbnail,
            B.title                                                      AS productTitle,
            B.price,
            C.userId,
            C.username
      FROM	reviews			A
     INNER
      JOIN	products 		B
        ON	A.ProductId = B.id
     INNER
      JOIN  users       C
        ON  A.UserId = C.id
     WHERE  A.ProductId = ${productId}
       AND  A.isDelete = FALSE
    `;

    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.rate,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")						AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 					  AS	updatedAt,
            A.UserId,
            A.ProductId,
            B.thumbnail,
            B.title                                                      AS productTitle,
            B.price,
            C.userId,
            C.username
      FROM	reviews			A
     INNER
      JOIN	products 		B
        ON	A.ProductId = B.id
     INNER
      JOIN  users       C
        ON  A.UserId = C.id
     WHERE  A.ProductId = ${productId}
       AND  A.isDelete = FALSE
     ORDER  BY A.createdAt DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const review = await models.sequelize.query(selectQuery);

    const reviewLen = length[0].length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    return res.status(200).json({
      list: review[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.post("/allList", async (req, res, next) => {
  const { page, sortName, searchDate, searchTitle } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _searchDate = searchDate ? searchDate : ``;
  const _searchTitle = searchTitle ? searchTitle : ``;

  let orderName = `A.createdAt`;
  let orderSC = `DESC`;

  if (sortName === "isRateUp") {
    orderName = "A.rate";
    orderSC = "DESC";
  }

  if (sortName === "isNew") {
    orderName = "A.createdAt";
    orderSC = "DESC";
  }

  try {
    const lengthQuery = `
    SELECT	A.id,
            A.rate,
            A.title,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            A.isComplete,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
            A.UserId,
            A.ProductId,
            B.title 										AS productTitle,
            C.username                  
      FROM	reviews			A
     INNER
      JOIN	products		B
        ON	A.ProductId = B.id
     INNER
      JOIN	users		    C
        ON	A.UserId = C.id
     WHERE	DATE_FORMAT(A.createdAt, "%Y-%m-%d") LIKE '%${_searchDate}%'
       AND  A.isDelete = 0
       AND  A.title LIKE '%${_searchTitle}%'
     `;

    const selectQuery = `
    SELECT	A.id,
            A.rate,
            A.title,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            A.isComplete,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
            A.UserId,
            A.ProductId,
            B.title 										AS productTitle,
            C.username                  
      FROM	reviews			A
     INNER
      JOIN	products		B
        ON	A.ProductId = B.id
     INNER
      JOIN	users		C
        ON	A.UserId = C.id
     WHERE	DATE_FORMAT(A.createdAt, "%Y-%m-%d") LIKE '%${_searchDate}%'
       AND  A.title LIKE '%${_searchTitle}%'
       AND  A.isDelete = 0
     ORDER  BY ${orderName} ${orderSC}
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

    const length = await models.sequelize.query(lengthQuery);
    const review = await models.sequelize.query(selectQuery);

    const reviewLen = length[0].length;

    const lastPage =
      reviewLen % LIMIT > 0 ? reviewLen / LIMIT + 1 : reviewLen / LIMIT;

    return res.status(200).json({
      list: review[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.post("/slide/list", async (req, res, next) => {
  const selectQuery = `
    SELECT	A.id,
            A.rate,
            A.title,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            A.isComplete,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
            A.UserId,
            A.ProductId,
            B.title 										AS productTitle,
            C.username                  
      FROM	reviews			A
     INNER
      JOIN	products		B
        ON	A.ProductId = B.id
     INNER
      JOIN	users		C
        ON	A.UserId = C.id
     WHERE	A.isDelete = 0
     LIMIT  12
    `;

  try {
    const slide = await models.sequelize.query(selectQuery);

    return res.status(200).json(slide[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("리뷰 슬라이드 목록을 불러올 수 없습니다.");
  }
});

router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { isComplete } = req.body;

  let _isComplete = isComplete || false;

  try {
    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.rate,
            A.content,
            A.imagePath1,
            A.imagePath2,
            A.imagePath3,
            A.imagePath4,
            A.isDelete,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")						AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 					  AS	updatedAt,
            A.UserId,
            A.ProductId,
            B.thumbnail,
            B.title                                                      AS productTitle,
            B.price,
            C.userId,
            C.username
      FROM	reviews			A
     INNER
      JOIN	products 		B
        ON	A.ProductId = B.id
     INNER
      JOIN  users       C
        ON  A.UserId = C.id
     WHERE  1 = 1
       ${_isComplete ? `AND A.isComplete = ${_iscomplete}` : ``} 
       AND  A.isDelete = FALSE
     ORDER  BY A.createdAt DESC
    `;

    const review = await models.sequelize.query(selectQuery);

    return res.status(200).json({ list: review[0] });
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기 목록을 불러올 수 없습니다.");
  }
});

router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    productId,
    rate,
    title,
    content,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath4,
  } = req.body;
  try {
    const exProd = await Product.findOne({
      where: { id: parseInt(productId) },
    });

    if (!exProd) {
      return res.status(401).send("존재하지 않는 상품입니다.");
    }

    const boughtProds = await BoughtHistory.findAll({
      where: { UserId: parseInt(req.user.id) },
    });

    let boughts = [];

    await Promise.all(
      boughtProds.map(async (data) => {
        boughts = await WishItem.findAll({
          where: { BoughtHitstoryId: parseInt(data.id) },
        });
      })
    );

    const filt = boughts.filter((data) => {
      return data.ProductId === exProd.id;
    });

    if (filt.length < 1) {
      return res
        .status(401)
        .send("구매하지 않은 상품은 후기를 작성할 수 없습니다.");
    } else {
      const createResult = await Review.create({
        title,
        imagePath1: imagePath1 ? imagePath1 : null,
        imagePath2: imagePath2 ? imagePath2 : null,
        imagePath3: imagePath3 ? imagePath3 : null,
        imagePath4: imagePath4 ? imagePath4 : null,
        content,
        rate,
        ProductId: parseInt(productId),
        UserId: parseInt(req.user.id),
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기를 작성할 수 없습니다.");
  }
});

router.patch("/update", isLoggedIn, async (req, res, next) => {
  const {
    id,
    rate,
    title,
    content,
    imagePath1,
    imagePath2,
    imagePath3,
    imagePath4,
  } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exReview = await Review.findOne({
      where: { id: parseInt(id) },
    });

    if (!exReview) {
      return res.status(401).send("존재하지 않는 후기입니다.");
    }

    if (req.user.id !== exReview.UserId) {
      return res
        .status(403)
        .send("자신이 작성하지 않은 후기는 수정할 수 없습니다.");
    }

    const updateResult = await Review.update(
      {
        rate,
        title,
        content,
        imagePath1,
        imagePath2,
        imagePath3,
        imagePath4,
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
    return res.status(401).send("후기를 수정할 수 없습니다.");
  }
});

router.patch(
  "/answer",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, answer } = req.body;

    try {
      const exReview = await Review.findOne({
        where: { id: parseInt(id) },
      });

      if (!exReview) {
        return res.status(401).send("존재하지 않는 후기입니다.");
      }

      const updateResult = await Review.update(
        {
          answer,
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
      return res.status(401).send("후기에 답변할 수 없습니다.");
    }
  }
);

router.patch("/delete", isLoggedIn, async (req, res, next) => {
  const { reviewId } = req.body;

  if (isNanCheck(reviewId)) {
    return res.status(403).send("잘못된 요청입니다.");
  }

  try {
    const exReview = await Review.findOne({
      where: { id: parseInt(reviewId) },
    });

    if (!exReview) {
      return res.status(401).send("존재하지 않는 후기입니다.");
    }

    if (req.user.id !== exReview.UserId) {
      return res
        .status(403)
        .send("자신이 작성하지 않은 후기는 삭제할 수 없습니다.");
    }

    const deleteResult = await Review.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(reviewId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("후기를 삭제할 수 없습니다.");
  }
});

module.exports = router;
