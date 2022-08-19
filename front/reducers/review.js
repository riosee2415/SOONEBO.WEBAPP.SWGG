import produce from "../util/produce";

export const initialState = {
  reviewAllList: [], // 전체 리뷰
  reviewAllLastPage: 1,
  //
  reviewUserList: [], // 회원 리뷰
  reviewUserLastPage: 1,
  //
  reviewProductList: [], // 상품 리뷰
  reviewProductLastPage: 1,
  //
  reviewImageList: [], // 리뷰 이미지
  reviewImageHistory: [],
  //
  reviewMainSlide: [], // 메인 슬라이드
  //
  st_reviewAllListLoading: false, // 전체 리뷰 가져오기
  st_reviewAllListDone: false,
  st_reviewAllListError: false,
  //
  st_reviewUserListLoading: false, // 회원 리뷰 가져오기
  st_reviewUserListDone: false,
  st_reviewUserListError: false,
  //
  st_reviewUserListLoading: false, // 회원 리뷰 가져오기
  st_reviewUserListDone: false,
  st_reviewUserListError: false,
  //
  st_reviewMainSlideLoading: false, // 메인 슬라이드 리뷰 가져오기
  st_reviewMainSlideDone: false,
  st_reviewMainSlideError: false,
  //
  st_reviewUserCreateLoading: false, // 회원 리뷰 생성
  st_reviewUserCreateDone: false,
  st_reviewUserCreateError: false,
  //
  st_reviewImageUploadLoading: false, // 리뷰 이미지 업로드
  st_reviewImageUploadDone: false,
  st_reviewImageUploadError: false,
  //
};

export const REVIEW_ALL_LIST_REQUEST = "REVIEW_ALL_LIST_REQUEST";
export const REVIEW_ALL_LIST_SUCCESS = "REVIEW_ALL_LIST_SUCCESS";
export const REVIEW_ALL_LIST_FAILURE = "REVIEW_ALL_LIST_FAILURE";

export const REVIEW_USER_LIST_REQUEST = "REVIEW_USER_LIST_REQUEST";
export const REVIEW_USER_LIST_SUCCESS = "REVIEW_USER_LIST_SUCCESS";
export const REVIEW_USER_LIST_FAILURE = "REVIEW_USER_LIST_FAILURE";

export const REVIEW_PRODUCT_LIST_REQUEST = "REVIEW_PRODUCT_LIST_REQUEST";
export const REVIEW_PRODUCT_LIST_SUCCESS = "REVIEW_PRODUCT_LIST_SUCCESS";
export const REVIEW_PRODUCT_LIST_FAILURE = "REVIEW_PRODUCT_LIST_FAILURE";

export const REVIEW_MAIN_SLIDE_REQUEST = "REVIEW_MAIN_SLIDE_REQUEST";
export const REVIEW_MAIN_SLIDE_SUCCESS = "REVIEW_MAIN_SLIDE_SUCCESS";
export const REVIEW_MAIN_SLIDE_FAILURE = "REVIEW_MAIN_SLIDE_FAILURE";

export const REVIEW_USER_CREATE_REQUEST = "REVIEW_USER_CREATE_REQUEST";
export const REVIEW_USER_CREATE_SUCCESS = "REVIEW_USER_CREATE_SUCCESS";
export const REVIEW_USER_CREATE_FAILURE = "REVIEW_USER_CREATE_FAILURE";

export const REVIEW_IMAGE_UPLOAD_REQUEST = "REVIEW_IMAGE_UPLOAD_REQUEST";
export const REVIEW_IMAGE_UPLOAD_SUCCESS = "REVIEW_IMAGE_UPLOAD_SUCCESS";
export const REVIEW_IMAGE_UPLOAD_FAILURE = "REVIEW_IMAGE_UPLOAD_FAILURE";

export const REVIEW_IMAGE_SETVALUE = "REVIEW_IMAGE_SETVALUE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case REVIEW_ALL_LIST_REQUEST: {
        draft.st_reviewAllListLoading = true;
        draft.st_reviewAllListDone = false;
        draft.st_reviewAllListError = null;
        break;
      }
      case REVIEW_ALL_LIST_SUCCESS: {
        draft.st_reviewAllListLoading = false;
        draft.st_reviewAllListDone = true;
        draft.st_reviewAllListError = null;
        draft.reviewAllList = action.data.list;
        draft.reviewLastPage = action.data.lastPage;
        break;
      }
      case REVIEW_ALL_LIST_FAILURE: {
        draft.st_reviewAllListLoading = false;
        draft.st_reviewAllListDone = false;
        draft.st_reviewAllListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_USER_LIST_REQUEST: {
        draft.st_reviewUserListLoading = true;
        draft.st_reviewUserListDone = false;
        draft.st_reviewUserListError = null;
        break;
      }
      case REVIEW_USER_LIST_SUCCESS: {
        draft.st_reviewUserListLoading = false;
        draft.st_reviewUserListDone = true;
        draft.st_reviewUserListError = null;
        draft.reviewUserList = action.data.list;
        draft.reviewUserLastPage = action.data.lastPage;
        break;
      }
      case REVIEW_USER_LIST_FAILURE: {
        draft.st_reviewUserListLoading = false;
        draft.st_reviewUserListDone = false;
        draft.st_reviewUserListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_PRODUCT_LIST_REQUEST: {
        draft.st_reviewProductListLoading = true;
        draft.st_reviewProductListDone = false;
        draft.st_reviewProductListError = null;
        break;
      }
      case REVIEW_PRODUCT_LIST_SUCCESS: {
        draft.st_reviewProductListLoading = false;
        draft.st_reviewProductListDone = true;
        draft.st_reviewProductListError = null;
        draft.reviewProductList = action.data.list;
        draft.reviewProductLastPage = action.data.lastPage;
        break;
      }
      case REVIEW_PRODUCT_LIST_FAILURE: {
        draft.st_reviewProductListLoading = false;
        draft.st_reviewProductListDone = false;
        draft.st_reviewProductListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_MAIN_SLIDE_REQUEST: {
        draft.st_reviewMainSlideLoading = true;
        draft.st_reviewMainSlideDone = false;
        draft.st_reviewMainSlideError = null;
        break;
      }
      case REVIEW_MAIN_SLIDE_SUCCESS: {
        draft.st_reviewMainSlideLoading = false;
        draft.st_reviewMainSlideDone = true;
        draft.st_reviewMainSlideError = null;
        draft.reviewMainSlide = action.data;
        break;
      }
      case REVIEW_MAIN_SLIDE_FAILURE: {
        draft.st_reviewMainSlideLoading = false;
        draft.st_reviewMainSlideDone = false;
        draft.st_reviewMainSlideError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_USER_CREATE_REQUEST: {
        draft.st_reviewUserCreateLoading = true;
        draft.st_reviewUserCreateDone = false;
        draft.st_reviewUserCreateError = null;
        break;
      }
      case REVIEW_USER_CREATE_SUCCESS: {
        draft.st_reviewUserCreateLoading = false;
        draft.st_reviewUserCreateDone = true;
        draft.st_reviewUserCreateError = null;
        break;
      }
      case REVIEW_USER_CREATE_FAILURE: {
        draft.st_reviewUserCreateLoading = false;
        draft.st_reviewUserCreateDone = false;
        draft.st_reviewUserCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_IMAGE_UPLOAD_REQUEST: {
        draft.st_reviewImageUploadLoading = true;
        draft.st_reviewImageUploadDone = false;
        draft.st_reviewImageUploadError = null;
        break;
      }
      case REVIEW_IMAGE_UPLOAD_SUCCESS: {
        draft.st_reviewImageUploadLoading = false;
        draft.st_reviewImageUploadDone = true;
        draft.st_reviewImageUploadError = null;
        draft.reviewImageHistory.push({
          id: draft.reviewImageHistory.length,
          path: action.data.path,
        });
        draft.reviewImageList.push({
          id: draft.reviewImageHistory.length,
          path: action.data.path,
        });
        break;
      }
      case REVIEW_IMAGE_UPLOAD_FAILURE: {
        draft.st_reviewImageUploadLoading = false;
        draft.st_reviewImageUploadDone = false;
        draft.st_reviewImageUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case REVIEW_IMAGE_SETVALUE: {
        draft.reviewImageList = action.data;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
