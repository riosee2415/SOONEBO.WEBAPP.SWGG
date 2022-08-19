import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
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
import { SEO_LIST_REQUEST } from "../../reducers/seo";

import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  CommonTitle,
} from "../../components/commonComponents";
import {
  Input,
  Select,
  Rate,
  Pagination,
  Modal,
  Carousel,
  Empty,
  message,
  Form,
} from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import ReviewModalSlider from "../../components/slide/ReviewModalSlider";
import { REVIEW_ALL_LIST_REQUEST } from "../../reducers/review";
import { useRouter } from "next/router";

const CustomModal = styled(Modal)`
  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    border-bottom: none;
    padding: 0px;
  }

  .ant-modal-body {
    padding: 0 40px;

    @media (max-width: 800px) {
      padding: 0 10px;
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

const ReviewWrapper = styled(Wrapper)`
  width: calc(100% / 5 - 35px);
  overflow: hidden;
  margin: 35px 43px 0 0;
  padding: 0 0 35px;
  border-bottom: 1px solid ${Theme.lightGrey3_C};

  & ${Image} {
    cursor: pointer;
  }

  &:nth-child(5n) {
    margin-right: 0;
  }

  @media (max-width: 1100px) {
    width: calc(100% / 4 - 35px);
    margin: 35px 46px 0 0;

    &:nth-child(5n) {
      margin-right: auto;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (max-width: 800px) {
    width: calc(100% / 3 - 20px);

    margin: 35px 30px 0 0;

    &:nth-child(4n) {
      margin-right: auto;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 500px) {
    width: calc(100% / 2 - 10px);
    margin: 20px 20px 0 0;
    padding: 0 0 20px;

    &:nth-child(3n) {
      margin-right: auto;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `142px`};

  & .ant-select-selector {
    ${(props) =>
      props.delete &&
      `border: none !important; 
       border-bottom: 2px solid ${Theme.lightGrey4_C} !important;`}
  }
  color: ${Theme.grey4_C};
  border-radius: 4px;
`;

const CustomSelect2 = styled(Select)`
  width: 222px;

  & .ant-select-selection-item {
    font-size: ${(props) => props.fontSize || `16px`};
    color: ${(props) => props.color || Theme.grey4_C};
    line-height: 45px !important;
  }

  & .ant-select-selector {
    height: ${(props) => props.height || `52px`} !important;
  }
  & .ant-select-selector:hover {
    height: ${(props) => props.height || `52px`} !important;
    border-color: ${Theme.basicTheme_C} !important;
  }

  & .ant-select-selection-placeholder {
    line-height: 52px !important;
  }
  & .ant-select-selection-search-input {
    height: 52px !important;
    font-size: 16px !important;
  }

  & .ant-select-selector {
    border: 1px solid ${Theme.lightGrey4_C} !important;
    border-radius: 4px !important;
  }

  & .ant-select-selection-placeholder {
    font-size: 16px !important;
  }

  @media (max-width: 700px) {
    width: 142px;

    & .ant-select-selection-item {
      font-size: ${(props) => props.fontSize || `14px`};
      color: ${(props) => props.color || Theme.grey4_C};
      line-height: 32px !important;
    }

    & .ant-select-selector {
      height: ${(props) => props.height || `32px`} !important;
    }
    & .ant-select-selector:hover {
      height: ${(props) => props.height || `32px`} !important;
      border-color: ${Theme.basicTheme_C} !important;
    }

    & .ant-select-selection-placeholder {
      line-height: 32px !important;
    }
    & .ant-select-selection-search-input {
      height: 32px !important;
      font-size: 14px !important;
    }
  }
`;

const CustomRate = styled(Rate)`
  color: ${Theme.basicTheme_C};
`;

const CustomInput = styled(Input)`
  width: ${(props) => props.width};
  height: 52px;
  border: ${(props) => props.border || `1px solid ${Theme.lightGrey4_C}`};
  margin: ${(props) => props.margin};

  & .ant-input-affix-wrapper:hover {
    border: 1px solid ${Theme.basicTheme_C} !important;
  }

  span {
    color: ${Theme.red_C};
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

const SearchForm = styled(Form)`
  width: calc(100% - 10px - 222px);
  & .ant-form-item {
    width: 100%;
    margin: 0;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { Option } = Select;

  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const {
    reviewAllList, // 전체리뷰 가져오기
    reviewAllLastPage, // 전체리뷰 페이지네이션
    //
    st_reviewAllListError,
  } = useSelector((state) => state.review);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchForm] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalToggle, setModalToggle] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const [searchType, setSearchType] = useState("1"); // 검색 타입
  const [searchText, setSearchText] = useState(""); // 검색어
  const [searchSort, setSearchSort] = useState(`isNew`);

  ////// REDUX //////
  ////// USEEFFECT //////

  // 전체 리뷰

  useEffect(() => {
    dispatch({
      type: REVIEW_ALL_LIST_REQUEST,
      data: {
        page: currentPage,
        sortName: searchSort,
        searchTitle: searchType === "1" ? searchText : null,
        searchDate: searchType === "2" ? searchText : null,
      },
    });
  }, [router.query, currentPage, searchText, searchType, searchSort]);

  useEffect(() => {
    if (st_reviewAllListError) {
      return message.error(st_reviewAllListError);
    }
  }, [st_reviewAllListError]);

  ////// TOGGLE //////
  ////// HANDLER //////

  // 검색 순서
  const chnageSearchSortHandler = useCallback(
    (sort) => {
      setSearchSort(sort);
    },
    [searchSort]
  );

  // 검색 타입
  const chnageSearchTypeHandler = useCallback(
    (type) => {
      setSearchText("");
      setSearchType(type);

      searchForm.resetFields();
    },
    [searchType, searchText]
  );

  // 검색어
  const searchTextHandler = useCallback(
    (data) => {
      setSearchText(data.searchText);
    },
    [searchText]
  );

  // 페이지네이션 이동
  const paginationMoveHadnler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  const modalCancelHandle = useCallback(() => {
    setModalToggle(false);
  }, []);

  const modalClickHandle = useCallback(
    (data) => {
      setModalToggle(true);
      setDetailData(data);
    },
    [modalToggle, detailData]
  );

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>{seo_title.length < 1 ? "순애보" : seo_title[0].content}</title>

        <meta
          name="subject"
          content={seo_title.length < 1 ? "순애보" : seo_title[0].content}
        />
        <meta
          name="title"
          content={seo_title.length < 1 ? "순애보" : seo_title[0].content}
        />
        <meta name="keywords" content={seo_keywords} />
        <meta
          name="description"
          content={
            seo_desc.length < 1
              ? "피부에 면역을 입히다. 피부는 물론 건강까지 생각하는 화장품 순애보 다프네"
              : seo_desc[0].content
          }
        />
        {/* <!-- OG tag  --> */}
        <meta
          property="og:title"
          content={seo_title.length < 1 ? "순애보" : seo_title[0].content}
        />
        <meta
          property="og:site_name"
          content={seo_title.length < 1 ? "순애보" : seo_title[0].content}
        />
        <meta
          property="og:description"
          content={
            seo_desc.length < 1
              ? "피부에 면역을 입히다. 피부는 물론 건강까지 생각하는 화장품 순애보 다프네"
              : seo_desc[0].content
          }
        />
        <meta property="og:keywords" content={seo_keywords} />
        <meta
          property="og:image"
          content={seo_ogImage.length < 1 ? "" : seo_ogImage[0].content}
        />
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper padding={width < 900 ? `100px 0 0` : `180px 0 0`}>
            <CommonTitle>REVIEW</CommonTitle>

            {/* 상단 검색  */}
            <Wrapper
              margin={`50px 0`}
              dr={width < 700 ? `coulmn` : `row`}
              position={`relative`}
              ju={`space-between`}
            >
              <Wrapper
                position={`relative`}
                dr={width < 700 ? `column-reverse` : `row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={width < 700 && `10px 0 0 0`}
                width={width < 700 ? `100%` : `60%`}
              >
                <CustomSelect2
                  defaultValue="제목"
                  value={searchType}
                  onChange={chnageSearchTypeHandler}
                >
                  <Option value="1">제목</Option>
                  <Option value="2">작성일</Option>
                </CustomSelect2>
                <SearchForm form={searchForm} onFinish={searchTextHandler}>
                  <Form.Item name="searchText">
                    <CustomInput
                      width={`100%`}
                      margin={width < 700 ? `10px 0 10px` : `0 0 0 10px`}
                      className="test"
                      placeholder={
                        searchType === "1"
                          ? "검색 내용을 입력해주세요."
                          : "작성일은 2022-07-01과 같은 형식으로 검색해주세요."
                      }
                      suffix={
                        <SearchOutlined
                          // onClick={() => searchTextHandler()}
                          style={{
                            cursor: `pointer`,
                            fontSize: 20,
                            color: `${Theme.basicTheme_C}`,
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </SearchForm>
              </Wrapper>

              <Wrapper
                width={`auto`}
                position={width < 700 && `absolute`}
                top={width < 700 && `62px`}
                right={`0`}
                al={width < 700 && `flex-end`}
                margin={width < 700 && `10px 0 0`}
              >
                <CustomSelect
                  defaultValue="상품 정렬"
                  border={`none`}
                  delete
                  onChange={chnageSearchSortHandler}
                >
                  <Option value={`isNew`}>최신작성일순</Option>
                  <Option value={`isRateUp`}>별점순</Option>
                </CustomSelect>
              </Wrapper>

              {/* 리뷰 데이터 */}
              <Wrapper dr={`row`} ju={`flex-start`}>
                {reviewAllList.length === 0 ? (
                  <Wrapper margin={`50px 0`}>
                    <Empty description="조회된 리뷰가 없습니다." />
                  </Wrapper>
                ) : (
                  reviewAllList.map((data, idx) => {
                    return (
                      <ReviewWrapper dr={`row`} key={data.id}>
                        <Wrapper
                          position={`relative`}
                          overflow={`hidden`}
                          al={`flex-start`}
                        >
                          <Text
                            color={Theme.grey_C}
                            margin={`0 0 5px`}
                            fontSize={width < 700 ? `12px` : "14px"}
                          >
                            {data.productTitle}
                          </Text>
                          <Image
                            src={data.imagePath1}
                            width={`100%`}
                            height={width < 700 ? `165px` : `225px`}
                            onClick={() => modalClickHandle(data)}
                          />
                        </Wrapper>

                        <Wrapper
                          al={`flex-start`}
                          bgColor={`${Theme.white_C}`}
                          margin={`10px 0 0`}
                        >
                          <CustomRate value={data.rate} disabled></CustomRate>
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 700 ? `14px` : `16px`}
                            fontWeight={`600`}
                          >
                            {data.title}
                          </Text>
                          <Wrapper dr={`row`} ju={`space-between`}>
                            <Text
                              fontSize={width < 700 ? `12px` : `14px`}
                              color={Theme.grey3_C}
                            >
                              {data.username}
                            </Text>

                            <Text
                              fontSize={width < 700 ? `12px` : `14px`}
                              color={Theme.grey3_C}
                            >
                              {data.viewCreatedAt}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </ReviewWrapper>
                    );
                  })
                )}
              </Wrapper>

              <Wrapper margin={`64px 0 50px`}>
                <CustomPage
                  current={currentPage}
                  total={reviewAllLastPage * 10}
                  onChange={paginationMoveHadnler}
                ></CustomPage>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </WholeWrapper>

        {/* DETAIL MODAL */}
        <CustomModal
          visible={modalToggle}
          onCancel={modalCancelHandle}
          footer={null}
          width={width < 800 ? `100%` : `510px`}
        >
          {detailData && (
            <>
              <Wrapper dr={`row`} ju={`space-between`} padding={`40px 0 0`}>
                <Text
                  fontSize={width < 700 ? `18px` : `24px`}
                  fontWeight={`600`}
                >
                  {detailData.title}
                </Text>
                <CloseOutlined
                  style={{
                    cursor: "pointer",
                    fontSize: 25,
                    color: Theme.lightGrey_C,
                  }}
                  onClick={() => modalCancelHandle()}
                />
              </Wrapper>
              <Wrapper al={`flex-start`} padding={`18px 0 0 0`}>
                <Text
                  fontSize={width < 700 ? `14px` : `16px`}
                  color={Theme.grey3_C}
                >
                  {detailData.username}
                </Text>

                <Wrapper dr={`row`} ju={`space-between`} padding={`0 0 5px 0`}>
                  <Text
                    fontSize={width < 700 ? `12px` : `14px`}
                    color={Theme.grey3_C}
                  >
                    {detailData.viewCreatedAt}
                  </Text>

                  <CustomRate value={detailData.rate} disabled />
                </Wrapper>

                <ReviewModalSlider
                  datum={[
                    detailData.imagePath1 ? detailData.imagePath1 : null,
                    detailData.imagePath2 ? detailData.imagePath2 : null,
                    detailData.imagePath3 ? detailData.imagePath3 : null,
                    detailData.imagePath4 ? detailData.imagePath4 : null,
                  ].filter((data) => data)}
                />

                <Wrapper al={`flex-start`} padding={`10px 0 60px 0`}>
                  <Text
                    fontWeight={`600`}
                    fontSize={width < 700 ? `18px` : `24px`}
                  >
                    {detailData.title}
                  </Text>

                  <Text
                    fontSize={width < 700 ? `16px` : `18px`}
                    color={Theme.grey3_C}
                  >
                    {detailData.content}
                  </Text>
                </Wrapper>
              </Wrapper>
            </>
          )}
        </CustomModal>
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
      type: REVIEW_ALL_LIST_REQUEST,
      data: {
        page: 1,
        sortName: "isNew",
        searchTitle: "",
        searchDate: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
