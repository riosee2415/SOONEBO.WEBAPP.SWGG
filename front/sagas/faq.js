import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  /////// TYPE
  FAQ_TYPE_LIST_REQUEST,
  FAQ_TYPE_LIST_SUCCESS,
  FAQ_TYPE_LIST_FAILURE,
  //
  FAQ_TYPE_CREATE_REQUEST,
  FAQ_TYPE_CREATE_SUCCESS,
  FAQ_TYPE_CREATE_FAILURE,
  //
  FAQ_TYPE_UPDATE_SUCCESS,
  FAQ_TYPE_UPDATE_FAILURE,
  FAQ_TYPE_UPDATE_REQUEST,
  //
  FAQ_TYPE_DELETE_REQUEST,
  FAQ_TYPE_DELETE_SUCCESS,
  FAQ_TYPE_DELETE_FAILURE,
  //
  FAQ_ADMIN_LIST_REQUEST,
  FAQ_ADMIN_LIST_SUCCESS,
  FAQ_ADMIN_LIST_FAILURE,
  //
  FAQ_TYPE_GETDATA_REQUEST,
  FAQ_TYPE_GETDATA_SUCCESS,
  FAQ_TYPE_GETDATA_FAILURE,
  //
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAILURE,
  //
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAILURE,
  //
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAILURE,
  //
  FAQ_GRAPH_REQUEST,
  FAQ_GRAPH_SUCCESS,
  FAQ_GRAPH_FAILURE,
  //
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
  FAQ_LIST_FAILURE,
} from "../reducers/faq";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function faqTypeListAPI(data) {
  return await axios.post(`/api/faq/type/list`, data);
}

function* faqTypeList(action) {
  try {
    const result = yield call(faqTypeListAPI, action.data);

    yield put({
      type: FAQ_TYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_LIST_FAILURE,
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
async function faqTypeCreateAPI(data) {
  return await axios.post(`/api/faq/type/create`, data);
}

function* faqTypeCreate(action) {
  try {
    const result = yield call(faqTypeCreateAPI, action.data);

    yield put({
      type: FAQ_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_CREATE_FAILURE,
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
async function faqTypeUpdateAPI(data) {
  return await axios.patch(`/api/faq/type/update`, data);
}

function* faqTypeUpdate(action) {
  try {
    const result = yield call(faqTypeUpdateAPI, action.data);

    yield put({
      type: FAQ_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_UPDATE_FAILURE,
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
async function faqTypeDeleteAPI(data) {
  return await axios.patch(`/api/faq/type/delete`, data);
}

function* faqTypeDelete(action) {
  try {
    const result = yield call(faqTypeDeleteAPI, action.data);

    yield put({
      type: FAQ_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_DELETE_FAILURE,
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
async function faqAdminListAPI(data) {
  return await axios.post(`/api/faq/admin/list`, data);
}

function* faqAdminList(action) {
  try {
    const result = yield call(faqAdminListAPI, action.data);

    yield put({
      type: FAQ_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_ADMIN_LIST_FAILURE,
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
async function faqTypeGetDataAPI(data) {
  return await axios.post(`/api/faq/type/faqGet`, data);
}

function* faqTypeGetData(action) {
  try {
    const result = yield call(faqTypeGetDataAPI, action.data);

    yield put({
      type: FAQ_TYPE_GETDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_GETDATA_FAILURE,
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
async function faqUpdateAPI(data) {
  return await axios.patch(`/api/faq/update`, data);
}

function* faqUpdate(action) {
  try {
    const result = yield call(faqUpdateAPI, action.data);

    yield put({
      type: FAQ_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_UPDATE_FAILURE,
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
async function faqCreateAPI(data) {
  return await axios.post(`/api/faq/create`, data);
}

function* faqCreate(action) {
  try {
    const result = yield call(faqCreateAPI, action.data);

    yield put({
      type: FAQ_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_CREATE_FAILURE,
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
async function faqDeleteAPI(data) {
  return await axios.patch(`/api/faq/delete`, data);
}

function* faqDelete(action) {
  try {
    const result = yield call(faqDeleteAPI, action.data);

    yield put({
      type: FAQ_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_DELETE_FAILURE,
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
async function faqGraphAPI(data) {
  return await axios.post(`/api/faq/admin/graph`, data);
}

function* faqGraph(action) {
  try {
    const result = yield call(faqGraphAPI, action.data);

    yield put({
      type: FAQ_GRAPH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_GRAPH_FAILURE,
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
async function faqListAPI(data) {
  return await axios.post(`/api/faq/list`, data);
}

function* faqList(action) {
  try {
    const result = yield call(faqListAPI, action.data);

    yield put({
      type: FAQ_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_LIST_FAILURE,
      data: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchFaqTypeList() {
  yield takeLatest(FAQ_TYPE_LIST_REQUEST, faqTypeList);
}

function* watchFaqTypeCreate() {
  yield takeLatest(FAQ_TYPE_CREATE_REQUEST, faqTypeCreate);
}

function* watchFaqTypeUpdate() {
  yield takeLatest(FAQ_TYPE_UPDATE_REQUEST, faqTypeUpdate);
}

function* watchFaqTypeDelete() {
  yield takeLatest(FAQ_TYPE_DELETE_REQUEST, faqTypeDelete);
}

function* watchFaqAdminList() {
  yield takeLatest(FAQ_ADMIN_LIST_REQUEST, faqAdminList);
}

function* watchFaqTypeGetData() {
  yield takeLatest(FAQ_TYPE_GETDATA_REQUEST, faqTypeGetData);
}

function* watchFaqUpdate() {
  yield takeLatest(FAQ_UPDATE_REQUEST, faqUpdate);
}

function* watchFaqCreate() {
  yield takeLatest(FAQ_CREATE_REQUEST, faqCreate);
}

function* watchFaqDelete() {
  yield takeLatest(FAQ_DELETE_REQUEST, faqDelete);
}

function* watchFaqGraph() {
  yield takeLatest(FAQ_GRAPH_REQUEST, faqGraph);
}

function* watchFaqList() {
  yield takeLatest(FAQ_LIST_REQUEST, faqList);
}

//////////////////////////////////////////////////////////////
export default function* faqSaga() {
  yield all([
    fork(watchFaqTypeList),
    fork(watchFaqTypeCreate),
    fork(watchFaqTypeUpdate),
    fork(watchFaqTypeDelete),
    fork(watchFaqAdminList),
    fork(watchFaqTypeGetData),
    fork(watchFaqUpdate),
    fork(watchFaqCreate),
    fork(watchFaqDelete),
    fork(watchFaqGraph),
    fork(watchFaqList),
    //
  ]);
}
