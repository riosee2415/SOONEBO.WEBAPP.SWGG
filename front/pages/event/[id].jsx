import React, { useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  CommonButton,
  Text,
  Image,
} from "../../components/commonComponents";
import { useRouter } from "next/router";
import { EVENT_DETAIL_REQUEST } from "../../reducers/event";

const Detail = () => {
  const router = useRouter();
  const id = router.query.id;
  ////// GLOBAL STATE //////

  const { eventDetail } = useSelector((state) => state.event);

  const width = useWidth();

  ////// HOOKS //////

  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (id) {
      dispatch({
        type: EVENT_DETAIL_REQUEST,
        data: id,
      });
    }
  }, [id]);
  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | EVENT 상세</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              margin={`200px 0 0`}
              color={Theme.darkGrey_C}
              fontSize={width < 700 ? `20px` : `30px`}
              fontWeight={`600`}
            >
              EVENT
            </Wrapper>

            <Wrapper margin={`61px 0 0`}>
              <Wrapper
                width={`135px`}
                height={`30px`}
                fontSize={width < 700 ? `14px` : `16px`}
                color={Theme.white_C}
                bgColor={
                  eventDetail && eventDetail[0].flag === 1
                    ? Theme.grey3_C
                    : Theme.basicTheme_C
                }
              >
                {eventDetail && eventDetail[0].flag === 1
                  ? `종료된 이벤트`
                  : `진행중인 이벤트`}
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`26px 0 36px`}>
              <Text
                fontSize={width < 700 ? `16px` : `24px`}
                fontWeight={`600`}
                color={Theme.darkGrey_C}
              >
                {eventDetail && eventDetail[0].title}
              </Text>
              <Text
                margin={`12px 0 0`}
                color={Theme.grey3_C}
                fontSize={width < 700 ? `14px` : `16px`}
              >
                {eventDetail && eventDetail[0].viewDate}
              </Text>
            </Wrapper>

            <Wrapper margin={`36px 0 119px`}>
              <Image
                width={`100%`}
                height={`auto`}
                src={eventDetail && eventDetail[0].file}
              />
            </Wrapper>

            <Wrapper margin={`61px 0 100px`}>
              <CommonButton
                width={`146px`}
                height={`48px`}
                radius={`0px`}
                fontSize={width < 700 ? `14px` : `16px`}
                kindOf={`basicTheme`}
                onClick={() => {
                  router.push(`/event`);
                  window.scrollTo({ top: 0 });
                }}
              >
                목록
              </CommonButton>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Detail;
