import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import useInput from "../../hooks/useInput";
import Theme from "../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";

import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  CommonTitle,
} from "../../components/commonComponents";

import { Empty, Pagination, Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EVENT_FRONT_REQUEST, RESULT_LIST_REQUEST } from "../../reducers/event";
import { useRouter } from "next/router";

const NoticeWrapper = styled(Wrapper)`
  font-size: 16px;
  flex-direction: row;
  word-break: break-all;
  padding: 25px 0;
  border-bottom: 1px solid ${Theme.lightGrey4_C};
  color: ${Theme.darkGrey_C};

  &:hover {
    background-color: ${Theme.subTheme2_C};
  }

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 20px 0;
  }
`;

const IngWrapper = styled(Wrapper)`
  justify-content: flex-start;
`;

const CustomInput = styled(Input)`
  width: ${(props) => props.width};
  height: 52px;
  border: 1px solid ${Theme.darkGrey_C};
  border-radius: 4px;

  & .ant-input-affix-wrapper:hover {
    border: 1px solid ${Theme.basicTheme_C} !important;
  }

  & .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: ${Theme.basicTheme_C};
  }

  &::placeholder {
    font-size: 14px;
    line-height: 1.6;
    color: ${(props) => props.theme.lightGrey_C};
  }

  @media (max-width: 700px) {
    height: 42px;
  }
`;

const CustomSelect = styled(Select)`
  width: 120px;
  height: 100%;

  color: ${Theme.grey4_C};
  border-radius: 4px;

  &:hover {
    border-color: red;
  }
`;

const TabText = styled(Text)`
  position: relative;
  width: 15%;
  display: flex;
  justify-content: center;

  ${(props) =>
    props.isActive &&
    `
    color: ${Theme.darkGrey_C};
    font-weight: 700;

    ::before {
    content: "";
    background-color: ${Theme.darkGrey_C};

    width: 100%;
    height: 1px;
    position: absolute;
    bottom: -16px;
  }

  `}

  &:hover {
    color: ${Theme.basicTheme_C};
  }

  @media (max-width: 800px) {
    width: calc(100% / 3);
  }
`;

const EventWrapper = styled(Wrapper)`
  width: calc(100% / 3 - (221px / 3));
  overflow: hidden;
  margin: 61px 110px 0 0;
  transition: 0.5s;

  &:nth-child(3n) {
    margin-right: 0;
  }

  &:hover {
    & .box {
      width: 100%;
      height: 100%;
      top: 0px;
      transform: translateY(0px);
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      opacity: 1;
      flex-direction: row;
      transition: 0.5s;
      background-color: rgba(0, 0, 0, 0.4);
    }

    & ${Image} {
      cursor: pointer;
      transition: 0.5s;
    }
  }

  & .box {
    transform: translateY(40px);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 0;
  }

  @media (max-width: 900px) {
    width: calc(100% / 2 - (27px / 2));

    &:nth-child(2n + 1) {
      margin-right: 27px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const CustomPage = styled(Pagination)`
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

const Index = () => {
  ////// GLOBAL STATE //////

  const { Option } = Select;

  const { frontEvent, results, eventLastPage, resultLastPage } = useSelector(
    (state) => state.event
  );

  const width = useWidth();

  const [tabType, setTabType] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [select, setSelect] = useState(false);
  const search = useInput(null);

  ////// HOOKS //////
  const router = useRouter();
  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: RESULT_LIST_REQUEST,
      data: {
        orderType: select,
        search: search.value,
      },
    });
  }, [search.value, select]);

  useEffect(() => {
    if (tabType === 1) {
      dispatch({
        type: EVENT_FRONT_REQUEST,
        data: {
          orderType: 1,
          page: currentPage,
        },
      });
    }
    if (tabType === 3) {
      dispatch({
        type: EVENT_FRONT_REQUEST,
        data: {
          orderType: 2,
          page: currentPage,
        },
      });
    }
  }, [currentPage, tabType]);

  useEffect(() => {
    dispatch({
      type: RESULT_LIST_REQUEST,
      data: {
        page: currentPage2,
      },
    });
  }, [currentPage2]);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentPage2(1);
  }, [tabType]);

  ////// TOGGLE //////
  ////// HANDLER //////

  const selectHandler = useCallback(
    (e) => {
      setSelect(e);
    },
    [select]
  );

  const otherPageCall = useCallback(
    (page) => {
      if (tabType === 1 || tabType === 3) {
        return setCurrentPage(page);
      }
      if (tabType === 2) {
        return setCurrentPage2(page);
      }
    },
    [currentPage, currentPage2, tabType]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | EVENT</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper padding={width < 900 ? `100px 0 0` : `180px 0 0`}>
            <CommonTitle>EVENT</CommonTitle>
            <Wrapper
              dr={`row`}
              margin={`55px 0 0`}
              padding={`0 0 15px 0`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              color={Theme.grey3_C}
              fontWeight={`600`}
            >
              <TabText
                cursor={`pointer`}
                fontSize={width < 700 ? `14px` : `16px`}
                isActive={tabType === 1 && true}
                onClick={() => setTabType(1)}
              >
                진행중인 이벤트
              </TabText>
              <TabText
                cursor={`pointer`}
                fontSize={width < 700 ? `14px` : `16px`}
                isActive={tabType === 3 && true}
                onClick={() => setTabType(3)}
              >
                종료된 이벤트
              </TabText>
              <TabText
                cursor={`pointer`}
                fontSize={width < 700 ? `14px` : `16px`}
                isActive={tabType === 2 && true}
                onClick={() => setTabType(2)}
              >
                당첨 결과
              </TabText>
            </Wrapper>
          </RsWrapper>
          {/* 진행중인 이벤트 */}

          {tabType === 1 && (
            <RsWrapper>
              <IngWrapper dr={`row`}>
                {frontEvent && frontEvent.length === 0 ? (
                  <Wrapper margin={`50px 0`}>
                    <Empty description="조회된 데이터가 없습니다." />
                  </Wrapper>
                ) : (
                  frontEvent &&
                  frontEvent.map((data, idx) => {
                    return (
                      <EventWrapper dr={`row`} key={data.id} ju={`flex-start`}>
                        <Wrapper position={`relative`} overflow={`hidden`}>
                          <Image
                            src={data.thumbnail}
                            width={`100%`}
                            height={`auto`}
                          />
                          <Wrapper
                            className="box"
                            position={`absolute`}
                            width={`auto`}
                            top={`0`}
                            left={`0`}
                            fontSize={width < 700 ? `14px` : `18px`}
                            fontWeight={`700`}
                            cursor={`pointer`}
                            color={Theme.white_C}
                            onClick={() => {
                              router.push(`/event/${data.id}`);
                              window.scrollTo({ top: 0 });
                            }}
                          >
                            <Text borderBottom={`2px solid ${Theme.white_C}`}>
                              이벤트 더보기
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          al={`flex-start`}
                          bgColor={`${Theme.white_C}`}
                          margin={`15px 0 0`}
                        >
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 700 ? `16px` : `22px`}
                            fontWeight={`700`}
                          >
                            {data.title}
                          </Text>
                          <Text
                            fontSize={width < 700 ? `12px` : `18px`}
                            color={Theme.grey3_C}
                          >
                            {data.viewDate}
                          </Text>
                        </Wrapper>
                      </EventWrapper>
                    );
                  })
                )}
              </IngWrapper>
              <Wrapper margin={`70px 0 100px`}>
                <CustomPage
                  defaultCurrent={1}
                  current={currentPage}
                  total={eventLastPage * 9}
                  onChange={otherPageCall}
                />
              </Wrapper>
            </RsWrapper>
          )}
          {/* 종료된 이벤트 */}

          {tabType === 3 && (
            <RsWrapper>
              <IngWrapper dr={`row`}>
                {frontEvent && frontEvent.length === 0 ? (
                  <Wrapper margin={`50px 0`}>
                    <Empty description="조회된 데이터가 없습니다." />
                  </Wrapper>
                ) : (
                  frontEvent &&
                  frontEvent.map((data, idx) => {
                    return (
                      <EventWrapper dr={`row`} key={data.id} ju={`flex-start`}>
                        <Wrapper position={`relative`} overflow={`hidden`}>
                          <Image
                            src={data.thumbnail}
                            width={`100%`}
                            height={`auto`}
                          />
                          <Wrapper
                            className="box"
                            position={`absolute`}
                            width={`auto`}
                            top={`0`}
                            left={`0`}
                            fontSize={width < 700 ? `14px` : `18px`}
                            fontWeight={`700`}
                            cursor={`pointer`}
                            color={Theme.white_C}
                            onClick={() => {
                              router.push(`/event/${data.id}`);
                              window.scrollTo({ top: 0 });
                            }}
                          >
                            <Text borderBottom={`2px solid ${Theme.white_C}`}>
                              이벤트 더보기
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          al={`flex-start`}
                          bgColor={`${Theme.white_C}`}
                          margin={`15px 0 0`}
                        >
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 700 ? `16px` : `22px`}
                            fontWeight={`700`}
                          >
                            {data.title}
                          </Text>
                          <Text
                            fontSize={width < 700 ? `12px` : `18px`}
                            color={Theme.grey3_C}
                          >
                            {data.viewDate}
                          </Text>
                        </Wrapper>
                      </EventWrapper>
                    );
                  })
                )}
              </IngWrapper>
              <Wrapper margin={`70px 0 100px`}>
                <CustomPage
                  defaultCurrent={1}
                  current={currentPage}
                  total={eventLastPage * 9}
                  onChange={otherPageCall}
                />
              </Wrapper>
            </RsWrapper>
          )}
          {/* 당첨 결과 */}
          {tabType === 2 && (
            <RsWrapper>
              <Wrapper
                margin={`50px 0`}
                dr={`row`}
                position={`relative`}
                ju={`flex-end`}
              >
                <Wrapper
                  width={`auto`}
                  position={width < 700 ? `static` : `absolute`}
                  left={`0`}
                >
                  <CustomSelect defaultValue="작성일" onChange={selectHandler}>
                    <Option value={false}>작성일</Option>
                    <Option value={true}>제목</Option>
                  </CustomSelect>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  margin={width < 700 && `10px 0 0 0`}
                  ju={width < 700 ? `space-between` : "center"}
                >
                  <Text
                    width={`123px`}
                    margin={width < 700 ? `0px` : `0 35px 0 0`}
                    fontSize={width < 700 ? "22px" : "34px"}
                    color={`${Theme.darkGrey_C}`}
                    fontWeight={`600`}
                  >
                    RESULT
                  </Text>

                  <CustomInput
                    className="test"
                    placeholder="검색 내용을 입력해주세요."
                    width={
                      width < 700
                        ? `calc(100% - 123px)`
                        : `calc(50% - 123px - 35px)`
                    }
                    {...search}
                    suffix={
                      <SearchOutlined
                        style={{
                          fontSize: 20,
                          color: `${Theme.basicTheme_C}`,
                        }}
                      />
                    }
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.darkGrey_C}`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                dr={`row`}
                padding={`22px 0`}
                color={`${Theme.grey_C}`}
                fontSize={width < 700 ? `12px` : `14px`}
              >
                <Wrapper width={`10%`} display={width < 700 && `none`}>
                  No.
                </Wrapper>
                <Wrapper width={width < 700 ? `70%` : `70%`}>제목</Wrapper>
                <Wrapper width={width < 700 ? `30%` : `15%`}>작성일</Wrapper>
              </Wrapper>

              {results && results.length === 0 ? (
                <Wrapper margin={`50px 0`}>
                  <Empty description="조회된 데이터가 없습니다." />
                </Wrapper>
              ) : (
                results &&
                results.map((data, idx) => {
                  return (
                    <NoticeWrapper
                      cursor={`pointer`}
                      onClick={() => {
                        router.push(`/event/result/${data.id}`);
                        window.scrollTo({ top: 0 });
                      }}
                    >
                      <Wrapper width={`10%`} display={width < 700 && `none`}>
                        {data.id}
                      </Wrapper>
                      <Text
                        width={width < 700 ? `70%` : `70%`}
                        al={`flex-start`}
                        isEllipsis={true}
                        padding={width < 700 ? `0 10px` : `0 25px`}
                      >
                        {`[${data.title}]당첨 결과를 알려드립니다.`}
                      </Text>
                      <Wrapper
                        width={width < 700 ? `30%` : `15%`}
                        color={`${Theme.grey2_C}`}
                        fontSize={width < 700 && `12px`}
                      >
                        {data.createdAt}
                      </Wrapper>
                    </NoticeWrapper>
                  );
                })
              )}

              <Wrapper margin={`50px 0 100px`}>
                <CustomPage
                  defaultCurrent={1}
                  current={currentPage2}
                  total={resultLastPage * 10}
                  onChange={otherPageCall}
                />
              </Wrapper>
            </RsWrapper>
          )}
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
      type: RESULT_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
