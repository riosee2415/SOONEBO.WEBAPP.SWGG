import produce from "../util/produce";

export const initailState = {
  myList: [], // 마이페이지 취소/반품/교환 내역
  adminList: [], // 관리자 취소/반품/교환 내역
  detailList: null, // 디테일 내역
  detailItem: null, // 디테일 상품내역
  //
  lastPage: null,

  //
  st_myCancelListLoading: false, // 마이페이지 취소/반품/교환 내역 가져오기
  st_myCancelListDone: false,
  st_myCancelListError: null,
  //
  st_adminCancelListLoading: false, // 관리자 취소/반품/교환 내역 가져오기
  st_adminCancelListDone: false,
  st_adminCancelListError: null,
  //
  st_detailCancelLoading: false, // 디테일 취소/반품/교환 내역 가져오기
  st_detailCancelDone: false,
  st_detailCancelError: null,
  //
  st_cancelCreateLoading: false, // 취소/반품/교환 신청하기
  st_cancelCreateDone: false,
  st_cancelCreateError: null,
  //
  st_cancelUpdateLoading: false, // 취소/반품/교환 승인하기
  st_cancelUpdateDone: false,
  st_cancelUpdateError: null,
  //
};

export const MY_CANCEL_LIST_REQUEST = "MY_CANCEL_LIST_REQUEST";
export const MY_CANCEL_LIST_SUCCESS = "MY_CANCEL_LIST_SUCCESS";
export const MY_CANCEL_LIST_FAILURE = "MY_CANCEL_LIST_FAILURE";
//
export const ADMIN_CANCEL_LIST_REQUEST = "ADMIN_CANCEL_LIST_REQUEST";
export const ADMIN_CANCEL_LIST_SUCCESS = "ADMIN_CANCEL_LIST_SUCCESS";
export const ADMIN_CANCEL_LIST_FAILURE = "ADMIN_CANCEL_LIST_FAILURE";
//
export const DETAIL_CANCEL_REQUEST = "DETAIL_CANCEL_REQUEST";
export const DETAIL_CANCEL_SUCCESS = "DETAIL_CANCEL_SUCCESS";
export const DETAIL_CANCEL_FAILURE = "DETAIL_CANCEL_FAILURE";
//
export const CANCEL_CREATE_REQUEST = "CANCEL_CREATE_REQUEST";
export const CANCEL_CREATE_SUCCESS = "CANCEL_CREATE_SUCCESS";
export const CANCEL_CREATE_FAILURE = "CANCEL_CREATE_FAILURE";
//
export const CANCEL_UPDATE_REQUEST = "CANCEL_UPDATE_REQUEST";
export const CANCEL_UPDATE_SUCCESS = "CANCEL_UPDATE_SUCCESS";
export const CANCEL_UPDATE_FAILURE = "CANCEL_UPDATE_FAILURE";
//

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_CANCEL_LIST_REQUEST: {
        draft.st_myCancelListLoading = true;
        draft.st_myCancelListDone = false;
        draft.st_myCancelListError = null;
        break;
      }
      case MY_CANCEL_LIST_SUCCESS: {
        draft.st_myCancelListLoading = false;
        draft.st_myCancelListDone = true;
        draft.st_myCancelListError = null;
        draft.myList = action.data.cancels;
        draft.lastPage = action.data.lastPage;
        break;
      }
      case MY_CANCEL_LIST_FAILURE: {
        draft.st_myCancelListLoading = false;
        draft.st_myCancelListDone = false;
        draft.st_myCancelListError = action.error;
        break;
      }
      //////////////////////////////////////////////////
      case ADMIN_CANCEL_LIST_REQUEST: {
        draft.st_adminCancelListLoading = true;
        draft.st_adminCancelListDone = false;
        draft.st_adminCancelListError = null;
        break;
      }
      case ADMIN_CANCEL_LIST_SUCCESS: {
        draft.st_adminCancelListLoading = false;
        draft.st_adminCancelListDone = true;
        draft.st_adminCancelListError = null;
        draft.adminList = action.data;
        break;
      }
      case ADMIN_CANCEL_LIST_FAILURE: {
        draft.st_adminCancelListLoading = false;
        draft.st_adminCancelListDone = false;
        draft.st_adminCancelListError = action.error;
        break;
      }
      //////////////////////////////////////////////////
      case DETAIL_CANCEL_REQUEST: {
        draft.st_detailCancelLoading = true;
        draft.st_detailCancelDone = false;
        draft.st_detailCancelError = null;
        break;
      }
      case DETAIL_CANCEL_SUCCESS: {
        draft.st_detailCancelLoading = false;
        draft.st_detailCancelDone = true;
        draft.st_detailCancelError = null;
        draft.detailList = action.data.cancel;
        draft.detailItem = action.data.items;
        break;
      }
      case DETAIL_CANCEL_FAILURE: {
        draft.st_detailCancelLoading = false;
        draft.st_detailCancelDone = false;
        draft.st_detailCancelError = action.error;
        break;
      }

      //////////////////////////////////////////////////
      case CANCEL_CREATE_REQUEST: {
        draft.st_cancelCreateLoading = true;
        draft.st_cancelCreateDone = false;
        draft.st_cancelCreateError = null;
        break;
      }
      case CANCEL_CREATE_SUCCESS: {
        draft.st_cancelCreateLoading = false;
        draft.st_cancelCreateDone = true;
        draft.st_cancelCreateError = null;
        break;
      }
      case CANCEL_CREATE_FAILURE: {
        draft.st_cancelCreateLoading = false;
        draft.st_cancelCreateDone = false;
        draft.st_cancelCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////////
      case CANCEL_UPDATE_REQUEST: {
        draft.st_cancelUpdateLoading = true;
        draft.st_cancelUpdateDone = false;
        draft.st_cancelUpdateError = null;
        break;
      }
      case CANCEL_UPDATE_SUCCESS: {
        draft.st_cancelUpdateLoading = false;
        draft.st_cancelUpdateDone = true;
        draft.st_cancelUpdateError = null;
        break;
      }
      case CANCEL_UPDATE_FAILURE: {
        draft.st_cancelUpdateLoading = false;
        draft.st_cancelUpdateDone = false;
        draft.st_cancelUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
