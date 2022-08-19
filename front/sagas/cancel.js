import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_CANCEL_LIST_REQUEST,
  MY_CANCEL_LIST_SUCCESS,
  MY_CANCEL_LIST_FAILURE,
  //
  ADMIN_CANCEL_LIST_REQUEST,
  ADMIN_CANCEL_LIST_SUCCESS,
  ADMIN_CANCEL_LIST_FAILURE,
  //
  DETAIL_CANCEL_REQUEST,
  DETAIL_CANCEL_SUCCESS,
  DETAIL_CANCEL_FAILURE,
  //
  CANCEL_CREATE_REQUEST,
  CANCEL_CREATE_SUCCESS,
  CANCEL_CREATE_FAILURE,
  //
  CANCEL_UPDATE_REQUEST,
  CANCEL_UPDATE_SUCCESS,
  CANCEL_UPDATE_FAILURE,
} from "../reducers/cancel";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function myCancelListAPI(data) {
  return axios.post(`/api/cancel/user/list`, data);
}

function* myCancelList(action) {
  try {
    const result = yield call(myCancelListAPI, action.data);

    yield put({
      type: MY_CANCEL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_CANCEL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function adminCancelListAPI(data) {
  return axios.post(`/api/cancel/admin/list`, data);
}

function* adminCancelList(action) {
  try {
    const result = yield call(adminCancelListAPI, action.data);

    yield put({
      type: ADMIN_CANCEL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_CANCEL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function detailCancelAPI(data) {
  return axios.post(`/api/cancel/detail`, data);
}

function* detailCancel(action) {
  try {
    const result = yield call(detailCancelAPI, action.data);

    yield put({
      type: DETAIL_CANCEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DETAIL_CANCEL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function cancelCreateAPI(data) {
  return axios.post(`/api/cancel/create`, data);
}

function* cancelCreate(action) {
  try {
    const result = yield call(cancelCreateAPI, action.data);

    yield put({
      type: CANCEL_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function cancelUpdateAPI(data) {
  return axios.post(`/api/cancel/update`, data);
}

function* cancelUpdate(action) {
  try {
    const result = yield call(cancelUpdateAPI, action.data);

    yield put({
      type: CANCEL_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////
function* watchMyCancelList() {
  yield takeLatest(MY_CANCEL_LIST_REQUEST, myCancelList);
}

function* watchAdminCancelList() {
  yield takeLatest(ADMIN_CANCEL_LIST_REQUEST, adminCancelList);
}

function* watchDetailCancel() {
  yield takeLatest(DETAIL_CANCEL_REQUEST, detailCancel);
}

function* watchCancelCreate() {
  yield takeLatest(CANCEL_CREATE_REQUEST, cancelCreate);
}

function* watchCancelUpdate() {
  yield takeLatest(CANCEL_UPDATE_REQUEST, cancelUpdate);
}

//////////////////////////////////////////////////////////////
export default function* cancelSaga() {
  yield all([
    fork(watchMyCancelList),
    fork(watchAdminCancelList),
    fork(watchDetailCancel),
    fork(watchCancelCreate),
    fork(watchCancelUpdate),

    //
  ]);
}
