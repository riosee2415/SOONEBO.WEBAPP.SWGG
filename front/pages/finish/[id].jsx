import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";

import {
  CommonTitle,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";

import { useRouter } from "next/router";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { BOUGHT_DETAIL_LIST_REQUEST } from "../../reducers/boughtHistory";
import { message } from "antd";
import Head from "next/head";

const FinishDetial = () => {
  ////// GLOBAL STATE //////
  const { me } = useSelector((state) => state.user);
  const { boughtDetailList, st_boughtDetailListError } = useSelector(
    (state) => state.boughtHistory
  );
  ////// HOOKS //////

  const width = useWidth();
  const router = useRouter();

  const dispatch = useDispatch();

  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!me) {
      router.push("/login");
      return message.error("로그인 후 이용해주세요.");
    }
  }, [me]);

  useEffect(() => {
    dispatch({
      type: BOUGHT_DETAIL_LIST_REQUEST,
      data: {
        boughtId: router.query.id,
      },
    });
  }, [router.query]);

  // 기본

  useEffect(() => {
    if (st_boughtDetailListError) {
      return message.error(st_boughtDetailListError);
    }
  }, [st_boughtDetailListError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <>
      <Head>
        <title>순애보</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `100px 0 0 0` : `180px 0 0 0`}>
          <RsWrapper>
            <CommonTitle>THANK YOU!</CommonTitle>

            {/* 주문정보 */}
            <Wrapper>
              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`40px 0 0`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                주문정보
              </Wrapper>

              {boughtDetailList && (
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  padding={`30px 0`}
                  borderTop={`1px solid ${Theme.grey2_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                  >
                    <Text width={`160px`}>주문번호</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList && boughtDetailList.boughtName}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wordBreak={`break-all`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>주문자명</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList && boughtDetailList.name}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>결제일시</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList && boughtDetailList.viewCreatedAt}
                    </Text>
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            {/* 배송정보 */}
            <Wrapper>
              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`40px 0 0`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                배송정보
              </Wrapper>

              {boughtDetailList && (
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  padding={`30px 0`}
                  borderTop={`1px solid ${Theme.grey2_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                  >
                    <Text width={`160px`}>받는분</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.name}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wordBreak={`break-all`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>연락처</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.mobile}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>주소</Text>
                    <Text width={`calc(100% - 160px)`}>
                      ({boughtDetailList.postCode}) {boughtDetailList.address}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>배송메세지</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.etc}
                    </Text>
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            {/* 결제정보 */}
            <Wrapper>
              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`40px 0 0`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                결제정보
              </Wrapper>

              {boughtDetailList && (
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  padding={`30px 0`}
                  borderTop={`1px solid ${Theme.grey2_C}`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                  >
                    <Text width={`160px`}>상품금액</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.viewPrice}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    wordBreak={`break-all`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>배송비</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.deliveryPrice}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>포인트 사용</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.viewPointPrice}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>결제금액</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.viewFinalPrice}
                    </Text>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    margin={`30px 0 0 0`}
                  >
                    <Text width={`160px`}>결제방법</Text>
                    <Text width={`calc(100% - 160px)`}>
                      {boughtDetailList.payWay === "card"
                        ? "신용카드"
                        : boughtDetailList.payWay === "nobank"
                        ? "무통장입금"
                        : boughtDetailList.payWay === "vbank"
                        ? "가상계좌"
                        : boughtDetailList.payWay === "trans"
                        ? "계좌이체"
                        : boughtDetailList.payWay === "phone"
                        ? "휴대폰결제"
                        : boughtDetailList.payWay === "kakao"
                        ? "카카오페이"
                        : "신용카드"}
                    </Text>
                  </Wrapper>

                  {boughtDetailList.payWay === "nobank" ? (
                    <>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        color={Theme.darkGrey_C}
                        fontSize={width < 700 ? `14px` : `16px`}
                        margin={`30px 0 0 0`}
                      >
                        <Text width={`160px`}>입금자명</Text>
                        <Text width={`calc(100% - 160px)`}>
                          주식회사 리코플랜트
                        </Text>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        color={Theme.darkGrey_C}
                        fontSize={width < 700 ? `14px` : `16px`}
                        margin={`30px 0 0 0`}
                      >
                        <Text width={`160px`}>입금은행</Text>
                        <Text width={`calc(100% - 160px)`}>농협</Text>
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        color={Theme.darkGrey_C}
                        fontSize={width < 700 ? `14px` : `16px`}
                        margin={`30px 0 0 0`}
                      >
                        <Text width={`160px`}>입금계좌번호</Text>
                        <Text width={`calc(100% - 160px)`}>3511143105083</Text>
                      </Wrapper>
                    </>
                  ) : (
                    boughtDetailList.payWay === "vbank" && (
                      <>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          color={Theme.darkGrey_C}
                          fontSize={width < 700 ? `14px` : `16px`}
                          margin={`30px 0 0 0`}
                        >
                          <Text width={`160px`}>입금날짜</Text>
                          <Text width={`calc(100% - 160px)`}>
                            {boughtDetailList.vBankDate}
                          </Text>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          color={Theme.darkGrey_C}
                          fontSize={width < 700 ? `14px` : `16px`}
                          margin={`30px 0 0 0`}
                        >
                          <Text width={`160px`}>입금자명</Text>
                          <Text width={`calc(100% - 160px)`}>
                            {boughtDetailList.vbankHolder}
                          </Text>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          color={Theme.darkGrey_C}
                          fontSize={width < 700 ? `14px` : `16px`}
                          margin={`30px 0 0 0`}
                        >
                          <Text width={`160px`}>입금은행</Text>
                          <Text width={`calc(100% - 160px)`}>
                            {boughtDetailList.vbankName}
                          </Text>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          color={Theme.darkGrey_C}
                          fontSize={width < 700 ? `14px` : `16px`}
                          margin={`30px 0 0 0`}
                        >
                          <Text width={`160px`}>입금계좌번호</Text>
                          <Text width={`calc(100% - 160px)`}>
                            {boughtDetailList.vbankNum}
                          </Text>
                        </Wrapper>
                      </>
                    )
                  )}
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper margin={`60px 0 100px`}>
              <CommonButton
                width={`146px`}
                height={`48px`}
                fontSize={`18px`}
                kindOf={"basicTheme"}
                onClick={() => moveLinkHandler(`/mypage?type=order`)}
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

export default FinishDetial;
