import produce from "../util/produce";

export const initailState = {
  me: null,
  currentAdminMenu: [],
  users: null,
  selectUser: [], // select용 유저 리스트

  findId: null, // 아이디 찾기

  levelModal: false, // 권한 수정 모달
  detailModal: false, //상세보기 모달
  unitModal: false, // 주의사항 모달
  userTypeModal: false, // 직급 모달
  salesCreateModal: false, // 세일즈 회원 생성 모달
  salesGradeUpModal: false, // 등급업 모달

  agencyUserChart: false, // 대리점별 회원 수 통계
  gradeUserChart: false, // 직급별 회원 수 통계
  recommUserChart: false, // 가장 많이 추천된 회원 수 통계

  topUser: null, // 하위 회원이 존재하는 회원 목록
  topUserSelect: null, // select용 하위 회원이 존재하는 회원 목록

  underUser: null, // 특정 회원의 하위 회원 목록

  underUserAll: null, // 특정 회원의 하위회원 수

  underUserNumber: null, // 특정 회원의 소속별 하위 회원수

  //
  st_loginLoading: false,
  st_loginDone: false,
  st_loginError: null,
  //
  st_loginAdminLoading: false,
  st_loginAdminDone: false,
  st_loginAdminError: null,
  //
  st_logoutLoading: false,
  st_logoutDone: false,
  st_logoutError: null,
  //
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpError: null,
  //
  st_userListLoading: false,
  st_userListDone: false,
  st_userListError: null,
  //
  st_userListUpdateLoading: false,
  st_userListUpdateDone: false,
  st_userListUpdateError: null,
  //
  st_loadMyInfoLoading: false, // 로그인 정보 가져오기 시도 중
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
  //
  st_kakaoLoginLoading: false, // 카카오 로그인
  st_kakaoLoginDone: false,
  st_kakaoLoginError: null,
  //
  st_kakaoJoinLoading: false, // 카카오 회원가입
  st_kakaoJoinDone: false,
  st_kakaoJoinError: null,
  //
  st_findIdLoading: false,
  st_findIdDone: false,
  st_findIdError: null,
  //
  st_findPassLoading: false,
  st_findPassDone: false,
  st_findPassError: null,
  //
  st_secretCodeLoading: false,
  st_secretCodeDone: false,
  st_secretCodeError: null,
  //
  st_passUpdateLoading: false,
  st_passUpdateDone: false,
  st_passUpdateError: null,
  //
  st_userJobUpdateLoading: false, // 직급 변경
  st_userJobUpdateDone: false,
  st_userJobUpdateError: null,
  //
  st_userAgencyChartLoading: false, // 회원 통계
  st_userAgencyChartDone: false,
  st_userAgencyChartError: null,
  //
  //
  st_userSuggestionLoading: false, // 추천인이 있는 사람 리스트
  st_userSuggestionDone: false,
  st_userSuggestionError: null,
  //
  st_userSuggestionSelectLoading: false, // 추천인이 있는 사람 select 용 리스트
  st_userSuggestionSelectDone: false,
  st_userSuggestionSelectError: null,
  //
  st_userUnderLoading: false, // 특정 회원의 하위 회원 리스트
  st_userUnderDone: false,
  st_userUnderError: null,
  //
  st_userSalesCreateLoading: false, // 세일즈 회원 생성
  st_userSalesCreateDone: false,
  st_userSalesCreateError: null,
  //
  st_userInfoUpdateeLoading: false, // 회원정보 수정
  st_userInfoUpdateeDone: false,
  st_userInfoUpdateeError: null,
  //
  st_userExitLoading: false, // 회원정보 수정
  st_userExitDone: false,
  st_userExitError: null,
  //
  st_selectUserLoading: false, // select 용 유저 리스트
  st_selectUserDone: false,
  st_selectUserError: null,
};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGIN_ADMIN_REQUEST = "LOGIN_ADMIN_REQUEST";
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const USERLIST_REQUEST = "USERLIST_REQUEST";
export const USERLIST_SUCCESS = "USERLIST_SUCCESS";
export const USERLIST_FAILURE = "USERLIST_FAILURE";

export const USERLIST_UPDATE_REQUEST = "USERLIST_UPDATE_REQUEST";
export const USERLIST_UPDATE_SUCCESS = "USERLIST_UPDATE_SUCCESS";
export const USERLIST_UPDATE_FAILURE = "USERLIST_UPDATE_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const KAKAO_LOGIN_REQUEST = "KAKAO_LOGIN_REQUEST";
export const KAKAO_LOGIN_SUCCESS = "KAKAO_LOGIN_SUCCESS";
export const KAKAO_LOGIN_FAILURE = "KAKAO_LOGIN_FAILURE";

export const KAKAO_JOIN_REQUEST = "KAKAO_JOIN_REQUEST";
export const KAKAO_JOIN_SUCCESS = "KAKAO_JOIN_SUCCESS";
export const KAKAO_JOIN_FAILURE = "KAKAO_JOIN_FAILURE";

export const FIND_ID_REQUEST = "FIND_ID_REQUEST";
export const FIND_ID_SUCCESS = "FIND_ID_SUCCESS";
export const FIND_ID_FAILURE = "FIND_ID_FAILURE";

export const FIND_PASS_REQUEST = "FIND_PASS_REQUEST";
export const FIND_PASS_SUCCESS = "FIND_PASS_SUCCESS";
export const FIND_PASS_FAILURE = "FIND_PASS_FAILURE";

export const SECRET_CODE_REQUEST = "SECRET_CODE_REQUEST";
export const SECRET_CODE_SUCCESS = "SECRET_CODE_SUCCESS";
export const SECRET_CODE_FAILURE = "SECRET_CODE_FAILURE";

export const PASS_UPDATE_REQUEST = "PASS_UPDATE_REQUEST";
export const PASS_UPDATE_SUCCESS = "PASS_UPDATE_SUCCESS";
export const PASS_UPDATE_FAILURE = "PASS_UPDATE_FAILURE";

export const USER_JOB_UPDATE_REQUEST = "USER_JOB_UPDATE_REQUEST";
export const USER_JOB_UPDATE_SUCCESS = "USER_JOB_UPDATE_SUCCESS";
export const USER_JOB_UPDATE_FAILURE = "USER_JOB_UPDATE_FAILURE";

export const USER_AGENCY_CHART_REQUEST = "USER_AGENCY_CHART_REQUEST";
export const USER_AGENCY_CHART_SUCCESS = "USER_AGENCY_CHART_SUCCESS";
export const USER_AGENCY_CHART_FAILURE = "USER_AGENCY_CHART_FAILURE";

export const USER_SUGGESTION_REQUEST = "USER_SUGGESTION_REQUEST";
export const USER_SUGGESTION_SUCCESS = "USER_SUGGESTION_SUCCESS";
export const USER_SUGGESTION_FAILURE = "USER_SUGGESTION_FAILURE";

export const USER_SUGGESTION_SELECT_REQUEST = "USER_SUGGESTION_SELECT_REQUEST";
export const USER_SUGGESTION_SELECT_SUCCESS = "USER_SUGGESTION_SELECT_SUCCESS";
export const USER_SUGGESTION_SELECT_FAILURE = "USER_SUGGESTION_SELECT_FAILURE";

export const USER_UNDER_REQUEST = "USER_UNDER_REQUEST";
export const USER_UNDER_SUCCESS = "USER_UNDER_SUCCESS";
export const USER_UNDER_FAILURE = "USER_UNDER_FAILURE";

export const USER_SALES_CREATE_REQUEST = "USER_SALES_CREATE_REQUEST";
export const USER_SALES_CREATE_SUCCESS = "USER_SALES_CREATE_SUCCESS";
export const USER_SALES_CREATE_FAILURE = "USER_SALES_CREATE_FAILURE";

export const USER_INFO_UPDATE_REQUEST = "USER_INFO_UPDATE_REQUEST";
export const USER_INFO_UPDATE_SUCCESS = "USER_INFO_UPDATE_SUCCESS";
export const USER_INFO_UPDATE_FAILURE = "USER_INFO_UPDATE_FAILURE";

export const USER_EXIT_REQUEST = "USER_EXIT_REQUEST";
export const USER_EXIT_SUCCESS = "USER_EXIT_SUCCESS";
export const USER_EXIT_FAILURE = "USER_EXIT_FAILURE";

export const SELECT_USER_REQUEST = "SELECT_USER_REQUEST";
export const SELECT_USER_SUCCESS = "SELECT_USER_SUCCESS";
export const SELECT_USER_FAILURE = "SELECT_USER_FAILURE";

// 권한 수정 모달
export const USER_LEVEL_MODAL_TOGGLE = "USER_LEVEL_MODAL_TOGGLE";

// 상세보기 모달
export const USER_DETAIL_MODAL_TOGGLE = "USER_DETAIL_MODAL_TOGGLE";

// 직급 모달
export const USER_TYPE_MODAL_TOGGLE = "USER_TYPE_MODAL_TOGGLE";

// 주의사항 모달
export const USER_UNIT_MODAL_TOGGLE = "USER_UNIT_MODAL_TOGGLE";

// 세일즈 생성 모달
export const SALES_CREATE_MODAL_TOGGLE = "SALES_CREATE_MODAL_TOGGLE";

// 등급업 모달
export const SALES_JOB_UPDATE_MODAL_TOGGLE = "SALES_JOB_UPDATE_TOGGLE";

export const CURRENT_ADMINMENU_STATUS = "CURRENT_ADMINMENU_STATUS";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        console.log("GET SERVER SIDE PROPS ACTION");

        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = null;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.st_loadMyInfoError = null;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case LOGIN_REQUEST: {
        draft.st_loginLoading = true;
        draft.st_loginDone = false;
        draft.st_loginError = null;
        break;
      }
      case LOGIN_SUCCESS: {
        draft.st_loginLoading = false;
        draft.st_loginDone = true;
        draft.st_loginError = null;
        draft.me = action.data;
        break;
      }
      case LOGIN_FAILURE: {
        draft.st_loginLoading = false;
        draft.st_loginDone = false;
        draft.st_loginError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case LOGIN_ADMIN_REQUEST: {
        draft.st_loginAdminLoading = true;
        draft.st_loginAdminDone = false;
        draft.st_loginAdminError = null;
        break;
      }
      case LOGIN_ADMIN_SUCCESS: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = true;
        draft.st_loginAdminError = null;
        draft.me = action.data;
        break;
      }
      case LOGIN_ADMIN_FAILURE: {
        draft.st_loginAdminLoading = false;
        draft.st_loginAdminDone = false;
        draft.st_loginAdminError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case LOGOUT_REQUEST: {
        draft.st_logoutLoading = true;
        draft.st_logoutDone = false;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_SUCCESS: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = true;
        draft.st_logoutError = null;
        break;
      }
      case LOGOUT_FAILURE: {
        draft.st_logoutLoading = false;
        draft.st_logoutDone = false;
        draft.st_logoutError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case SIGNUP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = false;
        draft.st_signUpError = null;
        break;
      }
      case SIGNUP_SUCCESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        draft.st_signUpError = null;
        break;
      }
      case SIGNUP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case USERLIST_REQUEST: {
        draft.st_userListLoading = true;
        draft.st_userListDone = false;
        draft.st_userListError = null;
        break;
      }
      case USERLIST_SUCCESS: {
        draft.st_userListLoading = false;
        draft.st_userListDone = true;
        draft.st_userListError = null;
        draft.users = action.data;
        break;
      }
      case USERLIST_FAILURE: {
        draft.st_userListLoading = false;
        draft.st_userListDone = false;
        draft.st_userListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USERLIST_UPDATE_REQUEST: {
        draft.st_userListUpdateLoading = true;
        draft.st_userListUpdateDone = false;
        draft.st_userListUpdateError = null;
        break;
      }
      case USERLIST_UPDATE_SUCCESS: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = true;
        draft.st_userListUpdateError = null;
        break;
      }
      case USERLIST_UPDATE_FAILURE: {
        draft.st_userListUpdateLoading = false;
        draft.st_userListUpdateDone = false;
        draft.st_userListUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case KAKAO_LOGIN_REQUEST: {
        draft.st_kakaoLoginLoading = true;
        draft.st_kakaoLoginDone = false;
        draft.st_kakaoLoginError = null;
        break;
      }
      case KAKAO_LOGIN_SUCCESS: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = true;
        draft.st_kakaoLoginError = null;
        draft.me = action.data;
        break;
      }
      case KAKAO_LOGIN_FAILURE: {
        draft.st_kakaoLoginLoading = false;
        draft.st_kakaoLoginDone = false;
        draft.st_kakaoLoginError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case KAKAO_JOIN_REQUEST: {
        draft.st_kakaoJoinLoading = true;
        draft.st_kakaoJoinDone = false;
        draft.st_kakaoJoinError = null;
        break;
      }
      case KAKAO_JOIN_SUCCESS: {
        draft.st_kakaoJoinLoading = false;
        draft.st_kakaoJoinDone = true;
        draft.st_kakaoJoinError = null;
        break;
      }
      case KAKAO_JOIN_FAILURE: {
        draft.st_kakaoJoinLoading = false;
        draft.st_kakaoJoinDone = false;
        draft.st_kakaoJoinError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FIND_ID_REQUEST: {
        draft.st_findIdLoading = true;
        draft.st_findIdDone = false;
        draft.st_findIdError = null;
        break;
      }
      case FIND_ID_SUCCESS: {
        draft.st_findIdLoading = false;
        draft.st_findIdDone = true;
        draft.st_findIdError = null;
        draft.findId = action.data.userId;

        break;
      }
      case FIND_ID_FAILURE: {
        draft.st_findIdLoading = false;
        draft.st_findIdDone = false;
        draft.st_findIdError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FIND_PASS_REQUEST: {
        draft.st_findPassLoading = true;
        draft.st_findPassDone = false;
        draft.st_findPassError = null;
        break;
      }
      case FIND_PASS_SUCCESS: {
        draft.st_findPassLoading = false;
        draft.st_findPassDone = true;
        draft.st_findPassError = null;
        break;
      }
      case FIND_PASS_FAILURE: {
        draft.st_findPassLoading = false;
        draft.st_findPassDone = false;
        draft.st_findPassError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case SECRET_CODE_REQUEST: {
        draft.st_secretCodeLoading = true;
        draft.st_secretCodeDone = false;
        draft.st_secretCodeError = null;
        break;
      }
      case SECRET_CODE_SUCCESS: {
        draft.st_secretCodeLoading = false;
        draft.st_secretCodeDone = true;
        draft.st_secretCodeError = null;
        break;
      }
      case SECRET_CODE_FAILURE: {
        draft.st_secretCodeLoading = false;
        draft.st_secretCodeDone = false;
        draft.st_secretCodeError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case PASS_UPDATE_REQUEST: {
        draft.st_passUpdateLoading = true;
        draft.st_passUpdateDone = false;
        draft.st_passUpdateError = null;
        break;
      }
      case PASS_UPDATE_SUCCESS: {
        draft.st_passUpdateLoading = false;
        draft.st_passUpdateDone = true;
        draft.st_passUpdateError = null;
        break;
      }
      case PASS_UPDATE_FAILURE: {
        draft.st_passUpdateLoading = false;
        draft.st_passUpdateDone = false;
        draft.st_passUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_JOB_UPDATE_REQUEST: {
        draft.st_userJobUpdateLoading = true;
        draft.st_userJobUpdateDone = false;
        draft.st_userJobUpdateError = null;
        break;
      }
      case USER_JOB_UPDATE_SUCCESS: {
        draft.st_userJobUpdateLoading = false;
        draft.st_userJobUpdateDone = true;
        draft.st_userJobUpdateError = null;
        break;
      }
      case USER_JOB_UPDATE_FAILURE: {
        draft.st_userJobUpdateLoading = false;
        draft.st_userJobUpdateDone = false;
        draft.st_userJobUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_AGENCY_CHART_REQUEST: {
        draft.st_userAgencyChartLoading = true;
        draft.st_userAgencyChartDone = false;
        draft.st_userAgencyChartError = null;
        break;
      }
      case USER_AGENCY_CHART_SUCCESS: {
        draft.st_userAgencyChartLoading = false;
        draft.st_userAgencyChartDone = true;
        draft.st_userAgencyChartError = null;
        draft.agencyUserChart = action.data.agencyUser;
        draft.gradeUserChart = action.data.gradeUsers;
        draft.recommUserChart = action.data.recommUsers;
        break;
      }
      case USER_AGENCY_CHART_FAILURE: {
        draft.st_userAgencyChartLoading = false;
        draft.st_userAgencyChartDone = false;
        draft.st_userAgencyChartError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_SUGGESTION_REQUEST: {
        draft.st_userSuggestionLoading = true;
        draft.st_userSuggestionDone = false;
        draft.st_userSuggestionError = null;
        break;
      }
      case USER_SUGGESTION_SUCCESS: {
        draft.st_userSuggestionLoading = false;
        draft.st_userSuggestionDone = true;
        draft.st_userSuggestionError = null;
        draft.topUser = action.data;
        break;
      }
      case USER_SUGGESTION_FAILURE: {
        draft.st_userSuggestionLoading = false;
        draft.st_userSuggestionDone = false;
        draft.st_userSuggestionError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_SUGGESTION_SELECT_REQUEST: {
        draft.st_userSuggestionSelectLoading = true;
        draft.st_userSuggestionSelectDone = false;
        draft.st_userSuggestionSelectError = null;
        break;
      }
      case USER_SUGGESTION_SELECT_SUCCESS: {
        draft.st_userSuggestionSelectLoading = false;
        draft.st_userSuggestionSelectDone = true;
        draft.st_userSuggestionSelectError = null;
        draft.topUserSelect = action.data;
        break;
      }
      case USER_SUGGESTION_SELECT_FAILURE: {
        draft.st_userSuggestionSelectLoading = false;
        draft.st_userSuggestionSelectDone = false;
        draft.st_userSuggestionSelectError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_UNDER_REQUEST: {
        draft.st_userUnderLoading = true;
        draft.st_userUnderDone = false;
        draft.st_userUnderError = null;
        break;
      }
      case USER_UNDER_SUCCESS: {
        draft.st_userUnderLoading = false;
        draft.st_userUnderDone = true;
        draft.st_userUnderError = null;
        draft.underUser = action.data.users;
        draft.underUserNumber = action.data.agencyPeople;
        draft.underUserAll = action.data.allUser;
        break;
      }
      case USER_UNDER_FAILURE: {
        draft.st_userUnderLoading = false;
        draft.st_userUnderDone = false;
        draft.st_userUnderError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_SALES_CREATE_REQUEST: {
        draft.st_userSalesCreateLoading = true;
        draft.st_userSalesCreateDone = false;
        draft.st_userSalesCreateError = null;
        break;
      }
      case USER_SALES_CREATE_SUCCESS: {
        draft.st_userSalesCreateLoading = false;
        draft.st_userSalesCreateDone = true;
        draft.st_userSalesCreateError = null;
        break;
      }
      case USER_SALES_CREATE_FAILURE: {
        draft.st_userSalesCreateLoading = false;
        draft.st_userSalesCreateDone = false;
        draft.st_userSalesCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case USER_INFO_UPDATE_REQUEST: {
        draft.st_userInfoUpdateeLoading = true;
        draft.st_userInfoUpdateeDone = false;
        draft.st_userInfoUpdateeError = null;
        break;
      }
      case USER_INFO_UPDATE_SUCCESS: {
        draft.st_userInfoUpdateeLoading = false;
        draft.st_userInfoUpdateeDone = true;
        draft.st_userInfoUpdateeError = null;
        break;
      }
      case USER_INFO_UPDATE_FAILURE: {
        draft.st_userInfoUpdateeLoading = false;
        draft.st_userInfoUpdateeDone = false;
        draft.st_userInfoUpdateeError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case USER_EXIT_REQUEST: {
        draft.st_userExitLoading = true;
        draft.st_userExitDone = false;
        draft.st_userExitError = null;
        break;
      }
      case USER_EXIT_SUCCESS: {
        draft.st_userExitLoading = false;
        draft.st_userExitDone = true;
        draft.st_userExitError = null;
        break;
      }
      case USER_EXIT_FAILURE: {
        draft.st_userExitLoading = false;
        draft.st_userExitDone = false;
        draft.st_userExitError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case SELECT_USER_REQUEST: {
        draft.st_selectUserLoading = true;
        draft.st_selectUserDone = false;
        draft.st_selectUserError = null;
        break;
      }
      case SELECT_USER_SUCCESS: {
        draft.st_selectUserLoading = false;
        draft.st_selectUserDone = true;
        draft.st_selectUserError = null;
        draft.selectUser = action.data;
        break;
      }
      case SELECT_USER_FAILURE: {
        draft.st_selectUserLoading = false;
        draft.st_selectUserDone = false;
        draft.st_selectUserError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case CURRENT_ADMINMENU_STATUS: {
        const exist = draft.currentAdminMenu.filter(
          (data) => data === action.data.key
        );

        if (exist.length > 0) {
          draft.currentAdminMenu = draft.currentAdminMenu.filter(
            (data) => data !== action.data.key
          );
        } else {
          draft.currentAdminMenu = [...draft.currentAdminMenu, action.data.key];
        }

        break;
      }

      //////////////////////////////////////////////

      case USER_LEVEL_MODAL_TOGGLE:
        draft.levelModal = !draft.levelModal;
        break;

      //////////////////////////////////////////////

      case USER_DETAIL_MODAL_TOGGLE:
        draft.detailModal = !draft.detailModal;
        break;

      //////////////////////////////////////////////

      case USER_UNIT_MODAL_TOGGLE:
        draft.unitModal = !draft.unitModal;
        break;

      //////////////////////////////////////////////

      case USER_TYPE_MODAL_TOGGLE:
        draft.userTypeModal = !draft.userTypeModal;
        break;

      //////////////////////////////////////////////

      case SALES_CREATE_MODAL_TOGGLE:
        draft.salesCreateModal = !draft.salesCreateModal;
        break;

      //////////////////////////////////////////////

      case SALES_JOB_UPDATE_MODAL_TOGGLE:
        draft.salesGradeUpModal = !draft.salesGradeUpModal;
        break;

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
