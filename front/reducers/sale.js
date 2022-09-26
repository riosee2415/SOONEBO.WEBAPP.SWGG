import produce from "../util/produce";

export const initailState = {
  persnalLists: [], // 개인매출조회 리스트
  agencySales: [], // 대리점 매출 리스트
  inAgencySales: [], // 대리점 별 상세매출 리스트
  persnalAllLists: [], // 개인종합매출조회 리스트
  personalCals: [], // 개인 별 정산 리스트
  mypagePersnal: [], // 마이페이지 매출 리스트
  mypageMyPersnal: [], // 마이페이지 내 매출 리스트
  mypageYouPersnal: [], // 마이페이지 피추천인 매출 리스트
  mypageAllPrice: [], // 마이페이지 총 매출
  mypageMyPrice: [], // 마이페이지 내 총 매출
  mypageYouPrice: [], // 마이페이지 피추천인 총 매출
  lastPageAll: 1,
  lastPageMe: 1,
  lastPageYou: 1,

  //
  st_persnalListLoading: false, // 개민매출조회리스트
  st_persnalListDone: false,
  st_persnalListError: null,
  //
  st_agencySalesListLoading: false, // 대리점 매출 조회
  st_agencySalesListDone: false,
  st_agencySalesListError: null,
  //
  st_inAgencySalesListLoading: false, // 대리점 별 상세 매출 조회
  st_inAgencySalesListDone: false,
  st_inAgencySalesListError: null,
  //
  st_persnalAllListLoading: false, // 개인 종합 매출 조회 리스트 가져오기
  st_persnalAllListDone: false,
  st_persnalAllListError: null,
  //
  st_persnalAllUpdateLoading: false, // 개인 종합 매출 조회 승인
  st_persnalAllUpdateDone: false,
  st_persnalAllUpdateError: null,
  //
  st_personalCalListLoading: false, // 개인 별 정산 리스트
  st_personalCalListDone: false,
  st_personalCalListError: null,
  //
  st_personalCalUpdateLoading: false, // 개인 별 정산 처리
  st_personalCalUpdateDone: false,
  st_personalCalUpdateError: null,
  //
  st_personalMypageLoading: false, // 마이페이지 매출 리스트
  st_personalMypageDone: false,
  st_personalMypageError: null,
  //
  st_personalMypageMeLoading: false, // 마이페이지 내 매출 리스트
  st_personalMypageMeDone: false,
  st_personalMypageMeError: null,
  //
  st_personalMypageYouLoading: false, // 마이페이지 피추천인 매출 리스트
  st_personalMypageYouDone: false,
  st_personalMypageYouError: null,
};

export const PERSNAL_LIST_REQUEST = "PERSNAL_LIST_REQUEST"; // 개민매출조회리스트
export const PERSNAL_LIST_SUCCESS = "PERSNAL_LIST_SUCCESS";
export const PERSNAL_LIST_FAILURE = "PERSNAL_LIST_FAILURE";

export const AGENCY_SALES_LIST_REQUEST = "AGENCY_SALES_LIST_REQUEST"; // 대리점 매출 조회
export const AGENCY_SALES_LIST_SUCCESS = "AGENCY_SALES_LIST_SUCCESS";
export const AGENCY_SALES_LIST_FAILURE = "AGENCY_SALES_LIST_FAILURE";

export const IN_AGENCY_SALES_LIST_REQUEST = "IN_AGENCY_SALES_LIST_REQUEST"; // 대리점 별 상세 매출 조회
export const IN_AGENCY_SALES_LIST_SUCCESS = "IN_AGENCY_SALES_LIST_SUCCESS";
export const IN_AGENCY_SALES_LIST_FAILURE = "IN_AGENCY_SALES_LIST_FAILURE";

export const PERSNAL_ALL_LIST_REQUEST = "PERSNAL_ALL_LIST_REQUEST"; // 개인 종합 매출 조회 리스트 가져오기
export const PERSNAL_ALL_LIST_SUCCESS = "PERSNAL_ALL_LIST_SUCCESS";
export const PERSNAL_ALL_LIST_FAILURE = "PERSNAL_ALL_LIST_FAILURE";

export const PERSNAL_ALL_UPDATE_REQUEST = "PERSNAL_ALL_UPDATE_REQUEST"; // 개인 종합 매출 조회 승인
export const PERSNAL_ALL_UPDATE_SUCCESS = "PERSNAL_ALL_UPDATE_SUCCESS";
export const PERSNAL_ALL_UPDATE_FAILURE = "PERSNAL_ALL_UPDATE_FAILURE";

export const PERSONAL_CAL_LIST_REQUEST = "PERSONAL_CAL_LIST_REQUEST"; // 개인 별 정산 리스트
export const PERSONAL_CAL_LIST_SUCCESS = "PERSONAL_CAL_LIST_SUCCESS";
export const PERSONAL_CAL_LIST_FAILURE = "PERSONAL_CAL_LIST_FAILURE";

export const PERSONAL_CAL_UPDATE_REQUEST = "PERSONAL_CAL_UPDATE_REQUEST"; // 개인 별 정산 처리
export const PERSONAL_CAL_UPDATE_SUCCESS = "PERSONAL_CAL_UPDATE_SUCCESS";
export const PERSONAL_CAL_UPDATE_FAILURE = "PERSONAL_CAL_UPDATE_FAILURE";

export const PERSONAL_MYPAGE_REQUEST = "PERSONAL_MYPAGE_REQUEST";
export const PERSONAL_MYPAGE_SUCCESS = "PERSONAL_MYPAGE_SUCCESS";
export const PERSONAL_MYPAGE_FAILURE = "PERSONAL_MYPAGE_FAILURE";

export const PERSONAL_MYPAGE_ME_REQUEST = "PERSONAL_MYPAGE_ME_REQUEST";
export const PERSONAL_MYPAGE_ME_SUCCESS = "PERSONAL_MYPAGE_ME_SUCCESS";
export const PERSONAL_MYPAGE_ME_FAILURE = "PERSONAL_MYPAGE_ME_FAILURE";

export const PERSONAL_MYPAGE_YOU_REQUEST = "PERSONAL_MYPAGE_YOU_REQUEST";
export const PERSONAL_MYPAGE_YOU_SUCCESS = "PERSONAL_MYPAGE_YOU_SUCCESS";
export const PERSONAL_MYPAGE_YOU_FAILURE = "PERSONAL_MYPAGE_YOU_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PERSNAL_LIST_REQUEST:
        draft.st_persnalListLoading = true;
        draft.st_persnalListDone = false;
        draft.st_persnalListError = null;
        break;

      case PERSNAL_LIST_SUCCESS:
        draft.st_persnalListLoading = false;
        draft.st_persnalListDone = true;
        draft.st_persnalListError = null;
        draft.persnalLists = action.data;
        break;

      case PERSNAL_LIST_FAILURE:
        draft.st_persnalListLoading = false;
        draft.st_persnalListDone = false;
        draft.st_persnalListError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case AGENCY_SALES_LIST_REQUEST:
        draft.st_agencySalesListLoading = true;
        draft.st_agencySalesListDone = false;
        draft.st_agencySalesListError = null;
        break;

      case AGENCY_SALES_LIST_SUCCESS:
        draft.st_agencySalesListLoading = false;
        draft.st_agencySalesListDone = true;
        draft.st_agencySalesListError = null;
        draft.agencySales = action.data;
        break;

      case AGENCY_SALES_LIST_FAILURE:
        draft.st_agencySalesListLoading = false;
        draft.st_agencySalesListDone = false;
        draft.st_agencySalesListError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case IN_AGENCY_SALES_LIST_REQUEST:
        draft.st_inAgencySalesListLoading = true;
        draft.st_inAgencySalesListDone = false;
        draft.st_inAgencySalesListError = null;
        break;

      case IN_AGENCY_SALES_LIST_SUCCESS:
        draft.st_inAgencySalesListLoading = false;
        draft.st_inAgencySalesListDone = true;
        draft.st_inAgencySalesListError = null;
        draft.inAgencySales = action.data;
        break;

      case IN_AGENCY_SALES_LIST_FAILURE:
        draft.st_inAgencySalesListLoading = false;
        draft.st_inAgencySalesListDone = false;
        draft.st_inAgencySalesListError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSNAL_ALL_LIST_REQUEST:
        draft.st_persnalAllListLoading = true;
        draft.st_persnalAllListDone = false;
        draft.st_persnalAllListError = null;
        break;

      case PERSNAL_ALL_LIST_SUCCESS:
        draft.st_persnalAllListLoading = false;
        draft.st_persnalAllListDone = true;
        draft.st_persnalAllListError = null;
        draft.persnalAllLists = action.data;
        break;

      case PERSNAL_ALL_LIST_FAILURE:
        draft.st_persnalAllListLoading = false;
        draft.st_persnalAllListDone = false;
        draft.st_persnalAllListError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSNAL_ALL_UPDATE_REQUEST:
        draft.st_persnalAllUpdateLoading = true;
        draft.st_persnalAllUpdateDone = false;
        draft.st_persnalAllUpdateError = null;
        break;

      case PERSNAL_ALL_UPDATE_SUCCESS:
        draft.st_persnalAllUpdateLoading = false;
        draft.st_persnalAllUpdateDone = true;
        draft.st_persnalAllUpdateError = null;
        break;

      case PERSNAL_ALL_UPDATE_FAILURE:
        draft.st_persnalAllUpdateLoading = false;
        draft.st_persnalAllUpdateDone = false;
        draft.st_persnalAllUpdateError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSONAL_CAL_LIST_REQUEST:
        draft.st_personalCalListLoading = true;
        draft.st_personalCalListDone = false;
        draft.st_personalCalListError = null;
        break;

      case PERSONAL_CAL_LIST_SUCCESS:
        draft.st_personalCalListLoading = false;
        draft.st_personalCalListDone = true;
        draft.st_personalCalListError = null;
        draft.personalCals = action.data;
        break;

      case PERSONAL_CAL_LIST_FAILURE:
        draft.st_personalCalListLoading = false;
        draft.st_personalCalListDone = false;
        draft.st_personalCalListError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSONAL_CAL_UPDATE_REQUEST:
        draft.st_personalCalUpdateLoading = true;
        draft.st_personalCalUpdateDone = false;
        draft.st_personalCalUpdateError = null;
        break;

      case PERSONAL_CAL_UPDATE_SUCCESS:
        draft.st_personalCalUpdateLoading = false;
        draft.st_personalCalUpdateDone = true;
        draft.st_personalCalUpdateError = null;
        break;

      case PERSONAL_CAL_UPDATE_FAILURE:
        draft.st_personalCalUpdateLoading = false;
        draft.st_personalCalUpdateDone = false;
        draft.st_personalCalUpdateError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSONAL_MYPAGE_REQUEST:
        draft.st_personalMypageLoading = true;
        draft.st_personalMypageDone = false;
        draft.st_personalMypageError = null;
        break;

      case PERSONAL_MYPAGE_SUCCESS:
        draft.st_personalMypageLoading = false;
        draft.st_personalMypageDone = true;
        draft.st_personalMypageError = null;
        draft.mypagePersnal = action.data.sale;
        draft.mypageAllPrice = action.data.allPrice;
        draft.lastPageAll = action.data.lastPage;
        break;

      case PERSONAL_MYPAGE_FAILURE:
        draft.st_personalMypageLoading = false;
        draft.st_personalMypageDone = false;
        draft.st_personalMypageError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSONAL_MYPAGE_ME_REQUEST:
        draft.st_personalMypageMeLoading = true;
        draft.st_personalMypageMeDone = false;
        draft.st_personalMypageMeError = null;
        break;

      case PERSONAL_MYPAGE_ME_SUCCESS:
        draft.st_personalMypageMeLoading = false;
        draft.st_personalMypageMeDone = true;
        draft.st_personalMypageMeError = null;
        draft.mypageMyPersnal = action.data.sale;
        draft.mypageMyPrice = action.data.allPrice;
        draft.lastPageMe = action.data.lastPage;

        break;

      case PERSONAL_MYPAGE_ME_FAILURE:
        draft.st_personalMypageMeLoading = false;
        draft.st_personalMypageMeDone = false;
        draft.st_personalMypageMeError = action.error;
        break;

      ///////////////////////////////////////////////////////

      case PERSONAL_MYPAGE_YOU_REQUEST:
        draft.st_personalMypageYouLoading = true;
        draft.st_personalMypageYouDone = false;
        draft.st_personalMypageYouError = null;
        break;

      case PERSONAL_MYPAGE_YOU_SUCCESS:
        draft.st_personalMypageYouLoading = false;
        draft.st_personalMypageYouDone = true;
        draft.st_personalMypageYouError = null;
        draft.mypageYouPersnal = action.data.sale;
        draft.mypageYouPrice = action.data.allPrice;
        draft.lastPageYou = action.data.lastPage;

        break;

      case PERSONAL_MYPAGE_YOU_FAILURE:
        draft.st_personalMypageYouLoading = false;
        draft.st_personalMypageYouDone = false;
        draft.st_personalMypageYouError = action.error;
        break;

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
