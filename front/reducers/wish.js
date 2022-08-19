import produce from "../util/produce";

export const initailState = {
  buyItems: [], // 바로구매 담기
  items: [], // 장바구니 1차 추가 후 아이템아이디
  wishs: null, // 장바구니 리스트
  orderWishs: null, // 주문하기 장바구니 리스트

  //
  st_wishListLoading: false, // 장바구니 리스트
  st_wishListDone: false,
  st_wishListError: null,
  //
  st_wishItemnBuyCreateLoading: false, // 바로 구매
  st_wishItemnBuyCreateDone: false,
  st_wishItemnBuyCreateError: null,
  //
  st_wishItemnBuyAddLoading: false, // 바로 구매 장바구니 추가
  st_wishItemnBuyAddDone: false,
  st_wishItemnBuyAddError: null,
  //
  st_wishItemCreateLoading: false, //장바구니 1차 추가
  st_wishItemCreateDone: false,
  st_wishItemCreateError: null,
  //
  st_wishCreateLoading: false, //장바구니 추가 완료
  st_wishCreateDone: false,
  st_wishCreateError: null,
  //
  st_wishUpdateLoading: false, // 장바구니 수량 변경
  st_wishUpdateDone: false,
  st_wishUpdateError: null,
  //
  st_wishDeleteLoading: false, // 장바구니 하나 삭제
  st_wishDeleteDone: false,
  st_wishDeleteError: null,
  //
  st_wishAllDeleteLoading: false, // 장바구니 전체 삭제
  st_wishAllDeleteDone: false,
  st_wishAllDeleteError: null,
  //
  st_wishOrerListLoading: false, // 구매 리스트
  st_wishOrerListDone: false,
  st_wishOrerListError: false,
};

export const WISH_LIST_REQUEST = "WISH_LIST_REQUEST";
export const WISH_LIST_SUCCESS = "WISH_LIST_SUCCESS";
export const WISH_LIST_FAILURE = "WISH_LIST_FAILURE";
//
export const WISH_ITEM_BUY_CREATE_REQUEST = "WISH_ITEM_BUY_CREATE_REQUEST";
export const WISH_ITEM_BUY_CREATE_SUCCESS = "WISH_ITEM_BUY_CREATE_SUCCESS";
export const WISH_ITEM_BUY_CREATE_FAILURE = "WISH_ITEM_BUY_CREATE_FAILURE";
//
export const WISH_ITEM_BUY_ADD_REQUEST = "WISH_ITEM_BUY_ADD_REQUEST";
export const WISH_ITEM_BUY_ADD_SUCCESS = "WISH_ITEM_BUY_ADD_SUCCESS";
export const WISH_ITEM_BUY_ADD_FAILURE = "WISH_ITEM_BUY_ADD_FAILURE";
//
export const WISH_ITEM_CREATE_REQUEST = "WISH_ITEM_CREATE_REQUEST";
export const WISH_ITEM_CREATE_SUCCESS = "WISH_ITEM_CREATE_SUCCESS";
export const WISH_ITEM_CREATE_FAILURE = "WISH_ITEM_CREATE_FAILURE";
//
export const WISH_CREATE_REQUEST = "WISH_CREATE_REQUEST";
export const WISH_CREATE_SUCCESS = "WISH_CREATE_SUCCESS";
export const WISH_CREATE_FAILURE = "WISH_CREATE_FAILURE";
//
export const WISH_UPDATE_REQUEST = "WISH_UPDATE_REQUEST";
export const WISH_UPDATE_SUCCESS = "WISH_UPDATE_SUCCESS";
export const WISH_UPDATE_FAILURE = "WISH_UPDATE_FAILURE";
//
export const WISH_DELETE_REQUEST = "WISH_DELETE_REQUEST";
export const WISH_DELETE_SUCCESS = "WISH_DELETE_SUCCESS";
export const WISH_DELETE_FAILURE = "WISH_DELETE_FAILURE";
//
export const WISH_ALL_DELETE_REQUEST = "WISH_ALL_DELETE_REQUEST";
export const WISH_ALL_DELETE_SUCCESS = "WISH_ALL_DELETE_SUCCESS";
export const WISH_ALL_DELETE_FAILURE = "WISH_ALL_DELETE_FAILURE";
//
export const WISH_ORDER_LIST_REQUEST = "WISH_ORDER_LIST_REQUEST";
export const WISH_ORDER_LIST_SUCCESS = "WISH_ORDER_LIST_SUCCESS";
export const WISH_ORDER_LIST_FAILURE = "WISH_ORDER_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case WISH_LIST_REQUEST: {
        draft.st_wishListLoading = true;
        draft.st_wishListDone = false;
        draft.st_wishListError = null;
        break;
      }
      case WISH_LIST_SUCCESS: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = true;
        draft.st_wishListError = null;
        draft.wishs = action.data;
        break;
      }
      case WISH_LIST_FAILURE: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = false;
        draft.st_wishListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_ITEM_BUY_CREATE_REQUEST: {
        draft.st_wishItemnBuyCreateLoading = true;
        draft.st_wishItemnBuyCreateDone = false;
        draft.st_wishItemnBuyCreateError = null;
        break;
      }
      case WISH_ITEM_BUY_CREATE_SUCCESS: {
        draft.st_wishItemnBuyCreateLoading = false;
        draft.st_wishItemnBuyCreateDone = true;
        draft.st_wishItemnBuyCreateError = null;
        draft.buyItems = action.data;
        break;
      }
      case WISH_ITEM_BUY_CREATE_FAILURE: {
        draft.st_wishItemnBuyCreateLoading = false;
        draft.st_wishItemnBuyCreateDone = false;
        draft.st_wishItemnBuyCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_ITEM_BUY_ADD_REQUEST: {
        draft.st_wishItemnBuyAddLoading = true;
        draft.st_wishItemnBuyAddDone = false;
        draft.st_wishItemnBuyAddError = null;
        break;
      }
      case WISH_ITEM_BUY_ADD_SUCCESS: {
        draft.st_wishItemnBuyAddLoading = false;
        draft.st_wishItemnBuyAddDone = true;
        draft.st_wishItemnBuyAddError = null;
        break;
      }
      case WISH_ITEM_BUY_ADD_FAILURE: {
        draft.st_wishItemnBuyAddLoading = false;
        draft.st_wishItemnBuyAddDone = false;
        draft.st_wishItemnBuyAddError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_ITEM_CREATE_REQUEST: {
        draft.st_wishItemCreateLoading = true;
        draft.st_wishItemCreateDone = false;
        draft.st_wishItemCreateError = null;
        break;
      }
      case WISH_ITEM_CREATE_SUCCESS: {
        draft.st_wishItemCreateLoading = false;
        draft.st_wishItemCreateDone = true;
        draft.st_wishItemCreateError = null;
        draft.items = action.data;
        break;
      }
      case WISH_ITEM_CREATE_FAILURE: {
        draft.st_wishItemCreateLoading = false;
        draft.st_wishItemCreateDone = false;
        draft.st_wishItemCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_CREATE_REQUEST: {
        draft.st_wishCreateLoading = true;
        draft.st_wishCreateDone = false;
        draft.st_wishCreateError = null;
        break;
      }
      case WISH_CREATE_SUCCESS: {
        draft.st_wishCreateLoading = false;
        draft.st_wishCreateDone = true;
        draft.st_wishCreateError = null;
        break;
      }
      case WISH_CREATE_FAILURE: {
        draft.st_wishCreateLoading = false;
        draft.st_wishCreateDone = false;
        draft.st_wishCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_UPDATE_REQUEST: {
        draft.st_wishUpdateLoading = true;
        draft.st_wishUpdateDone = false;
        draft.st_wishUpdateError = null;
        break;
      }
      case WISH_UPDATE_SUCCESS: {
        draft.st_wishUpdateLoading = false;
        draft.st_wishUpdateDone = true;
        draft.st_wishUpdateError = null;
        break;
      }
      case WISH_UPDATE_FAILURE: {
        draft.st_wishUpdateLoading = false;
        draft.st_wishUpdateDone = false;
        draft.st_wishUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_DELETE_REQUEST: {
        draft.st_wishDeleteLoading = true;
        draft.st_wishDeleteDone = false;
        draft.st_wishDeleteError = null;
        break;
      }
      case WISH_DELETE_SUCCESS: {
        draft.st_wishDeleteLoading = false;
        draft.st_wishDeleteDone = true;
        draft.st_wishDeleteError = null;
        break;
      }
      case WISH_DELETE_FAILURE: {
        draft.st_wishDeleteLoading = false;
        draft.st_wishDeleteDone = false;
        draft.st_wishDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_ALL_DELETE_REQUEST: {
        draft.st_wishAllDeleteLoading = true;
        draft.st_wishAllDeleteDone = false;
        draft.st_wishAllDeleteError = null;
        break;
      }
      case WISH_ALL_DELETE_SUCCESS: {
        draft.st_wishAllDeleteLoading = false;
        draft.st_wishAllDeleteDone = true;
        draft.st_wishAllDeleteError = null;
        break;
      }
      case WISH_ALL_DELETE_FAILURE: {
        draft.st_wishAllDeleteLoading = false;
        draft.st_wishAllDeleteDone = false;
        draft.st_wishAllDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_ORDER_LIST_REQUEST: {
        draft.st_wishOrerListLoading = true;
        draft.st_wishOrerListDone = false;
        draft.st_wishOrerListError = null;
        break;
      }
      case WISH_ORDER_LIST_SUCCESS: {
        draft.st_wishOrerListLoading = false;
        draft.st_wishOrerListDone = true;
        draft.st_wishOrerListError = null;
        draft.orderWishs = action.data;
        break;
      }
      case WISH_ORDER_LIST_FAILURE: {
        draft.st_wishOrerListLoading = false;
        draft.st_wishOrerListDone = false;
        draft.st_wishOrerListError = action.error;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
