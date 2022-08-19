import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  AGENCY_LIST_REQUEST,
  AGENCY_LIST_SUCCESS,
  AGENCY_LIST_FAILURE,
  //
  SEARCH_AGENCY_LIST_REQUEST,
  SEARCH_AGENCY_LIST_SUCCESS,
  SEARCH_AGENCY_LIST_FAILURE,
  //
  AGENCY_CREATE_REQUEST,
  AGENCY_CREATE_SUCCESS,
  AGENCY_CREATE_FAILURE,
  //
  AGENCY_UPDATE_REQUEST,
  AGENCY_UPDATE_SUCCESS,
  AGENCY_UPDATE_FAILURE,
} from "../reducers/agency";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function agencyListAPI(data) {
  return await axios.post(`/api/agency/list`, data);
}

function* agencyList(action) {
  try {
    const result = yield call(agencyListAPI, action.data);
    yield put({
      type: AGENCY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AGENCY_LIST_FAILURE,
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
async function searchAgencyListAPI(data) {
  return await axios.post(`/api/agency/list`, data);
}

function* searchAgencyList(action) {
  try {
    const result = yield call(searchAgencyListAPI, action.data);
    yield put({
      type: SEARCH_AGENCY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_AGENCY_LIST_FAILURE,
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
async function agencyCreateAPI(data) {
  return await axios.post(`/api/agency/create`, data);
}

function* agencyCreate(action) {
  try {
    const result = yield call(agencyCreateAPI, action.data);

    yield put({
      type: AGENCY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AGENCY_CREATE_FAILURE,
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
async function agencyUpdateAPI(data) {
  return await axios.post(`/api/agency/update`, data);
}

function* agencyUpdate(action) {
  try {
    const result = yield call(agencyUpdateAPI, action.data);

    yield put({
      type: AGENCY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: AGENCY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchAgencyList() {
  yield takeLatest(AGENCY_LIST_REQUEST, agencyList);
}

function* watchSearchAgencyList() {
  yield takeLatest(SEARCH_AGENCY_LIST_REQUEST, searchAgencyList);
}

function* watchAgencyCreate() {
  yield takeLatest(AGENCY_CREATE_REQUEST, agencyCreate);
}

function* watchAgencyUpdate() {
  yield takeLatest(AGENCY_UPDATE_REQUEST, agencyUpdate);
}

//////////////////////////////////////////////////////////////
export default function* agencySaga() {
  yield all([
    fork(watchAgencyList),
    fork(watchSearchAgencyList),
    fork(watchAgencyCreate),
    fork(watchAgencyUpdate),

    //
  ]);
}
