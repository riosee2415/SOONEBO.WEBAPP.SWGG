import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADMIN_QNA_LIST_REQUEST,
  ADMIN_QNA_LIST_SUCCESS,
  ADMIN_QNA_LIST_FAILURE,
  //
  PRODUCT_QNA_LIST_REQUEST,
  PRODUCT_QNA_LIST_SUCCESS,
  PRODUCT_QNA_LIST_FAILURE,
  //
  MY_QNA_LIST_REQUEST,
  MY_QNA_LIST_SUCCESS,
  MY_QNA_LIST_FAILURE,
  //
  ALL_QNA_LIST_REQUEST,
  ALL_QNA_LIST_SUCCESS,
  ALL_QNA_LIST_FAILURE,
  //
  QNA_CREATE_REQUEST,
  QNA_CREATE_SUCCESS,
  QNA_CREATE_FAILURE,
  //
  QNA_UPDATE_REQUEST,
  QNA_UPDATE_SUCCESS,
  QNA_UPDATE_FAILURE,
} from "../reducers/qna";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminQnaListAPI(data) {
  return await axios.post(`/api/qna/admin/list`, data);
}

function* adminQnaList(action) {
  try {
    const result = yield call(adminQnaListAPI, action.data);

    yield put({
      type: ADMIN_QNA_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMIN_QNA_LIST_FAILURE,
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
async function productQnaListAPI(data) {
  return await axios.post(`/api/qna/product/list`, data);
}

function* productQnaList(action) {
  try {
    const result = yield call(productQnaListAPI, action.data);

    yield put({
      type: PRODUCT_QNA_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_QNA_LIST_FAILURE,
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
async function myQnaListAPI(data) {
  return await axios.post(`/api/qna/my/list`, data);
}

function* myQnaList(action) {
  try {
    const result = yield call(myQnaListAPI, action.data);

    yield put({
      type: MY_QNA_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_QNA_LIST_FAILURE,
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
async function allQnaListAPI(data) {
  return await axios.post(`/api/qna/list`, data);
}

function* allQnaList(action) {
  try {
    const result = yield call(allQnaListAPI, action.data);

    yield put({
      type: ALL_QNA_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALL_QNA_LIST_FAILURE,
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
async function qnaCreateAPI(data) {
  return await axios.post(`/api/qna/create`, data);
}

function* qnaCreate(action) {
  try {
    const result = yield call(qnaCreateAPI, action.data);

    yield put({
      type: QNA_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QNA_CREATE_FAILURE,
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
async function qnaUpdateAPI(data) {
  return await axios.patch(`/api/qna/update`, data);
}

function* qnaUpdate(action) {
  try {
    const result = yield call(qnaUpdateAPI, action.data);

    yield put({
      type: QNA_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: QNA_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchAdminQnaList() {
  yield takeLatest(ADMIN_QNA_LIST_REQUEST, adminQnaList);
}

function* watchProductQnaList() {
  yield takeLatest(PRODUCT_QNA_LIST_REQUEST, productQnaList);
}

function* watchMyQnaList() {
  yield takeLatest(MY_QNA_LIST_REQUEST, myQnaList);
}

function* watchAllQnaList() {
  yield takeLatest(ALL_QNA_LIST_REQUEST, allQnaList);
}

function* watchQnaCreate() {
  yield takeLatest(QNA_CREATE_REQUEST, qnaCreate);
}

function* watchQnaUpdate() {
  yield takeLatest(QNA_UPDATE_REQUEST, qnaUpdate);
}

//////////////////////////////////////////////////////////////
export default function* qnaSaga() {
  yield all([
    fork(watchAdminQnaList),
    fork(watchProductQnaList),
    fork(watchMyQnaList),
    fork(watchAllQnaList),
    fork(watchQnaCreate),
    fork(watchQnaUpdate),

    //
  ]);
}
