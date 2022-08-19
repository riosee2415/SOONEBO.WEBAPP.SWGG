import produce from "../util/produce";

export const initialState = {
  faqTypes: [],
  faqs: [], // 사용자 faq리스트
  adminFaqs: null,
  currentFaqList: [],
  graph: null,
  //
  lastPage: null,

  st_faqTypeListLoading: false, // 유형 가져오기
  st_faqTypeListDone: false,
  st_faqTypeListError: null,
  //
  st_faqTypeCreateLoading: false, // 유형 생성하기
  st_faqTypeCreateDone: false,
  st_faqTypeCreateError: null,
  //
  st_faqTypeUpdateLoading: false, // 유형 수정하기
  st_faqTypeUpdateDone: false,
  st_faqTypeUpdateError: null,
  //
  st_faqTypeDeleteLoading: false, // 유형 삭제하기
  st_faqTypeDeleteDone: false,
  st_faqTypeDeleteError: null,
  //
  st_faqListLoading: false, // FAQ 리스트 불러오기
  st_faqListDone: false,
  st_faqListError: null,
  //
  st_faqAdminListLoading: false, // FAQ 리스트 불러오기(관리자)
  st_faqAdminListDone: false,
  st_faqAdminListError: null,
  //
  st_faqTypeGetDataLoading: false,
  st_faqTypeGetDataDone: false,
  st_faqTypeGetDataError: null,
  //
  st_faqUpdateLoading: false,
  st_faqUpdateDone: false,
  st_faqUpdateError: null,
  //
  st_faqCreateLoading: false,
  st_faqCreateDone: false,
  st_faqCreateError: null,
  //
  st_faqDeleteLoading: false,
  st_faqDeleteDone: false,
  st_faqDeleteError: null,
  //

  st_faqGraphLoading: false,
  st_faqGraphDone: false,
  st_faqGraphError: null,
  //
  createModal: false,
  faqCreateModal: false,
};

export const FAQ_TYPE_LIST_REQUEST = "FAQ_TYPE_LIST_REQUEST";
export const FAQ_TYPE_LIST_SUCCESS = "FAQ_TYPE_LIST_SUCCESS";
export const FAQ_TYPE_LIST_FAILURE = "FAQ_TYPE_LIST_FAILURE";

export const FAQ_TYPE_CREATE_REQUEST = "FAQ_TYPE_CREATE_REQUEST";
export const FAQ_TYPE_CREATE_SUCCESS = "FAQ_TYPE_CREATE_SUCCESS";
export const FAQ_TYPE_CREATE_FAILURE = "FAQ_TYPE_CREATE_FAILURE";

export const FAQ_TYPE_UPDATE_REQUEST = "FAQ_TYPE_UPDATE_REQUEST";
export const FAQ_TYPE_UPDATE_SUCCESS = "FAQ_TYPE_UPDATE_SUCCESS";
export const FAQ_TYPE_UPDATE_FAILURE = "FAQ_TYPE_UPDATE_FAILURE";

export const FAQ_TYPE_DELETE_REQUEST = "FAQ_TYPE_DELETE_REQUEST";
export const FAQ_TYPE_DELETE_SUCCESS = "FAQ_TYPE_DELETE_SUCCESS";
export const FAQ_TYPE_DELETE_FAILURE = "FAQ_TYPE_DELETE_FAILURE";
/////
export const FAQ_ADMIN_LIST_REQUEST = "FAQ_ADMIN_LIST_REQUEST";
export const FAQ_ADMIN_LIST_SUCCESS = "FAQ_ADMIN_LIST_SUCCESS";
export const FAQ_ADMIN_LIST_FAILURE = "FAQ_ADMIN_LIST_FAILURE";
/////
export const FAQ_LIST_REQUEST = "FAQ_LIST_REQUEST";
export const FAQ_LIST_SUCCESS = "FAQ_LIST_SUCCESS";
export const FAQ_LIST_FAILURE = "FAQ_LIST_FAILURE";
/////
export const FAQ_TYPE_GETDATA_REQUEST = "FAQ_TYPE_GETDATA_REQUEST";
export const FAQ_TYPE_GETDATA_SUCCESS = "FAQ_TYPE_GETDATA_SUCCESS";
export const FAQ_TYPE_GETDATA_FAILURE = "FAQ_TYPE_GETDATA_FAILURE";
/////
export const FAQ_UPDATE_REQUEST = "FAQ_UPDATE_REQUEST";
export const FAQ_UPDATE_SUCCESS = "FAQ_UPDATE_SUCCESS";
export const FAQ_UPDATE_FAILURE = "FAQ_UPDATE_FAILURE";
/////
export const FAQ_CREATE_REQUEST = "FAQ_CREATE_REQUEST";
export const FAQ_CREATE_SUCCESS = "FAQ_CREATE_SUCCESS";
export const FAQ_CREATE_FAILURE = "FAQ_CREATE_FAILURE";
/////
export const FAQ_DELETE_REQUEST = "FAQ_DELETE_REQUEST";
export const FAQ_DELETE_SUCCESS = "FAQ_DELETE_SUCCESS";
export const FAQ_DELETE_FAILURE = "FAQ_DELETE_FAILURE";
////
export const FAQ_GRAPH_REQUEST = "FAQ_GRAPH_REQUEST";
export const FAQ_GRAPH_SUCCESS = "FAQ_GRAPH_SUCCESS";
export const FAQ_GRAPH_FAILURE = "FAQ_GRAPH_FAILURE";
////
export const FAQ_TYPE_CREATE_MODAL_TOGGLE = "FAQ_TYPE_CREATE_MODAL_TOGGLE";
export const FAQ_CREATE_MODAL_TOGGLE = "FAQ_CREATE_MODAL_TOGGLE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FAQ_TYPE_LIST_REQUEST:
        draft.st_faqTypeListLoading = true;
        draft.st_faqTypeListDone = false;
        draft.st_faqTypeListError = null;

        break;
      case FAQ_TYPE_LIST_SUCCESS:
        draft.st_faqTypeListLoading = false;
        draft.st_faqTypeListDone = true;
        draft.st_faqTypeListError = null;
        draft.faqTypes = action.data.list;

        break;
      case FAQ_TYPE_LIST_FAILURE:
        draft.st_faqTypeListLoading = false;
        draft.st_faqTypeListDone = false;
        draft.st_faqTypeListError = action.data;

        break;
      //////////////////////////////////////////////
      case FAQ_TYPE_CREATE_REQUEST:
        draft.st_faqTypeCreateLoading = true;
        draft.st_faqTypeCreateDone = false;
        draft.st_faqTypeCreateError = null;

        break;
      case FAQ_TYPE_CREATE_SUCCESS:
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = true;
        draft.st_faqTypeCreateError = null;

        break;
      case FAQ_TYPE_CREATE_FAILURE:
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = false;
        draft.st_faqTypeCreateError = action.data;

        break;
      //////////////////////////////////////////////
      case FAQ_TYPE_UPDATE_REQUEST:
        draft.st_faqTypeUpdateLoading = true;
        draft.st_faqTypeUpdateDone = false;
        draft.st_faqTypeUpdateError = null;

        break;
      case FAQ_TYPE_UPDATE_SUCCESS:
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = true;
        draft.st_faqTypeUpdateError = null;

        break;
      case FAQ_TYPE_UPDATE_FAILURE:
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = false;
        draft.st_faqTypeUpdateError = action.data;

        break;
      //////////////////////////////////////////////
      case FAQ_TYPE_DELETE_REQUEST:
        draft.st_faqTypeDeleteLoading = true;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = null;

        break;
      case FAQ_TYPE_DELETE_SUCCESS:
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = true;
        draft.st_faqTypeDeleteError = null;

        break;
      case FAQ_TYPE_DELETE_FAILURE:
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = action.data;

        break;
      //////////////////////////////////////////////
      case FAQ_ADMIN_LIST_REQUEST:
        draft.st_faqAdminListLoading = true;
        draft.st_faqAdminListDone = false;
        draft.st_faqAdminListError = null;

        break;

      case FAQ_ADMIN_LIST_SUCCESS:
        draft.st_faqAdminListLoading = false;
        draft.st_faqAdminListDone = true;
        draft.st_faqAdminListError = null;
        draft.adminFaqs = action.data;

        break;
      case FAQ_ADMIN_LIST_FAILURE:
        draft.st_faqAdminListLoading = false;
        draft.st_faqAdminListDone = false;
        draft.st_faqAdminListError = action.data;

        break;
      //////////////////////////////////////////////
      case FAQ_LIST_REQUEST:
        draft.st_faqListLoading = true;
        draft.st_faqListDone = false;
        draft.st_faqListError = null;

        break;

      case FAQ_LIST_SUCCESS:
        draft.st_faqListLoading = false;
        draft.st_faqListDone = true;
        draft.st_faqListError = null;
        draft.faqs = action.data.faqs;
        draft.lastPage = action.data.lastPage;

        break;
      case FAQ_LIST_FAILURE:
        draft.st_faqAdminListLoading = false;
        draft.st_faqAdminListDone = false;
        draft.st_faqAdminListError = action.data;

        break;

      //////////////////////////////////////////////
      case FAQ_TYPE_GETDATA_REQUEST:
        draft.st_faqTypeGetDataLoading = true;
        draft.st_faqTypeGetDataDone = false;
        draft.st_faqTypeGetDataError = null;
        break;

      case FAQ_TYPE_GETDATA_SUCCESS:
        draft.st_faqTypeGetDataLoading = false;
        draft.st_faqTypeGetDataDone = true;
        draft.st_faqTypeGetDataError = null;
        draft.currentFaqList = action.data;
        break;

      case FAQ_TYPE_GETDATA_FAILURE:
        draft.st_faqTypeGetDataLoading = false;
        draft.st_faqTypeGetDataDone = false;
        draft.st_faqTypeGetDataError = action.data;
        break;

      //////////////////////////////////////////////
      case FAQ_UPDATE_REQUEST:
        draft.st_faqUpdateLoading = true;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = null;
        break;

      case FAQ_UPDATE_SUCCESS:
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = true;
        draft.st_faqUpdateError = null;
        break;

      case FAQ_UPDATE_FAILURE:
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = action.data;
        break;

      //////////////////////////////////////////////
      case FAQ_CREATE_REQUEST:
        draft.st_faqCreateLoading = true;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = null;
        break;

      case FAQ_CREATE_SUCCESS:
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = true;
        draft.st_faqCreateError = null;
        break;

      case FAQ_CREATE_FAILURE:
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = action.data;
        break;

      //////////////////////////////////////////////
      case FAQ_DELETE_REQUEST:
        draft.st_faqDeleteLoading = true;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = null;
        break;

      case FAQ_DELETE_SUCCESS:
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = true;
        draft.st_faqDeleteError = null;
        break;

      case FAQ_DELETE_FAILURE:
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = action.data;
        break;

      //////////////////////////////////////////////
      case FAQ_GRAPH_REQUEST:
        draft.st_faqGraphLoading = true;
        draft.st_faqGraphDone = false;
        draft.st_faqGraphError = null;
        break;

      case FAQ_GRAPH_SUCCESS:
        draft.st_faqGraphLoading = false;
        draft.st_faqGraphDone = true;
        draft.st_faqGraphError = null;
        draft.graph = action.data;
        break;

      case FAQ_GRAPH_FAILURE:
        draft.st_faqGraphLoading = false;
        draft.st_faqGraphDone = false;
        draft.st_faqGraphError = action.data;
        break;

      ///////////////// -- MODAL -- ///////////////
      case FAQ_TYPE_CREATE_MODAL_TOGGLE:
        draft.createModal = !draft.createModal;
        break;

      case FAQ_CREATE_MODAL_TOGGLE:
        draft.faqCreateModal = !draft.faqCreateModal;
        break;

      default:
        break;
    }
  });

export default reducer;
