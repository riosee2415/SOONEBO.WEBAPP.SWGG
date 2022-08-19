const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

// list 가져오기
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { name, chief, bNo, email, dateSort, nameSort } = req.body;

  const _name = name ? name : "";
  const _chief = chief ? chief : "";
  const _bNo = bNo ? bNo : "";
  const _email = email ? email : "";
  const _dateSort = dateSort ? parseInt(dateSort) : 1;

  let selectQuery = `
     SELECT  ROW_NUMBER () OVER()           AS num, 
                A.id,
                A.name,
                A.chief,
                A.bNo,
                A.email,
                A.postCode,
                A.mobile,
                A.mobile2,
                A.address,
                A.detailAddress,
                A.memo,
                A.urlName,
                DATE_FORMAT(A.startDate, "%Y-%m-%d")		    AS startDate,
                DATE_FORMAT(A.startDate, "%Y년 %m월 %d일")		AS viewStartDate,
                A.homepageUrl,
                A.iamPortId,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS updatedAt
        FROM    agencys A
        WHERE   1 =1
          AND   A.name LIKE '%${_name}%'
          AND   A.chief LIKE '%${_chief}%'
          AND   A.bNo LIKE '%${_bNo}%'
          AND   A.email LIKE '%${_email}%'
          ORDER BY  A.startDate ${_dateSort === 1 ? "ASC" : "DESC"}

     `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(401).send("대리점 목록을 불러올 수 없습니다.");
  }
});

// 이름순 , 등록일 순  제어

// 정보 수정하기

router.post(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const {
      id,
      name,
      chief,
      bNo,
      postCode,
      mobile,
      mobile2,
      email,
      address,
      detailAddress,
      memo,
      urlName,
      startDate,
      homepageUrl,
      iamPortId,
    } = req.body;

    const updateQuery = `
      UPDATE	agencys
         SET 	name = "${name}",
                chief = "${chief}",    
                bNo = "${bNo}",    
                postCode = "${postCode}",    
                mobile = "${mobile}",    
                mobile2 = "${mobile2}",    
                email = "${email}",    
                address = "${address}",    
                detailAddress = "${detailAddress}",    
                memo = "${memo}",    
                urlName = "${urlName}",    
                startDate = "${startDate}",
                homepageUrl = "${homepageUrl}",    
                iamPortId = "${iamPortId}",    
    
                updatedAt = NOW()
       WHERE	id = ${id}
      `;

    try {
      const result = await models.sequelize.query(updateQuery);

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("대리점 정보를 수정할 수 없습니다.");
    }
  }
);

// 생성하기

router.post(
  "/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const {
      name,
      chief,
      bNo,
      postCode,
      mobile,
      mobile2,
      email,
      address,
      detailAddress,
      memo,
      urlName,
      startDate,
      homepageUrl,
      iamPortId,
    } = req.body;

    const insertQuery = `
    INSERT INTO agencys (
                name,
                chief,
                bNo,
                postCode,
                mobile,
                mobile2,
                email,
                address,
                detailAddress,
                memo,
                urlName,
                startDate,
                homepageUrl,
                iamPortId,
                createdAt,
                updatedAt
          ) VALUES (
              "${name}",
              "${chief}",
              "${bNo}",
              "${postCode}",
              "${mobile}",
              "${mobile2}",
              "${email}",
              "${address}",
              "${detailAddress}",
              "${memo}",
              "${urlName}",
              "${startDate}",
              "${homepageUrl}",
              "${iamPortId}",
              now(),
              now()
          )
    `;

    try {
      const result = await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(400).send("새로운 대리점을 생성할 수 없습니다.");
    }
  }
);

module.exports = router;
