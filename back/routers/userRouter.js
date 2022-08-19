const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Op } = require("sequelize");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");
const isNanCheck = require("../middlewares/isNanCheck");

const router = express.Router();

router.post("/list", async (req, res, next) => {
  const { username, email, gradeId, dateSort, notAny } = req.body;
  // dateSort => 1일 때 - ASC [default]
  // dateSort => 2일 때 - DESC

  const _username = username ? username : "";
  const _email = email ? email : "";
  const _dateSort = dateSort ? parseInt(dateSort) : 1;
  const _gradeId = gradeId ? gradeId : "";
  const _notAny = notAny ? notAny : false;

  try {
    let selectQ = `
    SELECT	A.id,
            A.userId,
            A.email,
            A.username,
            A.mobile,
            A.level,
            CASE
              WHEN	A.level = 1	THEN	"일반회원"
              WHEN	A.level = 2	THEN	"설정없음"
              WHEN	A.level = 3	THEN	"운영자"
              WHEN	A.level = 4	THEN	"최고관리자"
              WHEN	A.level = 5	THEN	"개발사"
              ELSE 	""
            END	AS	viewLevel,
            A.postCode,
            A.address ,
            A.detailAddress,
            A.managerId,
            A2.username			AS mgrName, 
            A.userPoint,
            A.isAgency,
            A.terms,
            A.createdAt ,
            A.updatedAt ,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
            A.AgencyId,
            B.name,
            B.urlName,
            A.UserGradeId,
            C.lvValue,
            (
                SELECT SUM(price)       
                  FROM sales
                 WHERE content = "매출"
                   AND UserId = A.id
                   AND isCompleted = 1
                   AND DATE_FORMAT(createdAt, "%Y%m%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), "%Y%m%d")
            )                                             AS originAmountPrice,
            CONCAT(FORMAT(
            IFNULL(
                (
                    SELECT SUM(price)       
                      FROM sales
                     WHERE content = "매출"
                       AND UserId = A.id
                       AND isCompleted = 1
                       AND DATE_FORMAT(createdAt, "%Y%m%d") >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), "%Y%m%d")
                ), 0
            ), 0), "원")                                   AS viewAmountPrice
      FROM	users		A
      LEFT
     OUTER
      JOIN	users		A2
        ON	A.managerId = A2.id
      LEFT
     OUTER
      JOIN	agencys 	B
        ON	A.AgencyId  = B.id
      LEFT
     OUTER	
      JOIN	userGrade 	C
        ON	A.UserGradeId = C.id
     WHERE	A.isExit = 0
       AND  A.AgencyId = 2
       AND	A.username LIKE '%${_username}%'
       AND	A.email LIKE '%${_email}%'
            ${_notAny ? ` AND  C.lvValue != "any"` : ``}
    `;

    const gradeQ = `AND  A.UserGradeId = ${_gradeId}\n`;
    const sortQ = `ORDER  BY  A.createdAt ${_dateSort === 1 ? "ASC" : "DESC"}`;

    if (_gradeId) {
      selectQ += gradeQ;
    }

    selectQ += sortQ;

    const users = await models.sequelize.query(selectQ);

    return res.status(200).json(users[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

router.post("/list/inEmp", isAdminCheck, async (req, res, next) => {
  const { username, email, gradeId, dateSort } = req.body;
  // dateSort => 1일 때 - ASC [default]
  // dateSort => 2일 때 - DESC

  const _username = username ? username : "";
  const _email = email ? email : "";
  const _dateSort = dateSort ? parseInt(dateSort) : 1;
  const _gradeId = gradeId ? gradeId : "";

  try {
    let selectQ = `
   
SELECT	*
  FROM	(
      SELECT	A.id,
          A.userId,
          A.email,
          A.username,
          A.mobile,
          A.level,
          CASE
            WHEN	A.level = 1	THEN	"일반회원"
            WHEN	A.level = 2	THEN	"설정없음"
            WHEN	A.level = 3	THEN	"운영자"
            WHEN	A.level = 4	THEN	"최고관리자"
            WHEN	A.level = 5	THEN	"개발사"
            ELSE 	""
          END	AS	viewLevel,
          A.postCode,
          A.address ,
          A.detailAddress,
          A.managerId,
          A2.username			AS mgrName, 
          A.userPoint,
          A.isAgency,
          A.terms,
          A.createdAt ,
          A.updatedAt ,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
          A.AgencyId,
          B.name,
          B.urlName,
          A.UserGradeId,
          C.lvValue 
        FROM	users		A
        LEFT
       OUTER
        JOIN	users		A2
          ON	A.managerId = A2.id
        LEFT
       OUTER
        JOIN	agencys 	B
          ON	A.AgencyId  = B.id
        LEFT
       OUTER	
        JOIN	userGrade 	C
          ON	A.UserGradeId = C.id
       WHERE	A.isExit = 0
         AND  A.AgencyId = 2
         AND	A.username LIKE '%${_username}%'
         AND	A.email LIKE '%${_email}%'
         ${_gradeId ? `AND  A.UserGradeId = ${_gradeId} ` : ""}
      )	Z
 WHERE	Z.id IN (
                SELECT	DISTINCT 
                        managerId
                  FROM	users
                WHERE	managerId IS NOT NULL
                )
  ORDER BY  Z.createdAt ${_dateSort === 1 ? "ASC" : "DESC"}
    `;

    const users = await models.sequelize.query(selectQ);

    return res.status(200).json(users[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

router.post("/list/innerList", isAdminCheck, async (req, res, next) => {
  const { parentId, dateSort } = req.body;

  const _dateSort = dateSort ? parseInt(dateSort) : 1;

  try {
    let selectQ = `
    SELECT	A.id,
            A.userId,
            A.email,
            A.username,
            A.mobile,
            A.level,
            CASE
              WHEN	A.level = 1	THEN	"일반회원"
              WHEN	A.level = 2	THEN	"설정없음"
              WHEN	A.level = 3	THEN	"운영자"
              WHEN	A.level = 4	THEN	"최고관리자"
              WHEN	A.level = 5	THEN	"개발사"
              ELSE 	""
            END	AS	viewLevel,
            A.postCode,
            A.address ,
            A.detailAddress,
            A.managerId,
            A2.username			AS mgrName, 
            A.userPoint,
            A.isAgency,
            A.terms,
            A.createdAt ,
            A.updatedAt ,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
            A.AgencyId,
            B.name,
            B.urlName,
            A.UserGradeId,
            C.lvValue 
      FROM	users		A
      LEFT
     OUTER
      JOIN	users		A2
        ON	A.managerId = A2.id
      LEFT
     OUTER
      JOIN	agencys 	B
        ON	A.AgencyId  = B.id
      LEFT
     OUTER	
      JOIN	userGrade 	C
        ON	A.UserGradeId = C.id
     WHERE	A.isExit = 0
       AND	A.managerId = ${parentId}
       AND A.AgencyId = 2
     ORDER BY  A.createdAt ${_dateSort === 1 ? "ASC" : "DESC"}
    `;

    const agencyPeopleQuery = `     
    SELECT  Z.name,
            COUNT(*)  AS peopleCnt
      FROM  (
              SELECT	B.name 
                FROM	users	  A
               INNER
                JOIN	agencys B
                  ON	A.AgencyId = B.id
               WHERE  A.managerId = ${parentId}
                 AND A.AgencyId = 2
            )	Z
      GROUP BY Z.name
    `;

    const allUserList = `
      SELECT  COUNT(*)  AS allUserCnt
        FROM  users
       WHERE  managerId = ${parentId}      
    `;

    const users = await models.sequelize.query(selectQ);
    const agencyPeople = await models.sequelize.query(agencyPeopleQuery);
    const allUser = await models.sequelize.query(allUserList);

    return res.status(200).json({
      users: users[0],
      agencyPeople: agencyPeople[0],
      allUser: allUser[0][0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

router.patch("/job/update", isAdminCheck, async (req, res, next) => {
  const { id, gradeId } = req.body;

  try {
    const exUserQuery = `
    SELECT *
      FROM users
     WHERE id = ${id}
       AND isExit = 0
    `;

    const exUser = await models.sequelize.query(exUserQuery);

    if (exUser[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const updateQuery = `
    UPDATE users
       SET UserGradeId = ${gradeId},
           updatedAt = now()
     WHERE id = ${id}
    `;

    const updateResult = await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자의 직급을 올릴 수 없습니다.");
  }
});

router.patch("/exit/update", async (req, res, next) => {
  const { id } = req.body;

  try {
    const exUserQuery = `
    SELECT *
      FROM users
     WHERE id = ${id}
       AND isExit = 0
    `;

    const exUser = await models.sequelize.query(exUserQuery);

    if (exUser[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const updateQuery = `
    UPDATE users
       SET isExit = 1,
           updatedAt = now()
     WHERE id = ${id}
    `;

    const updateResult = await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("탈퇴 처리를 진행할 수 없습니다.");
  }
});

/// 관리자에서 세일즈 사용자 생성하기
router.post("/admin/create", isAdminCheck, async (req, res, next) => {
  const {
    userId,
    email,
    username,
    mobile,
    password,
    managerId,
    isAgency,
    agencyId,
  } = req.body;

  try {
    const exUserQuery = `
    SELECT userId
      FROM users
     WHERE userId = "${userId}"
    `;

    const exUserQuery2 = `
    SELECT email
      FROM users
     WHERE email = "${email}"
    `;

    const exUser = await models.sequelize.query(exUserQuery);

    const exUser2 = await models.sequelize.query(exUserQuery2);

    if (exUser[0].length > 0) {
      return res.status(401).send("이미 가입된 아이디 입니다.");
    }

    if (exUser2[0].length > 0) {
      return res.status(401).send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const insertQuery = `
    INSERT INTO users
    (
        userId,
        email,
        username,
        mobile,
        password,
        managerId,
        isAgency,
        terms,
        createdAt,
        updatedAt,
        UserGradeId,
        AgencyId 
    )
    VALUES
    (
       "${userId}",
       "${email}",
       "${username}",
       "${mobile}",
       "${hashedPassword}",
       ${managerId},
       ${isAgency},
       1,
       now(),
       now(),
       1,
       ${agencyId}
    )
    `;

    const insertResult = await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 생성할 수 없습니다.");
  }
});

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const selectQ = `
        SELECT	A.id,
                A.userId,
                A.email,
                A.username,
                A.mobile,
                A.postCode,
                A.address,
                A.detailAddress,
                A.managerId,
                A.userPoint,
                A.isAgency,
                A.level,
                A.isExit,
                A.terms,
                A.createdAt,
                A.updatedAt,
                DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
                DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
                A.UserGradeId,
                A.AgencyId,
                A.bank,
                A.accountNo,
                B.lvValue,
                C.username 									  	            AS recommUsername,
                C.userId 										                AS recommUserId,
                D.name											                AS agencyName,
                D.urlName 										              AS agencyUrl
          FROM	users		    A
         INNER  
          JOIN	userGrade 	B
            ON	A.UserGradeId = B.id
          LEFT
         OUTER
          JOIN	users		    C
            ON	A.managerId = C.id
         INNER
          JOIN	agencys 	  D
            ON	A.AgencyId = D.id
         WHERE	A.id = ${req.user.id}
      `;

      const userData = await models.sequelize.query(selectQ);

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(userData[0][0]);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(userData[0][0]);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["secret", "password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["secret", "password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const {
    userId,
    email,
    username,
    mobile,
    password,
    terms,
    managerId,
    agencyId,
    isSale,
  } = req.body;

  if (!terms) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  try {
    const exUserQuery = `
    SELECT userId
      FROM users
     WHERE userId = "${userId}"
    `;

    const exUserQuery2 = `
    SELECT email
      FROM users
     WHERE email = "${email}"
    `;

    const exUser = await models.sequelize.query(exUserQuery);

    const exUser2 = await models.sequelize.query(exUserQuery2);

    if (exUser[0].length > 0) {
      return res.status(401).send("이미 가입된 아이디 입니다.");
    }

    if (exUser2[0].length > 0) {
      return res.status(401).send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (isSale) {
      const insertQuery = `
      INSERT INTO users
      (
          userId,
          email,
          username,
          mobile,
          password,
          managerId,
          terms,
          createdAt,
          updatedAt,
          UserGradeId,
          AgencyId 
      )
      VALUES
      (
         "${userId}",
         "${email}",
         "${username}",
         "${mobile}",
         "${hashedPassword}",
         ${managerId},
         1,
         now(),
         now(),
         1,
         ${agencyId}
      )
      `;

      const insertResult = await models.sequelize.query(insertQuery);

      return res.status(201).send("SUCCESS");
    }

    const insertQuery = `
      INSERT INTO users
      (
          userId,
          email,
          username,
          mobile,
          password,
          managerId,
          terms,
          createdAt,
          updatedAt,
          UserGradeId,
          AgencyId 
      )
      VALUES
      (
         "${userId}",
         "${email}",
         "${username}",
         "${mobile}",
         "${hashedPassword}",
         ${managerId || null},
         1,
         now(),
         now(),
         5,
         ${agencyId}
      )
      `;

    const insertResult = await models.sequelize.query(insertQuery);

    return res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/snsLogin", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    if (!user) {
      return res.status(401).send("SNS 회원가입 후 로그인 가능합니다.");
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["secret", "password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/snsJoin", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    const { userId, password, username, agencyId, isSales, managerId } =
      req.body;

    const exUserQuery = `
  SELECT userId
    FROM users
   WHERE userId = "${userId}"
  `;

    const exUserQuery2 = `
  SELECT email
    FROM users
   WHERE email = "${password}"
  `;

    const exUser = await models.sequelize.query(exUserQuery);

    const exUser2 = await models.sequelize.query(exUserQuery2);

    if (exUser[0].length > 0) {
      return res.status(401).send("이미 가입된 아이디 입니다.");
    }

    if (exUser2[0].length > 0) {
      return res.status(401).send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (isSales) {
      const newUser = await User.create({
        userId,
        email: password,
        password: hashedPassword,
        username,
        mobile: null,
        terms: 1,
        AgencyId: agencyId,
        UserGradeId: 1,
        managerId: managerId,
      });

      return req.login(newUser, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const fullUserWithoutPassword = await User.findOne({
          where: { id: newUser.id },
          attributes: {
            exclude: ["secret", "password"],
          },
        });

        return res.status(200).json(fullUserWithoutPassword);
      });
    }

    const newUser = await User.create({
      userId,
      email: password,
      password: hashedPassword,
      username,
      mobile: null,
      terms: 1,
      AgencyId: agencyId,
      UserGradeId: 5,
      managerId: managerId ? managerId : null,
    });

    return req.login(newUser, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: newUser.id },
        attributes: {
          exclude: ["secret", "password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  const selectQ = `
  SELECT	A.id,
          A.userId,
          A.email,
          A.username,
          A.mobile,
          A.postCode,
          A.address,
          A.detailAddress,
          A.managerId,
          A.userPoint,
          A.isAgency,
          A.isExit,
          A.terms,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
          A.UserGradeId,
          A.AgencyId,
          A.bank,
          A.accountNo,
          B.lvValue,
          C.username 									  	            AS recommUsername,
          C.userId 										                AS recommUserId,
          D.name											                AS agencyName,
          D.urlName 										              AS agencyUrl
    FROM	users		    A
   INNER  
    JOIN	userGrade 	B
      ON	A.UserGradeId = B.id
    LEFT
   OUTER
    JOIN	users		    C
      ON	A.managerId = C.id
   INNER
    JOIN	agencys 	  D
      ON	A.AgencyId = D.id
   WHERE	A.id = ${req.user.id}
  `;
  try {
    const userData = await models.sequelize.query(selectQ);

    return res.status(200).json(userData[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const {
    mobile,
    email,
    postCode,
    address,
    detailAddress,
    // newPassword
  } = req.body;

  if (!req.user) {
    return res.status(403).send("로그인 후 이용 가능합니다.");
  }

  try {
    const exUser = await User.findOne({ where: { id: parseInt(req.user.id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    if (email !== req.user.email) {
      const exUser2 = await User.findOne({ where: { email: email } });

      if (exUser2) {
        return res.status(401).send("이미 존재하는 이메일입니다.");
      }
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updateUser = await User.update(
      {
        email,
        postCode,
        mobile,
        address,
        detailAddress,
        // password: hashedPassword,
      },
      {
        where: { id: parseInt(req.user.id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
router.post("/findMyPassword", async (req, res, next) => {
  const { userId, password, newPassword } = req.body;
  try {
    const exUser = await User.findOne({ where: { userId } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const comparePass = await bcrypt.compare(password, exUser.password);

    if (!comparePass) {
      return res.status(401).send("기존 비밀번호가 일치하지 않습니다.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updateUser = await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: parseInt(req.user.id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("비밀번호를 변경할 수 없습니다.");
  }
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

router.post("/findUserIdByEmail", async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        username,
        email,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

router.post("/findUserIdByMobile", async (req, res, next) => {
  const { username, mobile } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        username,
        mobile,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

router.post("/modifypass", async (req, res, next) => {
  const { userId, email } = req.body;

  try {
    const exUser = await User.findOne({
      where: { userId },
    });

    const exUser2 = await User.findOne({
      where: { email },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 아이디입니다.");
    }

    if (!exUser2) {
      return res.status(401).send("존재하지 않는 이메일입니다.");
    }

    const UUID = generateUUID();

    const updateResult = await User.update(
      { secret: UUID },
      {
        where: { id: parseInt(exUser.id) },
      }
    );

    if (updateResult[0] > 0) {
      // 이메일 전송

      await sendSecretMail(
        email,
        `🔐 [보안 인증코드 입니다.] 순애보에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
        `
          <div>
            <h3>순애보</h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. 순애보 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
      );

      return res.status(200).json({ result: true });
    } else {
      return res
        .status(401)
        .send("요청이 올바르지 않습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

router.post("/checkSecret", async (req, res, next) => {
  const { secret } = req.body;
  try {
    const exUser = await User.findOne({
      where: { secret },
    });

    if (!exUser) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/modifypass/update", async (req, res, next) => {
  const { userId, password } = req.body;

  try {
    const exUser = await User.findOne({
      where: { userId },
    });

    if (!exUser) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const updateResult = await User.update(
      { password: hashPassord },
      {
        where: { userId },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(selectUserId) },
    });

    if (!exUser) {
      return res
        .status(401)
        .send("잘못된 사용자 입니다. 다시 확인 후 시도해주세요.");
    }

    const currentLevel = parseInt(exUser.dataValues.level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateResult = await User.update(
      { level: parseInt(changeLevel) },
      {
        where: {
          id: parseInt(selectUserId),
        },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.post("/agency/chart", isAdminCheck, async (req, res, next) => {
  const agencyChartQuery = `     
  SELECT  Z.name,
          COUNT(*)  AS peopleCnt
    FROM  (
            SELECT	B.name 
              FROM	users	  A
             INNER
              JOIN	agencys B
                ON	A.AgencyId = B.id
             WHERE  A.AgencyId = 2
          )	Z
    GROUP BY Z.name
  `;

  const agencyGradeQuery = `
    SELECT Z.lvValue,
           COUNT(*)		AS cnt
      FROM (
            SELECT	A.username,
                    C.lvValue
              FROM	users		  A
             INNER
              JOIN	userGrade	C
                ON	A.UserGradeId = C.id
             WHERE  A.AgencyId = 2
               
            )	Z
      GROUP BY Z.lvValue
  `;

  const recommQuery = `
  SELECT ROW_NUMBER()  OVER(ORDER BY (
    IFNULL(
      (
        SELECT 	COUNT(managerId)
          FROM	users	B
         WHERE  A.id = B.managerId 
           AND  A.AgencyId = 2
         GROUP	BY managerId	
      ), 0
   )
         ) DESC)   num,
         username,
         IFNULL(
            (
              SELECT 	COUNT(managerId)
                FROM	users	B
              WHERE  A.id = B.managerId 
                AND  A.AgencyId = 2
              GROUP	BY managerId	
            ), 0
         )		AS cnt
    FROM users		A
   WHERE  A.AgencyId = 2
   LIMIT 10
  `;

  try {
    const result = await models.sequelize.query(agencyChartQuery);
    const result2 = await models.sequelize.query(agencyGradeQuery);
    const result3 = await models.sequelize.query(recommQuery);

    return res.status(200).json({
      agencyUser: result[0],
      gradeUsers: result2[0],
      recommUsers: result3[0],
    });
  } catch (e) {
    console.error(e);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
