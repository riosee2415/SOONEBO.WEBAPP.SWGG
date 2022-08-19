import produce from "../util/produce";

export const initailState = {
  productTh: null, // 상품 썸네일

  productHoverImg: null, // 호버이미지

  productDetailImg: null, // 상품 상세이미지
  productDetailImg2: null, // 상품 상세이미지2
  productDetailImg3: null, // 상품 상세이미지3
  productDetailImg4: null, // 상품 상세이미지4

  productMoDetailImg: null, // 상품 모바일 상세이미지
  productMoDetailImg2: null, // 상품 모바일 상세이미지2
  productMoDetailImg3: null, // 상품 모바일 상세이미지3
  productMoDetailImg4: null, // 상품 모바일 상세이미지4

  st_productThumbLoading: false, // 상품 썸네일 올리기
  st_productThumbDone: false,
  st_productThumbError: null,
  //
  st_productHoverImgLoading: false, // 상품 호버 이미지 올리기
  st_productHoverImgDone: false,
  st_productHoverImgError: null,
  //
  st_productDetailImgLoading: false, // 상품 상세 이미지 올리기
  st_productDetailImgDone: false,
  st_productDetailImgError: null,
  //
  st_productDetailImg2Loading: false, // 상품 상세 이미지 올리기2
  st_productDetailImg2Done: false,
  st_productDetailImg2Error: null,
  //
  st_productDetailImg3Loading: false, // 상품 상세 이미지 올리기3
  st_productDetailImg3Done: false,
  st_productDetailImg3Error: null,
  //
  st_productDetailImg4Loading: false, // 상품 상세 이미지 올리기4
  st_productDetailImg4Done: false,
  st_productDetailImg4Error: null,
  //
  st_productMoDetailImgLoading: false, // 상품 상세 모바일 이미지 올리기
  st_productMoDetailImgDone: false,
  st_productMoDetailImgError: null,
  //
  st_productMoDetailImg2Loading: false, // 상품 상세 모바일 이미지 올리기2
  st_productMoDetailImg2Done: false,
  st_productMoDetailImg2Error: null,
  //
  st_productMoDetailImg3Loading: false, // 상품 상세 모바일 이미지 올리기3
  st_productMoDetailImg3Done: false,
  st_productMoDetailImg3Error: null,
  //
  st_productMoDetailImg4Loading: false, // 상품 상세 모바일 이미지 올리기4
  st_productMoDetailImg4Done: false,
  st_productMoDetailImg4Error: null,
};

export const PRODUCT_THUMB_REQUEST = "PRODUCT_THUMB_REQUEST";
export const PRODUCT_THUMB_SUCCESS = "PRODUCT_THUMB_SUCCESS";
export const PRODUCT_THUMB_FAILURE = "PRODUCT_THUMB_FAILURE";

export const PRODUCT_HOVER_IMG_REQUEST = "PRODUCT_HOVER_IMG_REQUEST";
export const PRODUCT_HOVER_IMG_SUCCESS = "PRODUCT_HOVER_IMG_SUCCESS";
export const PRODUCT_HOVER_IMG_FAILURE = "PRODUCT_HOVER_IMG_FAILURE";

export const PRODUCT_DETAIL_IMG_REQUEST = "PRODUCT_DETAIL_IMG_REQUEST";
export const PRODUCT_DETAIL_IMG_SUCCESS = "PRODUCT_DETAIL_IMG_SUCCESS";
export const PRODUCT_DETAIL_IMG_FAILURE = "PRODUCT_DETAIL_IMG_FAILURE";

export const PRODUCT_DETAIL_IMG2_REQUEST = "PRODUCT_DETAIL_IMG2_REQUEST";
export const PRODUCT_DETAIL_IMG2_SUCCESS = "PRODUCT_DETAIL_IMG2_SUCCESS";
export const PRODUCT_DETAIL_IMG2_FAILURE = "PRODUCT_DETAIL_IMG2_FAILURE";

export const PRODUCT_DETAIL_IMG3_REQUEST = "PRODUCT_DETAIL_IMG3_REQUEST";
export const PRODUCT_DETAIL_IMG3_SUCCESS = "PRODUCT_DETAIL_IMG3_SUCCESS";
export const PRODUCT_DETAIL_IMG3_FAILURE = "PRODUCT_DETAIL_IMG3_FAILURE";

export const PRODUCT_DETAIL_IMG4_REQUEST = "PRODUCT_DETAIL_IMG4_REQUEST";
export const PRODUCT_DETAIL_IMG4_SUCCESS = "PRODUCT_DETAIL_IMG4_SUCCESS";
export const PRODUCT_DETAIL_IMG4_FAILURE = "PRODUCT_DETAIL_IMG4_FAILURE";

export const PRODUCT_MO_DETAIL_IMG_REQUEST = "PRODUCT_MO_DETAIL_IMG_REQUEST";
export const PRODUCT_MO_DETAIL_IMG_SUCCESS = "PRODUCT_MO_DETAIL_IMG_SUCCESS";
export const PRODUCT_MO_DETAIL_IMG_FAILURE = "PRODUCT_MO_DETAIL_IMG_FAILURE";

export const PRODUCT_MO_DETAIL_IMG2_REQUEST = "PRODUCT_MO_DETAIL_IMG2_REQUEST";
export const PRODUCT_MO_DETAIL_IMG2_SUCCESS = "PRODUCT_MO_DETAIL_IMG2_SUCCESS";
export const PRODUCT_MO_DETAIL_IMG2_FAILURE = "PRODUCT_MO_DETAIL_IMG2_FAILURE";

export const PRODUCT_MO_DETAIL_IMG3_REQUEST = "PRODUCT_MO_DETAIL_IMG_3REQUEST";
export const PRODUCT_MO_DETAIL_IMG3_SUCCESS = "PRODUCT_MO_DETAIL_IMG_3SUCCESS";
export const PRODUCT_MO_DETAIL_IMG3_FAILURE = "PRODUCT_MO_DETAIL_IMG_3FAILURE";

export const PRODUCT_MO_DETAIL_IMG4_REQUEST = "PRODUCT_MO_DETAIL_IMG_R4EQUEST";
export const PRODUCT_MO_DETAIL_IMG4_SUCCESS = "PRODUCT_MO_DETAIL_IMG_S4UCCESS";
export const PRODUCT_MO_DETAIL_IMG4_FAILURE = "PRODUCT_MO_DETAIL_IMG_F4AILURE";

export const PREVIEW_RESET = "PREVIEW_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_THUMB_REQUEST:
        draft.st_productThumbLoading = true;
        draft.st_productThumbDone = false;
        draft.st_productThumbError = null;
        break;

      case PRODUCT_THUMB_SUCCESS:
        draft.st_productThumbLoading = false;
        draft.st_productThumbDone = true;
        draft.st_productThumbError = null;
        draft.productTh = action.data.path;
        break;

      case PRODUCT_THUMB_FAILURE:
        draft.st_productThumbLoading = false;
        draft.st_productThumbDone = false;
        draft.st_productThumbError = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_HOVER_IMG_REQUEST:
        draft.st_productHoverImgLoading = true;
        draft.st_productHoverImgDone = false;
        draft.st_productHoverImgError = null;
        break;

      case PRODUCT_HOVER_IMG_SUCCESS:
        draft.st_productHoverImgLoading = false;
        draft.st_productHoverImgDone = true;
        draft.st_productHoverImgError = null;
        draft.productHoverImg = action.data.path;
        break;

      case PRODUCT_HOVER_IMG_FAILURE:
        draft.st_productHoverImgLoading = false;
        draft.st_productHoverImgDone = false;
        draft.st_productHoverImgError = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_DETAIL_IMG_REQUEST:
        draft.st_productDetailImgLoading = true;
        draft.st_productDetailImgDone = false;
        draft.st_productDetailImgError = null;
        break;

      case PRODUCT_DETAIL_IMG_SUCCESS:
        draft.st_productDetailImgLoading = false;
        draft.st_productDetailImgDone = true;
        draft.st_productDetailImgError = null;
        draft.productDetailImg = action.data.path;
        break;

      case PRODUCT_DETAIL_IMG_FAILURE:
        draft.st_productDetailImgLoading = false;
        draft.st_productDetailImgDone = false;
        draft.st_productDetailImgError = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_DETAIL_IMG2_REQUEST:
        draft.st_productDetailImg2Loading = true;
        draft.st_productDetailImg2Done = false;
        draft.st_productDetailImg2Error = null;
        break;

      case PRODUCT_DETAIL_IMG2_SUCCESS:
        draft.st_productDetailImg2Loading = false;
        draft.st_productDetailImg2Done = true;
        draft.st_productDetailImg2Error = null;
        draft.productDetailImg2 = action.data.path;
        break;

      case PRODUCT_DETAIL_IMG2_FAILURE:
        draft.st_productDetailImg2Loading = false;
        draft.st_productDetailImg2Done = false;
        draft.st_productDetailImg2Error = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_DETAIL_IMG3_REQUEST:
        draft.st_productDetailImg3Loading = true;
        draft.st_productDetailImg3Done = false;
        draft.st_productDetailImg3Error = null;
        break;

      case PRODUCT_DETAIL_IMG3_SUCCESS:
        draft.st_productDetailImg3Loading = false;
        draft.st_productDetailImg3Done = true;
        draft.st_productDetailImg3Error = null;
        draft.productDetailImg3 = action.data.path;
        break;

      case PRODUCT_DETAIL_IMG3_FAILURE:
        draft.st_productDetailImg3Loading = false;
        draft.st_productDetailImg3Done = false;
        draft.st_productDetailImg3Error = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_DETAIL_IMG4_REQUEST:
        draft.st_productDetailImg4Loading = true;
        draft.st_productDetailImg4Done = false;
        draft.st_productDetailImg4Error = null;
        break;

      case PRODUCT_DETAIL_IMG4_SUCCESS:
        draft.st_productDetailImg4Loading = false;
        draft.st_productDetailImg4Done = true;
        draft.st_productDetailImg4Error = null;
        draft.productDetailImg4 = action.data.path;
        break;

      case PRODUCT_DETAIL_IMG4_FAILURE:
        draft.st_productDetailImg4Loading = false;
        draft.st_productDetailImg4Done = false;
        draft.st_productDetailImg4Error = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_MO_DETAIL_IMG_REQUEST:
        draft.st_productMoDetailImgLoading = true;
        draft.st_productMoDetailImgDone = false;
        draft.st_productMoDetailImgError = null;
        break;

      case PRODUCT_MO_DETAIL_IMG_SUCCESS:
        draft.st_productMoDetailImgLoading = false;
        draft.st_productMoDetailImgDone = true;
        draft.st_productMoDetailImgError = null;
        draft.productMoDetailImg = action.data.path;
        break;

      case PRODUCT_MO_DETAIL_IMG_FAILURE:
        draft.st_productMoDetailImgLoading = false;
        draft.st_productMoDetailImgDone = false;
        draft.st_productMoDetailImgError = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_MO_DETAIL_IMG2_REQUEST:
        draft.st_productMoDetailImg2Loading = true;
        draft.st_productMoDetailImg2Done = false;
        draft.st_productMoDetailImg2Error = null;
        break;

      case PRODUCT_MO_DETAIL_IMG2_SUCCESS:
        draft.st_productMoDetailImg2Loading = false;
        draft.st_productMoDetailImg2Done = true;
        draft.st_productMoDetailImg2Error = null;
        draft.productMoDetailImg2 = action.data.path;
        break;

      case PRODUCT_MO_DETAIL_IMG2_FAILURE:
        draft.st_productMoDetailImg2Loading = false;
        draft.st_productMoDetailImg2Done = false;
        draft.st_productMoDetailImg2Error = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_MO_DETAIL_IMG3_REQUEST:
        draft.st_productMoDetailImg3Loading = true;
        draft.st_productMoDetailImg3Done = false;
        draft.st_productMoDetailImg3Error = null;
        break;

      case PRODUCT_MO_DETAIL_IMG3_SUCCESS:
        draft.st_productMoDetailImg3Loading = false;
        draft.st_productMoDetailImg3Done = true;
        draft.st_productMoDetailImg3Error = null;
        draft.productMoDetailImg3 = action.data.path;
        break;

      case PRODUCT_MO_DETAIL_IMG3_FAILURE:
        draft.st_productMoDetailImg3Loading = false;
        draft.st_productMoDetailImg3Done = false;
        draft.st_productMoDetailImg3Error = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_MO_DETAIL_IMG4_REQUEST:
        draft.st_productMoDetailImg4Loading = true;
        draft.st_productMoDetailImg4Done = false;
        draft.st_productMoDetailImg4Error = null;
        break;

      case PRODUCT_MO_DETAIL_IMG4_SUCCESS:
        draft.st_productMoDetailImg4Loading = false;
        draft.st_productMoDetailImg4Done = true;
        draft.st_productMoDetailImg4Error = null;
        draft.productMoDetailImg4 = action.data.path;
        break;

      case PRODUCT_MO_DETAIL_IMG4_FAILURE:
        draft.st_productMoDetailImg4Loading = false;
        draft.st_productMoDetailImg4Done = false;
        draft.st_productMoDetailImg4Error = action.data;
        break;

      ////////////////////////////////

      case PREVIEW_RESET:
        draft.productTh = null;
        draft.productHoverImg = null;
        draft.productDetailImg = null;
        draft.productDetailImg2 = null;
        draft.productDetailImg3 = null;
        draft.productDetailImg4 = null;
        draft.productMoDetailImg = null;
        draft.productMoDetailImg2 = null;
        draft.productMoDetailImg3 = null;
        draft.productMoDetailImg4 = null;
        break;

      default:
        break;
    }
  });

export default reducer;
