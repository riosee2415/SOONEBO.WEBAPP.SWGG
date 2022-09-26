import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PERSNAL_LIST_REQUEST,
  PERSNAL_LIST_SUCCESS,
  PERSNAL_LIST_FAILURE,
  //
  AGENCY_SALES_LIST_REQUEST,
  AGENCY_SALES_LIST_SUCCESS,
  AGENCY_SALES_LIST_FAILURE,
  //
  IN_AGENCY_SALES_LIST_REQUEST,
  IN_AGENCY_SALES_LIST_SUCCESS,
  IN_AGENCY_SALES_LIST_FAILURE,
  //
  PERSNAL_ALL_LIST_REQUEST,
  PERSNAL_ALL_LIST_SUCCESS,
  PERSNAL_ALL_LIST_FAILURE,
  //
  PERSNAL_ALL_UPDATE_REQUEST,
  PERSNAL_ALL_UPDATE_SUCCESS,
  PERSNAL_ALL_UPDATE_FAILURE,
  //
  PERSONAL_CAL_LIST_REQUEST,
  PERSONAL_CAL_LIST_SUCCESS,
  PERSONAL_CAL_LIST_FAILURE,
  //
  PERSONAL_CAL_UPDATE_REQUEST,
  PERSONAL_CAL_UPDATE_SUCCESS,
  PERSONAL_CAL_UPDATE_FAILURE,
  //
  PERSONAL_MYPAGE_REQUEST,
  PERSONAL_MYPAGE_SUCCESS,
  PERSONAL_MYPAGE_FAILURE,
  //
  PERSONAL_MYPAGE_ME_REQUEST,
  PERSONAL_MYPAGE_ME_SUCCESS,
  PERSONAL_MYPAGE_ME_FAILURE,
  //
  PERSONAL_MYPAGE_YOU_REQUEST,
  PERSONAL_MYPAGE_YOU_SUCCESS,
  PERSONAL_MYPAGE_YOU_FAILURE,
} from "../reducers/sale";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function persnalListAPI(data) {
  return await axios.post("/api/sale/persnalData", data);
}

function* persnalList(action) {
  try {
    const result = yield call(persnalListAPI, action.data);
    yield put({
      type: PERSNAL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSNAL_LIST_FAILURE,
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
async function agencySalesAPI(data) {
  return await axios.post("/api/sale/grlist", data);
}

function* agencySales(action) {
  try {
    const result = yield call(agencySalesAPI, action.data);
    yield put({
      type: AGENCY_SALES_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AGENCY_SALES_LIST_FAILURE,
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
async function inAgencySalesAPI(data) {
  return await axios.post("/api/sale/inAgencySales", data);
}

function* inAgencySales(action) {
  try {
    const result = yield call(inAgencySalesAPI, action.data);
    yield put({
      type: IN_AGENCY_SALES_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IN_AGENCY_SALES_LIST_FAILURE,
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
async function persnalAllListAPI(data) {
  return await axios.post("/api/sale/persnal/cal", data);
}

function* persnalAllList(action) {
  try {
    const result = yield call(persnalAllListAPI, action.data);
    yield put({
      type: PERSNAL_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSNAL_ALL_LIST_FAILURE,
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
async function persnalAllUpdateAPI(data) {
  return await axios.post("/api/sale/persnal/cal/completed", data);
}

function* persnalAllUpdate(action) {
  try {
    const result = yield call(persnalAllUpdateAPI, action.data);
    yield put({
      type: PERSNAL_ALL_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSNAL_ALL_UPDATE_FAILURE,
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
async function persnalCalListAPI(data) {
  return await axios.post("/api/sale/persnal/cal", data);
}

function* persnalCalList(action) {
  try {
    const result = yield call(persnalCalListAPI, action.data);
    yield put({
      type: PERSONAL_CAL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSONAL_CAL_LIST_FAILURE,
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
async function persnalCalUpdateAPI(data) {
  return await axios.post("/api/sale/persnal/cal/completed", data);
}

function* persnalCalUpdate(action) {
  try {
    const result = yield call(persnalCalUpdateAPI, action.data);
    yield put({
      type: PERSONAL_CAL_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSONAL_CAL_UPDATE_FAILURE,
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
async function persnalMypageAPI(data) {
  return await axios.post("/api/sale/myPage/list", data);
}

function* persnalMypage(action) {
  try {
    const result = yield call(persnalMypageAPI, action.data);
    yield put({
      type: PERSONAL_MYPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSONAL_MYPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function persnalMypageMeAPI(data) {
  return await axios.post("/api/sale/myPage/list/my", data);
}

function* persnalMypageMe(action) {
  try {
    const result = yield call(persnalMypageMeAPI, action.data);
    yield put({
      type: PERSONAL_MYPAGE_ME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSONAL_MYPAGE_ME_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function persnalMypageYouAPI(data) {
  return await axios.post("/api/sale/myPage/list/you", data);
}

function* persnalMypageYou(action) {
  try {
    const result = yield call(persnalMypageYouAPI, action.data);
    yield put({
      type: PERSONAL_MYPAGE_YOU_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PERSONAL_MYPAGE_YOU_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchPersnalList() {
  yield takeLatest(PERSNAL_LIST_REQUEST, persnalList);
}

function* watchAgencySales() {
  yield takeLatest(AGENCY_SALES_LIST_REQUEST, agencySales);
}

function* watchInAgencySales() {
  yield takeLatest(IN_AGENCY_SALES_LIST_REQUEST, inAgencySales);
}

function* watchPersnalAllList() {
  yield takeLatest(PERSNAL_ALL_LIST_REQUEST, persnalAllList);
}

function* watchPersnalAllUpdate() {
  yield takeLatest(PERSNAL_ALL_UPDATE_REQUEST, persnalAllUpdate);
}

function* watchPersnalCalList() {
  yield takeLatest(PERSONAL_CAL_LIST_REQUEST, persnalCalList);
}

function* watchPersnalCalUpdate() {
  yield takeLatest(PERSONAL_CAL_UPDATE_REQUEST, persnalCalUpdate);
}

function* watchPersnalMypage() {
  yield takeLatest(PERSONAL_MYPAGE_REQUEST, persnalMypage);
}

function* watchPersnalMypageMe() {
  yield takeLatest(PERSONAL_MYPAGE_ME_REQUEST, persnalMypageMe);
}

function* watchPersnalMypageYou() {
  yield takeLatest(PERSONAL_MYPAGE_YOU_REQUEST, persnalMypageYou);
}

//////////////////////////////////////////////////////////////
export default function* saleSaga() {
  yield all([
    fork(watchPersnalList),
    fork(watchAgencySales),
    fork(watchInAgencySales),
    fork(watchPersnalAllList),
    fork(watchPersnalAllUpdate),
    fork(watchPersnalCalList),
    fork(watchPersnalCalUpdate),
    fork(watchPersnalMypage),
    fork(watchPersnalMypageMe),
    fork(watchPersnalMypageYou),
    //
  ]);
}
