import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  OPINION_GET_REQUEST,
  OPINION_GET_SUCCESS,
  OPINION_GET_FAILURE,
  //
  MY_OPINION_LIST_REQUEST,
  MY_OPINION_LIST_SUCCESS,
  MY_OPINION_LIST_FAILURE,
  //
  OPINION_CREATE_REQUEST,
  OPINION_CREATE_SUCCESS,
  OPINION_CREATE_FAILURE,
  //
  OPINION_UPDATE_REQUEST,
  OPINION_UPDATE_SUCCESS,
  OPINION_UPDATE_FAILURE,
  // ************************************************
  OPINION_TYPE_GET_REQUEST,
  OPINION_TYPE_GET_SUCCESS,
  OPINION_TYPE_GET_FAILURE,
  //
  OPINION_TYPE_CREATE_REQUEST,
  OPINION_TYPE_CREATE_SUCCESS,
  OPINION_TYPE_CREATE_FAILURE,
  //
  OPINION_TYPE_UPDATE_REQUEST,
  OPINION_TYPE_UPDATE_SUCCESS,
  OPINION_TYPE_UPDATE_FAILURE,
  //
  OPINION_TYPE_DELETE_REQUEST,
  OPINION_TYPE_DELETE_SUCCESS,
  OPINION_TYPE_DELETE_FAILURE,
} from "../reducers/opinion";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function opinionGetAPI(data) {
  return await axios.post(`/api/opinion/list`, data);
}

function* opinionGet(action) {
  try {
    const result = yield call(opinionGetAPI, action.data);

    yield put({
      type: OPINION_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_GET_FAILURE,
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
async function myOpinionListAPI(data) {
  return await axios.post(`/api/opinion/my/list`, data);
}

function* myOpinionList(action) {
  try {
    const result = yield call(myOpinionListAPI, action.data);

    yield put({
      type: MY_OPINION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_OPINION_LIST_FAILURE,
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
async function opinionCreateAPI(data) {
  return await axios.post(`/api/opinion/create`, data);
}

function* opinionCreate(action) {
  try {
    const result = yield call(opinionCreateAPI, action.data);

    yield put({
      type: OPINION_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_CREATE_FAILURE,
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
async function opinionUpdateAPI(data) {
  return await axios.patch(`/api/opinion/update`, data);
}

function* opinionUpdate(action) {
  try {
    const result = yield call(opinionUpdateAPI, action.data);

    yield put({
      type: OPINION_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_UPDATE_FAILURE,
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
async function opinionTypeGetAPI() {
  return await axios.get(`/api/opinion/type/list`);
}

function* opinionTypeGet() {
  try {
    const result = yield call(opinionTypeGetAPI);

    yield put({
      type: OPINION_TYPE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_TYPE_GET_FAILURE,
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
async function opinionTypeCreateAPI(data) {
  return await axios.post(`/api/opinion/type/create`, data);
}

function* opinionTypeCreate(action) {
  try {
    const result = yield call(opinionTypeCreateAPI, action.data);

    yield put({
      type: OPINION_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_TYPE_CREATE_FAILURE,
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
async function opinionTypeUpdateAPI(data) {
  return await axios.patch(`/api/opinion/type/update`, data);
}

function* opinionTypeUpdate(action) {
  try {
    const result = yield call(opinionTypeUpdateAPI, action.data);

    yield put({
      type: OPINION_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_TYPE_UPDATE_FAILURE,
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
async function opinionTypeDeleteAPI(data) {
  return await axios.patch(`/api/opinion/type/delete`, data);
}

function* opinionTypeDelete(action) {
  try {
    const result = yield call(opinionTypeDeleteAPI, action.data);

    yield put({
      type: OPINION_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OPINION_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchOpinionGet() {
  yield takeLatest(OPINION_GET_REQUEST, opinionGet);
}

function* watchMyOpinionList() {
  yield takeLatest(MY_OPINION_LIST_REQUEST, myOpinionList);
}

function* watchOpinionCreate() {
  yield takeLatest(OPINION_CREATE_REQUEST, opinionCreate);
}

function* watchOpinionUpdate() {
  yield takeLatest(OPINION_UPDATE_REQUEST, opinionUpdate);
}

// ****************************************************************

function* watchOpinionTypeGet() {
  yield takeLatest(OPINION_TYPE_GET_REQUEST, opinionTypeGet);
}

function* watchOpinionTypeCreate() {
  yield takeLatest(OPINION_TYPE_CREATE_REQUEST, opinionTypeCreate);
}

function* watchOpinionTypeUpdate() {
  yield takeLatest(OPINION_TYPE_UPDATE_REQUEST, opinionTypeUpdate);
}

function* watchOpinionTypeDelete() {
  yield takeLatest(OPINION_TYPE_DELETE_REQUEST, opinionTypeDelete);
}

//////////////////////////////////////////////////////////////
export default function* opinionSaga() {
  yield all([
    fork(watchOpinionGet),
    fork(watchMyOpinionList),
    fork(watchOpinionCreate),
    fork(watchOpinionUpdate),

    // ****************************************************************

    fork(watchOpinionTypeGet),
    fork(watchOpinionTypeCreate),
    fork(watchOpinionTypeUpdate),
    fork(watchOpinionTypeDelete),
    //
  ]);
}
