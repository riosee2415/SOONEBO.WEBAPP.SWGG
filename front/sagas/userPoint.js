import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_POINT_LIST_REQUEST,
  MY_POINT_LIST_SUCCESS,
  MY_POINT_LIST_FAILURE,
  //
  POINT_CREATE_SUCCESS,
  POINT_CREATE_REQUEST,
  POINT_CREATE_FAILURE,
  //
} from "../reducers/userPoint";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function myPointListAPI(data) {
  return axios.post(`/api/point/my/list`);
}

function* myPointList(action) {
  try {
    const result = yield call(myPointListAPI, action.data);

    yield put({
      type: MY_POINT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_POINT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function pointCreateAPI(data) {
  return axios.post(`/api/point/create`, data);
}

function* pointCreate(action) {
  try {
    const result = yield call(pointCreateAPI, action.data);

    yield put({
      type: POINT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POINT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

//////////////////////////////////////////////////////////////

function* watchMyPointList() {
  yield takeLatest(MY_POINT_LIST_REQUEST, myPointList);
}

function* watchPointCreate() {
  yield takeLatest(POINT_CREATE_REQUEST, pointCreate);
}

//////////////////////////////////////////////////////////////
export default function* pointSaga() {
  yield all([
    fork(watchMyPointList),
    fork(watchPointCreate),

    //
  ]);
}
