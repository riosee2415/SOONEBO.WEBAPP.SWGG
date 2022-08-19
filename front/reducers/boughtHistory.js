import produce from "../util/produce";

export const initialState = {
  adminBoughtList: [], // 관리자 주문 내역
  detailBought: [], // 주문 상세
  boughtList: [], // 내 주문 내역
  boughtDetailList: null, // 내 상세 주문 내역
  boughtDetaiItems: null, // 내 상세 주문 내역
  boughtResultId: null, // 주문 생성 아이디
  //
  st_boughtAdminListLoading: false, // 관리자 주문내역 가져오기
  st_boughtAdminListDone: false,
  st_boughtAdminListError: null,
  //
  st_boughtDetailLoading: false, // 주문 상세 가져오기
  st_boughtDetailDone: false,
  st_boughtDetailError: null,
  //
  st_boughtListLoading: false, // 내 주문내역 가져오기
  st_boughtListDone: false,
  st_boughtListError: null,
  //
  st_boughtDetailListLoading: false, // 내 상세주문내역 가져오기
  st_boughtDetailListDone: false,
  st_boughtDetailListError: null,
  //
  st_boughtAdminUpdateLoading: false, // 배송정보 입력하기
  st_boughtAdminUpdateDone: false,
  st_boughtAdminUpdateError: null,
  //
  st_boughtCreateLoading: false, // 주문 생성
  st_boughtCreateDone: false,
  st_boughtCreateError: null,
  //
  st_boughtCompletedLoading: false, // 주문 승인
  st_boughtCompletedDone: false,
  st_boughtCompletedError: null,
};

export const BOUGHT_ADMIN_LIST_REQUEST = "BOUGHT_ADMIN_LIST_REQUEST";
export const BOUGHT_ADMIN_LIST_SUCCESS = "BOUGHT_ADMIN_LIST_SUCCESS";
export const BOUGHT_ADMIN_LIST_FAILURE = "BOUGHT_ADMIN_LIST_FAILURE";

export const BOUGHT_DETAIL_REQUEST = "BOUGHT_DETAIL_REQUEST";
export const BOUGHT_DETAIL_SUCCESS = "BOUGHT_DETAIL_SUCCESS";
export const BOUGHT_DETAIL_FAILURE = "BOUGHT_DETAIL_FAILURE";

export const BOUGHT_LIST_REQUEST = "BOUGHT_LIST_REQUEST";
export const BOUGHT_LIST_SUCCESS = "BOUGHT_LIST_SUCCESS";
export const BOUGHT_LIST_FAILURE = "BOUGHT_LIST_FAILURE";

export const BOUGHT_DETAIL_LIST_REQUEST = "BOUGHT_DETAIL_LIST_REQUEST";
export const BOUGHT_DETAIL_LIST_SUCCESS = "BOUGHT_DETAIL_LIST_SUCCESS";
export const BOUGHT_DETAIL_LIST_FAILURE = "BOUGHT_DETAIL_LIST_FAILURE";

export const BOUGHT_ADMIN_UPDATE_REQUEST = "BOUGHT_ADMIN_UPDATE_REQUEST";
export const BOUGHT_ADMIN_UPDATE_SUCCESS = "BOUGHT_ADMIN_UPDATE_SUCCESS";
export const BOUGHT_ADMIN_UPDATE_FAILURE = "BOUGHT_ADMIN_UPDATE_FAILURE";

export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

export const BOUGHT_COMPLETED_REQUEST = "BOUGHT_COMPLETED_REQUEST";
export const BOUGHT_COMPLETED_SUCCESS = "BOUGHT_COMPLETED_SUCCESS";
export const BOUGHT_COMPLETED_FAILURE = "BOUGHT_COMPLETED_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case BOUGHT_ADMIN_LIST_REQUEST: {
        draft.st_boughtAdminListLoading = true;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = null;
        break;
      }
      case BOUGHT_ADMIN_LIST_SUCCESS: {
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = true;
        draft.st_boughtAdminListError = null;
        draft.adminBoughtList = action.data;
        break;
      }
      case BOUGHT_ADMIN_LIST_FAILURE: {
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_DETAIL_REQUEST: {
        draft.st_boughtDetailLoading = true;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = null;
        break;
      }
      case BOUGHT_DETAIL_SUCCESS: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = true;
        draft.st_boughtDetailError = null;
        draft.detailBought = action.data;
        break;
      }
      case BOUGHT_DETAIL_FAILURE: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_LIST_REQUEST: {
        draft.st_boughtListLoading = true;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = null;
        break;
      }
      case BOUGHT_LIST_SUCCESS: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = true;
        draft.st_boughtListError = null;
        draft.boughtList = action.data.boughts;
        break;
      }
      case BOUGHT_LIST_FAILURE: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_DETAIL_LIST_REQUEST: {
        draft.st_boughtDetailListLoading = true;
        draft.st_boughtDetailListDone = false;
        draft.st_boughtDetailListError = null;
        break;
      }
      case BOUGHT_DETAIL_LIST_SUCCESS: {
        draft.st_boughtDetailListLoading = false;
        draft.st_boughtDetailListDone = true;
        draft.st_boughtDetailListError = null;
        draft.boughtDetailList = action.data.boughtData;
        draft.boughtDetaiItems = action.data.items;
        break;
      }
      case BOUGHT_DETAIL_LIST_FAILURE: {
        draft.st_boughtDetailListLoading = false;
        draft.st_boughtDetailListDone = false;
        draft.st_boughtDetailListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_ADMIN_UPDATE_REQUEST: {
        draft.st_boughtAdminUpdateLoading = true;
        draft.st_boughtAdminUpdateDone = false;
        draft.st_boughtAdminUpdateError = null;
        break;
      }
      case BOUGHT_ADMIN_UPDATE_SUCCESS: {
        draft.st_boughtAdminUpdateLoading = false;
        draft.st_boughtAdminUpdateDone = true;
        draft.st_boughtAdminUpdateError = null;
        break;
      }
      case BOUGHT_ADMIN_UPDATE_FAILURE: {
        draft.st_boughtAdminUpdateLoading = false;
        draft.st_boughtAdminUpdateDone = false;
        draft.st_boughtAdminUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_CREATE_REQUEST: {
        draft.st_boughtCreateLoading = true;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = null;
        break;
      }
      case BOUGHT_CREATE_SUCCESS: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = true;
        draft.st_boughtCreateError = null;
        draft.boughtResultId = action.data.resultId;
        break;
      }
      case BOUGHT_CREATE_FAILURE: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BOUGHT_COMPLETED_REQUEST: {
        draft.st_boughtCompletedLoading = true;
        draft.st_boughtCompletedDone = false;
        draft.st_boughtCompletedError = null;
        break;
      }
      case BOUGHT_COMPLETED_SUCCESS: {
        draft.st_boughtCompletedLoading = false;
        draft.st_boughtCompletedDone = true;
        draft.st_boughtCompletedError = null;
        break;
      }
      case BOUGHT_COMPLETED_FAILURE: {
        draft.st_boughtCompletedLoading = false;
        draft.st_boughtCompletedDone = false;
        draft.st_boughtCompletedError = action.error;
        break;
      }

      //////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
