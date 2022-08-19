import produce from "../util/produce";

export const initailState = {
  events: [],
  eventFile: null,
  thumbnail: null,
  eventDetail: null,
  results: [],
  resultDetail: null,
  eventLastPage: 1,
  detailResult: null,
  frontEvent: [],
  resultLastPage: 1,

  st_eventListLoading: false, // 이벤트 리스트
  st_eventListDone: false,
  st_eventListError: null,

  st_eventFileLoading: false, // 상세 이미지 경로
  st_eventFileDone: false,
  st_eventFileError: null,

  st_thumbnailLoading: false, // 썸네일 경로
  st_thumbnailDone: false,
  st_thumbnailError: null,

  st_eventDetailLoading: false, // 이벤트 상세
  st_eventDetailDone: false,
  st_eventDetailError: null,

  st_eventUpdateLoading: false, // 이벤트 수정
  st_eventUpdateDone: false,
  st_eventUpdateError: null,

  st_eventCreateLoading: false, // 이벤트 생성
  st_eventCreateDone: false,
  st_eventCreateError: null,

  st_eventDeleteLoading: false, // 이벤트 삭제
  st_eventDeleteDone: false,
  st_eventDeleteError: null,

  st_resultListLoading: false, // 당첨 결과 리스트
  st_resultListDone: false,
  st_resultListError: null,

  st_resultDetailLoading: false, // 당첨 결과 디데일
  st_resultDetailDone: false,
  st_resultDetailError: null,

  st_resultCreateLoading: false, // 당첨 결과 생성
  st_resultCreateDone: false,
  st_resultCreateError: null,

  st_resultDeleteLoading: false, // 당첨 결과 생성
  st_resultDeleteDone: false,
  st_resultDeleteError: null,

  st_eventFrontLoading: false, // 화면 이벤트 연동 리스트
  st_eventFrontDone: false,
  st_eventFrontError: null,
};

export const EVENT_LIST_REQUEST = "EVENT_LIST_REQUEST";
export const EVENT_LIST_SUCCESS = "EVENT_LIST_SUCCESS";
export const EVENT_LIST_FAILURE = "EVENT_LIST_FAILURE";

export const EVENT_FILE_REQUEST = "EVENT_FILE_REQUEST";
export const EVENT_FILE_SUCCESS = "EVENT_FILE_SUCCESS";
export const EVENT_FILE_FAILURE = "EVENT_FILE_FAILURE";

export const EVENT_THUMBNAIL_REQUEST = "EVENT_THUMBNAIL_REQUEST";
export const EVENT_THUMBNAIL_SUCCESS = "EVENT_THUMBNAIL_SUCCESS";
export const EVENT_THUMBNAIL_FAILURE = "EVENT_THUMBNAIL_FAILURE";

export const EVENT_DETAIL_REQUEST = "EVENT_DETAIL_REQUEST";
export const EVENT_DETAIL_SUCCESS = "EVENT_DETAIL_SUCCESS";
export const EVENT_DETAIL_FAILURE = "EVENT_DETAIL_FAILURE";

export const EVENT_UPDATE_REQUEST = "EVENT_UPDATE_REQUEST";
export const EVENT_UPDATE_SUCCESS = "EVENT_UPDATE_SUCCESS";
export const EVENT_UPDATE_FAILURE = "EVENT_UPDATE_FAILURE";

export const EVENT_CREATE_REQUEST = "EVENT_CREATE_REQUEST";
export const EVENT_CREATE_SUCCESS = "EVENT_CREATE_SUCCESS";
export const EVENT_CREATE_FAILURE = "EVENT_CREATE_FAILURE";

export const EVENT_DELETE_REQUEST = "EVENT_DELETE_REQUEST";
export const EVENT_DELETE_SUCCESS = "EVENT_DELETE_SUCCESS";
export const EVENT_DELETE_FAILURE = "EVENT_DELETE_FAILURE";

export const RESULT_LIST_REQUEST = "RESULT_LIST_REQUEST";
export const RESULT_LIST_SUCCESS = "RESULT_LIST_SUCCESS";
export const RESULT_LIST_FAILURE = "RESULT_LIST_FAILURE";

export const RESULT_DETAIL_REQUEST = "RESULT_DETAIL_REQUEST";
export const RESULT_DETAIL_SUCCESS = "RESULT_DETAIL_SUCCESS";
export const RESULT_DETAIL_FAILURE = "RESULT_DETAIL_FAILURE";

export const RESULT_CREATE_REQUEST = "RESULT_CREATE_REQUEST";
export const RESULT_CREATE_SUCCESS = "RESULT_CREATE_SUCCESS";
export const RESULT_CREATE_FAILURE = "RESULT_CREATE_FAILURE";

export const RESULT_DELETE_REQUEST = "RESULT_DELETE_REQUEST";
export const RESULT_DELETE_SUCCESS = "RESULT_DELETE_SUCCESS";
export const RESULT_DELETE_FAILURE = "RESULT_DELETE_FAILURE";

export const EVENT_FRONT_REQUEST = "EVENT_FRONT_REQUEST";
export const EVENT_FRONT_SUCCESS = "EVENT_FRONT_SUCCESS";
export const EVENT_FRONT_FAILURE = "EVENT_FRONT_FAILURE";
//
export const FILE_RESET_REQUST = "FILE_RESET_REQUST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EVENT_LIST_REQUEST:
        draft.st_eventListLoading = true;
        draft.st_eventListDone = false;
        draft.st_eventListError = null;

        break;
      case EVENT_LIST_SUCCESS:
        draft.st_eventListLoading = false;
        draft.st_eventListDone = true;
        draft.st_eventListError = null;
        draft.events = action.data;

        break;
      case EVENT_LIST_FAILURE:
        draft.st_eventListLoading = false;
        draft.st_eventListDone = false;
        draft.st_eventListError = action.data;

        break;
      //////////////////////////////////////////////
      case EVENT_FILE_REQUEST:
        draft.st_eventFileLoading = true;
        draft.st_eventFileDone = false;
        draft.st_eventFileError = null;

        break;
      case EVENT_FILE_SUCCESS:
        draft.st_eventFileLoading = false;
        draft.st_eventFileDone = true;
        draft.st_eventFileError = null;
        draft.eventFile = action.data.path;

        break;
      case EVENT_FILE_FAILURE:
        draft.st_eventFileLoading = false;
        draft.st_eventFileDone = false;
        draft.st_eventFileError = action.data;

        break;
      //////////////////////////////////////////////
      case EVENT_THUMBNAIL_REQUEST:
        draft.st_thumbnailLoading = true;
        draft.st_thumbnailDone = false;
        draft.st_thumbnailError = null;

        break;
      case EVENT_THUMBNAIL_SUCCESS:
        draft.st_thumbnailLoading = false;
        draft.st_thumbnailDone = true;
        draft.st_thumbnailError = null;
        draft.thumbnail = action.data.path;

        break;
      case EVENT_THUMBNAIL_FAILURE:
        draft.st_thumbnailLoading = false;
        draft.st_thumbnailDone = false;
        draft.st_thumbnailError = action.data;

        break;
      //////////////////////////////////////////////
      case EVENT_DETAIL_REQUEST:
        draft.st_eventDetailLoading = true;
        draft.st_eventDetailDone = false;
        draft.st_eventDetailError = null;

        break;
      case EVENT_DETAIL_SUCCESS:
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = true;
        draft.st_eventDetailError = null;
        draft.eventDetail = action.data.event;

        break;
      case EVENT_DETAIL_FAILURE:
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = false;
        draft.st_eventDetailError = action.data;

        break;
      //////////////////////////////////////////////

      case EVENT_UPDATE_REQUEST:
        draft.st_eventUpdateLoading = true;
        draft.st_eventUpdateDone = false;
        draft.st_eventUpdateError = null;

        break;
      case EVENT_UPDATE_SUCCESS:
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = true;
        draft.st_eventUpdateError = null;

        break;
      case EVENT_UPDATE_FAILURE:
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = false;
        draft.st_eventUpdateError = action.data;

        break;
      //////////////////////////////////////////////

      case EVENT_CREATE_REQUEST:
        draft.st_eventCreateLoading = true;
        draft.st_eventCreateDone = false;
        draft.st_eventCreateError = null;

        break;
      case EVENT_CREATE_SUCCESS:
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = true;
        draft.st_eventCreateError = null;

        break;
      case EVENT_CREATE_FAILURE:
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = false;
        draft.st_eventCreateError = action.data;

        break;
      //////////////////////////////////////////////

      case EVENT_DELETE_REQUEST:
        draft.st_eventDeleteLoading = true;
        draft.st_eventDeleteDone = false;
        draft.st_eventDeleteError = null;

        break;
      case EVENT_DELETE_SUCCESS:
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = true;
        draft.st_eventDeleteError = null;

        break;
      case EVENT_DELETE_FAILURE:
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = false;
        draft.st_eventDeleteError = action.data;

        break;
      //////////////////////////////////////////////

      case RESULT_LIST_REQUEST:
        draft.st_resultListLoading = true;
        draft.st_resultListDone = false;
        draft.st_resultListError = null;

        break;
      case RESULT_LIST_SUCCESS:
        draft.st_resultListLoading = false;
        draft.st_resultListDone = true;
        draft.st_resultListError = null;
        draft.results = action.data.results;
        draft.resultLastPage = action.data.lastPage;

        break;
      case RESULT_LIST_FAILURE:
        draft.st_resultListLoading = false;
        draft.st_resultListDone = false;
        draft.st_resultListError = action.data;

        break;
      //////////////////////////////////////////////

      case RESULT_DETAIL_REQUEST:
        draft.st_resultDetailLoading = true;
        draft.st_resultDetailDone = false;
        draft.st_resultDetailError = null;

        break;
      case RESULT_DETAIL_SUCCESS:
        draft.st_resultDetailLoading = false;
        draft.st_resultDetailDone = true;
        draft.st_resultDetailError = null;
        draft.detailResult = action.data.result;

        break;
      case RESULT_DETAIL_FAILURE:
        draft.st_resultDetailLoading = false;
        draft.st_resultDetailDone = false;
        draft.st_resultDetailError = action.data;

        break;
      //////////////////////////////////////////////

      case RESULT_CREATE_REQUEST:
        draft.st_resultCreateLoading = true;
        draft.st_resultCreateDone = false;
        draft.st_resultCreateError = null;

        break;
      case RESULT_CREATE_SUCCESS:
        draft.st_resultCreateLoading = false;
        draft.st_resultCreateDone = true;
        draft.st_resultCreateError = null;

        break;
      case RESULT_CREATE_FAILURE:
        draft.st_resultCreateLoading = false;
        draft.st_resultCreateDone = false;
        draft.st_resultCreateError = action.data;

        break;
      //////////////////////////////////////////////

      case RESULT_DELETE_REQUEST:
        draft.st_resultDeleteLoading = true;
        draft.st_resultDeleteDone = false;
        draft.st_resultDeleteError = null;

        break;
      case RESULT_DELETE_SUCCESS:
        draft.st_resultDeleteLoading = false;
        draft.st_resultDeleteDone = true;
        draft.st_resultDeleteError = null;

        break;
      case RESULT_DELETE_FAILURE:
        draft.st_resultDeleteLoading = false;
        draft.st_resultDeleteDone = false;
        draft.st_resultDeleteError = action.data;

        break;
      //////////////////////////////////////////////

      case EVENT_FRONT_REQUEST:
        draft.st_eventFrontLoading = true;
        draft.st_eventFrontDone = false;
        draft.st_eventFrontError = null;

        break;
      case EVENT_FRONT_SUCCESS:
        draft.st_eventFrontLoading = false;
        draft.st_eventFrontDone = true;
        draft.st_eventFrontError = null;
        draft.frontEvent = action.data.events;
        draft.eventLastPage = action.data.lastPage;

        break;
      case EVENT_FRONT_FAILURE:
        draft.st_eventFrontLoading = false;
        draft.st_eventFrontDone = false;
        draft.st_eventFrontError = action.data;

        break;
      //////////////////////////////////////////////

      case FILE_RESET_REQUST:
        draft.st_eventFileLoading = false;
        draft.st_eventFileDone = false;
        draft.st_eventFileError = null;
        draft.st_thumbnailLoading = false;
        draft.st_thumbnailDone = false;
        draft.st_thumbnailError = null;

        break;
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
