import produce from "../util/produce";

export const initailState = {
  types: [], // 상품 타입
  products: [], // 상품 리스트

  detail: null, // 상품 디테일
  adminProducts: null, // 관리자 상품 리스트
  productGuide: null, // 상품 안내사항 이미지
  imagePath: null, // 이미지 경로 얻기
  //
  optLists: [], // 상품 옵션탭 리스트,
  optProdLists: [], // 상품 옵션 별 상품 리스트,
  //

  productOpt: [], // 상품 별 옵션 리스트

  typeModal: false,
  productModal: false,
  productGuideModal: false,
  optionModal: false,
  detailModal: false,
  //

  /////////// TYPE
  st_productTypeListLoading: false, // 상품 타입 가져오기
  st_productTypeListDone: false,
  st_productTypeListError: null,
  //
  st_productTypeCreateLoading: false, // 상품 타입 만들기
  st_productTypeCreateDone: false,
  st_productTypeCreateError: null,
  //
  st_productTypeUpdateLoading: false, // 상품 타입 수정하기
  st_productTypeUpdateDone: false,
  st_productTypeUpdateError: null,
  //
  st_productTypeDeleteLoading: false, // 상품 타입 삭제하기
  st_productTypeDeleteDone: false,
  st_productTypeDeleteError: null,
  //
  st_productTypeSortUpLoading: false, // 상품 타입 정렬 변경하기
  st_productTypeSortUpDone: false,
  st_productTypeSortUpError: null,

  /////////// PRODUCT
  st_productListLoading: false, // 상품 리스트 가져오기
  st_productListDone: false,
  st_productListError: null,
  //
  st_productDetailLoading: false, // 상품 디테일 가져오기
  st_productDetailDone: false,
  st_productDetailError: null,
  //
  st_productCreateLoading: false, // 상품 추가하기
  st_productCreateDone: false,
  st_productCreateError: null,
  //
  st_productInfoUpdateLoading: false, // 상품 정보 수정하기
  st_productInfoUpdateDone: false,
  st_productInfoUpdateError: null,
  //
  st_productImageUpdateLoading: false, // 상품 이미지 수정하기
  st_productImageUpdateDone: false,
  st_productImageUpdateError: null,
  //
  st_productDeleteLoading: false, // 상품 삭제하기
  st_productDeleteDone: false,
  st_productDeleteError: null,
  //
  st_adminProductListLoading: false, // 관리자 상품 리스트 가져오기
  st_adminProductListDone: false,
  st_adminProductListError: null,
  //
  st_productGuideLoading: false, // 상품 안내사항 데이터 가져오기
  st_productGuideDone: false,
  st_productGuideError: null,
  //
  st_imagePathLoading: false, // 상품 안내사항 이미지 경로 얻기
  st_imagePathDone: false,
  st_imagePathError: null,
  //
  st_guideUpdateLoading: false, // 상품 안내사항 업데이트
  st_guideUpdateDone: false,
  st_guideUpdateError: null,
  //
  st_guideCreateLoading: false, // 상품 안내사항 생성
  st_guideCreateDone: false,
  st_guideCreateError: null,

  /////////// OPTION
  st_productOptLoading: false, // 상품 옵션 가져오기
  st_productOptDone: false,
  st_productOptError: null,
  //
  st_productOptProdListLoading: false, // 상품 옵션 별 상품 가져오기
  st_productOptProdListDone: false,
  st_productOptProdListError: null,
  //
  st_productOptCreateLoading: false, // 상품 옵션 추가하기
  st_productOptCreateDone: false,
  st_productOptCreateError: null,
  //
  st_productOptUpdateLoading: false, // 상품 옵션 수정하기
  st_productOptUpdateDone: false,
  st_productOptUpdateError: null,
  //
  st_productOptDeleteLoading: false, // 상품 옵션 삭제하기
  st_productOptDeleteDone: false,
  st_productOptDeleteError: null,

  /////////// PRODUCT OPTION
  st_optListLoading: false, // 상품에 등록된 옵션 가져오기
  st_optListDone: false,
  st_optListError: null,
  //
  st_optCreateLoading: false, // 상품에  옵션  추가하기
  st_optCreateDone: false,
  st_optCreateError: null,
  //
  st_optDeleteLoading: false, // 상품에 옵션 삭제하기
  st_optDeleteDone: false,
  st_optDeleteError: null,
};

/////////// TYPE
export const PRODUCT_TYPE_LIST_REQUEST = "PRODUCT_TYPE_LIST_REQUEST";
export const PRODUCT_TYPE_LIST_SUCCESS = "PRODUCT_TYPE_LIST_SUCCESS";
export const PRODUCT_TYPE_LIST_FAILURE = "PRODUCT_TYPE_LIST_FAILURE";

export const PRODUCT_TYPE_CREATE_REQUEST = "PRODUCT_TYPE_CREATE_REQUEST";
export const PRODUCT_TYPE_CREATE_SUCCESS = "PRODUCT_TYPE_CREATE_SUCCESS";
export const PRODUCT_TYPE_CREATE_FAILURE = "PRODUCT_TYPE_CREATE_FAILURE";

export const PRODUCT_TYPE_UPDATE_REQUEST = "PRODUCT_TYPE_UPDATE_REQUEST";
export const PRODUCT_TYPE_UPDATE_SUCCESS = "PRODUCT_TYPE_UPDATE_SUCCESS";
export const PRODUCT_TYPE_UPDATE_FAILURE = "PRODUCT_TYPE_UPDATE_FAILURE";

export const PRODUCT_TYPE_DELETE_REQUEST = "PRODUCT_TYPE_DELETE_REQUEST";
export const PRODUCT_TYPE_DELETE_SUCCESS = "PRODUCT_TYPE_DELETE_SUCCESS";
export const PRODUCT_TYPE_DELETE_FAILURE = "PRODUCT_TYPE_DELETE_FAILURE";

export const PRODUCT_TYPE_SORT_UP_REQUEST = "PRODUCT_TYPE_SORT_UP_REQUEST";
export const PRODUCT_TYPE_SORT_UP_SUCCESS = "PRODUCT_TYPE_SORT_UP_SUCCESS";
export const PRODUCT_TYPE_SORT_UP_FAILURE = "PRODUCT_TYPE_SORT_UP_FAILURE";

/////////// PRODUCT
export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE";

export const PRODUCT_INFO_UPDATE_REQUEST = "PRODUCT_INFO_UPDATE_REQUEST";
export const PRODUCT_INFO_UPDATE_SUCCESS = "PRODUCT_INFO_UPDATE_SUCCESS";
export const PRODUCT_INFO_UPDATE_FAILURE = "PRODUCT_INFO_UPDATE_FAILURE";

export const PRODUCT_IMAGE_UPDATE_REQUEST = "PRODUCT_IMAGE_UPDATE_REQUEST";
export const PRODUCT_IMAGE_UPDATE_SUCCESS = "PRODUCT_IMAGE_UPDATE_SUCCESS";
export const PRODUCT_IMAGE_UPDATE_FAILURE = "PRODUCT_IMAGE_UPDATE_FAILURE";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAILURE = "PRODUCT_DELETE_FAILURE";

export const ADMIN_PRODUCT_LIST_REQUEST = "ADMIN_PRODUCT_LIST_REQUEST";
export const ADMIN_PRODUCT_LIST_SUCCESS = "ADMIN_PRODUCT_LIST_SUCCESS";
export const ADMIN_PRODUCT_LIST_FAILURE = "ADMIN_PRODUCT_LIST_FAILURE";

export const PRODUCT_GUIDE_REQUEST = "PRODUCT_GUIDE_REQUEST";
export const PRODUCT_GUIDE_SUCCESS = "PRODUCT_GUIDE_SUCCESS";
export const PRODUCT_GUIDE_FAILURE = "PRODUCT_GUIDE_FAILURE";

export const IMAGE_PATH_REQUEST = "IMAGE_PATH_REQUEST";
export const IMAGE_PATH_SUCCESS = "IMAGE_PATH_SUCCESS";
export const IMAGE_PATH_FAILURE = "IMAGE_PATH_FAILURE";

export const GUIDE_UPDATE_REQUEST = "GUIDE_UPDATE_REQUEST";
export const GUIDE_UPDATE_SUCCESS = "GUIDE_UPDATE_SUCCESS";
export const GUIDE_UPDATE_FAILURE = "GUIDE_UPDATE_FAILURE";

export const GUIDE_CREATE_REQUEST = "GUIDE_CREATE_REQUEST";
export const GUIDE_CREATE_SUCCESS = "GUIDE_CREATE_SUCCESS";
export const GUIDE_CREATE_FAILURE = "GUIDE_CREATE_FAILURE";

/////////// OPTION
export const PRODUCT_OPT_LIST_REQUEST = "PRODUCT_OPT_LIST_REQUEST";
export const PRODUCT_OPT_LIST_SUCCESS = "PRODUCT_OPT_LIST_SUCCESS";
export const PRODUCT_OPT_LIST_FAILURE = "PRODUCT_OPT_LIST_FAILURE";

export const PRODUCT_OPT_PROD_LIST_REQUEST = "PRODUCT_OPT_PROD_LIST_REQUEST";
export const PRODUCT_OPT_PROD_LIST_SUCCESS = "PRODUCT_OPT_PROD_LIST_SUCCESS";
export const PRODUCT_OPT_PROD_LIST_FAILURE = "PRODUCT_OPT_PROD_LIST_FAILURE";

export const PRODUCT_OPT_CREATE_REQUEST = "PRODUCT_OPT_CREATE_REQUEST";
export const PRODUCT_OPT_CREATE_SUCCESS = "PRODUCT_OPT_CREATE_SUCCESS";
export const PRODUCT_OPT_CREATE_FAILURE = "PRODUCT_OPT_CREATE_FAILURE";

export const PRODUCT_OPT_DELETE_REQUEST = "PRODUCT_OPT_DELETE_REQUEST";
export const PRODUCT_OPT_DELETE_SUCCESS = "PRODUCT_OPT_DELETE_SUCCESS";
export const PRODUCT_OPT_DELETE_FAILURE = "PRODUCT_OPT_DELETE_FAILURE";

export const PRODUCT_OPT_UPDATE_REQUEST = "PRODUCT_OPT_UPDATE_REQUEST";
export const PRODUCT_OPT_UPDATE_SUCCESS = "PRODUCT_OPT_UPDATE_SUCCESS";
export const PRODUCT_OPT_UPDATE_FAILURE = "PRODUCT_OPT_UPDATE_FAILURE";

/////////// PRODUCT OPTION

export const OPT_LIST_REQUEST = "OPT_LIST_REQUEST";
export const OPT_LIST_SUCCESS = "OPT_LIST_SUCCESS";
export const OPT_LIST_FAILURE = "OPT_LIST_FAILURE";

export const OPT_CREATE_REQUEST = "OPT_CREATE_REQUEST";
export const OPT_CREATE_SUCCESS = "OPT_CREATE_SUCCESS";
export const OPT_CREATE_FAILURE = "OPT_CREATE_FAILURE";

export const OPT_DELETE_REQUEST = "OPT_DELETE_REQUEST";
export const OPT_DELETE_SUCCESS = "OPT_DELETE_SUCCESS";
export const OPT_DELETE_FAILURE = "OPT_DELETE_FAILURE";

/////////// TOGGLE

export const PRODUCT_TYPE_MODAL_TOGGLE = "PRODUCT_TYPE_MODAL_TOGGLE";

export const PRODUCT_MODAL_TOGGLE = "PRODUCT_MODAL_TOGGLE";

export const PRODUCT_GUIDE_MODAL_TOGGLE = "PRODUCT_GUIDE_MODAL_TOGGLE";

export const PRODUCT_OPTION_MODAL_TOGGLE = "PRODUCT_OPTION_MODAL_TOGGLE";

export const DETAIL_MODAL_TOGGLE = "DETAIL_MODAL_TOGGLE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////// -- TYPE -- ///////////////

      case PRODUCT_TYPE_LIST_REQUEST:
        draft.st_productTypeListLoading = true;
        draft.st_productTypeListDone = false;
        draft.st_productTypeListError = null;

        break;
      case PRODUCT_TYPE_LIST_SUCCESS:
        draft.st_productTypeListLoading = false;
        draft.st_productTypeListDone = true;
        draft.st_productTypeListError = null;
        draft.types = action.data;

        break;
      case PRODUCT_TYPE_LIST_FAILURE:
        draft.st_productTypeListLoading = false;
        draft.st_productTypeListDone = false;
        draft.st_productTypeListError = action.data;

        break;
      ////////////////////////////////

      case PRODUCT_TYPE_SORT_UP_REQUEST:
        draft.st_productTypeSortUpLoading = true;
        draft.st_productTypeSortUpDone = false;
        draft.st_productTypeSortUpError = null;

        break;
      case PRODUCT_TYPE_SORT_UP_SUCCESS:
        draft.st_productTypeSortUpLoading = false;
        draft.st_productTypeSortUpDone = true;
        draft.st_productTypeSortUpError = null;

        break;
      case PRODUCT_TYPE_SORT_UP_FAILURE:
        draft.st_productTypeSortUpLoading = false;
        draft.st_productTypeSortUpDone = false;
        draft.st_productTypeSortUpError = action.data;

        break;
      ////////////////////////////////
      case PRODUCT_TYPE_CREATE_REQUEST:
        draft.st_productTypeCreateLoading = true;
        draft.st_productTypeCreateDone = false;
        draft.st_productTypeCreateError = null;

        break;
      case PRODUCT_TYPE_CREATE_SUCCESS:
        draft.st_productTypeCreateLoading = false;
        draft.st_productTypeCreateDone = true;
        draft.st_productTypeCreateError = null;

        break;
      case PRODUCT_TYPE_CREATE_FAILURE:
        draft.st_productTypeCreateLoading = false;
        draft.st_productTypeCreateDone = false;
        draft.st_productTypeCreateError = action.data;

        break;
      ////////////////////////////////

      case PRODUCT_TYPE_UPDATE_REQUEST:
        draft.st_productTypeUpdateLoading = true;
        draft.st_productTypeUpdateDone = false;
        draft.st_productTypeUpdateError = null;

        break;
      case PRODUCT_TYPE_UPDATE_SUCCESS:
        draft.st_productTypeUpdateLoading = false;
        draft.st_productTypeUpdateDone = true;
        draft.st_productTypeUpdateError = null;

        break;
      case PRODUCT_TYPE_UPDATE_FAILURE:
        draft.st_productTypeUpdateLoading = false;
        draft.st_productTypeUpdateDone = false;
        draft.st_productTypeUpdateError = action.data;

        break;
      ////////////////////////////////

      case PRODUCT_TYPE_DELETE_REQUEST:
        draft.st_productTypeDeleteLoading = true;
        draft.st_productTypeDeleteDone = false;
        draft.st_productTypeDeleteError = null;

        break;
      case PRODUCT_TYPE_DELETE_SUCCESS:
        draft.st_productTypeDeleteLoading = false;
        draft.st_productTypeDeleteDone = true;
        draft.st_productTypeDeleteError = null;

        break;
      case PRODUCT_TYPE_DELETE_FAILURE:
        draft.st_productTypeDeleteLoading = false;
        draft.st_productTypeDeleteDone = false;
        draft.st_productTypeDeleteError = action.data;

        break;

      ////////////////////////////////// -- PRODUCT -- ////////////////////////////////
      case PRODUCT_LIST_REQUEST:
        draft.st_productListLoading = true;
        draft.st_productListDone = false;
        draft.st_productListError = null;

        break;
      case PRODUCT_LIST_SUCCESS:
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.st_productListError = null;
        draft.products = action.data;

        break;
      case PRODUCT_LIST_FAILURE:
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.data;

        break;
      ////////////////////////////////

      case PRODUCT_DETAIL_REQUEST:
        draft.st_productDetailLoading = true;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = null;

        break;
      case PRODUCT_DETAIL_SUCCESS:
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = true;
        draft.st_productDetailError = null;
        draft.detail = action.data;

        break;
      case PRODUCT_DETAIL_FAILURE:
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = action.data;

        break;
      ////////////////////////////////
      case PRODUCT_CREATE_REQUEST:
        draft.st_productCreateLoading = true;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = null;

        break;
      case PRODUCT_CREATE_SUCCESS:
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = true;
        draft.st_productCreateError = null;

        break;
      case PRODUCT_CREATE_FAILURE:
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = action.error;

        break;
      ////////////////////////////////
      case PRODUCT_INFO_UPDATE_REQUEST:
        draft.st_productInfoUpdateLoading = true;
        draft.st_productInfoUpdateDone = false;
        draft.st_productInfoUpdateError = null;
        break;

      case PRODUCT_INFO_UPDATE_SUCCESS:
        draft.st_productInfoUpdateLoading = false;
        draft.st_productInfoUpdateDone = true;
        draft.st_productInfoUpdateError = null;
        break;

      case PRODUCT_INFO_UPDATE_FAILURE:
        draft.st_productInfoUpdateLoading = false;
        draft.st_productInfoUpdateDone = false;
        draft.st_productInfoUpdateError = action.data;
        break;

      ////////////////////////////////
      case PRODUCT_IMAGE_UPDATE_REQUEST:
        draft.st_productImageUpdateLoading = true;
        draft.st_productImageUpdateDone = false;
        draft.st_productImageUpdateError = null;
        break;

      case PRODUCT_IMAGE_UPDATE_SUCCESS:
        draft.st_productImageUpdateLoading = false;
        draft.st_productImageUpdateDone = true;
        draft.st_productImageUpdateError = null;
        break;

      case PRODUCT_IMAGE_UPDATE_FAILURE:
        draft.st_productImageUpdateLoading = false;
        draft.st_productImageUpdateDone = false;
        draft.st_productImageUpdateError = action.data;
        break;

      ////////////////////////////////

      case PRODUCT_DELETE_REQUEST:
        draft.st_productDeleteLoading = true;
        draft.st_productDeleteDone = false;
        draft.st_productDeleteError = null;

        break;
      case PRODUCT_DELETE_SUCCESS:
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = true;
        draft.st_productDeleteError = null;

        break;
      case PRODUCT_DELETE_FAILURE:
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = false;
        draft.st_productDeleteError = action.data;

        break;

      ////////////////////////////////

      case ADMIN_PRODUCT_LIST_REQUEST:
        draft.st_adminProductListLoading = true;
        draft.st_adminProductListDone = false;
        draft.st_adminProductListError = null;

        break;
      case ADMIN_PRODUCT_LIST_SUCCESS:
        draft.st_adminProductListLoading = false;
        draft.st_adminProductListDone = true;
        draft.st_adminProductListError = null;
        draft.adminProducts = action.data;

        break;
      case ADMIN_PRODUCT_LIST_FAILURE:
        draft.st_adminProductListLoading = false;
        draft.st_adminProductListDone = false;
        draft.st_adminProductListError = action.data;

        break;

      ////////////////////////////////// -- OPTION -- //////////////////////////////////

      case PRODUCT_OPT_LIST_REQUEST:
        draft.st_productOptLoading = true;
        draft.st_productOptDone = false;
        draft.st_productOptError = null;
        break;

      case PRODUCT_OPT_LIST_SUCCESS:
        draft.st_productOptLoading = false;
        draft.st_productOptDone = true;
        draft.st_productOptError = null;
        draft.optLists = action.data;
        break;

      case PRODUCT_OPT_LIST_FAILURE:
        draft.st_productOptLoading = false;
        draft.st_productOptDone = false;
        draft.st_productOptError = action.data;
        break;
      ///////////////////////////////

      case PRODUCT_OPT_PROD_LIST_REQUEST:
        draft.st_productOptProdListLoading = true;
        draft.st_productOptProdListDone = false;
        draft.st_productOptProdListError = null;
        break;

      case PRODUCT_OPT_PROD_LIST_SUCCESS:
        draft.st_productOptProdListLoading = false;
        draft.st_productOptProdListDone = true;
        draft.st_productOptProdListError = null;
        draft.optProdLists = action.data;
        break;

      case PRODUCT_OPT_PROD_LIST_FAILURE:
        draft.st_productOptProdListLoading = false;
        draft.st_productOptProdListDone = false;
        draft.st_productOptProdListError = action.data;
        break;
      ///////////////////////////////

      case PRODUCT_OPT_CREATE_REQUEST:
        draft.st_productOptCreateLoading = true;
        draft.st_productOptCreateDone = false;
        draft.st_productOptCreateError = null;
        break;

      case PRODUCT_OPT_CREATE_SUCCESS:
        draft.st_productOptCreateLoading = false;
        draft.st_productOptCreateDone = true;
        draft.st_productOptCreateError = null;
        break;

      case PRODUCT_OPT_CREATE_FAILURE:
        draft.st_productOptCreateLoading = false;
        draft.st_productOptCreateDone = false;
        draft.st_productOptCreateError = action.data;
        break;
      ///////////////////////////////

      case PRODUCT_OPT_UPDATE_REQUEST:
        draft.st_productOptUpdateLoading = true;
        draft.st_productOptUpdateDone = false;
        draft.st_productOptUpdateError = null;
        break;

      case PRODUCT_OPT_UPDATE_SUCCESS:
        draft.st_productOptUpdateLoading = false;
        draft.st_productOptUpdateDone = true;
        draft.st_productOptUpdateError = null;

        break;

      case PRODUCT_OPT_UPDATE_FAILURE:
        draft.st_productOptUpdateLoading = false;
        draft.st_productOptUpdateDone = false;
        draft.st_productOptUpdateError = action.data;
        break;

      ///////////////////////////////

      case PRODUCT_OPT_DELETE_REQUEST:
        draft.st_productOptDeleteLoading = true;
        draft.st_productOptDeleteDone = false;
        draft.st_productOptDeleteError = null;
        break;

      case PRODUCT_OPT_DELETE_SUCCESS:
        draft.st_productOptDeleteLoading = false;
        draft.st_productOptDeleteDone = true;
        draft.st_productOptDeleteError = null;
        break;

      case PRODUCT_OPT_DELETE_FAILURE:
        draft.st_productOptDeleteLoading = false;
        draft.st_productOptDeleteDone = false;
        draft.st_productOptDeleteError = action.data;
        break;

      ///////////////////////////////

      case PRODUCT_GUIDE_REQUEST:
        draft.st_productGuideLoading = true;
        draft.st_productGuideDone = false;
        draft.st_productGuideError = null;
        break;

      case PRODUCT_GUIDE_SUCCESS:
        draft.st_productGuideLoading = false;
        draft.st_productGuideDone = true;
        draft.st_productGuideError = null;
        draft.productGuide = action.data;
        break;

      case PRODUCT_GUIDE_FAILURE:
        draft.st_productGuideLoading = false;
        draft.st_productGuideDone = false;
        draft.st_productGuideError = action.data;
        break;

      ///////////////////////////////

      case IMAGE_PATH_REQUEST:
        draft.st_imagePathLoading = true;
        draft.st_imagePathDone = false;
        draft.st_imagePathError = null;
        break;

      case IMAGE_PATH_SUCCESS:
        draft.st_imagePathLoading = false;
        draft.st_imagePathDone = true;
        draft.st_imagePathError = null;
        draft.imagePath = action.data.path;
        break;

      case IMAGE_PATH_FAILURE:
        draft.st_imagePathLoading = false;
        draft.st_imagePathDone = false;
        draft.st_imagePathError = action.data;
        break;

      ///////////////////////////////

      case GUIDE_UPDATE_REQUEST:
        draft.st_guideUpdateLoading = true;
        draft.st_guideUpdateDone = false;
        draft.st_guideUpdateError = null;
        break;

      case GUIDE_UPDATE_SUCCESS:
        draft.st_guideUpdateLoading = false;
        draft.st_guideUpdateDone = true;
        draft.st_guideUpdateError = null;

        break;

      case GUIDE_UPDATE_FAILURE:
        draft.st_guideUpdateLoading = false;
        draft.st_guideUpdateDone = false;
        draft.st_guideUpdateError = action.data;
        break;

      ///////////////////////////////

      case GUIDE_CREATE_REQUEST:
        draft.st_guideCreateLoading = true;
        draft.st_guideCreateDone = false;
        draft.st_guideCreateError = null;
        break;

      case GUIDE_CREATE_SUCCESS:
        draft.st_guideCreateLoading = false;
        draft.st_guideCreateDone = true;
        draft.st_guideCreateError = null;

        break;

      case GUIDE_CREATE_FAILURE:
        draft.st_imagePathLoading = false;
        draft.st_imagePathDone = false;
        draft.st_imagePathError = action.data;
        break;

      ////////////////////////////////// -- PRODUCT OPTION -- //////////////////////////////////

      case OPT_LIST_REQUEST:
        draft.st_optListLoading = true;
        draft.st_optListDone = false;
        draft.st_optListError = null;
        break;

      case OPT_LIST_SUCCESS:
        draft.st_optListLoading = false;
        draft.st_optListDone = true;
        draft.st_optListError = null;
        draft.productOpt = action.data;
        break;

      case OPT_LIST_FAILURE:
        draft.st_optListLoading = false;
        draft.st_optListDone = false;
        draft.st_optListError = action.error;
        break;
      ///////////////////////////////

      case OPT_CREATE_REQUEST:
        draft.st_optCreateLoading = true;
        draft.st_optCreateDone = false;
        draft.st_optCreateError = null;
        break;

      case OPT_CREATE_SUCCESS:
        draft.st_optCreateLoading = false;
        draft.st_optCreateDone = true;
        draft.st_optCreateError = null;
        break;

      case OPT_CREATE_FAILURE:
        draft.st_optCreateLoading = false;
        draft.st_optCreateDone = false;
        draft.st_optCreateError = action.error;
        break;

      ///////////////////////////////

      case OPT_DELETE_REQUEST:
        draft.st_optDeleteLoading = true;
        draft.st_optDeleteDone = false;
        draft.st_optDeleteError = null;
        break;

      case OPT_DELETE_SUCCESS:
        draft.st_optDeleteLoading = false;
        draft.st_optDeleteDone = true;
        draft.st_optDeleteError = null;
        break;

      case OPT_DELETE_FAILURE:
        draft.st_optDeleteLoading = false;
        draft.st_optDeleteDone = false;
        draft.st_optDeleteError = action.error;
        break;

      ///////////////// -- MODAL -- ///////////////

      case PRODUCT_TYPE_MODAL_TOGGLE:
        draft.typeModal = !draft.typeModal;
        break;

      case PRODUCT_MODAL_TOGGLE:
        draft.productModal = !draft.productModal;
        break;

      case PRODUCT_GUIDE_MODAL_TOGGLE:
        draft.productGuideModal = !draft.productGuideModal;
        break;

      case PRODUCT_OPTION_MODAL_TOGGLE:
        draft.optionModal = !draft.optionModal;
        break;

      case DETAIL_MODAL_TOGGLE:
        draft.detailModal = !draft.detailModal;
        break;

      default:
        break;
    }
  });

export default reducer;
