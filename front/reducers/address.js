import produce from "../util/produce";

export const initailState = {
  searchModal: false,
};

export const ADDRESS_SEARCH_MODAL_TOGGLE = "ADDRESS_SEARCH_MODAL_TOGGLE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADDRESS_SEARCH_MODAL_TOGGLE: {
        draft.searchModal = !draft.searchModal;
      }

      default:
        break;
    }
  });

export default reducer;
