import produce from "../util/produce";

export const initailState = {
  opinions: [],
  types: [],
  myOpinion: null, // 내 문의 목록
  myOpinionMaxPage: null,

  createTypeModal: false, // 문의 유형 create 모달 실행

  updateModal: false, // 문의 update 모달 실행

  st_opinionLoading: false, // 문의 정보 가져오기
  st_opinionDone: false,
  st_opinionError: null,
  //
  st_myOpinionListLoading: false, // 내 문의 정보 가져오기
  st_myOpinionListDone: false,
  st_myOpinionListError: null,
  //
  st_opinionCreateLoading: false, // 문의 정보 추가하기
  st_opinionCreateDone: false,
  st_opinionCreateError: null,
  //
  st_opinionUpdateLoading: false, // 문의 정보 처리
  st_opinionUpdateDone: false,
  st_opinionUpdateError: null,

  // ************************************************

  st_opinionTypeLoading: false, // 문의 유형 정보 가져오기
  st_opinionTypeDone: false,
  st_opinionTypeError: null,
  //
  st_opinionTypeCreateLoading: false, // 문의 유형 정보 추가하기
  st_opinionTypeCreateDone: false,
  st_opinionTypeCreateError: null,
  //
  st_opinionTypeUpdateLoading: false, // 문의 유형 정보 수정하기
  st_opinionTypeUpdateDone: false,
  st_opinionTypeUpdateError: null,
  //
  st_opinionTypeDeleteLoading: false, // 문의 유형 정보 삭제하기
  st_opinionTypeDeleteDone: false,
  st_opinionTypeDeleteError: null,
};

export const OPINION_GET_REQUEST = "OPINION_GET_REQUEST";
export const OPINION_GET_SUCCESS = "OPINION_GET_SUCCESS";
export const OPINION_GET_FAILURE = "OPINION_GET_FAILURE";

export const MY_OPINION_LIST_REQUEST = "MY_OPINION_LIST_REQUEST";
export const MY_OPINION_LIST_SUCCESS = "MY_OPINION_LIST_SUCCESS";
export const MY_OPINION_LIST_FAILURE = "MY_OPINION_LIST_FAILURE";

export const OPINION_CREATE_REQUEST = "OPINION_CREATE_REQUEST";
export const OPINION_CREATE_SUCCESS = "OPINION_CREATE_SUCCESS";
export const OPINION_CREATE_FAILURE = "OPINION_CREATE_FAILURE";

export const OPINION_UPDATE_REQUEST = "OPINION_UPDATE_REQUEST";
export const OPINION_UPDATE_SUCCESS = "OPINION_UPDATE_SUCCESS";
export const OPINION_UPDATE_FAILURE = "OPINION_UPDATE_FAILURE";

// ************************************************
export const OPINION_TYPE_GET_REQUEST = "OPINION_TYPE_GET_REQUEST";
export const OPINION_TYPE_GET_SUCCESS = "OPINION_TYPE_GET_SUCCESS";
export const OPINION_TYPE_GET_FAILURE = "OPINION_TYPE_GET_FAILURE";

export const OPINION_TYPE_CREATE_REQUEST = "OPINION_TYPE_CREATE_REQUEST";
export const OPINION_TYPE_CREATE_SUCCESS = "OPINION_TYPE_CREATE_SUCCESS";
export const OPINION_TYPE_CREATE_FAILURE = "OPINION_TYPE_CREATE_FAILURE";

export const OPINION_TYPE_UPDATE_REQUEST = "OPINION_TYPE_UPDATE_REQUEST";
export const OPINION_TYPE_UPDATE_SUCCESS = "OPINION_TYPE_UPDATE_SUCCESS";
export const OPINION_TYPE_UPDATE_FAILURE = "OPINION_TYPE_UPDATE_FAILURE";

export const OPINION_TYPE_DELETE_REQUEST = "OPINION_TYPE_DELETE_REQUEST";
export const OPINION_TYPE_DELETE_SUCCESS = "OPINION_TYPE_DELETE_SUCCESS";
export const OPINION_TYPE_DELETE_FAILURE = "OPINION_TYPE_DELETE_FAILURE";

export const CREATE_TYPE_MODAL_TOGGLE = "CREATE_TYPE_MODAL_TOGGLE";

export const UPDATE_MODAL_TOGGLE = "UPDATE_MODAL_TOGGLE";

export const RESET_OPINION_CREATE = "RESET_OPINION_CREATE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPINION_GET_REQUEST: {
        draft.st_opinionLoading = true;
        draft.st_opinionDone = false;
        draft.st_opinionError = null;
        break;
      }
      case OPINION_GET_SUCCESS: {
        draft.st_opinionLoading = false;
        draft.st_opinionDone = true;
        draft.st_opinionError = null;
        draft.opinions = action.data.list;
        break;
      }
      case OPINION_GET_FAILURE: {
        draft.st_opinionLoading = false;
        draft.st_opinionDone = false;
        draft.st_opinionError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case MY_OPINION_LIST_REQUEST: {
        draft.st_myOpinionListLoading = true;
        draft.st_myOpinionListDone = false;
        draft.st_myOpinionListError = null;
        break;
      }
      case MY_OPINION_LIST_SUCCESS: {
        draft.st_myOpinionListLoading = false;
        draft.st_myOpinionListDone = true;
        draft.st_myOpinionListError = null;
        draft.myOpinion = action.data.lists;
        draft.myOpinionMaxPage = action.data.lastPage;
        break;
      }
      case MY_OPINION_LIST_FAILURE: {
        draft.st_myOpinionListLoading = false;
        draft.st_myOpinionListDone = false;
        draft.st_myOpinionListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case OPINION_CREATE_REQUEST: {
        draft.st_opinionCreateLoading = true;
        draft.st_opinionCreateDone = false;
        draft.st_opinionCreateError = null;
        break;
      }
      case OPINION_CREATE_SUCCESS: {
        draft.st_opinionCreateLoading = false;
        draft.st_opinionCreateDone = true;
        draft.st_opinionError = null;
        draft.opinions = action.data;
        break;
      }
      case OPINION_CREATE_FAILURE: {
        draft.st_opinionCreateLoading = false;
        draft.st_opinionCreateDone = false;
        draft.st_opinionCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case OPINION_UPDATE_REQUEST: {
        draft.st_opinionUpdateLoading = true;
        draft.st_opinionUpdateDone = false;
        draft.st_opinionUpdateError = null;
        break;
      }
      case OPINION_UPDATE_SUCCESS: {
        draft.st_opinionUpdateLoading = false;
        draft.st_opinionUpdateDone = true;
        draft.st_opinionError = null;
        break;
      }
      case OPINION_UPDATE_FAILURE: {
        draft.st_opinionUpdateLoading = false;
        draft.st_opinionUpdateDone = false;
        draft.st_opinionUpdateError = action.error;
        break;
      }

      // ************************************************

      case OPINION_TYPE_GET_REQUEST: {
        draft.st_opinionTypeLoading = true;
        draft.st_opinionTypeDone = false;
        draft.st_opinionTypeError = null;
        break;
      }
      case OPINION_TYPE_GET_SUCCESS: {
        draft.st_opinionTypeLoading = false;
        draft.st_opinionTypeDone = true;
        draft.st_opinionError = null;
        draft.types = action.data.type;
        break;
      }
      case OPINION_TYPE_GET_FAILURE: {
        draft.st_opinionTypeLoading = false;
        draft.st_opinionTypeDone = false;
        draft.st_opinionTypeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case OPINION_TYPE_CREATE_REQUEST: {
        draft.st_opinionTypeCreateLoading = true;
        draft.st_opinionTypeCreateDone = false;
        draft.st_opinionTypeCreateError = null;
        break;
      }
      case OPINION_TYPE_CREATE_SUCCESS: {
        draft.st_opinionTypeCreateLoading = false;
        draft.st_opinionTypeCreateDone = true;
        draft.st_opinionError = null;
        break;
      }
      case OPINION_TYPE_CREATE_FAILURE: {
        draft.st_opinionTypeCreateLoading = false;
        draft.st_opinionTypeCreateDone = false;
        draft.st_opinionTypeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case OPINION_TYPE_UPDATE_REQUEST: {
        draft.st_opinionTypeUpdateLoading = true;
        draft.st_opinionTypeUpdateDone = false;
        draft.st_opinionTypeUpdateError = null;
        break;
      }
      case OPINION_TYPE_UPDATE_SUCCESS: {
        draft.st_opinionTypeUpdateLoading = false;
        draft.st_opinionTypeUpdateDone = true;
        draft.st_opinionError = null;
        break;
      }
      case OPINION_TYPE_UPDATE_FAILURE: {
        draft.st_opinionTypeUpdateLoading = false;
        draft.st_opinionTypeUpdateDone = false;
        draft.st_opinionTypeUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case OPINION_TYPE_DELETE_REQUEST: {
        draft.st_opinionTypeDeleteLoading = true;
        draft.st_opinionTypeDeleteDone = false;
        draft.st_opinionTypeDeleteError = null;
        break;
      }
      case OPINION_TYPE_DELETE_SUCCESS: {
        draft.st_opinionTypeDeleteLoading = false;
        draft.st_opinionTypeDeleteDone = true;
        draft.st_opinionError = null;
        break;
      }
      case OPINION_TYPE_DELETE_FAILURE: {
        draft.st_opinionTypeDeleteLoading = false;
        draft.st_opinionTypeDeleteDone = false;
        draft.st_opinionTypeDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case CREATE_TYPE_MODAL_TOGGLE:
        draft.createTypeModal = !draft.createTypeModal;
        break;

      case UPDATE_MODAL_TOGGLE:
        draft.updateModal = !draft.updateModal;
        break;

      case RESET_OPINION_CREATE:
        draft.st_opinionCreateDone = false;
        break;

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
