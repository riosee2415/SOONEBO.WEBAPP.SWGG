import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  /////// TYPE
  PRODUCT_TYPE_SORT_UP_REQUEST,
  PRODUCT_TYPE_SORT_UP_SUCCESS,
  PRODUCT_TYPE_SORT_UP_FAILURE,
  //
  PRODUCT_TYPE_LIST_REQUEST,
  PRODUCT_TYPE_LIST_SUCCESS,
  PRODUCT_TYPE_LIST_FAILURE,
  //
  PRODUCT_TYPE_CREATE_REQUEST,
  PRODUCT_TYPE_CREATE_SUCCESS,
  PRODUCT_TYPE_CREATE_FAILURE,
  //
  PRODUCT_TYPE_UPDATE_REQUEST,
  PRODUCT_TYPE_UPDATE_SUCCESS,
  PRODUCT_TYPE_UPDATE_FAILURE,
  //
  PRODUCT_TYPE_DELETE_REQUEST,
  PRODUCT_TYPE_DELETE_SUCCESS,
  PRODUCT_TYPE_DELETE_FAILURE,
  /////// PRODUCT
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  //
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  //
  PRODUCT_INFO_UPDATE_REQUEST,
  PRODUCT_INFO_UPDATE_SUCCESS,
  PRODUCT_INFO_UPDATE_FAILURE,
  //
  PRODUCT_IMAGE_UPDATE_REQUEST,
  PRODUCT_IMAGE_UPDATE_SUCCESS,
  PRODUCT_IMAGE_UPDATE_FAILURE,
  //
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  //
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAILURE,
  /////// OPTION
  PRODUCT_OPT_LIST_REQUEST,
  PRODUCT_OPT_LIST_SUCCESS,
  PRODUCT_OPT_LIST_FAILURE,
  //
  PRODUCT_OPT_PROD_LIST_REQUEST,
  PRODUCT_OPT_PROD_LIST_SUCCESS,
  PRODUCT_OPT_PROD_LIST_FAILURE,
  //
  PRODUCT_OPT_CREATE_REQUEST,
  PRODUCT_OPT_CREATE_SUCCESS,
  PRODUCT_OPT_CREATE_FAILURE,
  //
  PRODUCT_OPT_DELETE_REQUEST,
  PRODUCT_OPT_DELETE_SUCCESS,
  PRODUCT_OPT_DELETE_FAILURE,
  //
  PRODUCT_OPT_UPDATE_REQUEST,
  PRODUCT_OPT_UPDATE_SUCCESS,
  PRODUCT_OPT_UPDATE_FAILURE,
  //
  PRODUCT_GUIDE_REQUEST,
  PRODUCT_GUIDE_SUCCESS,
  PRODUCT_GUIDE_FAILURE,
  //
  IMAGE_PATH_REQUEST,
  IMAGE_PATH_SUCCESS,
  IMAGE_PATH_FAILURE,
  //
  GUIDE_UPDATE_REQUEST,
  GUIDE_UPDATE_SUCCESS,
  GUIDE_UPDATE_FAILURE,
  //
  GUIDE_CREATE_REQUEST,
  GUIDE_CREATE_SUCCESS,
  GUIDE_CREATE_FAILURE,
  /////// PRODUCT OPTION
  OPT_LIST_REQUEST,
  OPT_LIST_SUCCESS,
  OPT_LIST_FAILURE,
  //
  OPT_CREATE_REQUEST,
  OPT_CREATE_SUCCESS,
  OPT_CREATE_FAILURE,
  //
  OPT_DELETE_REQUEST,
  OPT_DELETE_SUCCESS,
  OPT_DELETE_FAILURE,
} from "../reducers/product";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTypeListAPI(data) {
  return await axios.post(`/api/product/type/list`, data);
}

function* productTypeList(action) {
  try {
    const result = yield call(productTypeListAPI, action.data);

    yield put({
      type: PRODUCT_TYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_LIST_FAILURE,
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
async function productTypeCreateAPI(data) {
  return await axios.post(`/api/product/type/create`, data);
}

function* productTypeCreate(action) {
  try {
    const result = yield call(productTypeCreateAPI, action.data);

    yield put({
      type: PRODUCT_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_CREATE_FAILURE,
      data: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTypeUpdateAPI(data) {
  return await axios.post(`/api/product/type/update`, data);
}

function* productTypeUpdate(action) {
  try {
    const result = yield call(productTypeUpdateAPI, action.data);

    yield put({
      type: PRODUCT_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_UPDATE_FAILURE,
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
async function productTypeDeleteAPI(data) {
  return await axios.post(`/api/product/type/delete`, data);
}

function* productTypeDelete(action) {
  try {
    const result = yield call(productTypeDeleteAPI, action.data);

    yield put({
      type: PRODUCT_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_DELETE_FAILURE,
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
async function productListAPI(data) {
  return await axios.post(`/api/product/list`, data);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);

    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LIST_FAILURE,
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
async function productDetailAPI(data) {
  return await axios.post(`/api/product/detail`, data);
}

function* productDetail(action) {
  try {
    const result = yield call(productDetailAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_FAILURE,
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
async function productCreateAPI(data) {
  return await axios.post(`/api/product/create`, data);
}

function* productCreate(action) {
  try {
    const result = yield call(productCreateAPI, action.data);

    yield put({
      type: PRODUCT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_CREATE_FAILURE,
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
async function productInfoUpdateAPI(data) {
  return await axios.post(`/api/product/info/update`, data);
}

function* productInfoUpdate(action) {
  try {
    const result = yield call(productInfoUpdateAPI, action.data);

    yield put({
      type: PRODUCT_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_INFO_UPDATE_FAILURE,
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
async function productImageUpdateAPI(data) {
  return await axios.post(`/api/product/image/update`, data);
}

function* productImageUpdate(action) {
  try {
    const result = yield call(productImageUpdateAPI, action.data);

    yield put({
      type: PRODUCT_IMAGE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_IMAGE_UPDATE_FAILURE,
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
async function productDeleteAPI(data) {
  return await axios.post(`/api/product/delete`, data);
}

function* productDelete(action) {
  try {
    const result = yield call(productDeleteAPI, action.data);

    yield put({
      type: PRODUCT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DELETE_FAILURE,
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
async function adminProductListAPI(data) {
  return await axios.post(`/api/product/admin/list`, data);
}

function* adminProductList(action) {
  try {
    const result = yield call(adminProductListAPI, action.data);

    yield put({
      type: ADMIN_PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_PRODUCT_LIST_FAILURE,
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
async function productOptListAPI(data) {
  return await axios.post(`/api/product/option/list`, data);
}

function* productOptList(action) {
  try {
    const result = yield call(productOptListAPI, action.data);

    yield put({
      type: PRODUCT_OPT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPT_LIST_FAILURE,
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
async function productOptProdListAPI(data) {
  return await axios.post(`/api/product/option/prodList`, data);
}

function* productOptProdList(action) {
  try {
    const result = yield call(productOptProdListAPI, action.data);

    yield put({
      type: PRODUCT_OPT_PROD_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPT_PROD_LIST_FAILURE,
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
async function productOptCreateAPI(data) {
  return await axios.post(`/api/product/option/create`, data);
}

function* productOptCreate(action) {
  try {
    const result = yield call(productOptCreateAPI, action.data);

    yield put({
      type: PRODUCT_OPT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPT_CREATE_FAILURE,
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
async function productOptUpdateAPI(data) {
  return await axios.post(`/api/product/option/update`, data);
}

function* productOptUpdate(action) {
  try {
    const result = yield call(productOptUpdateAPI, action.data);

    yield put({
      type: PRODUCT_OPT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPT_UPDATE_FAILURE,
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
async function productOptDeleteAPI(data) {
  return await axios.post(`/api/product/option/delete`, data);
}

function* productOptDelete(action) {
  try {
    const result = yield call(productOptDeleteAPI, action.data);

    yield put({
      type: PRODUCT_OPT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPT_DELETE_FAILURE,
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
async function productGuideAPI(data) {
  return await axios.post(`/api/product/bottom/list`, data);
}

function* productGuide(action) {
  try {
    const result = yield call(productGuideAPI, action.data);

    yield put({
      type: PRODUCT_GUIDE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_GUIDE_FAILURE,
      data: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productTypeSortUpAPI(data) {
  return await axios.post(`/api/product/type/sort/update`, data);
}

function* productTypeSortUp(action) {
  try {
    const result = yield call(productTypeSortUpAPI, action.data);

    yield put({
      type: PRODUCT_TYPE_SORT_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TYPE_SORT_UP_FAILURE,
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
async function imagePathAPI(data) {
  return await axios.post(`/api/product/image`, data);
}

function* imagePath(action) {
  try {
    const result = yield call(imagePathAPI, action.data);

    yield put({
      type: IMAGE_PATH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IMAGE_PATH_FAILURE,
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
async function guideCreateAPI(data) {
  return await axios.post(`/api/product/bottom/create`, data);
}

function* guideCreate(action) {
  try {
    const result = yield call(guideCreateAPI, action.data);

    yield put({
      type: GUIDE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GUIDE_CREATE_FAILURE,
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
async function guideUpdateAPI(data) {
  return await axios.post(`/api/product/bottom/update`, data);
}

function* guideUpdate(action) {
  try {
    const result = yield call(guideUpdateAPI, action.data);

    yield put({
      type: GUIDE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GUIDE_UPDATE_FAILURE,
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
async function optListAPI(data) {
  return await axios.post(`/api/product/optList/list`, data);
}

function* optList(action) {
  try {
    const result = yield call(optListAPI, action.data);

    yield put({
      type: OPT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPT_LIST_FAILURE,
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
async function optCreateAPI(data) {
  return await axios.post(`/api/product/optList/create`, data);
}

function* optCreate(action) {
  try {
    const result = yield call(optCreateAPI, action.data);

    yield put({
      type: OPT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPT_CREATE_FAILURE,
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
async function optDeleteAPI(data) {
  return await axios.post(`/api/product/optList/delete`, data);
}

function* optDelete(action) {
  try {
    const result = yield call(optDeleteAPI, action.data);

    yield put({
      type: OPT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPT_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

/////////////////////// - TYPE - ///////////////////////

function* watchProductTypeList() {
  yield takeLatest(PRODUCT_TYPE_LIST_REQUEST, productTypeList);
}

function* watchProductTypeCreate() {
  yield takeLatest(PRODUCT_TYPE_CREATE_REQUEST, productTypeCreate);
}

function* watchProductTypeUpdate() {
  yield takeLatest(PRODUCT_TYPE_UPDATE_REQUEST, productTypeUpdate);
}

function* watchProductTypeDelete() {
  yield takeLatest(PRODUCT_TYPE_DELETE_REQUEST, productTypeDelete);
}

function* watchProductTypeSortUp() {
  yield takeLatest(PRODUCT_TYPE_SORT_UP_REQUEST, productTypeSortUp);
}

/////////////////////// - PRODUCT - ///////////////////////

function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}

function* watchProductDetail() {
  yield takeLatest(PRODUCT_DETAIL_REQUEST, productDetail);
}

function* watchProductCreate() {
  yield takeLatest(PRODUCT_CREATE_REQUEST, productCreate);
}

function* watchProductInfoUpdate() {
  yield takeLatest(PRODUCT_INFO_UPDATE_REQUEST, productInfoUpdate);
}

function* watchProductImageUpdate() {
  yield takeLatest(PRODUCT_IMAGE_UPDATE_REQUEST, productImageUpdate);
}

function* watchProductDelete() {
  yield takeLatest(PRODUCT_DELETE_REQUEST, productDelete);
}

function* watchAdminProductList() {
  yield takeLatest(ADMIN_PRODUCT_LIST_REQUEST, adminProductList);
}

function* watchImagePath() {
  yield takeLatest(IMAGE_PATH_REQUEST, imagePath);
}

/////////////////////// - OPTION - ///////////////////////

function* watchProductOptList() {
  yield takeLatest(PRODUCT_OPT_LIST_REQUEST, productOptList);
}

function* watchProductOptProdList() {
  yield takeLatest(PRODUCT_OPT_PROD_LIST_REQUEST, productOptProdList);
}

function* watchProductOptCreate() {
  yield takeLatest(PRODUCT_OPT_CREATE_REQUEST, productOptCreate);
}

function* watchProductOptUpdate() {
  yield takeLatest(PRODUCT_OPT_UPDATE_REQUEST, productOptUpdate);
}

function* watchProductOptDelete() {
  yield takeLatest(PRODUCT_OPT_DELETE_REQUEST, productOptDelete);
}

/////////////////////// - GUIDE - ///////////////////////

function* watchProductGuide() {
  yield takeLatest(PRODUCT_GUIDE_REQUEST, productGuide);
}

function* watchGuideUpdate() {
  yield takeLatest(GUIDE_UPDATE_REQUEST, guideUpdate);
}

function* watchGuideCreate() {
  yield takeLatest(GUIDE_CREATE_REQUEST, guideCreate);
}

/////////////////////// - PRODUCT OPTION - ///////////////////////

function* watchOptList() {
  yield takeLatest(OPT_LIST_REQUEST, optList);
}

function* watchOptCreate() {
  yield takeLatest(OPT_CREATE_REQUEST, optCreate);
}

function* watchOptDelete() {
  yield takeLatest(OPT_DELETE_REQUEST, optDelete);
}

//////////////////////////////////////////////////////////////
export default function* productSaga() {
  yield all([
    fork(watchProductTypeList),
    fork(watchProductTypeCreate),
    fork(watchProductTypeUpdate),
    fork(watchProductTypeDelete),
    fork(watchProductTypeSortUp),
    //
    fork(watchProductList),
    fork(watchProductDetail),
    fork(watchProductCreate),
    fork(watchProductInfoUpdate),
    fork(watchProductImageUpdate),
    fork(watchProductDelete),
    fork(watchAdminProductList),
    fork(watchImagePath),
    //
    fork(watchProductOptList),
    fork(watchProductOptProdList),
    fork(watchProductOptCreate),
    fork(watchProductOptUpdate),
    fork(watchProductOptDelete),
    //
    fork(watchProductGuide),
    fork(watchGuideUpdate),
    fork(watchGuideCreate),
    //
    fork(watchOptList),
    fork(watchOptCreate),
    fork(watchOptDelete),
    //
  ]);
}
