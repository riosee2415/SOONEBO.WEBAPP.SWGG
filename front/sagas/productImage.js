import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PRODUCT_THUMB_REQUEST,
  PRODUCT_THUMB_SUCCESS,
  PRODUCT_THUMB_FAILURE,
  //
  PRODUCT_HOVER_IMG_FAILURE,
  PRODUCT_HOVER_IMG_REQUEST,
  PRODUCT_HOVER_IMG_SUCCESS,
  //
  PRODUCT_DETAIL_IMG_REQUEST,
  PRODUCT_DETAIL_IMG_SUCCESS,
  PRODUCT_DETAIL_IMG_FAILURE,
  //
  PRODUCT_DETAIL_IMG2_REQUEST,
  PRODUCT_DETAIL_IMG2_SUCCESS,
  PRODUCT_DETAIL_IMG2_FAILURE,
  //
  PRODUCT_DETAIL_IMG3_REQUEST,
  PRODUCT_DETAIL_IMG3_SUCCESS,
  PRODUCT_DETAIL_IMG3_FAILURE,
  //
  PRODUCT_DETAIL_IMG4_REQUEST,
  PRODUCT_DETAIL_IMG4_SUCCESS,
  PRODUCT_DETAIL_IMG4_FAILURE,
  //
  PRODUCT_MO_DETAIL_IMG_REQUEST,
  PRODUCT_MO_DETAIL_IMG_SUCCESS,
  PRODUCT_MO_DETAIL_IMG_FAILURE,
  //
  PRODUCT_MO_DETAIL_IMG2_REQUEST,
  PRODUCT_MO_DETAIL_IMG2_SUCCESS,
  PRODUCT_MO_DETAIL_IMG2_FAILURE,
  //
  PRODUCT_MO_DETAIL_IMG3_REQUEST,
  PRODUCT_MO_DETAIL_IMG3_SUCCESS,
  PRODUCT_MO_DETAIL_IMG3_FAILURE,
  //
  PRODUCT_MO_DETAIL_IMG4_REQUEST,
  PRODUCT_MO_DETAIL_IMG4_SUCCESS,
  PRODUCT_MO_DETAIL_IMG4_FAILURE,
} from "../reducers/productImage";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productThumbAPI(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productThumb(action) {
  try {
    const result = yield call(productThumbAPI, action.data);

    yield put({
      type: PRODUCT_THUMB_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_THUMB_FAILURE,
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
async function productHoverImgAPI(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productHoverImg(action) {
  try {
    const result = yield call(productHoverImgAPI, action.data);

    yield put({
      type: PRODUCT_HOVER_IMG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_HOVER_IMG_FAILURE,
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
async function productDetailImgAPI(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productDetailImg(action) {
  try {
    const result = yield call(productDetailImgAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_IMG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_IMG_FAILURE,
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
async function productDetailImg2API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productDetailImg2(action) {
  try {
    const result = yield call(productDetailImg2API, action.data);

    yield put({
      type: PRODUCT_DETAIL_IMG2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_IMG2_FAILURE,
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
async function productDetailImg3API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productDetailImg3(action) {
  try {
    const result = yield call(productDetailImg3API, action.data);

    yield put({
      type: PRODUCT_DETAIL_IMG3_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_IMG3_FAILURE,
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
async function productDetailImg4API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productDetailImg4(action) {
  try {
    const result = yield call(productDetailImg4API, action.data);

    yield put({
      type: PRODUCT_DETAIL_IMG4_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_IMG4_FAILURE,
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
async function productMoDetailImgAPI(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productMoDetailImg(action) {
  try {
    const result = yield call(productMoDetailImgAPI, action.data);

    yield put({
      type: PRODUCT_MO_DETAIL_IMG_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_MO_DETAIL_IMG_FAILURE,
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
async function productMoDetailImg2API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productMoDetailImg2(action) {
  try {
    const result = yield call(productMoDetailImg2API, action.data);

    yield put({
      type: PRODUCT_MO_DETAIL_IMG2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_MO_DETAIL_IMG2_FAILURE,
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
async function productMoDetailImg3API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productMoDetailImg3(action) {
  try {
    const result = yield call(productMoDetailImg3API, action.data);

    yield put({
      type: PRODUCT_MO_DETAIL_IMG3_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_MO_DETAIL_IMG3_FAILURE,
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
async function productMoDetailImg4API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productMoDetailImg4(action) {
  try {
    const result = yield call(productMoDetailImg4API, action.data);

    yield put({
      type: PRODUCT_MO_DETAIL_IMG4_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_MO_DETAIL_IMG4_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

/////////////////////// - PRODUCT - ///////////////////////

function* watchProductThumb() {
  yield takeLatest(PRODUCT_THUMB_REQUEST, productThumb);
}

function* watchProductHoverImg() {
  yield takeLatest(PRODUCT_HOVER_IMG_REQUEST, productHoverImg);
}

function* watchProductDetailImg() {
  yield takeLatest(PRODUCT_DETAIL_IMG_REQUEST, productDetailImg);
}

function* watchProductDetailImg2() {
  yield takeLatest(PRODUCT_DETAIL_IMG2_REQUEST, productDetailImg2);
}

function* watchProductDetailImg3() {
  yield takeLatest(PRODUCT_DETAIL_IMG3_REQUEST, productDetailImg3);
}

function* watchProductDetailImg4() {
  yield takeLatest(PRODUCT_DETAIL_IMG4_REQUEST, productDetailImg4);
}

function* watchProductMoDetailImg() {
  yield takeLatest(PRODUCT_MO_DETAIL_IMG_REQUEST, productMoDetailImg);
}

function* watchProductMoDetailImg2() {
  yield takeLatest(PRODUCT_MO_DETAIL_IMG2_REQUEST, productMoDetailImg2);
}

function* watchProductMoDetailImg3() {
  yield takeLatest(PRODUCT_MO_DETAIL_IMG3_REQUEST, productMoDetailImg3);
}

function* watchProductMoDetailImg4() {
  yield takeLatest(PRODUCT_MO_DETAIL_IMG4_REQUEST, productMoDetailImg4);
}

//////////////////////////////////////////////////////////////
export default function* productImageSaga() {
  yield all([
    fork(watchProductThumb),
    fork(watchProductHoverImg),
    fork(watchProductDetailImg),
    fork(watchProductDetailImg2),
    fork(watchProductDetailImg3),
    fork(watchProductDetailImg4),
    fork(watchProductMoDetailImg),
    fork(watchProductMoDetailImg2),
    fork(watchProductMoDetailImg3),
    fork(watchProductMoDetailImg4),

    //
  ]);
}
