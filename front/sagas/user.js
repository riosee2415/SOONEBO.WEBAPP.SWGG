import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  //
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  //
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  //
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  //
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  //
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  //
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  //
  KAKAO_JOIN_REQUEST,
  KAKAO_JOIN_SUCCESS,
  KAKAO_JOIN_FAILURE,
  //
  FIND_ID_REQUEST,
  FIND_ID_SUCCESS,
  FIND_ID_FAILURE,
  //
  FIND_PASS_REQUEST,
  FIND_PASS_SUCCESS,
  FIND_PASS_FAILURE,
  //
  SECRET_CODE_REQUEST,
  SECRET_CODE_SUCCESS,
  SECRET_CODE_FAILURE,
  //
  PASS_UPDATE_REQUEST,
  PASS_UPDATE_SUCCESS,
  PASS_UPDATE_FAILURE,
  //
  USER_JOB_UPDATE_REQUEST,
  USER_JOB_UPDATE_SUCCESS,
  USER_JOB_UPDATE_FAILURE,
  //
  USER_AGENCY_CHART_REQUEST,
  USER_AGENCY_CHART_SUCCESS,
  USER_AGENCY_CHART_FAILURE,
  //
  USER_SUGGESTION_REQUEST,
  USER_SUGGESTION_SUCCESS,
  USER_SUGGESTION_FAILURE,
  //
  USER_UNDER_REQUEST,
  USER_UNDER_SUCCESS,
  USER_UNDER_FAILURE,
  //
  USER_SALES_CREATE_REQUEST,
  USER_SALES_CREATE_SUCCESS,
  USER_SALES_CREATE_FAILURE,
  //
  USER_INFO_UPDATE_REQUEST,
  USER_INFO_UPDATE_SUCCESS,
  USER_INFO_UPDATE_FAILURE,
  //
  USER_EXIT_REQUEST,
  USER_EXIT_SUCCESS,
  USER_EXIT_FAILURE,
  //
  SELECT_USER_REQUEST,
  SELECT_USER_SUCCESS,
  SELECT_USER_FAILURE,
  //
  USER_SUGGESTION_SELECT_REQUEST,
  USER_SUGGESTION_SELECT_SUCCESS,
  USER_SUGGESTION_SELECT_FAILURE,
} from "../reducers/user";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function loadMyInfoAPI(data) {
  return await axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
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
async function signinPI(data) {
  return await axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
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
async function signinAdminPI(data) {
  return await axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
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
async function logoutAPI(data) {
  return await axios.get(`/api/user/logout`, data);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
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
async function signUpAPI(data) {
  return await axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
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
async function userListAPI(data) {
  return await axios.post(`/api/user/list`, data);
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
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
async function userListUpdateAPI(data) {
  return await axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
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
async function kakaoLoginAPI(data) {
  return await axios.post(`/api/user/snsLogin`, data);
}

function* kakaoLogin(action) {
  try {
    const result = yield call(kakaoLoginAPI, action.data);

    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
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
async function kakaoJoinAPI(data) {
  return await axios.post(`/api/user/snsJoin`, data);
}

function* kakaoJoin(action) {
  try {
    const result = yield call(kakaoJoinAPI, action.data);

    yield put({
      type: KAKAO_JOIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_JOIN_FAILURE,
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
async function findIdAPI(data) {
  return await axios.post(`/api/user/findUserIdByEmail`, data);
}

function* findId(action) {
  try {
    const result = yield call(findIdAPI, action.data);

    yield put({
      type: FIND_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_ID_FAILURE,
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
async function findPassAPI(data) {
  return await axios.post(`/api/user/modifypass`, data);
}

function* findPass(action) {
  try {
    const result = yield call(findPassAPI, action.data);
    yield put({
      type: FIND_PASS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_PASS_FAILURE,
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
async function secretCodeAPI(data) {
  return await axios.post(`/api/user/checkSecret`, data);
}

function* secretCode(action) {
  try {
    const result = yield call(secretCodeAPI, action.data);
    yield put({
      type: SECRET_CODE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SECRET_CODE_FAILURE,
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
async function passUpdateAPI(data) {
  return await axios.patch(`/api/user/modifypass/update`, data);
}

function* passUpdate(action) {
  try {
    const result = yield call(passUpdateAPI, action.data);
    yield put({
      type: PASS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PASS_UPDATE_FAILURE,
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
async function jobUpdateAPI(data) {
  return await axios.patch(`/api/user/job/update`, data);
}

function* jobUpdate(action) {
  try {
    const result = yield call(jobUpdateAPI, action.data);
    yield put({
      type: USER_JOB_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_JOB_UPDATE_FAILURE,
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
async function agencyChartAPI(data) {
  return await axios.post(`/api/user/agency/chart`, data);
}

function* agencyChart(action) {
  try {
    const result = yield call(agencyChartAPI, action.data);
    yield put({
      type: USER_AGENCY_CHART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_AGENCY_CHART_FAILURE,
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
async function suggestionAPI(data) {
  return await axios.post(`/api/user/list/inEmp`, data);
}

function* suggestion(action) {
  try {
    const result = yield call(suggestionAPI, action.data);
    yield put({
      type: USER_SUGGESTION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SUGGESTION_FAILURE,
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
async function suggestionSelectAPI(data) {
  return await axios.post(`/api/user/list/inEmp`, data);
}

function* suggestionSelect(action) {
  try {
    const result = yield call(suggestionSelectAPI, action.data);
    yield put({
      type: USER_SUGGESTION_SELECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SUGGESTION_SELECT_FAILURE,
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
async function underUserAPI(data) {
  return await axios.post(`/api/user/list/innerList`, data);
}

function* underUser(action) {
  try {
    const result = yield call(underUserAPI, action.data);
    yield put({
      type: USER_UNDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_UNDER_FAILURE,
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
async function userSalesCreateAPI(data) {
  return await axios.post(`/api/user/admin/create`, data);
}

function* userSalesCreate(action) {
  try {
    const result = yield call(userSalesCreateAPI, action.data);
    yield put({
      type: USER_SALES_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SALES_CREATE_FAILURE,
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
async function userInfoUpdateAPI(data) {
  return await axios.post(`/api/user/me/update`, data);
}

function* userInfoUpdate(action) {
  try {
    const result = yield call(userInfoUpdateAPI, action.data);
    yield put({
      type: USER_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_INFO_UPDATE_FAILURE,
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
async function userExitAPI(data) {
  return await axios.patch(`/api/user/exit/update`, data);
}

function* userExit(action) {
  try {
    const result = yield call(userExitAPI, action.data);
    yield put({
      type: USER_EXIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_EXIT_FAILURE,
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
async function selectUserAPI(data) {
  return await axios.post(`/api/user/list`, data);
}

function* selectUser(action) {
  try {
    const result = yield call(selectUserAPI, action.data);
    yield put({
      type: SELECT_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELECT_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchKakaoJoin() {
  yield takeLatest(KAKAO_JOIN_REQUEST, kakaoJoin);
}

function* watchFindId() {
  yield takeLatest(FIND_ID_REQUEST, findId);
}

function* watchFindPass() {
  yield takeLatest(FIND_PASS_REQUEST, findPass);
}

function* watchSecretCode() {
  yield takeLatest(SECRET_CODE_REQUEST, secretCode);
}

function* watchPassUpdate() {
  yield takeLatest(PASS_UPDATE_REQUEST, passUpdate);
}

function* watchJobUpdate() {
  yield takeLatest(USER_JOB_UPDATE_REQUEST, jobUpdate);
}

function* watchAgencyChart() {
  yield takeLatest(USER_AGENCY_CHART_REQUEST, agencyChart);
}

function* watchSuggestion() {
  yield takeLatest(USER_SUGGESTION_REQUEST, suggestion);
}

function* watchSuggestionSelect() {
  yield takeLatest(USER_SUGGESTION_SELECT_REQUEST, suggestionSelect);
}

function* watchUnderUser() {
  yield takeLatest(USER_UNDER_REQUEST, underUser);
}

function* watchUserSalesCreate() {
  yield takeLatest(USER_SALES_CREATE_REQUEST, userSalesCreate);
}

function* watchUserInfoUpdate() {
  yield takeLatest(USER_INFO_UPDATE_REQUEST, userInfoUpdate);
}

function* watchUserExit() {
  yield takeLatest(USER_EXIT_REQUEST, userExit);
}

function* watchSelectUser() {
  yield takeLatest(SELECT_USER_REQUEST, selectUser);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchSignin),
    fork(watchSigninAdmin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchKakaoJoin),
    fork(watchFindId),
    fork(watchFindPass),
    fork(watchSecretCode),
    fork(watchPassUpdate),
    fork(watchJobUpdate),
    fork(watchAgencyChart),
    fork(watchSuggestion),
    fork(watchSuggestionSelect),
    fork(watchUnderUser),
    fork(watchUserSalesCreate),
    fork(watchUserInfoUpdate),
    fork(watchUserExit),
    fork(watchSelectUser),
    //
  ]);
}
