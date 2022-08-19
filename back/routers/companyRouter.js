const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isBaseCompanyCheck = require("../middlewares/isBaseCompanyCheck");
const { CompanyInfo } = require("../models");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  try {
    const companyInfos = await CompanyInfo.findAll({});

    return res.status(200).json(companyInfos);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("사업자정보를 불러올 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post(
  "/create",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { name, value } = req.body;

    try {
      const createResult = await CompanyInfo.create({
        name,
        value,
      });

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("새로운 사업자 정보를 추가할 수 없습니다.");
    }
  }
);

router.delete(
  "/delete/:companyId",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { companyId } = req.params;

    const validation = Number(companyId);

    if (isNaN(validation)) {
      return res.status(400).send("올바르지 않은 요청 입니다.");
    }

    try {
      const exCompany = await CompanyInfo.findOne({
        where: { id: parseInt(companyId) },
      });

      if (!exCompany) {
        return res.status(401).send("존재하지 않는 정보입니다.");
      }

      const deleteResult = await CompanyInfo.destroy({
        where: { id: parseInt(companyId) },
      });

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(403).send("[서버장애 발생] 개발사에 문의해주세요.");
    }
  }
);

router.patch(
  "/update",
  isBaseCompanyCheck,
  isAdminCheck,
  async (req, res, next) => {
    const { id, name, value, dName } = req.body;

    const validation = Number(id);

    if (isNaN(validation)) {
      return res.status(400).send("올바르지 않은 요청 입니다.");
    }

    try {
      const updateResult = await CompanyInfo.update(
        { name, value, dName },
        {
          where: { id: parseInt(id) },
        }
      );

      return res.status(200).json({ result: true });
    } catch (error) {
      console.error(error);
      return res
        .status(403)
        .send("정보를 변경할 수 없습니다. 개발사에 문의해주세요.");
    }
  }
);

module.exports = router;
