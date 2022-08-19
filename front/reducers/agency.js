import produce from "../util/produce";

export const initailState = {
  agencys: [],
  searchAgencys: [],

  //
  st_agencyListLoading: false, // 대리점 가져오기
  st_agencyListDone: false,
  st_agencyListError: null,
  //
  st_searchAgencyListLoading: false, // 대리점 가져오기(검색용)
  st_searchAgencyListDone: false,
  st_searchAgencyListError: null,
  //
  st_agencyCreateLoading: false, // 대리점 등록하기
  st_agencyCreateDone: false,
  st_agencyCreateError: null,
  //
  st_agencyUpdateLoading: false, // 대리점 업데이트
  st_agencyUpdateDone: false,
  st_agencyUpdateError: null,
};

export const AGENCY_LIST_REQUEST = "AGENCY_LIST_REQUEST";
export const AGENCY_LIST_SUCCESS = "AGENCY_LIST_SUCCESS";
export const AGENCY_LIST_FAILURE = "AGENCY_LIST_FAILURE";
//
export const SEARCH_AGENCY_LIST_REQUEST = "SEARCH_AGENCY_LIST_REQUEST";
export const SEARCH_AGENCY_LIST_SUCCESS = "SEARCH_AGENCY_LIST_SUCCESS";
export const SEARCH_AGENCY_LIST_FAILURE = "SEARCH_AGENCY_LIST_FAILURE";
//
export const AGENCY_CREATE_REQUEST = "AGENCY_CREATE_REQUEST";
export const AGENCY_CREATE_SUCCESS = "AGENCY_CREATE_SUCCESS";
export const AGENCY_CREATE_FAILURE = "AGENCY_CREATE_FAILURE";
//
export const AGENCY_UPDATE_REQUEST = "AGENCY_UPDATE_REQUEST";
export const AGENCY_UPDATE_SUCCESS = "AGENCY_UPDATE_SUCCESS";
export const AGENCY_UPDATE_FAILURE = "AGENCY_UPDATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AGENCY_LIST_REQUEST: {
        draft.st_agencyListLoading = true;
        draft.st_agencyListDone = false;
        draft.st_agencyListError = null;
        break;
      }
      case AGENCY_LIST_SUCCESS: {
        draft.st_agencyListLoading = false;
        draft.st_agencyListDone = true;
        draft.st_agencyListError = null;
        draft.agencys = action.data;
        break;
      }
      case AGENCY_LIST_FAILURE: {
        draft.st_agencyListLoading = false;
        draft.st_agencyListDone = false;
        draft.st_agencyListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case SEARCH_AGENCY_LIST_REQUEST: {
        draft.st_searchAgencyListLoading = true;
        draft.st_searchAgencyListDone = false;
        draft.st_searchAgencyListError = null;
        break;
      }
      case SEARCH_AGENCY_LIST_SUCCESS: {
        draft.st_searchAgencyListLoading = false;
        draft.st_searchAgencyListDone = true;
        draft.st_searchAgencyListError = null;
        draft.searchAgencys = action.data;
        break;
      }
      case SEARCH_AGENCY_LIST_FAILURE: {
        draft.st_searchAgencyListLoading = false;
        draft.st_searchAgencyListDone = false;
        draft.st_searchAgencyListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case AGENCY_CREATE_REQUEST: {
        draft.st_agencyCreateLoading = true;
        draft.st_agencyCreateDone = false;
        draft.st_agencyCreateError = null;
        break;
      }
      case AGENCY_CREATE_SUCCESS: {
        draft.st_agencyCreateLoading = false;
        draft.st_agencyCreateDone = true;
        draft.st_agencyCreateError = null;
        break;
      }
      case AGENCY_CREATE_FAILURE: {
        draft.st_agencyCreateLoading = false;
        draft.st_agencyCreateDone = false;
        draft.st_agencyCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case AGENCY_UPDATE_REQUEST: {
        draft.st_agencyUpdateLoading = true;
        draft.st_agencyUpdateDone = false;
        draft.st_agencyUpdateError = null;
        break;
      }
      case AGENCY_UPDATE_SUCCESS: {
        draft.st_agencyUpdateLoading = false;
        draft.st_agencyUpdateDone = true;
        draft.st_agencyUpdateError = null;
        break;
      }
      case AGENCY_UPDATE_FAILURE: {
        draft.st_agencyUpdateLoading = false;
        draft.st_agencyUpdateDone = false;
        draft.st_agencyUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
