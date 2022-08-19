import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  // 전체 직급 조회하기
  GRADE_ALL_LIST_REQUEST,
  GRADE_ALL_LIST_SUCCESS,
  GRADE_ALL_LIST_FAILURE,
  //
  GRADE_UPDATE_REQUEST,
  GRADE_UPDATE_SUCCESS,
  GRADE_UPDATE_FAILURE,
  //
} from "../reducers/grade";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function gradeAllListAPI(data) {
  return await axios.post("/api/grade/allGrades", data);
}

function* gradeAllList(action) {
  try {
    const result = yield call(gradeAllListAPI, action.data);
    yield put({
      type: GRADE_ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GRADE_ALL_LIST_FAILURE,
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
async function gradeUpdateAPI(data) {
  return await axios.patch("/api/grade/payUpdate", data);
}

function* gradeUpdate(action) {
  try {
    const result = yield call(gradeUpdateAPI, action.data);
    yield put({
      type: GRADE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GRADE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchGradeAllList() {
  yield takeLatest(GRADE_ALL_LIST_REQUEST, gradeAllList);
}

function* watchGradeUpdate() {
  yield takeLatest(GRADE_UPDATE_REQUEST, gradeUpdate);
}

//////////////////////////////////////////////////////////////
export default function* gradeaga() {
  yield all([
    fork(watchGradeAllList),
    fork(watchGradeUpdate),
    //
  ]);
}
