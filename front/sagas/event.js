import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAILURE,
  //
  EVENT_FILE_REQUEST,
  EVENT_FILE_SUCCESS,
  EVENT_FILE_FAILURE,
  //
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_DETAIL_FAILURE,
  //
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAILURE,
  //
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAILURE,
  //
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
  RESULT_LIST_FAILURE,
  //
  RESULT_DETAIL_REQUEST,
  RESULT_DETAIL_SUCCESS,
  RESULT_DETAIL_FAILURE,
  //
  RESULT_CREATE_REQUEST,
  RESULT_CREATE_SUCCESS,
  RESULT_CREATE_FAILURE,
  //
  RESULT_DELETE_REQUEST,
  RESULT_DELETE_SUCCESS,
  RESULT_DELETE_FAILURE,
  //
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAILURE,
  //
  EVENT_FRONT_REQUEST,
  EVENT_FRONT_SUCCESS,
  EVENT_FRONT_FAILURE,
  //
  EVENT_THUMBNAIL_REQUEST,
  EVENT_THUMBNAIL_SUCCESS,
  EVENT_THUMBNAIL_FAILURE,
} from "../reducers/event";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function eventListAPI(data) {
  return await axios.post(`/api/event/admin/list`, data);
}

function* eventList(action) {
  try {
    const result = yield call(eventListAPI, action.data);

    yield put({
      type: EVENT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_LIST_FAILURE,
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
async function eventFileAPI(data) {
  return await axios.post(`/api/event/image`, data);
}

function* eventFile(action) {
  try {
    const result = yield call(eventFileAPI, action.data);

    yield put({
      type: EVENT_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_FILE_FAILURE,
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
async function thumbnailAPI(data) {
  return await axios.post(`/api/event/image`, data);
}

function* thumbnail(action) {
  try {
    const result = yield call(thumbnailAPI, action.data);

    yield put({
      type: EVENT_THUMBNAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_THUMBNAIL_FAILURE,
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
async function eventDetailAPI(data) {
  return await axios.get(`/api/event/detail/${data}`);
}

function* eventDetail(action) {
  try {
    const result = yield call(eventDetailAPI, action.data);

    yield put({
      type: EVENT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DETAIL_FAILURE,
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
async function eventUpdateAPI(data) {
  return await axios.patch(`/api/event/update`, data);
}

function* eventUpdate(action) {
  try {
    const result = yield call(eventUpdateAPI, action.data);

    yield put({
      type: EVENT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPDATE_FAILURE,
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
async function eventCreateAPI(data) {
  return await axios.post(`/api/event/create`, data);
}

function* eventCreate(action) {
  try {
    const result = yield call(eventCreateAPI, action.data);

    yield put({
      type: EVENT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_CREATE_FAILURE,
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
async function eventDeleteAPI(data) {
  return await axios.patch(`/api/event/delete`, data);
}

function* eventDelete(action) {
  try {
    const result = yield call(eventDeleteAPI, action.data);

    yield put({
      type: EVENT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DELETE_FAILURE,
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
async function resultListAPI(data) {
  return await axios.post(`/api/event/result/list`, data);
}

function* resultList(action) {
  try {
    const result = yield call(resultListAPI, action.data);

    yield put({
      type: RESULT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESULT_LIST_FAILURE,
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
async function resultDetailAPI(data) {
  return await axios.get(`/api/event/result/detail/${data}`);
}

function* resultDetail(action) {
  try {
    const result = yield call(resultDetailAPI, action.data);

    yield put({
      type: RESULT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESULT_DETAIL_FAILURE,
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
async function resultCreateAPI(data) {
  return await axios.post(`/api/event/result/create`, data);
}

function* resultCreate(action) {
  try {
    const result = yield call(resultCreateAPI, action.data);

    yield put({
      type: RESULT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESULT_CREATE_FAILURE,
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
async function resultDeleteAPI(data) {
  return await axios.patch(`/api/event/result/delete`, data);
}

function* resultDelete(action) {
  try {
    const result = yield call(resultDeleteAPI, action.data);

    yield put({
      type: RESULT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESULT_DELETE_FAILURE,
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
async function eventFrontAPI(data) {
  return await axios.post(`/api/event/user/list`, data);
}

function* eventFront(action) {
  try {
    const result = yield call(eventFrontAPI, action.data);

    yield put({
      type: EVENT_FRONT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_FRONT_FAILURE,
      data: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchEventList() {
  yield takeLatest(EVENT_LIST_REQUEST, eventList);
}

function* watchEventFile() {
  yield takeLatest(EVENT_FILE_REQUEST, eventFile);
}

function* watchEventThumbnail() {
  yield takeLatest(EVENT_THUMBNAIL_REQUEST, thumbnail);
}

function* watchEventDetail() {
  yield takeLatest(EVENT_DETAIL_REQUEST, eventDetail);
}

function* watchEventUpdate() {
  yield takeLatest(EVENT_UPDATE_REQUEST, eventUpdate);
}

function* watchEventCreate() {
  yield takeLatest(EVENT_CREATE_REQUEST, eventCreate);
}

function* watchEventDelete() {
  yield takeLatest(EVENT_DELETE_REQUEST, eventDelete);
}

function* watchResultList() {
  yield takeLatest(RESULT_LIST_REQUEST, resultList);
}

function* watchResultDetail() {
  yield takeLatest(RESULT_DETAIL_REQUEST, resultDetail);
}

function* watchResultCreate() {
  yield takeLatest(RESULT_CREATE_REQUEST, resultCreate);
}

function* watchResultDelete() {
  yield takeLatest(RESULT_DELETE_REQUEST, resultDelete);
}

function* watchEventFront() {
  yield takeLatest(EVENT_FRONT_REQUEST, eventFront);
}

//////////////////////////////////////////////////////////////
export default function* eventSaga() {
  yield all([
    fork(watchEventList),
    fork(watchEventFile),
    fork(watchEventThumbnail),
    fork(watchEventDetail),
    fork(watchEventUpdate),
    fork(watchEventCreate),
    fork(watchEventDelete),
    fork(watchResultList),
    fork(watchResultDetail),
    fork(watchResultCreate),
    fork(watchResultDelete),
    fork(watchEventFront),

    //
  ]);
}
