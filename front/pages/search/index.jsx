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

import Head from "next/head";
import {
  RsWrapper2,
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  CommonTitle,
  ProductWrapper,
  SpanText,
} from "../../components/commonComponents";
import { Input, Select, Empty, message } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_TYPE_LIST_REQUEST,
} from "../../reducers/product";

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

const Search = () => {
  ////// GLOBAL STATE //////

  const { products } = useSelector((state) => state.product);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const searchInput = useInput(``);

  const { Option } = Select;

  const [orderSort, setOrderSort] = useState("1"); // 순서

  ////// USEEFFECT //////

  // 검색 값 가져오기
  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: {
        searchTitle: router.query.search,
        orderType: orderSort,
      },
    });
  }, [orderSort, router.query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  ////// TOGGLE //////
  ////// HANDLER //////

  // 정렬순서
  const searchOrderSortHandler = useCallback(
    (data) => {
      setOrderSort(data);
    },
    [orderSort]
  );

  // 페이지이동
  const moveLinkHandler = useCallback(
    (link) => () => {
      router.push(link);
    },
    [router]
  );

  // 상품검색하기
  const searchHandler = useCallback(() => {
    router.push(`/search?search=${searchInput.value}`);

    message.success(`${searchInput.value} 상품이 검색되었습니다.`);
  }, [searchInput.value]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | 검색</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper2 padding={width < 900 ? `100px 0 0` : `180px 0 0`}>
            <CommonTitle>SEARCH</CommonTitle>

            {/* 상단 검색 */}

            <Wrapper margin={`50px 0`} position={`relative`} al={`flex-start`}>
              <Wrapper
                position={`relative`}
                dr={width < 700 ? `column-reverse` : `row`}
                ju={`flex-start`}
                al={`flex-start`}
                margin={width < 700 && `10px 0 0 0`}
                width={width < 700 ? `100%` : `50%`}
              >
                <CustomSelect2 defaultValue="제목">
                  <Option>제목</Option>
                  {/* <Option>작성일</Option> */}
                </CustomSelect2>
                <CustomInput
                  margin={width < 700 ? `10px 0 10px` : `0 0 0 10px`}
                  className="test"
                  placeholder="검색 내용을 입력해주세요."
                  width={width < 700 ? `100%` : `calc(100% - 10px - 222px)`}
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

              <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 40px`}>
                <Text>
                  총 <SpanText fontWeight={`bold`}>{products.length}</SpanText>
                  개의 상품
                </Text>
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
                    value={orderSort}
                    onChange={searchOrderSortHandler}
                  >
                    <Select.Option value="1">최신 등록순</Select.Option>
                    <Select.Option value="2">상품 이름순</Select.Option>
                    <Select.Option value="3">금액 높은순</Select.Option>
                  </CustomSelect>
                </Wrapper>
              </Wrapper>

              {/* 검색 데이터 */}
              <Wrapper dr={`row`} ju={`flex-start`} al={`flex-start`}>
                {products && products.length === 0 ? (
                  <Wrapper margin={`50px 0`}>
                    <Empty description="조회된 데이터가 없습니다." />
                  </Wrapper>
                ) : (
                  products &&
                  products.map((data, idx) => {
                    return (
                      <ProductWrapper
                        dr={`row`}
                        key={data.id}
                        onClick={moveLinkHandler(`/product/${data.id}`)}
                      >
                        <Wrapper
                          position={`relative`}
                          overflow={`hidden`}
                          al={`flex-start`}
                        >
                          <Image
                            alt="thumnail"
                            src={data.thumbnail}
                            width={`100%`}
                            height={`auto`}
                          />
                          <Image
                            className="product"
                            alt="thumnail-hover"
                            src={data.hoverImage}
                          />
                        </Wrapper>

                        <Wrapper
                          bgColor={`${Theme.white_C}`}
                          margin={`10px 0 0`}
                        >
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 700 ? `14px` : `18px`}
                          >
                            {data.title}
                          </Text>
                          <Text
                            fontSize={width < 700 ? `12px` : `18px`}
                            color={Theme.basicTheme_C}
                          >
                            {data.viewPrice}
                          </Text>
                        </Wrapper>
                      </ProductWrapper>
                    );
                  })
                )}
              </Wrapper>
            </Wrapper>
          </RsWrapper2>
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
      type: PRODUCT_TYPE_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Search;
