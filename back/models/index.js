const Sequelize = require("sequelize");
const user = require("./user");
const mainbanner = require("./mainbanner");
const companyinfo = require("./companyinfo");
const popup = require("./popup");
const acceptrecord = require("./acceptrecord");
const gallary = require("./gallary");
const seo = require("./seo");
const notice = require("./notice");
const faqtype = require("./faqtype");
const faq = require("./faq");
const opinion = require("./opinion");
const opiniontype = require("./opiniontype");
const qna = require("./qna");
const questiontype = require("./questiontype");
const producttype = require("./producttype");
const product = require("./product");
const option = require("./option");
const event = require("./event");
const eventresult = require("./eventresult");
const boughthistory = require("./boughthistory");
const boughtcancel = require("./boughtcancel");
const review = require("./review");
// const boughtItems = require("./boughtItems");
const wishitem = require("./wishitem");
const wishlist = require("./wishlist");
const userPoint = require("./userPoint");
const agency = require("./agency");
const usergrade = require("./usergrade");
const sale = require("./sale");
const productbottom = require("./productbottom");
const productoptions = require("./productoptions");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.MainBanner = mainbanner;
db.CompanyInfo = companyinfo;
db.Popup = popup;
db.AcceptRecord = acceptrecord;
db.Notice = notice;
db.Gallary = gallary;
db.Qna = qna;
db.QuestionType = questiontype;
db.Seo = seo;
db.FaqType = faqtype;
db.Faq = faq;
db.OpinionType = opiniontype;
db.Opinion = opinion;
db.ProductType = producttype;
db.Product = product;
db.Option = option;
db.Event = event;
db.EventResult = eventresult;
db.BoughtHistory = boughthistory;
db.BoughtCancel = boughtcancel;
// db.BoughtItem = boughtItems;
db.WishItem = wishitem;
db.WishList = wishlist;
db.UserPoint = userPoint;
db.Agency = agency;
db.UserGrade = usergrade;
db.Sale = sale;
db.ProductBottom = productbottom;
db.ProductOptions = productoptions;
db.Review = review;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
