const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
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

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////PRODUCT TYPE////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post("/type/list", async (req, res, next) => {
  const selectQ = `
  SELECT  id,
          value,
          sort,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt
    FROM  productTypes
   WHERE  isDelete = 0
   ORDER  BY sort ASC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품 유형 데이터를 조회할 수 없습니다.");
  }
});

router.post(
  "/type/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { value, sort } = req.body;

    const insertQ = `
  INSERT INTO productTypes
  (
    value, sort, createdAt, updatedAt
  )
  VALUES
  (
    "${value}", ${sort}, now(), now()
  )
  `;

    try {
      await models.sequelize.query(insertQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 유형 데이터를 추가할 수 없습니다.");
    }
  }
);

router.post(
  "/type/sort/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, nextSort } = req.body;

    const updateQ = `
  UPDATE  productTypes
     SET  sort = ${nextSort},
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 유형 순서를 변경할 수 없습니다.");
    }
  }
);

router.post(
  "/type/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, value } = req.body;

    const updateQ = `
  UPDATE  productTypes
     SET  value = "${value}",
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 유형 데이터를 수정할 수 없습니다.");
    }
  }
);

router.post(
  "/type/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    const deleteQ = `
  UPDATE  productTypes
     SET  isDelete = 1,
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(deleteQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 유형 데이터를 삭제할 수 없습니다.");
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////PRODUCT BOTTOM//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post("/bottom/list", async (req, res, next) => {
  const selectQ = `
  SELECT  id,
          title,
          imagePath,
          mobileImagePath,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt
    FROM  productBottoms
   ORDER  BY createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품 하단 데이터를 조회할 수 없습니다.");
  }
});

router.post(
  "/bottom/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { title, imagePath, mobileImagePath } = req.body;

    const insertQ = `
  INSERT INTO productBottoms
  (
    title, imagePath, mobileImagePath, createdAt, updatedAt
  )
  VALUES
  (
    "${title}", "${imagePath}","${mobileImagePath}", now(), now()
  )
  `;

    try {
      await models.sequelize.query(insertQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 하단 데이터를 추가할 수 없습니다.");
    }
  }
);

router.post(
  "/bottom/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, title, imagePath, mobileImagePath } = req.body;

    const updateQ = `
  UPDATE  productBottoms
     SET  title = "${title}",
          imagePath = "${imagePath}",
          mobileImagePath = "${mobileImagePath}",
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 하단 데이터를 수정할 수 없습니다.");
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////PRODUCT OPTION///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post("/option/list", async (req, res, next) => {
  const selectQ = `
  SELECT  id,
          value,
          price,
          FORMAT(price, 0)				                AS formatPrice,
          CONCAT(FORMAT(price, 0), "원")					 AS viewPrice,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt
    FROM  options
   WHERE  isDelete = 0
   ORDER  BY value ASC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품 옵션 데이터를 조회할 수 없습니다.");
  }
});

// 옵션아이디로 상품 조회
router.post("/option/prodList", async (req, res, next) => {
  const { optionId } = req.body;

  const selectQ = `
  SELECT	B.id,
          B.title,
          B.thumbnail,
          B.hoverImage,
          B.videoPath,
          CONCAT(FORMAT(B.price, 0), "원")					          	    AS viewPrice,
          B.discount,
          FORMAT((B.price * (B.discount / 100)), 0)					       AS calDiscount,
          CONCAT(FORMAT((B.price * (B.discount / 100)), 0), "원")		AS viewDiscount,
          CASE
          WHEN	B.discount IS NULL THEN	CONCAT(FORMAT(B.price, 0), "원")
          ELSE	CONCAT(FORMAT(B.price - (B.price * (B.discount / 100)), 0), "원")
          END														                          	AS realPrice,
          B.content,
          B.deliveryPrice,
          CONCAT(FORMAT(B.deliveryPrice, 0), "원")						      AS	viewDeliveryPrice,
          B.descImage1,
          B.descImage2,
          B.descImage3,
          B.descImage4,
          B.mobileDescImage1,
          B.mobileDescImage2,
          B.mobileDescImage3,
          B.mobileDescImage4,
          B.descAnimation1,
          B.descAnimation2,
          B.descAnimation3,
          B.descAnimation4,
          B.isBest,
          B.isMD,
          B.isNew,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")                      AS viewCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")                      AS viewUpdatedAt,
          B.ProductTypeId,
          B.ProductBottomId,
          B.isSet,
          C.value 													                       AS typeValue,
          D.title														                       AS bottomTitle,
          D.imagePath													                     AS bottomImagePath,
          D.mobileImagePath											                   AS bottomMobileImg 
    FROM	productOptions		A
   INNER
    JOIN	products 			    B
      ON	A.ProductId = B.id
   INNER
    JOIN	productTypes 		  C
      ON	B.ProductTypeId = C.id
    LEFT
   OUTER
    JOIN	productBottoms		D
      ON	B.ProductBottomId = D.id
   WHERE	B.isDelete = 0
     AND	A.OptionId = ${optionId};
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("옵션의 상품 데이터를 조회할 수 없습니다.");
  }
});

router.post(
  "/option/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { value, price } = req.body;

    const insertQ = `
  INSERT INTO options
  (
    value, price, createdAt, updatedAt
  )
  VALUES
  (
    "${value}", ${price}, now(), now()
  )
  `;

    try {
      await models.sequelize.query(insertQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 옵션 데이터를 추가할 수 없습니다.");
    }
  }
);

router.post(
  "/option/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, value, price } = req.body;

    const updateQ = `
  UPDATE  options
     SET  value = "${value}",
          price = ${price},
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 옵션 데이터를 수정할 수 없습니다.");
    }
  }
);

router.post(
  "/option/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    const deleteQ = `
  UPDATE  options
     SET  isDelete = 1,
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(deleteQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품 옵션 데이터를 삭제할 수 없습니다.");
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////PRODUCT///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
router.post("/list", async (req, res, next) => {
  const { searchTitle, orderType, pType } = req.body;
  // orderType  1일 때 : 최신 등록순 (default Value)
  //            2일 때 : 이름 순
  //            3일 때 : 금액 높은 순

  const _searchTitle = searchTitle ? searchTitle : "";
  const _orderType = orderType ? orderType : 1;
  const _pType = pType ? pType : false;

  let selectQ = `
  SELECT	A.id,
          A.title,
          A.thumbnail,
          A.hoverImage,
          A.videoPath,
          A.price,
          CONCAT(FORMAT(A.price, 0), "원")					          AS viewPrice,
          A.discount,
          FORMAT((A.price * (A.discount / 100)), 0)					AS calDiscount,
          CONCAT(FORMAT((A.price * (A.discount / 100)), 0), "원")		AS viewDiscount,
          CASE
            WHEN	A.discount IS NULL THEN	CONCAT(FORMAT(A.price, 0), "원")
            ELSE	CONCAT(FORMAT(A.price - (A.price * (A.discount / 100)), 0), "원")
          END									AS realPrice,
          A.content,
          A.deliveryPrice,
          CONCAT(FORMAT(A.deliveryPrice, 0), "원")						AS	viewDeliveryPrice,
          A.descImage1, 
          A.descImage2,
          A.descImage3,
          A.descImage4,
          A.mobileDescImage1,
          A.mobileDescImage2,
          A.mobileDescImage3,
          A.mobileDescImage4,
          A.descAnimation1,
          A.descAnimation2,
          A.descAnimation3,
          A.descAnimation4,
          A.isBest,
          A.isMD,
          A.isNew,
          A.isSet,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		    AS viewUpdatedAt,
          A.ProductTypeId,
          B.value,
          A.ProductBottomId,
          (
            SELECT	COUNT(id)
              FROM	productOptions
             WHERE	ProductId = A.id
          )												                         AS optionCnt,
          (
            SELECT	title
              FROM	productBottoms
             WHERE	id = A.ProductBottomId 
          )												AS bottomTitle
        FROM	products	A
       INNER
        JOIN	productTypes	B
          ON	A.ProductTypeId = B.id
       WHERE	A.isDelete = 0
         AND	title LIKE "%${_searchTitle}%"
         ${_pType ? `AND  A.ProductTypeId = ${_pType}` : ""}
  `;

  switch (parseInt(_orderType)) {
    case 1:
      selectQ += "\nORDER BY  A.createdAt DESC";
      break;

    case 2:
      selectQ += "\nORDER BY  A.title ASC";
      break;

    case 3:
      selectQ += "\nORDER BY  A.price DESC";
      break;

    default:
      break;
  }

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품 데이터를 조회할 수 없습니다.");
  }
});

router.post("/detail", async (req, res, next) => {
  const { id } = req.body;
  try {
    const selectQuery = `
    SELECT	A.id,
            A.title,
            A.thumbnail,
            A.hoverImage,
            A.videoPath,
            A.price,
            CONCAT(FORMAT(A.price, 0), "원")					          AS viewPrice,
            A.discount,
            (A.price * (A.discount / 100))					          AS viewCalDiscount,
            FORMAT((A.price * (A.discount / 100)), 0)					AS calDiscount,
            CONCAT(FORMAT((A.price * (A.discount / 100)), 0), "원")		AS viewDiscount,
            CASE
              WHEN	A.discount IS NULL THEN	CONCAT(FORMAT(A.price, 0), "원")
              ELSE	CONCAT(FORMAT(A.price - (A.price * (A.discount / 100)), 0), "원")
            END									AS realPrice,
            CASE
              WHEN	A.discount IS NULL THEN	A.price
              ELSE	A.price - (A.price * (A.discount / 100))
            END									AS originRealPrice,
            A.content,
            A.deliveryPrice,
            CONCAT(FORMAT(A.deliveryPrice, 0), "원")						AS	viewDeliveryPrice,
            A.descImage1, 
            A.descImage2,
            A.descImage3,
            A.descImage4,
            A.mobileDescImage1,
            A.mobileDescImage2,
            A.mobileDescImage3,
            A.mobileDescImage4,
            A.descAnimation1,
            A.descAnimation2,
            A.descAnimation3,
            A.descAnimation4,
            A.isBest,
            A.isMD,
            A.isNew,
            A.isSet,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		    AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		    AS viewUpdatedAt,
            A.ProductTypeId,
            B.value,
            A.ProductBottomId,
            (
              SELECT	COUNT(id)
                FROM	productOptions
                WHERE	ProductId = A.id
            )												                         AS optionCnt,
            C.title                                          AS bottomTitle,
            C.imagePath                                      AS bottomImage,
            C.mobileImagePath                                AS bottomMobileImg
      FROM	products	A
     INNER
      JOIN	productTypes	B
        ON	A.ProductTypeId = B.id
      LEFT
     OUTER
      JOIN	productBottoms	C
        ON	A.ProductBottomId = C.id
     WHERE	A.isDelete = 0
       AND  A.id = ${id}
    `;

    const detail = await models.sequelize.query(selectQuery);

    if (detail[0].length === 0) {
      return res.status(401).send("존재하지 않는 상품 정보입니다.");
    }

    return res.status(200).json(detail[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("상품 상세정보를 불러올 수 없습니다.");
  }
});

router.post(
  "/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { productTypeId } = req.body;

    const insertQ = `
  INSERT INTO products (
        title,
        thumbnail,
        hoverImage,
        price,
        discount,
        content,
        deliveryPrice,
        descImage1,
        mobileDescImage1,
        descAnimation1,
        createdAt,
        updatedAt,
        ProductTypeId
      ) VALUES (
        "임시 상품입니다.",
        "https://via.placeholder.com/380x280",
        "https://via.placeholder.com/380x280",
        0,
        0,
        "임시 상품설명 입니다.",
        0,
        "https://via.placeholder.com/1080x1400",
        "https://via.placeholder.com/480x620",
        "fade",
        now(),
        now(),
        ${productTypeId}
      );
  `;

    try {
      await models.sequelize.query(insertQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("임시 상품데이터를 추가할 수 없습니다.");
    }
  }
);

router.post(
  "/info/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const {
      id,
      title,
      price,
      discount,
      content,
      deliveryPrice,
      isBest,
      isMD,
      isNew,
      isSet,
      productTypeId,
      productBottomId,
    } = req.body;

    const updateQ = `
  UPDATE	products
     SET	title = "${title}",
          price = ${price},
          discount = ${discount},
          content = "${content}",
          deliveryPrice = ${deliveryPrice},
          isBest = ${isBest},
          isMD = ${isMD},
          isNew = ${isNew},
          isSet = ${isSet},
          updatedAt = now(),
          ProductTypeId = ${productTypeId},
          ProductBottomId = ${productBottomId || null}
   WHERE	id = ${id}
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품데이터를 수정할 수 없습니다.");
    }
  }
);

router.post(
  "/image/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const {
      id,
      thumbnail,
      hoverImage,
      videoPath,
      descImage1,
      descImage2,
      descImage3,
      descImage4,
      mobileDescImage1,
      mobileDescImage2,
      mobileDescImage3,
      mobileDescImage4,
      descAnimation1,
      descAnimation2,
      descAnimation3,
      descAnimation4,
    } = req.body;

    const updateQ = `
  UPDATE	products
     SET	thumbnail = "${thumbnail}",
          hoverImage = "${hoverImage}",
          videoPath = ${videoPath ? `"${videoPath}"` : null},
          descImage1 = "${descImage1}",
          descImage2 = ${descImage2 ? `"${descImage2}"` : null},
          descImage3 = ${descImage3 ? `"${descImage3}"` : null},
          descImage4 = ${descImage4 ? `"${descImage4}"` : null},
          mobileDescImage1 = "${mobileDescImage1}",
          mobileDescImage2 = ${
            mobileDescImage2 ? `"${mobileDescImage2}"` : null
          },
          mobileDescImage3 = ${
            mobileDescImage3 ? `"${mobileDescImage3}"` : null
          },
          mobileDescImage4 = ${
            mobileDescImage4 ? `"${mobileDescImage4}"` : null
          },
          descAnimation1 = "${descAnimation1}",
          descAnimation2 = ${descAnimation2 ? `"${descAnimation2}"` : null}, 
          descAnimation3 = ${descAnimation3 ? `"${descAnimation3}"` : null},
          descAnimation4 = ${descAnimation4 ? `"${descAnimation4}"` : null}
   WHERE	id = ${id}
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send("상품데이터(이미지 영역)를 수정할 수 없습니다.");
    }
  }
);

router.post(
  "/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    const updateQ = `
  UPDATE	products
     SET	isDelete = 1,
          updatedAt = now(),
          deletedAt = now()
   WHERE	id = ${id}
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품데이터를 삭제할 수 없습니다.");
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////PRODUCT OPTION LIST///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// 상품 아이디로 옵션 조회
router.post("/optList/list", async (req, res, next) => {
  const { productId } = req.body;

  //   추후에 필요할지 몰라 적어놓은 데이터
  //          A.id,
  //         A.createdAt,
  //         A.updatedAt,
  //         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")	  AS viewCreatedAt,
  //         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")	  AS viewUpdatedAt,
  //         B.title,
  //         B.thumbnail,
  //         B.title,
  //         B.price													             AS	productPrice,
  //         CONCAT(FORMAT(B.price, 0), "원")					    AS	viewProductPrice,

  const selectQ = `
  SELECT	A.id                                         AS   optionListId,
          C.value 												             AS 	optionValue,
          C.price													             AS	  optionPrice,
          CONCAT(FORMAT(C.price, 0), "원")					    AS	 viewOptionPrice
    FROM	productOptions	A
   INNER
    JOIN	products 		    B
      ON	A.ProductId = B.id
   INNER
    JOIN	options			    C
      ON	A.OptionId =  C.id
   WHERE  A.ProductId = ${productId}
   ORDER  BY A.createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("상품의 옵션 데이터를 조회할 수 없습니다.");
  }
});

router.post(
  "/optList/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { productId, optionId } = req.body;

    const optionValidateQuery = `
  SELECT  *
    FROM  productOptions
   WHERE  ProductId = ${productId}
     AND  OptionId = ${optionId}
  `;

    const insertQ = `
  INSERT INTO productOptions
  (
     createdAt, updatedAt, ProductId, OptionId
  )
  VALUES
  (
    now(), now(), ${productId}, ${optionId}
  )
  `;

    try {
      const validate = await models.sequelize.query(optionValidateQuery);

      if (validate[0].length !== 0) {
        return res.status(401).send("이미 해당 옵션이 등록되어 있습니다.");
      }

      await models.sequelize.query(insertQ);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품의 옵션 데이터를 추가할 수 없습니다.");
    }
  }
);

router.post(
  "/optList/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, productId, optionId } = req.body;

    const updateQ = `
  UPDATE  productOptions
     SET  ProductId = ${productId},
          OptionId = ${optionId},
          updatedAt = now()
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(updateQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품의 옵션 데이터를 수정할 수 없습니다.");
    }
  }
);

router.post(
  "/optList/delete",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id } = req.body;

    const deleteQ = `
  DELETE  
    FROM  productOptions
   WHERE  id = ${id}  
  `;

    try {
      await models.sequelize.query(deleteQ);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("상품의 옵션 데이터를 삭제할 수 없습니다.");
    }
  }
);

module.exports = router;
