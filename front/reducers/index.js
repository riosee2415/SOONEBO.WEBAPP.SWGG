import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import banner from "./banner";
import popup from "./popup";
import company from "./company";
import notice from "./notice";
import gallery from "./gallery";
import question from "./question";
import accept from "./accept";
import seo from "./seo";
import editor from "./editor";
import address from "./address";
import product from "./product";
import opinion from "./opinion";
import faq from "./faq";
import sale from "./sale";
import grade from "./grade";
import agency from "./agency";
import productImage from "./productImage";
import userPoint from "./userPoint";
import review from "./review";
import boughtHistory from "./boughtHistory";
import event from "./event";
import wish from "./wish";
import qna from "./qna";
import cancel from "./cancel";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        banner,
        popup,
        company,
        notice,
        gallery,
        question,
        accept,
        seo,
        editor,
        address,
        product,
        opinion,
        faq,
        sale,
        grade,
        agency,
        productImage,
        userPoint,
        review,
        boughtHistory,
        event,
        wish,
        qna,
        cancel,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
