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
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  Text,
} from "../../../components/commonComponents";
import { useRouter } from "next/dist/client/router";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Empty, Input, Pagination, Select } from "antd";
import { FAQ_LIST_REQUEST, FAQ_TYPE_LIST_REQUEST } from "../../../reducers/faq";

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

const SubTabBar = styled(Wrapper)`
  width: auto;
  color: ${Theme.lightGrey_C};
  font-weight: bold;
  margin: 0 60px 0 0;
  cursor: pointer;

  position: relative;

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
    bottom: 0px;
  }

  `}

  &:last-child {
    margin: 0;
  }

  @media (max-width: 1000px) {
    margin: 0 20px 0 0;
  }

  @media (max-width: 700px) {
    margin: 0 20px 20px 0;

    &:last-child {
      margin: 0 20px 20px 0;
    }
  }
`;

const DownArrow = styled(DownOutlined)`
  color: ${Theme.basicTheme_C};
  display: ${(props) => props.display};
`;

const UpArrow = styled(UpOutlined)`
  color: ${Theme.basicTheme_C};
  display: ${(props) => props.display};
`;

const WordBreakTextEditor = styled(Wrapper)`
  align-items: flex-start;
  word-break: break-all;
  margin-bottom: 0;

  & img {
    max-width: 100%;
  }
`;

const CustomPage = styled(Pagination)`
  margin: 20px 0 100px;
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

const Faq = () => {
  ////// GLOBAL STATE //////

  const { faqTypes, faqs, lastPage } = useSelector((state) => state.faq);

  const { Option } = Select;

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [datum, setDatum] = useState(null);
  const [tabType, setTabType] = useState(0);
  const [faqCurrentType, setFaqCurrentType] = useState(null);
  const [faqPage, setFaqPage] = useState(1);

  const [serachType, setSearchType] = useState(0);
  const searchInput = useInput(``);

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  ////// TOGGLE //////
  ////// HANDLER //////

  // 검색기능
  const searchHandler = useCallback(() => {
    if (faqCurrentType === null) {
      dispatch({
        type: FAQ_LIST_REQUEST,
        data: {
          search: searchInput.value,
          page: 1,
          orderType: serachType,
        },
      });
    } else {
      dispatch({
        type: FAQ_LIST_REQUEST,
        data: {
          search: searchInput.value,
          page: 1,
          orderType: serachType,
          typeId: faqCurrentType,
        },
      });
    }
  }, [searchInput, serachType.faqCurrentType]);

  // 질문유형
  const searchTypeHandler = useCallback(
    (data) => {
      setSearchType(data);
    },
    [serachType]
  );

  // 페이지네이션
  const otherPageCall = useCallback(
    (page) => {
      setFaqPage(page);

      if (faqCurrentType === null) {
        dispatch({
          type: FAQ_LIST_REQUEST,
          data: {
            page: page,
          },
        });
      } else {
        dispatch({
          type: FAQ_LIST_REQUEST,
          data: {
            page: page,
            typeId: faqCurrentType,
          },
        });
      }
    },
    [faqCurrentType, faqPage]
  );

  // 자주묻는질문 유형기능
  const faqTypeHandler = useCallback(
    (data) => () => {
      if (data) {
        setTabType(data.num);
        setFaqCurrentType(data.id);

        dispatch({
          type: FAQ_LIST_REQUEST,
          data: {
            page: 1,
            typeId: data.id,
          },
        });
        setFaqPage(1);
      } else {
        setTabType(0);
        dispatch({
          type: FAQ_LIST_REQUEST,
          data: {
            page: 1,
          },
        });
        setFaqPage(1);
        setFaqCurrentType(null);
      }
    },
    [tabType]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum("");
      }
    },
    [datum]
  );
  ////// DATAVIEW //////
  return (
    <>
      <Head>
        <title>순애보 | FAQ</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            height={width < 700 ? `250px` : `360px`}
            ju={`flex-end`}
            padding={width < 700 ? `0 0 50px` : `0 0 77px`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/sub_ban/cs-center.png")`}
          >
            <Wrapper
              fontSize={width < 700 ? `20px` : `40px`}
              fontWeight={`bold`}
            >
              C/S CENTER
            </Wrapper>
            <Wrapper fontSize={width < 700 ? `16px` : `24px`}>Soonaebo</Wrapper>
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
              margin={width < 700 ? `0 0 30px` : `0 0 70px`}
              dr={`row`}
              position={`relative`}
              ju={`flex-end`}
            >
              <Wrapper
                width={`auto`}
                position={width < 700 ? `static` : `absolute`}
                left={`0`}
              >
                {/* <CustomSelect defaultValue="제목" onChange={searchTypeHandler}>
                  <Option value="0">제목</Option>
                  <Option value="1">작성일</Option>
                </CustomSelect> */}
              </Wrapper>

              <Wrapper
                dr={`row`}
                margin={width < 700 && `10px 0 0 0`}
                ju={width < 700 ? `space-between` : `center`}
              >
                <Text
                  width={`64px`}
                  margin={width < 700 ? `0px` : `0 35px 0 0`}
                  fontSize={width < 700 ? `22px` : `34px`}
                  color={`${Theme.darkGrey_C}`}
                  fontWeight={`600`}
                >
                  FAQ
                </Text>

                <CustomInput
                  className="test"
                  placeholder="검색 내용을 입력해주세요."
                  width={
                    width < 700
                      ? `calc(100% - 64px)`
                      : `calc(50% - 64px - 35px)`
                  }
                  {...searchInput}
                  onKeyDown={(e) => e.keyCode === 13 && searchHandler()}
                  suffix={
                    <SearchOutlined
                      style={{
                        fontSize: 20,
                        color: `${Theme.basicTheme_C}`,
                      }}
                      onClick={searchHandler}
                    />
                  }
                />
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              margin={width < 700 ? `0 0 10px` : `0 0 36px`}
            >
              <SubTabBar
                isActive={tabType === 0 && true}
                onClick={faqTypeHandler()}
              >
                전체
              </SubTabBar>
              {faqTypes.map((data, idx) => {
                return (
                  <SubTabBar
                    isActive={tabType === data.num && true}
                    onClick={faqTypeHandler(data)}
                    key={idx}
                  >
                    {data.value}
                  </SubTabBar>
                );
              })}
            </Wrapper>

            <Wrapper ju={`flex-start`}>
              {faqs && faqs.length === 0 ? (
                <Wrapper margin={`30px 0`}>
                  <Empty description={`조회된 데이터가 없습니다.`} />
                </Wrapper>
              ) : (
                faqs &&
                faqs.map((data, idx) => {
                  return (
                    <Wrapper
                      margin={`0 0 20px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      key={idx}
                    >
                      <Wrapper
                        dr={`row`}
                        padding={`25px 0`}
                        cursor={`pointer`}
                        onClick={() => onClickToggleHandler(data)}
                        borderBottom={
                          datum && datum.id === data.id
                            ? `none`
                            : `1px solid ${Theme.lightGrey2_C}`
                        }
                      >
                        <Wrapper width={`90%`} ju={`flex-start`} dr={`row`}>
                          <Wrapper
                            width={`8%`}
                            color={Theme.basicTheme_C}
                            fontWeight={`bold`}
                          >
                            Q
                          </Wrapper>
                          <WordBreakTextEditor
                            width={`92%`}
                            ju={`center`}
                            fontSize={width < 700 ? `12px` : `16px`}
                            fontWeight={`bold`}
                          >
                            {data.question}
                          </WordBreakTextEditor>
                        </Wrapper>
                        <Wrapper width={`10%`}>
                          <DownArrow
                            display={
                              datum && datum.id === data.id ? `none` : `flex`
                            }
                          />
                          <UpArrow
                            display={
                              datum && datum.id === data.id ? `flex` : `none`
                            }
                          />
                        </Wrapper>
                      </Wrapper>

                      {datum && datum.id === data.id && (
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`5px 0 25px`}
                        >
                          <Wrapper width={`90%`} ju={`flex-start`} dr={`row`}>
                            <Wrapper width={`8%`}></Wrapper>
                            {/* <WordBreakTextEditor
                          width={`90%`}
                          al={`flex-start`}
                          fontSize={width < 700 ? `12px` : `14px`}
                          dangerouslySetInnerHTML={{ __html: data.content }}
                        ></WordBreakTextEditor> */}
                            <Text
                              width={`92%`}
                              fontSize={width < 700 ? `12px` : ``}
                            >
                              {data.answer}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      )}
                    </Wrapper>
                  );
                })
              )}
            </Wrapper>
            <CustomPage
              defaultCurrent={1}
              current={faqPage}
              total={lastPage * 10}
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

    context.store.dispatch({
      type: FAQ_TYPE_LIST_REQUEST,
    });

    context.store.dispatch({
      type: FAQ_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Faq;
