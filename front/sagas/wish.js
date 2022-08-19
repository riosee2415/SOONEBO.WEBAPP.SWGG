import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  WISH_LIST_REQUEST,
  WISH_LIST_SUCCESS,
  WISH_LIST_FAILURE,
  //
  WISH_ITEM_BUY_CREATE_REQUEST,
  WISH_ITEM_BUY_CREATE_SUCCESS,
  WISH_ITEM_BUY_CREATE_FAILURE,
  //
  WISH_ITEM_BUY_ADD_REQUEST,
  WISH_ITEM_BUY_ADD_SUCCESS,
  WISH_ITEM_BUY_ADD_FAILURE,
  //
  WISH_ITEM_CREATE_REQUEST,
  WISH_ITEM_CREATE_SUCCESS,
  WISH_ITEM_CREATE_FAILURE,
  //
  WISH_CREATE_REQUEST,
  WISH_CREATE_SUCCESS,
  WISH_CREATE_FAILURE,
  //
  WISH_UPDATE_REQUEST,
  WISH_UPDATE_SUCCESS,
  WISH_UPDATE_FAILURE,
  //
  WISH_DELETE_REQUEST,
  WISH_DELETE_SUCCESS,
  WISH_DELETE_FAILURE,
  //
  WISH_ALL_DELETE_REQUEST,
  WISH_ALL_DELETE_SUCCESS,
  WISH_ALL_DELETE_FAILURE,
  //
  WISH_ORDER_LIST_REQUEST,
  WISH_ORDER_LIST_SUCCESS,
  WISH_ORDER_LIST_FAILURE,
} from "../reducers/wish";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function wishListAPI(data) {
  return await axios.get(`/api/wish/list/view`, data);
}

function* wishList(action) {
  try {
    const result = yield call(wishListAPI, action.data);

    yield put({
      type: WISH_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_FAILURE,
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
async function wishItemBuyCreateAPI(data) {
  return await axios.post(`/api/wish/item/create`, data);
}

function* wishItemBuyCreate(action) {
  try {
    const result = yield call(wishItemBuyCreateAPI, action.data);

    yield put({
      type: WISH_ITEM_BUY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ITEM_BUY_CREATE_FAILURE,
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
async function wishItemBuyAddAPI(data) {
  return await axios.post(`/api/wish/list/add`, data);
}

function* wishItemBuyAdd(action) {
  try {
    const result = yield call(wishItemBuyAddAPI, action.data);

    yield put({
      type: WISH_ITEM_BUY_ADD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ITEM_BUY_ADD_FAILURE,
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
async function wishItemCreateAPI(data) {
  return await axios.post(`/api/wish/item/create`, data);
}

function* wishItemCreate(action) {
  try {
    const result = yield call(wishItemCreateAPI, action.data);

    yield put({
      type: WISH_ITEM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ITEM_CREATE_FAILURE,
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
async function wishCreateAPI(data) {
  return await axios.post(`/api/wish/list/add`, data);
}

function* wishCreate(action) {
  try {
    const result = yield call(wishCreateAPI, action.data);

    yield put({
      type: WISH_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_CREATE_FAILURE,
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
async function wishUpdateAPI(data) {
  return await axios.patch(`/api/wish/item/update`, data);
}

function* wishUpdate(action) {
  try {
    const result = yield call(wishUpdateAPI, action.data);

    yield put({
      type: WISH_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_UPDATE_FAILURE,
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
async function wishDeleteAPI(data) {
  return await axios.delete(`/api/wish/item/delete/${data.itemId}`);
}

function* wishDelete(action) {
  try {
    const result = yield call(wishDeleteAPI, action.data);

    yield put({
      type: WISH_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_DELETE_FAILURE,
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
async function wishAllDeleteAPI(data) {
  return await axios.post(`/api/wish/item/deleteAll`, data);
}

function* wishAllDelete(action) {
  try {
    const result = yield call(wishAllDeleteAPI, action.data);

    yield put({
      type: WISH_ALL_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ALL_DELETE_FAILURE,
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
async function wishOrderListAPI(data) {
  return await axios.post(`/api/wish/order/list`, data);
}

function* wishOrderList(action) {
  try {
    const result = yield call(wishOrderListAPI, action.data);

    yield put({
      type: WISH_ORDER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ORDER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchWishList() {
  yield takeLatest(WISH_LIST_REQUEST, wishList);
}

function* watchWishItemBuyCreate() {
  yield takeLatest(WISH_ITEM_BUY_CREATE_REQUEST, wishItemBuyCreate);
}

function* watchWishItemBuyAdd() {
  yield takeLatest(WISH_ITEM_BUY_ADD_REQUEST, wishItemBuyAdd);
}

function* watchWishItemCreate() {
  yield takeLatest(WISH_ITEM_CREATE_REQUEST, wishItemCreate);
}

function* watchWishCreate() {
  yield takeLatest(WISH_CREATE_REQUEST, wishCreate);
}

function* watchWishUpdate() {
  yield takeLatest(WISH_UPDATE_REQUEST, wishUpdate);
}

function* watchWishDelete() {
  yield takeLatest(WISH_DELETE_REQUEST, wishDelete);
}

function* watchWishAllDelete() {
  yield takeLatest(WISH_ALL_DELETE_REQUEST, wishAllDelete);
}

function* watchWishOrderList() {
  yield takeLatest(WISH_ORDER_LIST_REQUEST, wishOrderList);
}

//////////////////////////////////////////////////////////////
export default function* wishSaga() {
  yield all([
    fork(watchWishList),
    fork(watchWishItemBuyCreate),
    fork(watchWishItemBuyAdd),
    fork(watchWishItemCreate),
    fork(watchWishCreate),
    fork(watchWishUpdate),
    fork(watchWishDelete),
    fork(watchWishAllDelete),
    fork(watchWishOrderList),

    //
  ]);
}
