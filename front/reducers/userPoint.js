import produce from "../util/produce";

export const initailState = {
  myPointList: [], // 마이페이지 포인트 내역
  //
  lastPage: null,

  //
  st_myPointListLoading: false, // 문의 정보 가져오기
  st_myPointListDone: false,
  st_myPointListError: null,
  //
  st_pointCreateLoading: false, // 포인트 생성
  st_pointCreateDone: false,
  st_pointCreateError: null,
  //
};

export const MY_POINT_LIST_REQUEST = "MY_POINT_LIST_REQUEST";
export const MY_POINT_LIST_SUCCESS = "MY_POINT_LIST_SUCCESS";
export const MY_POINT_LIST_FAILURE = "MY_POINT_LIST_FAILURE";

export const POINT_CREATE_REQUEST = "POINT_CREATE_REQUEST";
export const POINT_CREATE_SUCCESS = "POINT_CREATE_SUCCESS";
export const POINT_CREATE_FAILURE = "POINT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_POINT_LIST_REQUEST: {
        draft.st_myPointListLoading = true;
        draft.st_myPointListDone = false;
        draft.st_myPointListError = null;
        break;
      }
      case MY_POINT_LIST_SUCCESS: {
        draft.st_myPointListLoading = false;
        draft.st_myPointListDone = true;
        draft.st_myPointListError = null;

        draft.myPointList = action.data.points;
        draft.lastPage = action.data.lastPage;
        break;
      }
      case MY_POINT_LIST_FAILURE: {
        draft.st_myPointListLoading = false;
        draft.st_myPointListDone = false;
        draft.st_myPointListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case POINT_CREATE_REQUEST: {
        draft.st_pointCreateLoading = true;
        draft.st_pointCreateDone = false;
        draft.st_pointCreateError = null;
        break;
      }
      case POINT_CREATE_SUCCESS: {
        draft.st_pointCreateLoading = false;
        draft.st_pointCreateDone = true;
        draft.st_pointCreateError = null;
        break;
      }
      case POINT_CREATE_FAILURE: {
        draft.st_pointCreateLoading = false;
        draft.st_pointCreateDone = false;
        draft.st_pointCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
