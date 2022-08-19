import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
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
import { Empty, Form, Input, Modal, Pagination, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ALL_QNA_LIST_REQUEST } from "../../../reducers/qna";
import useInput from "../../../hooks/useInput";

const QnaWrapper = styled(Wrapper)`
  min-height: 90px;
  font-size: 16px;
  flex-direction: row;
  word-break: break-all;
  padding: 15px 0;
  border-bottom: 1px solid ${Theme.lightGrey4_C};
  color: ${Theme.darkGrey_C};

  &:hover {
    background-color: ${Theme.subTheme2_C};
  }

  @media (max-width: 700px) {
    font-size: 14px;
    min-height: 50px;
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
    border-color: red;
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

const CustomForm = styled(Form)`
  .ant-form-item-label > label {
    color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-form-item {
    border-bottom: 1px dashed ${(props) => props.theme.lightGrey3_C};
  }
`;

const Qna = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { allQna, maxPage } = useSelector((state) => state.qna);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const search = useInput("");

  const [orderSort, setOrderSort] = useState(1); // 순서
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션

  // 상세문의내용 관련
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch({
      type: ALL_QNA_LIST_REQUEST,
      data: {
        search: search.value,
        page: currentPage,
        orderType: orderSort,
      },
    });
  }, [currentPage, orderSort, search.value]);

  ////// TOGGLE //////
  const modalToggle = useCallback(
    (data) => {
      if (data) {
        setCurrentData(data);
      } else {
        setCurrentData(null);
      }

      setOpenModal(!openModal);
    },
    [openModal, currentData]
  );

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 정렬순서
  const searchOrderSortHandler = useCallback(
    (data) => {
      setOrderSort(data);
    },
    [orderSort]
  );

  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | QNA</title>
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
                <CustomSelect
                  placeholder={`상품 정렬`}
                  value={orderSort}
                  onChange={searchOrderSortHandler}
                  border={`none`}
                  delete
                >
                  <Select.Option value={1}>최신 등록순</Select.Option>
                  <Select.Option value={2}>제목 이름순</Select.Option>
                </CustomSelect>
              </Wrapper>

              <Wrapper
                dr={`row`}
                margin={width < 700 && `10px 0 0 0`}
                ju={width < 700 ? `space-between` : "center"}
              >
                <Text
                  width={`74px`}
                  margin={width < 700 ? `0px` : `0 35px 0 0`}
                  fontSize={width < 700 ? "22px" : "34px"}
                  color={`${Theme.darkGrey_C}`}
                  fontWeight={`600`}
                >
                  QNA
                </Text>

                <CustomInput
                  className="test"
                  placeholder="검색 내용을 입력해주세요."
                  width={
                    width < 700
                      ? `calc(100% - 74px)`
                      : `calc(50% - 74px - 35px)`
                  }
                  suffix={
                    <SearchOutlined
                      style={{
                        fontSize: 20,
                        color: `${Theme.basicTheme_C}`,
                      }}
                    />
                  }
                  {...search}
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
              <Wrapper width={`20%`} display={width < 700 && `none`}>
                상품정보
              </Wrapper>
              <Wrapper width={width < 700 ? `55%` : `50%`}>제목</Wrapper>
              <Wrapper width={`10%`}>작성자</Wrapper>
              <Wrapper width={width < 700 ? `35%` : `10%`}>작성일</Wrapper>
            </Wrapper>

            {allQna && allQna.length === 0 ? (
              <Wrapper margin={`50px 0`}>
                <Empty description="조회된 데이터가 없습니다." />
              </Wrapper>
            ) : (
              allQna &&
              allQna.map((data) => {
                return (
                  <QnaWrapper
                    key={data.id}
                    cursor={`pointer`}
                    onClick={() => modalToggle(data)}
                  >
                    <Wrapper
                      width={`10%`}
                      display={width < 700 && `none`}
                      color={Theme.darkGrey_C}
                    >
                      {data.id}
                    </Wrapper>
                    <Wrapper
                      width={`20%`}
                      display={width < 700 && `none`}
                      dr={`row`}
                      padding={`0 20px 0 0`}
                    >
                      {data.thumbnail && (
                        <>
                          <Wrapper
                            width={`60px`}
                            height={`60px`}
                            margin={`0 8px 0 0`}
                          >
                            <Image alt="product_image" src={data.thumbnail} />
                          </Wrapper>
                          <Wrapper
                            width={`calc(100% - 80px)`}
                            al={`flex-start`}
                            display={`block`}
                          >
                            <Text isEllipsis={true}>{data.productTitle}</Text>
                          </Wrapper>
                        </>
                      )}
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `55%` : `50%`}
                      al={`flex-start`}
                      color={Theme.grey_C}
                      fontSize={width < 700 ? `13px` : ``}
                    >
                      <Text width={`100%`} isEllipsis={`true`}>
                        {data.title}
                      </Text>
                    </Wrapper>
                    <Wrapper width={`10%`} color={Theme.grey2_C}>
                      {data.username.slice(0, data.username.length - 1) + "*"}
                    </Wrapper>
                    <Wrapper
                      width={width < 700 ? `35%` : `10%`}
                      color={Theme.grey2_C}
                      fontSize={width < 700 ? `11px` : ``}
                    >
                      {data.viewCreatedAt}
                    </Wrapper>
                  </QnaWrapper>
                );
              })
            )}

            <CustomPage
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={maxPage * 10}
              pageSize={10}
              onChange={(page) => otherPageCall(page)}
            />
          </RsWrapper>

          <Modal
            visible={openModal}
            width={`700px`}
            title={`문의 상세내용`}
            onCancel={() => modalToggle(null)}
            footer={null}
          >
            {currentData && (
              <Wrapper padding={`0 20px`}>
                <CustomForm
                  style={{ width: `100%` }}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 21 }}
                >
                  <Form.Item label="이름">
                    <Text>
                      {currentData.username.slice(
                        0,
                        currentData.username.length - 1
                      ) + "*"}
                    </Text>
                  </Form.Item>

                  <Form.Item label="연락처">
                    <Text>
                      {currentData.mobile.slice(
                        0,
                        currentData.mobile.length - 4
                      ) + "****"}
                    </Text>
                  </Form.Item>

                  <Form.Item label="상품명">
                    <Text>{currentData.productTitle}</Text>
                  </Form.Item>

                  <Form.Item label="상품이미지">
                    <Image width={`100px`} src={currentData.thumbnail} />
                  </Form.Item>

                  <Form.Item label="문의제목">
                    <Text>{currentData.title}</Text>
                  </Form.Item>

                  <Form.Item label="문의내용">
                    <Input.TextArea
                      style={{ border: "none", padding: `5px 0 0` }}
                      readOnly={true}
                      rows={5}
                      value={currentData.content}
                    />
                  </Form.Item>

                  {currentData.isCompleted ? (
                    <Form.Item label="문의답변">
                      <Input.TextArea
                        style={{ border: "none", padding: `5px 0 0` }}
                        readOnly={true}
                        rows={5}
                        value={currentData.answer}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item label="문의답변">
                      <Text>답변이 등록되지 않았습니다.</Text>
                    </Form.Item>
                  )}
                </CustomForm>
              </Wrapper>
            )}
          </Modal>
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
      type: ALL_QNA_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Qna;
