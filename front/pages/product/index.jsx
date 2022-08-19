import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";

import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  CommonTitle,
  Image,
  RsWrapper2,
  SpanText,
  Text,
  ProductWrapper,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Empty, Select } from "antd";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_TYPE_LIST_REQUEST,
} from "../../reducers/product";

const TabText = styled(Text)`
  color: ${Theme.grey3_C};
  height: 34px;
  position: relative;
  cursor: pointer;
  &:hover {
    color: ${Theme.darkGrey_C};
  }

  &:before {
    transition: 0.5s;
    position: absolute;
    bottom: -1px;
    left: 0;
    content: "";
    width: 0;
    height: 1px;
    background: ${Theme.darkGrey_C};
  }
  &:hover:before {
    width: 100%;
  }

  &:before {
    ${(props) =>
      props.isActive &&
      `
   width: 100%;
`};
  }
  ${(props) =>
    props.isActive &&
    `
    color: ${Theme.darkGrey_C};
`};

  @media (max-width: 800px) {
    font-size: ${(props) => props.fontSize || `13px`};
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

const Index = () => {
  ////// GLOBAL STATE //////

  const { types, products } = useSelector((state) => state.product);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [orderSort, setOrderSort] = useState("1"); // 순서

  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          orderType: orderSort,
          pType: router.query.type === "false" ? false : router.query.type,
        },
      });
    }
  }, [orderSort, router.query]);

  ////// TOGGLE //////
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

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | PRODUCT</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper2
            height={`100%`}
            padding={width < 700 ? `70px 0 0` : `120px 0 0 0`}
          >
            {/* Title & Menu Tab */}
            <Wrapper
              padding={`60px 0 0`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
            >
              <CommonTitle margin={`0 0 55px`}>PRODUCT</CommonTitle>
              <Wrapper dr={`row`} ju={`space-between`} width={`320px`}>
                <TabText
                  isActive={(router.query && router.query.type) === "false"}
                  onClick={() => moveLinkHandler(`/product?type=false`)}
                >
                  All
                </TabText>
                {types &&
                  types.map((data) => {
                    return (
                      <TabText
                        key={data.id}
                        isActive={
                          (router.query && parseInt(router.query.type)) ===
                          data.id
                        }
                        onClick={() =>
                          moveLinkHandler(`/product?type=${data.id}`)
                        }
                      >
                        {data.value}
                      </TabText>
                    );
                  })}
              </Wrapper>
            </Wrapper>

            {/* Cnt & Sort */}
            <Wrapper dr={`row`} ju={`space-between`} padding={`70px 0 50px`}>
              <Text fontSize={width < 800 ? `13px` : `16px`}>
                총 {products && products.length}개의 상품
              </Text>
              <CustomSelect
                placeholder={`상품 정렬`}
                value={orderSort}
                onChange={searchOrderSortHandler}
                border={`none`}
                delete
              >
                <Select.Option value="1">최신 등록순</Select.Option>
                <Select.Option value="2">상품 이름순</Select.Option>
                <Select.Option value="3">금액 높은순</Select.Option>
              </CustomSelect>
            </Wrapper>

            {/* Products */}

            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              al={`flex-start`}
              margin={`0 0 100px`}
            >
              {products && products.length === 0 ? (
                <Wrapper margin={`50px 0`}>
                  <Empty description="조회된 데이터가 없습니다." />
                </Wrapper>
              ) : (
                products &&
                products.map((data) => {
                  return (
                    <ProductWrapper
                      dr={`row`}
                      key={data.id}
                      onClick={() => moveLinkHandler(`/product/${data.id}`)}
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

                      <Wrapper bgColor={`${Theme.white_C}`} margin={`10px 0 0`}>
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
                          {data.realPrice}
                        </Text>
                      </Wrapper>
                    </ProductWrapper>
                  );
                })
              )}
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

export default Index;
