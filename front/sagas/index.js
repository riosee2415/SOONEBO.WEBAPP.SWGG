import { all, fork } from "redux-saga/effects";
import bannerSaga from "./banner";
import userSaga from "./user";
import popupSaga from "./popup";
import companySaga from "./company";
import noticeSage from "./notice";
import gallerySage from "./gallery";
import questionSage from "./question";
import acceptSaga from "./accept";
import seoSaga from "./seo";
import editSaga from "./editor";
import productSaga from "./product";
import opinionSaga from "./opinion";
import faqSaga from "./faq";
import saleSaga from "./sale";
import gradeSaga from "./grade";
import agencySaga from "./agency";
import productImageSaga from "./productImage";
import pointSaga from "./userPoint";
import reviewSaga from "./review";
import boughtHistorySaga from "./boughtHistory";
import eventSaga from "./event";
import wishSaga from "./wish";
import qnaSaga from "./qna";
import cancelSaga from "./cancel";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(bannerSaga),
    fork(userSaga),
    fork(popupSaga),
    fork(companySaga),
    fork(noticeSage),
    fork(gallerySage),
    fork(questionSage),
    fork(acceptSaga),
    fork(seoSaga),
    fork(editSaga),
    fork(productSaga),
    fork(opinionSaga),
    fork(faqSaga),
    fork(saleSaga),
    fork(gradeSaga),
    fork(agencySaga),
    fork(productImageSaga),
    fork(pointSaga),
    fork(reviewSaga),
    fork(boughtHistorySaga),
    fork(eventSaga),
    fork(wishSaga),
    fork(qnaSaga),
    fork(cancelSaga),
  ]);
}
