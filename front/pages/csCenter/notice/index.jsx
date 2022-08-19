import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import useInput from "../../../hooks/useInput";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  Text,
} from "../../../components/commonComponents";
import { useRouter } from "next/dist/client/router";
import { Empty, Input, message, Pagination, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NOTICE_LIST_REQUEST } from "../../../reducers/notice";

const NoticeWrapper = styled(Wrapper)`
  font-size: 16px;
  flex-direction: row;
  word-break: break-all;
  padding: 35px 0;
  border-bottom: 1px solid ${Theme.lightGrey4_C};
  color: ${Theme.darkGrey_C};

  &:hover {
    background-color: ${Theme.subTheme2_C};
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
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
    border-color: ${Theme.red_C};
  }
`;

const CustomPage = styled(Pagination)`
  margin: 40px 0 100px;

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

const Notice = () => {
  ////// GLOBAL STATE //////
  const { notices, maxPage } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const { Option } = Select;

  const search = useInput(null);

  const [currentPage, setCurrentPage] = useState(1); // 페이지
  const [option, setOption] = useState(1); // 정렬

  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search.value]);

  useEffect(() => {
    dispatch({
      type: NOTICE_LIST_REQUEST,
      data: {
        page: currentPage,
        search: search.value,
        orderType: option,
      },
    });
  }, [option, search.value, currentPage]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const optionHandler = useCallback(
    (e) => {
      setOption(e);
    },
    [option]
  );

  const otherPageCall = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | NOTICE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            height={`360px`}
            ju={`flex-end`}
            padding={`0 0 77px`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/sub_ban/cs-center.png")`}
          >
            <Wrapper fontSize={`40px`} fontWeight={`bold`}>
              C/S CENTER
            </Wrapper>
            <Wrapper fontSize={`24px`}>Soonaebo</Wrapper>
          </Wrapper>
          <RsWrapper>
            {/* 상단 탭 */}
            <Wrapper ju={`flex-end`} dr={`row`} margin={`50px 0 60px`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/notice`)}
              >
                NOTICE
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/faq`)}
              >
                FAQ
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/qna`)}
              >
                Q&#38;A
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/opinion`)}
              >
                OPINION
              </Wrapper>
            </Wrapper>

            <Wrapper
              margin={`0 0 50px`}
              dr={`row`}
              position={`relative`}
              ju={`flex-end`}
            >
              <Wrapper
                width={`auto`}
                position={width < 700 ? `static` : `absolute`}
                left={`0`}
              >
                <CustomSelect value={option} onChange={(e) => optionHandler(e)}>
                  <Option value={1}>최신 등록순</Option>
                  <Option value={2}>제목 이름순</Option>
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
                  NOTICE
                </Text>

                <CustomInput
                  className="test"
                  placeholder="검색 내용을 입력해주세요."
                  {...search}
                  width={
                    width < 700
                      ? `calc(100% - 123px)`
                      : `calc(50% - 123px - 35px)`
                  }
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
              <Wrapper width={`7%`} display={width < 700 && `none`}>
                No.
              </Wrapper>
              <Wrapper width={`8%`} display={width < 700 && `none`}>
                구분
              </Wrapper>
              <Wrapper width={width < 700 ? `70%` : `70%`}>제목</Wrapper>
              <Wrapper width={width < 700 ? `30%` : `15%`}>작성일</Wrapper>
            </Wrapper>

            {notices && notices.length === 0 ? (
              <Wrapper margin={`50px 0`}>
                <Empty description="조회된 데이터가 없습니다." />
              </Wrapper>
            ) : (
              notices &&
              notices.map((data) => {
                return (
                  <NoticeWrapper
                    key={data.id}
                    cursor={`pointer`}
                    onClick={() =>
                      moveLinkHandler(`/csCenter/notice/detail/${data.id}`)
                    }
                  >
                    <Wrapper
                      width={`7%`}
                      display={width < 700 && `none`}
                      color={Theme.darkGrey_C}
                    >
                      {data.id}
                    </Wrapper>
                    <Wrapper
                      width={`8%`}
                      display={width < 700 && `none`}
                      color={Theme.grey2_C}
                    >
                      {data.type}
                    </Wrapper>
                    <Text
                      width={`70%`}
                      al={`flex-start`}
                      padding={`0 0 0 20px`}
                      color={Theme.darkGrey_C}
                      isEllipsis={`true`}
                    >
                      {data.title}
                    </Text>
                    <Wrapper
                      width={width < 700 ? `30%` : `15%`}
                      color={Theme.grey2_C}
                      fontSize={width < 700 && `12px`}
                    >
                      {data.viewCreatedAt}
                    </Wrapper>
                  </NoticeWrapper>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={currentPage}
              total={maxPage * 10}
              onChange={(page) => otherPageCall(page)}
            />
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

export default Notice;
