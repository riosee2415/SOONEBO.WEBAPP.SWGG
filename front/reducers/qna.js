import produce from "../util/produce";

export const initailState = {
  adminQna: [], // 관리자
  productQna: [], // 상품상세
  myQna: [], // 내가작성
  allQna: [], // 전체

  maxPage: null,

  st_adminQnaListLoading: false, // 관리자 질문 가져오기
  st_adminQnaListDone: false,
  st_adminQnaListError: null,
  //
  st_productQnaListLoading: false, // 상품페이지 질문 가져오기
  st_productQnaListDone: false,
  st_productQnaListError: null,
  //
  st_myQnaListLoading: false, // 내가 작성한 질문 가져오기
  st_myQnaListDone: false,
  st_myQnaListError: null,
  //
  st_allQnaListLoading: false, // 전체 질문 가져오기
  st_allQnaListDone: false,
  st_allQnaListError: null,
  //
  st_qnaCreateLoading: false, // 질문 추가하기
  st_qnaCreateDone: false,
  st_qnaCreateError: null,
  //
  st_qnaUpdateLoading: false, // 질문 답변 처리
  st_qnaUpdateDone: false,
  st_qnaUpdateError: null,
};

export const ADMIN_QNA_LIST_REQUEST = "ADMIN_QNA_LIST_REQUEST";
export const ADMIN_QNA_LIST_SUCCESS = "ADMIN_QNA_LIST_SUCCESS";
export const ADMIN_QNA_LIST_FAILURE = "ADMIN_QNA_LIST_FAILURE";

export const PRODUCT_QNA_LIST_REQUEST = "PRODUCT_QNA_LIST_REQUEST";
export const PRODUCT_QNA_LIST_SUCCESS = "PRODUCT_QNA_LIST_SUCCESS";
export const PRODUCT_QNA_LIST_FAILURE = "PRODUCT_QNA_LIST_FAILURE";

export const MY_QNA_LIST_REQUEST = "MY_QNA_LIST_REQUEST";
export const MY_QNA_LIST_SUCCESS = "MY_QNA_LIST_SUCCESS";
export const MY_QNA_LIST_FAILURE = "MY_QNA_LIST_FAILURE";

export const ALL_QNA_LIST_REQUEST = "ALL_QNA_LIST_REQUEST";
export const ALL_QNA_LIST_SUCCESS = "ALL_QNA_LIST_SUCCESS";
export const ALL_QNA_LIST_FAILURE = "ALL_QNA_LIST_FAILURE";

export const QNA_CREATE_REQUEST = "QNA_CREATE_REQUEST";
export const QNA_CREATE_SUCCESS = "QNA_CREATE_SUCCESS";
export const QNA_CREATE_FAILURE = "QNA_CREATE_FAILURE";

export const QNA_UPDATE_REQUEST = "QNA_UPDATE_REQUEST";
export const QNA_UPDATE_SUCCESS = "QNA_UPDATE_SUCCESS";
export const QNA_UPDATE_FAILURE = "QNA_UPDATE_FAILURE";

export const QNA_CREATE_RESET = "QNA_CREATE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADMIN_QNA_LIST_REQUEST: {
        draft.st_adminQnaListLoading = true;
        draft.st_adminQnaListDone = false;
        draft.st_adminQnaListError = null;
        break;
      }
      case ADMIN_QNA_LIST_SUCCESS: {
        draft.st_adminQnaListLoading = false;
        draft.st_adminQnaListDone = true;
        draft.st_adminQnaListError = null;
        draft.adminQna = action.data.list;
        break;
      }
      case ADMIN_QNA_LIST_FAILURE: {
        draft.st_adminQnaListLoading = false;
        draft.st_adminQnaListDone = false;
        draft.st_adminQnaListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case PRODUCT_QNA_LIST_REQUEST: {
        draft.st_productQnaListLoading = true;
        draft.st_productQnaListDone = false;
        draft.st_productQnaListError = null;
        break;
      }
      case PRODUCT_QNA_LIST_SUCCESS: {
        draft.st_productQnaListLoading = false;
        draft.st_productQnaListDone = true;
        draft.st_productQnaListError = null;
        draft.productQna = action.data.qnas;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case PRODUCT_QNA_LIST_FAILURE: {
        draft.st_productQnaListLoading = false;
        draft.st_productQnaListDone = false;
        draft.st_productQnaListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case MY_QNA_LIST_REQUEST: {
        draft.st_myQnaListLoading = true;
        draft.st_myQnaListDone = false;
        draft.st_myQnaListError = null;
        break;
      }
      case MY_QNA_LIST_SUCCESS: {
        draft.st_myQnaListLoading = false;
        draft.st_myQnaListDone = true;
        draft.st_myQnaListError = null;
        draft.myQna = action.data.qnas;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case MY_QNA_LIST_FAILURE: {
        draft.st_myQnaListLoading = false;
        draft.st_myQnaListDone = false;
        draft.st_myQnaListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case ALL_QNA_LIST_REQUEST: {
        draft.st_myQnaListLoading = true;
        draft.st_myQnaListDone = false;
        draft.st_myQnaListError = null;
        break;
      }
      case ALL_QNA_LIST_SUCCESS: {
        draft.st_myQnaListLoading = false;
        draft.st_myQnaListDone = true;
        draft.st_myQnaListError = null;
        draft.allQna = action.data.qnas;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case ALL_QNA_LIST_FAILURE: {
        draft.st_myQnaListLoading = false;
        draft.st_myQnaListDone = false;
        draft.st_myQnaListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case QNA_CREATE_REQUEST: {
        draft.st_qnaCreateLoading = true;
        draft.st_qnaCreateDone = false;
        draft.st_qnaCreateError = null;
        break;
      }
      case QNA_CREATE_SUCCESS: {
        draft.st_qnaCreateLoading = false;
        draft.st_qnaCreateDone = true;
        draft.st_qnaCreateError = null;
        break;
      }
      case QNA_CREATE_FAILURE: {
        draft.st_qnaCreateLoading = false;
        draft.st_qnaCreateDone = false;
        draft.st_qnaCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case QNA_UPDATE_REQUEST: {
        draft.st_qnaUpdateLoading = true;
        draft.st_qnaUpdateDone = false;
        draft.st_qnaUpdateError = null;
        break;
      }
      case QNA_UPDATE_SUCCESS: {
        draft.st_qnaUpdateLoading = false;
        draft.st_qnaUpdateDone = true;
        draft.st_qnaUpdateError = null;
        break;
      }
      case QNA_UPDATE_FAILURE: {
        draft.st_qnaUpdateLoading = false;
        draft.st_qnaUpdateDone = false;
        draft.st_qnaUpdateError = action.error;
        break;
      }

      // ************************************************

      case QNA_CREATE_RESET: {
        draft.st_qnaCreateLoading = false;
        draft.st_qnaCreateDone = false;
        draft.st_qnaCreateError = null;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
