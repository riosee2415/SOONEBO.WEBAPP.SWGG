import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  // 전체 회원 리뷰
  REVIEW_ALL_LIST_REQUEST,
  REVIEW_ALL_LIST_SUCCESS,
  REVIEW_ALL_LIST_FAILURE,
  // 회원 리뷰
  REVIEW_USER_LIST_REQUEST,
  REVIEW_USER_LIST_SUCCESS,
  REVIEW_USER_LIST_FAILURE,
  // 상품 리뷰
  REVIEW_PRODUCT_LIST_REQUEST,
  REVIEW_PRODUCT_LIST_SUCCESS,
  REVIEW_PRODUCT_LIST_FAILURE,
  // 메인 리뷰 가져오기
  REVIEW_MAIN_SLIDE_REQUEST,
  REVIEW_MAIN_SLIDE_SUCCESS,
  REVIEW_MAIN_SLIDE_FAILURE,
  // 회원 리뷰 생성
  REVIEW_USER_CREATE_REQUEST,
  REVIEW_USER_CREATE_SUCCESS,
  REVIEW_USER_CREATE_FAILURE,
  // 리뷰 이미지 업로드
  REVIEW_IMAGE_UPLOAD_REQUEST,
  REVIEW_IMAGE_UPLOAD_SUCCESS,
  REVIEW_IMAGE_UPLOAD_FAILURE,
} from "../reducers/review";

// READ

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewAllListAPI(data) {
  return await axios.post(`/api/review/allList`, data);
}

function* reviewAllList(action) {
  try {
    const result = yield call(reviewAllListAPI, action.data);

    yield put({
      type: REVIEW_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_ALL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewUserListAPI(data) {
  return await axios.post(`/api/review/list`, data);
}

function* reviewUserList(action) {
  try {
    const result = yield call(reviewUserListAPI, action.data);

    yield put({
      type: REVIEW_USER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_USER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewProductListAPI(data) {
  return await axios.post(`/api/review/product/list`, data);
}

function* reviewProductList(action) {
  try {
    const result = yield call(reviewProductListAPI, action.data);

    yield put({
      type: REVIEW_PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_PRODUCT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewMainSlideAPI(data) {
  return await axios.post(`/api/review/slide/list`, data);
}

function* reviewMainSlide(action) {
  try {
    const result = yield call(reviewMainSlideAPI, action.data);

    yield put({
      type: REVIEW_MAIN_SLIDE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_MAIN_SLIDE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

////// CREATE

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewUserCreateAPI(data) {
  return await axios.post(`/api/review/create`, data);
}

function* reviewUserCreate(action) {
  try {
    const result = yield call(reviewUserCreateAPI, action.data);

    yield put({
      type: REVIEW_USER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_USER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

async function reviewImageUploadAPI(data) {
  return await axios.post(`/api/review/image`, data);
}

function* reviewImageUpload(action) {
  try {
    const result = yield call(reviewImageUploadAPI, action.data);

    yield put({
      type: REVIEW_IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_IMAGE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchReviewAllList() {
  yield takeLatest(REVIEW_ALL_LIST_REQUEST, reviewAllList);
}

function* watchReviewUserList() {
  yield takeLatest(REVIEW_USER_LIST_REQUEST, reviewUserList);
}

function* watchReviewProductList() {
  yield takeLatest(REVIEW_PRODUCT_LIST_REQUEST, reviewProductList);
}

function* watchReviewMainSlide() {
  yield takeLatest(REVIEW_MAIN_SLIDE_REQUEST, reviewMainSlide);
}

function* watchReviewUserCreate() {
  yield takeLatest(REVIEW_USER_CREATE_REQUEST, reviewUserCreate);
}

function* watchReviewImageUpload() {
  yield takeLatest(REVIEW_IMAGE_UPLOAD_REQUEST, reviewImageUpload);
}

//////////////////////////////////////////////////////////////
export default function* reviewSaga() {
  yield all([
    fork(watchReviewAllList),
    fork(watchReviewUserList),
    fork(watchReviewProductList),
    fork(watchReviewMainSlide),
    fork(watchReviewImageUpload),
    fork(watchReviewUserCreate),
    //
  ]);
}
