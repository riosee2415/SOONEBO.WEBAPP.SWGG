import produce from "../util/produce";

export const initailState = {
  gradeAllList: [], // 직급 리스트

  //
  st_gradeListLoading: false, // 직급 전체 리스트 불러오기
  st_gradeListDone: false,
  st_gradeListError: false,
  //
  st_gradeUpdateLoading: false, // 직급 업데이트
  st_gradeUpdateDone: false,
  st_gradeUpdateError: false,
};

export const GRADE_ALL_LIST_REQUEST = "GRADE_ALL_LIST_REQUEST";
export const GRADE_ALL_LIST_SUCCESS = "GRADE_ALL_LIST_SUCCESS";
export const GRADE_ALL_LIST_FAILURE = "GRADE_ALL_LIST_FAILURE";

export const GRADE_UPDATE_REQUEST = "GRADE_UPDATE_REQUEST";
export const GRADE_UPDATE_SUCCESS = "GRADE_UPDATE_SUCCESS";
export const GRADE_UPDATE_FAILURE = "GRADE_UPDATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case GRADE_ALL_LIST_REQUEST:
        draft.st_gradeListLoading = true;
        draft.st_gradeListDone = false;
        draft.st_gradeListError = null;
        break;

      case GRADE_ALL_LIST_SUCCESS:
        draft.st_gradeListLoading = false;
        draft.st_gradeListDone = true;
        draft.st_gradeListError = null;
        draft.gradeAllList = action.data;
        break;

      case GRADE_ALL_LIST_FAILURE:
        draft.st_gradeListLoading = false;
        draft.st_gradeListDone = false;
        draft.st_gradeListError = action.error;
        break;

      //////////////////////////////////////////////

      case GRADE_UPDATE_REQUEST:
        draft.st_gradeUpdateLoading = true;
        draft.st_gradeUpdateDone = false;
        draft.st_gradeUpdateError = null;
        break;

      case GRADE_UPDATE_SUCCESS:
        draft.st_gradeUpdateLoading = false;
        draft.st_gradeUpdateDone = true;
        draft.st_gradeUpdateError = null;
        break;

      case GRADE_UPDATE_FAILURE:
        draft.st_gradeUpdateLoading = false;
        draft.st_gradeUpdateDone = false;
        draft.st_gradeUpdateError = action.error;
        break;

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
