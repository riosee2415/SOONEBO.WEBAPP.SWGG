import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  // 주문내역
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_LIST_SUCCESS,
  BOUGHT_ADMIN_LIST_FAILURE,
  // 주문상세
  BOUGHT_DETAIL_REQUEST,
  BOUGHT_DETAIL_SUCCESS,
  BOUGHT_DETAIL_FAILURE,
  // 내 주문내역
  BOUGHT_LIST_REQUEST,
  BOUGHT_LIST_SUCCESS,
  BOUGHT_LIST_FAILURE,
  // 내 상세주문내역
  BOUGHT_DETAIL_LIST_REQUEST,
  BOUGHT_DETAIL_LIST_SUCCESS,
  BOUGHT_DETAIL_LIST_FAILURE,
  // 배송정보 입력
  BOUGHT_ADMIN_UPDATE_REQUEST,
  BOUGHT_ADMIN_UPDATE_SUCCESS,
  BOUGHT_ADMIN_UPDATE_FAILURE,
  // 주문하기
  BOUGHT_CREATE_REQUEST,
  BOUGHT_CREATE_SUCCESS,
  BOUGHT_CREATE_FAILURE,
  // 주문승인
  BOUGHT_COMPLETED_REQUEST,
  BOUGHT_COMPLETED_SUCCESS,
  BOUGHT_COMPLETED_FAILURE,
} from "../reducers/boughtHistory";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminListAPI(data) {
  return await axios.post(`/api/wish/bought/admin/list`, data);
}

function* boughtAdminList(action) {
  try {
    const result = yield call(boughtAdminListAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_LIST_FAILURE,
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
async function boughtDetailAPI(data) {
  return await axios.get(`/api/wish/bought/detail/${data.boughtId}`);
}

function* boughtDetail(action) {
  try {
    const result = yield call(boughtDetailAPI, action.data);

    yield put({
      type: BOUGHT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_DETAIL_FAILURE,
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
async function boughtListAPI(data) {
  return await axios.post(`/api/wish/bought/list`, data);
}

function* boughtList(action) {
  try {
    const result = yield call(boughtListAPI, action.data);

    yield put({
      type: BOUGHT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_LIST_FAILURE,
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
async function boughtDetailListAPI(data) {
  return await axios.post(`/api/wish/bought/detail`, data);
}

function* boughtDetailList(action) {
  try {
    const result = yield call(boughtDetailListAPI, action.data);

    yield put({
      type: BOUGHT_DETAIL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_DETAIL_LIST_FAILURE,
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
async function boughtAdminUpdateAPI(data) {
  return await axios.patch(`/api/wish/bought/admin/update`, data);
}

function* boughtAdminUpdate(action) {
  try {
    const result = yield call(boughtAdminUpdateAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_UPDATE_FAILURE,
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
async function boughtCreateAPI(data) {
  return await axios.post(`/api/wish/bought/create`, data);
}

function* boughtCreate(action) {
  try {
    const result = yield call(boughtCreateAPI, action.data);

    yield put({
      type: BOUGHT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_CREATE_FAILURE,
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
async function boughtCompletedAPI(data) {
  return await axios.post(`/api/wish/checkBank`, data);
}

function* boughtCompleted(action) {
  try {
    const result = yield call(boughtCompletedAPI, action.data);

    yield put({
      type: BOUGHT_COMPLETED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_COMPLETED_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchBoughtAdminList() {
  yield takeLatest(BOUGHT_ADMIN_LIST_REQUEST, boughtAdminList);
}

function* watchBoughtDetail() {
  yield takeLatest(BOUGHT_DETAIL_REQUEST, boughtDetail);
}

function* watchBoughtList() {
  yield takeLatest(BOUGHT_LIST_REQUEST, boughtList);
}

function* watchBoughtDetailList() {
  yield takeLatest(BOUGHT_DETAIL_LIST_REQUEST, boughtDetailList);
}

function* watchBoughtAdminUpdate() {
  yield takeLatest(BOUGHT_ADMIN_UPDATE_REQUEST, boughtAdminUpdate);
}

function* watchBoughtCreate() {
  yield takeLatest(BOUGHT_CREATE_REQUEST, boughtCreate);
}

function* watchBoughtCompleted() {
  yield takeLatest(BOUGHT_COMPLETED_REQUEST, boughtCompleted);
}

//////////////////////////////////////////////////////////////
export default function* boughtHistorySaga() {
  yield all([
    fork(watchBoughtAdminList),
    fork(watchBoughtDetail),
    fork(watchBoughtList),
    fork(watchBoughtDetailList),
    fork(watchBoughtAdminUpdate),
    fork(watchBoughtCreate),
    fork(watchBoughtCompleted),
    //
  ]);
}
