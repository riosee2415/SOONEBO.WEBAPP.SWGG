import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST, USER_UNDER_REQUEST } from "../../reducers/user";

import Head from "next/head";
import {
  RsWrapper,
  SpanText,
  Text,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import { RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Empty, message, Pagination } from "antd";
import Order from "../../components/mypage/Order";
import Point from "../../components/mypage/Point";
import Review from "../../components/mypage/Review";
import Question from "../../components/mypage/Quetion";
import MyInfo from "../../components/mypage/MyInfo";
import Detail from "../../components/mypage/Detail";
import Opinion from "../../components/mypage/Opinion";
import Sale from "../../components/mypage/Sale";
import { MY_OPINION_LIST_REQUEST } from "../../reducers/opinion";
import { MY_POINT_LIST_REQUEST } from "../../reducers/userPoint";
import { BOUGHT_LIST_REQUEST } from "../../reducers/boughtHistory";
import { REVIEW_USER_LIST_REQUEST } from "../../reducers/review";
import Link from "next/link";
import { MY_QNA_LIST_REQUEST } from "../../reducers/qna";
import Cancel from "../../components/mypage/Cancel";
import { MY_CANCEL_LIST_REQUEST } from "../../reducers/cancel";
import {
  PERSONAL_MYPAGE_ME_REQUEST,
  PERSONAL_MYPAGE_REQUEST,
  PERSONAL_MYPAGE_YOU_REQUEST,
} from "../../reducers/sale";

const CustomPagination = styled(Pagination)`
  margin: 50px 0 100px 0;
  & .ant-pagination-next > button {
    border: none;
  }

  & .ant-pagination-prev > button {
    border: none;
  }

  & {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  & .ant-pagination-item,
  & .ant-pagination-next,
  & .ant-pagination-prev {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5px !important;
    background-color: ${Theme.white_C} !important;
  }

  & .ant-pagination-item-active a {
    color: ${Theme.basicTheme_C};
  }

  & .ant-pagination-item:focus-visible a,
  .ant-pagination-item:hover a {
    color: ${Theme.basicTheme_C};
  }

  & .ant-pagination-item-link svg {
    font-weight: bold;
    color: ${Theme.grey_C};
  }
`;

const Box = styled(Wrapper)`
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  font-size: 14px;

  background: ${Theme.white_C};

  flex-direction: row;
  cursor: pointer;
  border-bottom: 1px solid ${Theme.subTheme6_C};
  position: relative;
  transition: 0.5s;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 50px;
    background: ${Theme.subTheme2_C};
    transition: 0.5s;
  }
  &:hover:before {
    width: 100%;
  }

  &:hover {
    border-color: ${Theme.subTheme2_C};
    color: ${Theme.basicTheme_C};
    & .menuIcon {
      color: ${Theme.basicTheme_C};
    }
  }

  ${(props) => props.isActive && `background : ${Theme.subTheme2_C};`}
  ${(props) =>
    props.isActive
      ? `color : ${Theme.basicTheme_C};`
      : `color: ${Theme.grey_C};`}
  
  & .menuIcon {
    z-index: 1;
  }
`;

const MobileBox = styled(Wrapper)`
  /* width: 20%; */
  width: calc(100% / 3);
  font-size: 13px;

  ${(props) => props.isActive && `color: ${Theme.basicTheme_C};`}
`;

const HoverWapperStyle = styled(Wrapper)`
  & > p:first-child {
    transition: 0.5s;
  }

  &:hover {
    & > p {
      color: ${(props) => props.hoverColor};
    }
  }

  ${(props) =>
    props.isActive &&
    `& > p {
    color : ${Theme.basicTheme_C}
  }`}
`;

const Index = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { me, mypageUser, lastPage, underUser } = useSelector(
    (state) => state.user
  );
  const { myQna } = useSelector((state) => state.qna);
  const { reviewUserList } = useSelector((state) => state.review);
  const { myPointList } = useSelector((state) => state.userPoint);
  const { boughtList } = useSelector((state) => state.boughtHistory);
  const {
    mypageAllPrice,
    mypageMyPrice,
    mypageYouPrice,
    mypagePersnal,
    mypageMyPersnal,
    mypageYouPersnal,
    //
    lastPageAll,
    lastPageMe,
    lastPageYou,
  } = useSelector((state) => state.sale);

  ////// HOOKS //////
  // 장바구니
  const router = useRouter();
  const dispatch = useDispatch();

  const [yous, setYous] = useState("");
  const [all, setAll] = useState("");
  const [saleTab, setSaleTab] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      message.error("로그인 후 이용하실 수 있습니다.");

      router.push("/login");
    } else {
      dispatch({
        type: PERSONAL_MYPAGE_ME_REQUEST,
        data: {
          persnalId: me.id,
          page: currentPage,
        },
      });

      dispatch({
        type: USER_UNDER_REQUEST,
        data: {
          parentId: me.id,
          page: currentPage,
        },
      });
    }
  }, [me, currentPage]);

  useEffect(() => {
    if (underUser) {
      let all = `${me && me.id}`;
      underUser.map((data) => {
        all += `, ${data.id}`;
      });

      setAll(all);

      let yous = "";
      underUser.map((data) => {
        yous += `, ${data.id}`;
      });
      let yousResult = yous.substring(1, yous.length);
      setYous(yousResult);
    }
  }, [underUser, me]);

  useEffect(() => {
    if (router.query.type === "mySales") {
      if (yous) {
        dispatch({
          type: PERSONAL_MYPAGE_YOU_REQUEST,
          data: {
            persnalId: yous,
            page: currentPage,
          },
        });
      }

      if (all) {
        dispatch({
          type: PERSONAL_MYPAGE_REQUEST,
          data: {
            persnalId: all,
            page: currentPage,
          },
        });
      }
    }
  }, [router.query.type, yous, all, currentPage]);

  ////// TOGGLE //////

  ////// HANDLER //////

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
      window.scrollTo(0, 0);

      if (saleTab === 1) {
        dispatch({
          type: PERSONAL_MYPAGE_REQUEST,
          data: {
            page: changePage,
            persnalId: all,
          },
        });
      }

      if (saleTab === 2) {
        dispatch({
          type: PERSONAL_MYPAGE_ME_REQUEST,
          data: {
            page: changePage,
            persnalId: me && me.id,
          },
        });
      }

      if (saleTab === 3) {
        dispatch({
          type: PERSONAL_MYPAGE_YOU_REQUEST,
          data: {
            page: changePage,
            persnalId: yous,
          },
        });
      }

      if (saleTab === 4) {
        dispatch({
          type: USER_UNDER_REQUEST,
          data: {
            parentId: me && me.id,
            page: changePage,
          },
        });
      }
    },
    [saleTab, currentPage, all, me, yous]
  );

  const moveLinkHandler = useCallback(
    (link) => {
      if (link === `/mypage?type=mySales`) {
        setSaleTab(1);
      }
      router.push(link);
    },
    [me, saleTab]
  );

  const tabHandler = useCallback(
    (data) => {
      setSaleTab(data);
      setCurrentPage(1);
    },
    [currentPage, saleTab]
  );

  return (
    <>
      <Head>
        <title>순애보 | MY PAGE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              padding={width < 900 ? `70px 0 0` : `180px 0 0`}
              al={`flex-start`}
            >
              <Wrapper
                width={`175px`}
                position={`sticky`}
                top={`0`}
                left={`0`}
                display={width < 900 ? `none` : `flex`}
              >
                <Wrapper
                  height={`80px`}
                  fontWeight={`700`}
                  fontSize={`30px`}
                  ju={`flex-start`}
                  al={`flex-start`}
                  cursor={`pointer`}
                  onClick={() => {
                    moveLinkHandler(`/mypage`);
                  }}
                >
                  MY PAGE
                </Wrapper>

                <Wrapper al={`flex-start`}>
                  <Box
                    borderTop={`1px solid ${Theme.subTheme6_C}`}
                    isActive={
                      router.query.type === `order` ||
                      router.query.type === `detail`
                    }
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=order`);
                    }}
                  >
                    <Text fontSize={`14px`}>주문내역</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    isActive={router.query.type === `cancel` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=cancel`);
                    }}
                  >
                    <Text fontSize={`14px`}>취소/교환/반품 내역</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    isActive={router.query.type === `point` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=point`);
                    }}
                  >
                    <Text fontSize={`14px`}>포인트 내역</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    isActive={router.query.type === `review` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=review`);
                    }}
                  >
                    <Text fontSize={`14px`}>REVIEW</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    borderBottom={`1px solid ${Theme.lightGrey3_C}`}
                    isActive={router.query.type === `question` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=question`);
                    }}
                  >
                    <Text fontSize={`14px`}>문의내역</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    borderBottom={`1px solid ${Theme.lightGrey3_C}`}
                    isActive={router.query.type === `opinion` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=opinion`);
                    }}
                  >
                    <Text fontSize={`14px`}>OPINION</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    borderBottom={`1px solid ${Theme.lightGrey3_C}`}
                    isActive={router.query.type === `myInfo` && true}
                    onClick={() => {
                      moveLinkHandler(`/mypage?type=myInfo`);
                    }}
                  >
                    <Text fontSize={`14px`}>회원정보수정</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>

                  <Box
                    borderBottom={`1px solid ${Theme.lightGrey3_C}`}
                    isActive={router.query.type === `mySales` && true}
                    onClick={() => {
                      router.query.type === "mySales"
                        ? null
                        : moveLinkHandler(`/mypage?type=mySales`);
                    }}
                  >
                    <Text fontSize={`14px`}>피추천인/매출 확인</Text>
                    <RightOutlined className={`menuIcon`} />
                  </Box>
                </Wrapper>
              </Wrapper>

              <Wrapper
                width={width < 900 ? `100%` : `calc(100% - 175px)`}
                padding={width < 900 ? `0` : `0 0 0 75px`}
              >
                {router.query.type === "detail" ||
                router.query.type === "cancelDetail" ? (
                  <Detail />
                ) : (
                  <Wrapper padding={width < 900 ? `0` : `80px 0 0`}>
                    {width < 700 && router.query.type === "mySales" ? (
                      <Wrapper dr={`row`} bgColor={Theme.lightGrey2_C}>
                        <Wrapper
                          width={`100%`}
                          margin={`30px 0 0`}
                          bgColor={Theme.lightGrey2_C}
                        >
                          <Wrapper>
                            <Text fontSize={`15px`} fontWeight={`700`}>
                              {me && me.username}님, 반갑습니다.
                            </Text>
                          </Wrapper>
                        </Wrapper>
                        {router.query.type === "mySales" && width < 900 && (
                          <Wrapper al={`flex-end`} margin={`15px 0 0`}>
                            <Text fontSize="10px" color={Theme.grey4_C}>
                              아래 문구를 클릭 시, 해당 내역 또는 목록을
                              조회하실 수 있습니다.
                            </Text>
                          </Wrapper>
                        )}
                        <HoverWapperStyle
                          width={`25%`}
                          height={width < 900 ? `80px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(1)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 1
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `12px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `총 매출`
                              : `포인트`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `12px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `11px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageAllPrice &&
                                    mypageAllPrice[0] &&
                                    mypageAllPrice[0].sumSale
                                      ? parseInt(
                                          mypageAllPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }원`
                                : myPointList && myPointList.length === 0
                                ? `0원`
                                : myPointList[0] &&
                                  myPointList[0].viewRemainPrice}
                            </SpanText>
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`25%`}
                          height={width < 900 ? `80px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(2)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 2
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `12px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `나의 매출`
                              : `주문 내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `12px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `11px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageMyPrice && mypageMyPrice[0]
                                      ? parseInt(
                                          mypageMyPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }`
                                : boughtList && boughtList.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `원` : `개`}
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`25%`}
                          height={width < 900 ? `80px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(3)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 3
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `12px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `피추천인 매출`
                              : `리뷰내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `12px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `11px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageYouPrice &&
                                    mypageYouPrice[0] &&
                                    mypageYouPrice[0].sumSale
                                      ? parseInt(
                                          mypageYouPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }`
                                : reviewUserList && reviewUserList.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `원` : `개`}
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`25%`}
                          height={width < 900 ? `80px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(4)
                              : null
                          }
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 4
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `12px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `피추천인 수`
                              : `문의내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `12px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `11px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? underUser && underUser.length
                                : myQna && myQna.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `명` : `개`}
                          </Text>
                        </HoverWapperStyle>
                      </Wrapper>
                    ) : (
                      <Wrapper dr={`row`} bgColor={Theme.lightGrey2_C}>
                        <Wrapper
                          width={`20%`}
                          height={width < 900 ? `100px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                        >
                          {width > 900 ? (
                            <Wrapper
                              fontSize={`22px`}
                              fontWeight={`700`}
                              dr={`row`}
                            >
                              <Text>{me && me.username}님,</Text>&nbsp;
                              <Text>반갑습니다.</Text>
                            </Wrapper>
                          ) : (
                            <Wrapper>
                              <Text fontSize={`15px`} fontWeight={`700`}>
                                {me && me.username}님,
                              </Text>
                              <Text fontSize={`15px`} fontWeight={`700`}>
                                반갑습니다.
                              </Text>
                            </Wrapper>
                          )}
                        </Wrapper>
                        <HoverWapperStyle
                          width={`20%`}
                          height={width < 900 ? `100px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          hoverColor={
                            router.query.type === `mySales`
                              ? Theme.basicTheme_C
                              : ``
                          }
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(1)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 1
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `총 매출`
                              : `포인트`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `13px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `12px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageAllPrice &&
                                    mypageAllPrice[0] &&
                                    mypageAllPrice[0].sumSale
                                      ? parseInt(
                                          mypageAllPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }원`
                                : myPointList && myPointList.length === 0
                                ? `0원`
                                : myPointList[0] &&
                                  myPointList[0].viewRemainPrice}
                            </SpanText>
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`20%`}
                          height={width < 900 ? `100px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          hoverColor={
                            router.query.type === `mySales`
                              ? Theme.basicTheme_C
                              : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(2)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 2
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `나의 매출`
                              : `주문 내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `13px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `12px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageMyPrice &&
                                    mypageMyPrice[0] &&
                                    mypageMyPrice[0].sumSale
                                      ? parseInt(
                                          mypageMyPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }`
                                : boughtList && boughtList.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `원` : `개`}
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`20%`}
                          height={width < 900 ? `100px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          hoverColor={
                            router.query.type === `mySales`
                              ? Theme.basicTheme_C
                              : ``
                          }
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(3)
                              : null
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 3
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `피추천인 매출`
                              : `리뷰내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `13px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `12px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? `${
                                    mypageYouPrice &&
                                    mypageYouPrice[0] &&
                                    mypageYouPrice[0].sumSale
                                      ? parseInt(
                                          mypageYouPrice[0].sumSale
                                        ).toLocaleString("ko-KR")
                                      : 0
                                  }`
                                : reviewUserList && reviewUserList.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `원` : `개`}
                          </Text>
                        </HoverWapperStyle>
                        <HoverWapperStyle
                          width={`20%`}
                          height={width < 900 ? `100px` : `150px`}
                          bgColor={Theme.lightGrey2_C}
                          onClick={() =>
                            router.query.type === `mySales`
                              ? tabHandler(4)
                              : null
                          }
                          hoverColor={
                            router.query.type === `mySales`
                              ? Theme.basicTheme_C
                              : ``
                          }
                          cursor={
                            router.query.type === `mySales` ? `pointer` : ``
                          }
                          isActive={
                            router.query.type === `mySales` && saleTab === 4
                              ? true
                              : false
                          }
                        >
                          <Text
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.grey2_C}
                          >
                            {router.query.type === `mySales`
                              ? `피추천인 수`
                              : `문의내역`}
                          </Text>
                          <Text
                            fontSize={width < 900 ? `13px` : `16px`}
                            color={Theme.grey2_C}
                          >
                            <SpanText
                              fontSize={width < 900 ? `12px` : `22px`}
                              fontWeight={`700`}
                            >
                              {router.query.type === `mySales`
                                ? underUser && underUser.length
                                : myQna && myQna.length}
                            </SpanText>
                            {router.query.type === `mySales` ? `명` : `개`}
                          </Text>
                        </HoverWapperStyle>
                      </Wrapper>
                    )}
                    {router.query.type === "mySales" && width >= 900 && (
                      <Wrapper al={`flex-end`}>
                        <Text fontSize="14px" color={Theme.grey4_C}>
                          위 문구를 클릭 시, 해당 내역 또는 목록을 조회하실 수
                          있습니다.
                        </Text>
                      </Wrapper>
                    )}
                    {width < 900 && (
                      <Wrapper
                        dr={`row`}
                        ju={`space-around`}
                        bgColor={Theme.subTheme6_C}
                        height={`100px`}
                      >
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage`);
                          }}
                          isActive={!router.query.type && true}
                        >
                          마이페이지
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=order`);
                          }}
                          isActive={router.query.type === `order` && true}
                        >
                          주문내역
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=cancel`);
                          }}
                          isActive={router.query.type === `cancel` && true}
                        >
                          취소/교환/반품 내역
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=point`);
                          }}
                          isActive={router.query.type === `point` && true}
                        >
                          포인트 내역
                        </MobileBox>

                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=review`);
                          }}
                          isActive={router.query.type === `review` && true}
                        >
                          REVIEW
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=question`);
                          }}
                          isActive={router.query.type === `question` && true}
                        >
                          문의내역
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=opinion`);
                          }}
                          isActive={router.query.type === `opinion` && true}
                        >
                          OPINION
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=myInfo`);
                          }}
                          isActive={router.query.type === `myInfo` && true}
                        >
                          회원정보 수정
                        </MobileBox>
                        <MobileBox
                          onClick={() => {
                            moveLinkHandler(`/mypage?type=mySales`);
                          }}
                          isActive={router.query.type === `mySales` && true}
                        >
                          피추천인/매출 확인
                        </MobileBox>
                      </Wrapper>
                    )}
                    {!router.query.type && (
                      <Wrapper>
                        <Wrapper al={`flex-start`} margin={`50px 0 0 0`}>
                          <Wrapper
                            dr={`row`}
                            ju={`space-between`}
                            margin={`0 0 30px`}
                          >
                            <Text fontSize={`20px`} fontWeight={`700`}>
                              최근 주문내역
                            </Text>

                            <Link href={`/mypage?type=order`}>
                              <a>
                                <Text isHover fontWeight={`700`}>
                                  주문내역 전체보기
                                </Text>
                              </a>
                            </Link>
                          </Wrapper>
                          <Wrapper
                            bgColor={Theme.lightGrey2_C}
                            color={Theme.grey_C}
                            dr={`row`}
                            height={`60px`}
                            borderTop={`1px solid ${Theme.grey2_C}`}
                            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                          >
                            <Wrapper width={`20%`}>주문일자</Wrapper>
                            <Wrapper width={`calc(100% - 20% - 20% - 20%)`}>
                              상품명
                            </Wrapper>
                            <Wrapper width={`20%`}>결제금액</Wrapper>
                            <Wrapper width={`20%`}>주문상태</Wrapper>
                          </Wrapper>
                          <Wrapper>
                            {boughtList && boughtList.length === 0 ? (
                              <Wrapper height={`300px`}>
                                <Empty description={false}>
                                  최근 주문 내역이 없습니다.
                                </Empty>
                              </Wrapper>
                            ) : (
                              boughtList &&
                              boughtList.map((data) => {
                                return (
                                  <Wrapper
                                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                                    dr={`row`}
                                    padding={`15px 0`}
                                  >
                                    <Wrapper
                                      width={`20%`}
                                      color={Theme.darkGrey_C}
                                      fontSize={width < 900 ? `12px` : `16px`}
                                      textAlign={`center`}
                                    >
                                      {data.viewCreatedAt}
                                    </Wrapper>
                                    <Wrapper
                                      width={`calc(100% - 20% - 20% - 20%)`}
                                      padding={
                                        width < 900 ? `0 10px` : `0 20px`
                                      }
                                      dr={`row`}
                                      ju={`flex-start`}
                                    >
                                      <Text
                                        color={Theme.darkGrey_C}
                                        fontSize={width < 900 ? `12px` : `16px`}
                                      >
                                        {data.productCnt > 1
                                          ? `${data.productName} 외 ${data.productCnt}개`
                                          : `${data.productName}`}
                                      </Text>
                                    </Wrapper>
                                    <Wrapper
                                      width={`20%`}
                                      fontWeight={`600`}
                                      color={Theme.grey2_C}
                                      fontSize={width < 900 ? `12px` : `16px`}
                                    >
                                      {data.viewPrice}
                                    </Wrapper>
                                    <Wrapper width={`20%`}>
                                      <Text
                                        color={Theme.darkGrey_C}
                                        fontSize={width < 900 ? `12px` : `16px`}
                                      >
                                        {data.viewDeliveryStatus}
                                      </Text>
                                    </Wrapper>
                                  </Wrapper>
                                );
                              })
                            )}
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    )}
                  </Wrapper>
                )}
                <Wrapper padding={`50px 0 0`}>
                  {router.query.type === `order` && <Order />}
                  {router.query.type === `cancel` && <Cancel />}
                  {router.query.type === `point` && <Point />}
                  {router.query.type === `review` && <Review />}
                  {router.query.type === `question` && <Question />}
                  {router.query.type === `opinion` && <Opinion />}
                  {router.query.type === `myInfo` && <MyInfo />}
                  {router.query.type === `mySales` && (
                    <Sale
                      sales={
                        saleTab === 1
                          ? mypagePersnal
                          : saleTab === 2
                          ? mypageMyPersnal
                          : saleTab === 3
                          ? mypageYouPersnal
                          : saleTab === 4
                          ? mypageUser
                          : mypagePersnal
                      }
                      saleTab={saleTab}
                    />
                  )}
                </Wrapper>

                {router.query.type === `mySales` && (
                  <CustomPagination
                    size="10"
                    current={currentPage}
                    total={
                      saleTab === 1
                        ? lastPageAll * 10
                        : saleTab === 2
                        ? lastPageMe * 10
                        : saleTab === 3
                        ? lastPageYou * 10
                        : lastPage
                    }
                    onChange={otherPageCall}
                  />
                )}
              </Wrapper>
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

    context.store.dispatch({
      type: MY_POINT_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: MY_OPINION_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: BOUGHT_LIST_REQUEST,
      data: {
        searchDate: "2",
      },
    });

    context.store.dispatch({
      type: MY_QNA_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: REVIEW_USER_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: MY_CANCEL_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
