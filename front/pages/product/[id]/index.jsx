import React, { useEffect, useCallback, useState } from "react";
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
  Text,
  SpanText,
  Image,
  CommonButton,
} from "../../../components/commonComponents";
import { Select, Modal, Drawer, InputNumber, message, Input, Form } from "antd";
import { useRouter } from "next/router";
import {
  CloseOutlined,
  CaretDownOutlined,
  RightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { animateScroll as scroll } from "react-scroll";
import Review from "../../../components/product/Review";
import QnA from "../../../components/product/QnA";
import { numberWithCommas } from "../../../components/commonUtils";
import Link from "next/link";
import {
  OPT_LIST_REQUEST,
  PRODUCT_DETAIL_REQUEST,
} from "../../../reducers/product";
import CustomFade from "../../../components/CustomFade";
import {
  WISH_CREATE_REQUEST,
  WISH_ITEM_BUY_ADD_REQUEST,
  WISH_ITEM_BUY_CREATE_REQUEST,
  WISH_ITEM_CREATE_REQUEST,
} from "../../../reducers/wish";

const CustomSelect = styled(Select)`
  width: 285px;
  height: 55px;

  color: ${Theme.grey4_C};

  .ant-select-selector,
  .ant-select-selector .ant-select-selection-search-input {
    height: 55px !important;
    border-radius: 5px !important;
    border: 1px solid ${Theme.darkGrey_C} !important;
  }

  .ant-select-selector .ant-select-selection-item,
  .ant-select-selector .ant-select-selection-placeholder {
    line-height: 55px !important;
  }

  &:hover {
    border-color: ${Theme.red_C};
  }
`;

const BuyDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }

  .ant-drawer-content-wrapper {
    height: auto !important;
  }
`;

export const CustomInputNumber = styled(InputNumber)`
  width: 100px;
  color: ${Theme.darkGrey_C};
  border-color: ${Theme.lightGrey_C};

  &:hover {
    border: 1px solid ${Theme.basicTheme_C};
    box-shadow: 0 0 0 2px rgb(255 72 150 / 20%);
  }

  & .ant-input-number-handler-wrap {
    opacity: 1;
  }
`;

export const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const { me } = useSelector((state) => state.user);

  const { detail, productOpt } = useSelector((state) => state.product);

  const {
    // 장바구니
    items,
    // 바로구매
    buyItems,

    // 장바구니 1차
    st_wishItemCreateDone,
    st_wishItemCreateError,
    // 장바구니 담기
    st_wishCreateDone,
    st_wishCreateError,
    // 바로구매 1차
    st_wishItemnBuyCreateDone,
    st_wishItemnBuyCreateError,
    // 바로구매 장바구니 담기
    st_wishItemnBuyAddDone,
    st_wishItemnBuyAddError,
  } = useSelector((state) => state.wish);

  const {
    // 리뷰 리스트
    st_reviewProductListError,
    // 리뷰 생성
    st_reviewUserCreateError,
  } = useSelector((state) => state.review);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const { Option } = Select;

  const [cartOpen, setCartOpen] = useState(false);
  const [drawar, setDrawar] = useState(false);
  const [tab, setTab] = useState(0);
  const [selectOption, setSelectOption] = useState(null);

  const [optionForm] = Form.useForm();

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    scroll.scrollTo(0);
  }, []);

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_DETAIL_REQUEST,
        data: {
          id: router.query.id,
        },
      });

      dispatch({
        type: OPT_LIST_REQUEST,
        data: {
          productId: router.query.id,
        },
      });
    }
  }, [router.query]);

  // 장바구니 1차생성 후처리
  useEffect(() => {
    if (st_wishItemCreateDone) {
      // let wishItemId = [];
      // wishItemId.push(items);

      dispatch({
        type: WISH_CREATE_REQUEST,
        data: {
          wishItemId: items,
          deliveryPrice: detail.deliveryPrice,
        },
      });
    }
  }, [st_wishItemCreateDone]);

  useEffect(() => {
    if (st_wishItemCreateError) {
      message.error(st_wishItemCreateError);
    }
  }, [st_wishItemCreateError]);

  // 장바구니 추가 완료 후처리
  useEffect(() => {
    if (st_wishCreateDone) {
      cartToggle();
    }
  }, [st_wishCreateDone]);

  useEffect(() => {
    if (st_wishCreateError) {
      return message.error(st_wishCreateError);
    }
  }, [st_wishCreateError]);

  // 바로 구매
  useEffect(() => {
    if (st_wishItemnBuyCreateDone) {
      dispatch({
        type: WISH_ITEM_BUY_ADD_REQUEST,
        data: {
          wishItemId: buyItems,
          deliveryPrice: detail.deliveryPrice,
        },
      });
    }
  }, [st_wishItemnBuyCreateDone]);

  useEffect(() => {
    if (st_wishItemnBuyCreateError) {
      return message.error(st_wishItemnBuyCreateError);
    }
  }, [st_wishItemnBuyCreateError]);

  // 바로 구매 장바구니 담기
  useEffect(() => {
    if (st_wishItemnBuyAddDone) {
      sessionStorage.setItem("buy-swgg", JSON.stringify(buyItems));

      return router.push("/order");
    }
  }, [st_wishItemnBuyAddDone]);

  useEffect(() => {
    if (st_wishItemnBuyAddError) {
      message.error(st_wishItemnBuyAddError);
    }
  }, [st_wishItemnBuyAddError]);

  // 상품 리뷰 가져오기
  useEffect(() => {
    if (st_reviewProductListError) {
      return message.error(st_reviewProductListError);
    }
  }, [st_reviewProductListError]);

  // 상품 리뷰 생성
  useEffect(() => {
    if (st_reviewUserCreateError) {
      return message.error(st_reviewUserCreateError);
    }
  }, [st_reviewUserCreateError]);

  ////// TOGGLE //////
  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

  const cartToggle = useCallback(() => {
    setCartOpen((prev) => !prev);
  }, [cartOpen]);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 옵션 등록
  const optionChagneHandler = useCallback(
    (data) => {
      let selectArr = selectOption ? selectOption.map((value) => value) : [];
      let jsonData = JSON.parse(data);

      if (selectArr.find((value) => value.id === jsonData.optionListId)) {
        const selectIdx = selectArr.findIndex(
          (value) => value.id === jsonData.optionListId
        );

        selectArr[selectIdx].count = selectArr[selectIdx].count + 1;

        setSelectOption(selectArr);

        optionForm.resetFields();
        return;
      }

      selectArr.push({
        id: jsonData.optionListId,
        name: jsonData.optionValue,
        price: jsonData.optionPrice,
        count: 1,
      });

      optionForm.resetFields();
      setSelectOption(selectArr);
    },
    [selectOption]
  );

  // 옵션 수량
  const optionCountHandler = useCallback(
    (data, count) => {
      let countArr = selectOption ? selectOption.map((value) => value) : [];

      const countIdx = countArr.findIndex((value) => value.id === data.id);

      countArr[countIdx].count = count;

      setSelectOption(countArr);
    },
    [selectOption]
  );

  // 옵션삭제
  const optionDeleteHandler = useCallback(
    (data) => {
      let deleteArr = selectOption ? selectOption.map((value) => value) : [];

      setSelectOption(
        deleteArr.filter((value) => value.id !== data.id).length === 0
          ? null
          : deleteArr.filter((value) => value.id !== data.id)
      );
    },
    [selectOption]
  );

  // 구매하기
  const otherProductHandler = useCallback(() => {
    if (!me) {
      router.push("/login");
      return message.error("로그인 후 이용해주세요.");
    }

    if (detail) {
      if (!selectOption) {
        //  옵션이 없을때

        dispatch({
          type: WISH_ITEM_BUY_CREATE_REQUEST,
          data: {
            items: [
              {
                ProductId: detail.id,
                productTitle: detail.title,
                productThumbnail: detail.thumbnail,
                productDiscount: detail.discount,
                productDelPrice: detail.deliveryPrice,
                productPrice: detail.price,
                optionString: "",
                optionPrice: "",
                qun: 1,
              },
            ],
          },
        });
      } else {
        // 옵션이 있을때
        dispatch({
          type: WISH_ITEM_BUY_CREATE_REQUEST,
          data: {
            items: selectOption.map((data) => ({
              ProductId: detail.id,
              productTitle: detail.title,
              productThumbnail: detail.thumbnail,
              productDiscount: detail.discount,
              productDelPrice: detail.deliveryPrice,
              productPrice: detail.price,
              optionString: data.name,
              optionPrice: data.price,
              qun: data.count,
            })),
          },
        });
      }
    }
  }, [me, selectOption, detail]);

  // 장바구니 추가
  const wishCreateHandler = useCallback(() => {
    if (!me) {
      router.push("/login");
      return message.error("로그인 후 이용해주세요.");
    }

    if (detail) {
      if (!selectOption) {
        //  옵션이 없을때

        dispatch({
          type: WISH_ITEM_CREATE_REQUEST,
          data: {
            items: [
              {
                ProductId: detail.id,
                productTitle: detail.title,
                productThumbnail: detail.thumbnail,
                productDiscount: detail.discount,
                productDelPrice: detail.deliveryPrice,
                productPrice: detail.price,
                optionString: "",
                optionPrice: "",
                qun: 1,
              },
            ],
          },
        });
      } else {
        // 옵션이 있을때
        dispatch({
          type: WISH_ITEM_CREATE_REQUEST,
          data: {
            items: selectOption.map((data) => ({
              ProductId: detail.id,
              productTitle: detail.title,
              productThumbnail: detail.thumbnail,
              productDiscount: detail.discount,
              productDelPrice: detail.deliveryPrice,
              productPrice: detail.price,
              optionString: data.name,
              optionPrice: data.price,
              qun: data.count,
            })),
          },
        });
      }
    }
  }, [selectOption, detail, me]);

  ////// DATAVIEW //////

  /////// TESTDATA //////

  if (!detail) {
    return null;
  }

  return (
    <>
      <Head>
        <title>순애보 | PRODUCT</title>
      </Head>
      <ClientLayout>
        <WholeWrapper padding={width < 800 ? `100px 0` : `180px 0 100px`}>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              margin={width < 800 ? `40px 0 20px` : `40px 0 20px`}
            >
              <Wrapper
                width={`auto`}
                dr={`row`}
                ju={`flex-start`}
                color={Theme.grey3_C}
                fontSize={`14px`}
                lineHeight={`1`}
              >
                Home
                <SpanText fontSize={`11px`} margin={`0 10px`}>
                  <RightOutlined />
                </SpanText>
                Product
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} al={`flex-start`}>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                padding={width < 900 ? `0` : `0 50px 0 0`}
              >
                <Image alt="thumnail" src={detail && detail.thumbnail} />
              </Wrapper>
              <Wrapper
                ju={`space-between`}
                width={width < 900 ? `100%` : `50%`}
                padding={width < 800 ? `20px 0 0` : `0 0 0 50px`}
              >
                <Wrapper al={`flex-start`}>
                  <Wrapper
                    fontSize={width < 800 ? `16px` : `22px`}
                    al={`flex-start`}
                    ju={`flex-start`}
                    margin={`0 0 10px`}
                    fontWeight={`600`}
                  >
                    {detail && detail.title}
                  </Wrapper>

                  <Input.TextArea
                    style={{
                      padding: 0,
                      color: Theme.grey_C,
                      fontSize: width < 800 ? `11px` : `14px`,
                      border: `none`,
                      boxShadow: `none`,
                    }}
                    rows={5}
                    readOnly={true}
                    value={detail && detail.content}
                  />

                  <Wrapper dr={`row`} ju={`flex-start`} margin={`25px 0 0`}>
                    <Text
                      color={Theme.grey_C}
                      margin={`0 20px 0 0`}
                      fontWeight={`600`}
                    >
                      배송비
                    </Text>
                    <Text>{detail && detail.viewDeliveryPrice}</Text>
                  </Wrapper>
                  <Text
                    fontSize={width < 800 ? `16px` : `24px`}
                    fontWeight={`600`}
                    color={Theme.basicTheme_C}
                  >
                    {detail && detail.realPrice}
                  </Text>
                </Wrapper>
                <Wrapper margin={`15px 0 0`}>
                  <Wrapper display={width < 800 ? `none` : `flex`}>
                    <CustomForm form={optionForm}>
                      <Form.Item name="option">
                        <CustomSelect
                          defaultValue="구매옵션을 선택해주세요."
                          style={{
                            width: `100%`,
                            height: 55,
                          }}
                          onChange={optionChagneHandler}
                        >
                          {productOpt &&
                            productOpt.length > 0 &&
                            productOpt.map((data) => {
                              return (
                                <Option
                                  key={data.optionListId}
                                  value={JSON.stringify(data)}
                                >
                                  {data.optionValue} - {data.viewOptionPrice}
                                </Option>
                              );
                            })}
                        </CustomSelect>
                      </Form.Item>
                    </CustomForm>
                  </Wrapper>
                  {/* 옵션선택후 */}
                  {selectOption &&
                    selectOption.length > 0 &&
                    selectOption.map((data) => {
                      return (
                        <Wrapper
                          key={data.id}
                          display={width < 800 ? `none` : `flex`}
                          padding={`15px`}
                          margin={`10px 0 0`}
                          dr={`row`}
                          ju={`space-between`}
                          radius={`5px`}
                          bgColor={Theme.lightGrey5_C}
                        >
                          <Wrapper ju={`space-between`} dr={`row`}>
                            <Text fontWeight={`600`} color={Theme.grey_C}>
                              {data.name}
                            </Text>
                            <Wrapper
                              width={`15px`}
                              height={`15px`}
                              color={Theme.grey_C}
                              onClick={() => optionDeleteHandler(data)}
                            >
                              <CloseOutlined />
                            </Wrapper>
                          </Wrapper>

                          <Wrapper
                            ju={`space-between`}
                            dr={`row`}
                            margin={`10px 0 0`}
                          >
                            <Wrapper
                              width={`auto`}
                              dr={`row`}
                              fontSize={`14px`}
                            >
                              <CustomInputNumber
                                onChange={(count) =>
                                  optionCountHandler(data, count)
                                }
                                value={data.count}
                                min={1}
                              />
                            </Wrapper>
                            <Text>
                              {numberWithCommas(
                                (data.price + detail.originRealPrice) *
                                  data.count
                              )}
                              원
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      );
                    })}
                  <Wrapper
                    display={width < 800 ? `none` : `flex`}
                    dr={`row`}
                    ju={`space-between`}
                    margin={`25px 0`}
                  >
                    <Text color={Theme.grey_C}>총 결제 금액</Text>
                    <Text
                      fontSize={`24px`}
                      color={Theme.basicTheme_C}
                      fontWeight={`bold`}
                    >
                      {selectOption
                        ? numberWithCommas(
                            String(
                              detail &&
                                selectOption
                                  .map(
                                    (data) =>
                                      (data.price + detail.originRealPrice) *
                                      data.count
                                  )
                                  .reduce((a, b) => a + b, 0) +
                                  detail.deliveryPrice
                            )
                          ) + `원`
                        : detail && detail.realPrice}
                    </Text>
                  </Wrapper>

                  {/* 옵션선택후 */}

                  <Wrapper
                    display={width < 800 ? `none` : `flex`}
                    dr={`row`}
                    ju={`space-between`}
                  >
                    <CommonButton
                      radius={`5px`}
                      fontSize={`18px`}
                      type={`danger`}
                      width={`49%`}
                      height={`55px`}
                      onClick={wishCreateHandler}
                    >
                      장바구니
                    </CommonButton>

                    <CommonButton
                      radius={`5px`}
                      fontSize={`18px`}
                      type={`danger`}
                      width={`49%`}
                      height={`55px`}
                      onClick={otherProductHandler}
                      kindOf={`basicTheme`}
                    >
                      구매하기
                    </CommonButton>
                  </Wrapper>

                  <Wrapper
                    display={width < 800 ? `flex` : `none`}
                    dr={`row`}
                    ju={`space-between`}
                    position={`fixed`}
                    bottom={`0`}
                    left={`0`}
                    zIndex={`100`}
                  >
                    <CommonButton
                      radius={`0`}
                      onClick={drawarToggle}
                      type={`danger`}
                      width={`50%`}
                      height={`50px`}
                    >
                      장바구니
                    </CommonButton>
                    <CommonButton
                      radius={`0`}
                      type={`danger`}
                      width={`50%`}
                      height={`50px`}
                      kindOf={`basicTheme`}
                      onClick={drawarToggle}
                    >
                      구매하기
                    </CommonButton>

                    <BuyDrawer
                      placement="bottom"
                      closable={false}
                      onClose={drawarToggle}
                      visible={drawar}
                      width={`100vw`}
                    >
                      <Wrapper onClick={drawarToggle}>
                        <CaretDownOutlined style={{ fontSize: 20 }} />
                      </Wrapper>
                      <Wrapper padding={`12px 14px`}>
                        <CustomForm form={optionForm}>
                          <Form.Item name="option">
                            <CustomSelect
                              defaultValue="구매옵션을 선택해주세요."
                              style={{
                                width: `100%`,
                                height: 55,
                              }}
                              onChange={optionChagneHandler}
                            >
                              {productOpt &&
                                productOpt.length > 0 &&
                                productOpt.map((data) => {
                                  return (
                                    <Option
                                      key={data.optionListId}
                                      value={JSON.stringify(data)}
                                    >
                                      {data.optionValue} -{" "}
                                      {data.viewOptionPrice}
                                    </Option>
                                  );
                                })}
                            </CustomSelect>
                          </Form.Item>
                        </CustomForm>

                        {/* 옵션 선택후 */}

                        {selectOption &&
                          selectOption.length > 0 &&
                          selectOption.map((data) => {
                            return (
                              <Wrapper
                                key={data.id}
                                padding={`15px 10px`}
                                margin={`13px 0 0`}
                                dr={`row`}
                                ju={`space-between`}
                                bgColor={Theme.lightGrey5_C}
                              >
                                <Wrapper ju={`space-between`} dr={`row`}>
                                  <Text fontWeight={`600`} color={Theme.grey_C}>
                                    {data.name}
                                  </Text>
                                  <Wrapper
                                    width={`15px`}
                                    height={`15px`}
                                    color={Theme.grey_C}
                                    cursor={`pointer`}
                                    onClick={() => optionDeleteHandler(data)}
                                  >
                                    <CloseOutlined />
                                  </Wrapper>
                                </Wrapper>
                                <Wrapper
                                  ju={`space-between`}
                                  dr={`row`}
                                  margin={`10px 0 0`}
                                >
                                  <Wrapper
                                    width={`auto`}
                                    dr={`row`}
                                    fontSize={`14px`}
                                  >
                                    <CustomInputNumber
                                      onChange={(count) =>
                                        optionCountHandler(data, count)
                                      }
                                      value={data.count}
                                      min={1}
                                    />
                                  </Wrapper>
                                  <Text>
                                    {numberWithCommas(
                                      (data.price + detail.originRealPrice) *
                                        data.count
                                    )}
                                    원
                                  </Text>
                                </Wrapper>
                              </Wrapper>
                            );
                          })}

                        <Wrapper
                          display={width < 800 ? `flex` : `none`}
                          dr={`row`}
                          ju={`space-between`}
                          margin={`20px 0`}
                        >
                          <Text color={Theme.grey_C}>총 결제 금액</Text>
                          <Text
                            fontSize={`16px`}
                            color={Theme.basicTheme_C}
                            fontWeight={`bold`}
                          >
                            {selectOption
                              ? numberWithCommas(
                                  String(
                                    detail &&
                                      selectOption
                                        .map(
                                          (data) =>
                                            (data.price +
                                              detail.originRealPrice) *
                                            data.count
                                        )
                                        .reduce((a, b) => a + b, 0) +
                                        detail.deliveryPrice
                                  )
                                ) + `원`
                              : detail && detail.realPrice}
                          </Text>
                        </Wrapper>
                        <Wrapper dr={`row`} ju={`space-between`}>
                          <CommonButton
                            radius={`0`}
                            onClick={wishCreateHandler}
                            type={`danger`}
                            width={`49%`}
                            height={`40px`}
                          >
                            장바구니
                          </CommonButton>
                          <CommonButton
                            radius={`0`}
                            type={`danger`}
                            width={`49%`}
                            height={`40px`}
                            onClick={otherProductHandler}
                            kindOf={`basicTheme`}
                          >
                            구매하기
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </BuyDrawer>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>

          <RsWrapper
            dr={`row`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
            margin={width < 800 ? `30px 0` : `70px 0 50px`}
          >
            <Wrapper
              onClick={() => {
                setTab(0);
              }}
              width={`auto`}
              cursor={`pointer`}
              height={`40px`}
              color={tab === 0 ? Theme.darkGrey_C : Theme.grey_C}
              fontWeight={tab === 0 ? `bold` : ``}
            >
              Info
            </Wrapper>
            <Wrapper
              onClick={() => {
                setTab(1);
              }}
              width={`auto`}
              margin={`0 40px`}
              cursor={`pointer`}
              color={tab === 1 ? Theme.darkGrey_C : Theme.grey_C}
              height={`40px`}
              fontWeight={tab === 1 ? `bold` : ``}
            >
              REVIEW
            </Wrapper>
            <Wrapper
              onClick={() => {
                setTab(2);
              }}
              width={`auto`}
              cursor={`pointer`}
              color={tab === 2 ? Theme.darkGrey_C : Theme.grey_C}
              fontWeight={tab === 2 ? `bold` : ``}
              height={`40px`}
            >
              QnA
            </Wrapper>
            <Wrapper
              onClick={() => {
                setTab(3);
              }}
              width={`auto`}
              cursor={`pointer`}
              margin={`0 0 0 40px`}
              color={tab === 3 ? Theme.darkGrey_C : Theme.grey_C}
              fontWeight={tab === 3 ? `bold` : ``}
              height={`40px`}
            >
              반품/환불 안내
            </Wrapper>
          </RsWrapper>
          <RsWrapper>
            {tab === 0 && detail && (
              <>
                <CustomFade
                  option={{ width: `auto` }}
                  type={{
                    [detail.descAnimation1.toLowerCase()]: true,
                  }}
                >
                  <Image
                    alt="banner"
                    src={
                      width < 900 ? detail.mobileDescImage1 : detail.descImage1
                    }
                  />
                </CustomFade>

                {detail.descImage2 && detail.mobileDescImage2 && (
                  <CustomFade
                    option={{ width: `auto` }}
                    type={{
                      [detail.descAnimation2 &&
                      detail.descAnimation2.toLowerCase()]: true,
                    }}
                  >
                    <Image
                      alt="banner"
                      src={
                        width < 900
                          ? detail.mobileDescImage2
                          : detail.descImage2
                      }
                    />
                  </CustomFade>
                )}

                {detail.descImage3 && detail.mobileDescImage3 && (
                  <CustomFade
                    option={{ width: `auto` }}
                    type={{
                      [detail.descAnimation3 &&
                      detail.descAnimation3.toLowerCase()]: true,
                    }}
                  >
                    <Image
                      alt="banner"
                      src={
                        width < 900
                          ? detail.mobileDescImage3
                          : detail.descImage3
                      }
                    />
                  </CustomFade>
                )}

                {detail.descImage4 && detail.mobileDescImage4 && (
                  <CustomFade
                    option={{ width: `auto` }}
                    type={{
                      [detail.descAnimation4 &&
                      detail.descAnimation4.toLowerCase()]: true,
                    }}
                  >
                    <Image
                      src={
                        width < 900
                          ? detail.mobileDescImage4
                          : detail.descImage4
                      }
                    />
                  </CustomFade>
                )}

                <Wrapper>
                  <Text margin={`30px 0`}>{detail.bottomTitle}</Text>

                  <Image
                    src={
                      width < 900 ? detail.bottomMobileImg : detail.bottomImage
                    }
                  />
                </Wrapper>
              </>
            )}
            {tab === 1 && (
              <Wrapper>
                <Review />
              </Wrapper>
            )}
            {tab === 2 && (
              <Wrapper>
                <QnA />
              </Wrapper>
            )}
            {tab === 3 && (
              <Wrapper>
                <Text fontSize={`20px`} fontWeight={`600`}>
                  반품/환불 안내
                </Text>
                <Text>주문취소 및 반품/환불 안내입니다.</Text>
                <Wrapper
                  fontSize={`18px`}
                  color={Theme.basicTheme_C}
                  margin={`30px 0 0`}
                  al={`flex-start`}
                  fontWeight={`bold`}
                >
                  반품안내
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ①주문 취소 및 반품
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  일반적으로 소비자는 자신이 체결한 전자상거래 계약에 대해 그
                  계약의 내용을 불문하고 그 청약철회 및 계약해제의 기간(통상
                  7일) 내에는 청약철회 등을 자유롭게 할 수 있습니다.
                  <Text>
                    (「전자상거래 등에서의 소비자보호에 관한 법률」 제17조제1항)
                  </Text>
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`5px 0`}>
                  ※ 소비자에게 불리한 규정(주문 취소나 반품 금지 등)이 포함된
                  구매계약은 효력이 없습니다.
                  <Text>
                    (「전자상거래 등에서의 소비자보호에 관한 법률」 제35조)
                  </Text>
                </Wrapper>

                <Wrapper al={`flex-start`}>
                  하지만, 다음 어느 하나에 해당하는 경우에는 인터넷쇼핑몰
                  사업자의 의사에 반(反)해서 주문 취소 및 반품을 할 수 없습니다.
                  <Text>
                    (「전자상거래 등에서의 소비자보호에 관한 법률」 제17조제2항
                    본문 및 「전자상거래 등에서의 소비자보호에 관한 법률
                    시행령」 제21조)
                  </Text>
                  <Text margin={`10px 0 0`}>
                    1. 소비자의 잘못으로 물건이 멸실(물건의 기능을 할 수 없을
                    정도로 전부 파괴된 상태)되거나 훼손된 경우(다만, 내용물을
                    확인하기 위해 포장을 훼손한 경우에는 취소나 반품이 가능)
                  </Text>
                  <Text>
                    2. 소비자가 사용해서 물건의 가치가 뚜렷하게 떨어진 경우
                  </Text>
                  <Text>
                    3. 시간이 지나 다시 판매하기 곤란할 정도로 물건의 가치가
                    뚜렷하게 떨어진 경우
                  </Text>
                  <Text>4. 복제가 가능한 물건의 포장을 훼손한 경우</Text>
                  <Text>
                    5. 용역 또는 「문화산업진흥 기본법」 제2조제5호의
                    디지털콘텐츠의 제공이 개시된 경우. 다만, 가분적 용역 또는
                    가분적 디지털콘텐츠로 구성된 계약의 경우에는 제공이 개시되지
                    않은 부분은 제외
                  </Text>
                  <Text>
                    6. 소비자의 주문에 따라 개별적으로 생산되는 상품 또는 이와
                    유사한 상품 등의 청약철회 및 계약해제를 인정하는 경우
                    인터넷쇼핑몰 사업자에게 회복할 수 없는 중대한 피해가
                    예상되는 경우로서 사전에 주문 취소 및 반품이 되지 않는다는
                    사실을 별도로 알리고 소비자의 서면(전자문서 포함)에 의한
                    동의를 받은 경우
                  </Text>
                  <Text margin={`10px 0`}>
                    인터넷쇼핑몰 사업자는 위 2.부터 5.까지의 사유에 해당하여
                    청약철회 등이 불가능한 상품에 대해 그 사실을 상품의 포장이나
                    그 밖에 소비자가 쉽게 알 수 있는 곳에 명확하게 적거나 시험
                    사용 상품을 제공하는 등의 방법으로 청약철회 등의 권리 행사가
                    방해받지 않도록 조치해야 합니다(「전자상거래 등에서의
                    소비자보호에 관한 법률」 제17조제6항 본문). 만약 사업자가
                    이와 같은 조치를 안했다면, 소비자는 청약철회 등의
                    제한사유에도 불구하고 청약철회 등을 할 수
                    있습니다(「전자상거래 등에서의 소비자보호에 관한 법률」
                    제17조제2항 단서).
                  </Text>
                  <Text>
                    다만, 위의 5. 중 디지털콘텐츠에 대하여 소비자가 청약철회
                    등을 할 수 없는 경우에는 청약철회 등이 불가능하다는 사실의
                    표시와 함께 다음의 어느 하나의 방법에 따라 시험 사용 상품을
                    제공하는 등의 방법으로 청약철회 등의 권리 행사가 방해받지
                    않도록 해야 합니다(「전자상거래 등에서의 소비자보호에 관한
                    법률」 제17조제6항 단서 및 규제「전자상거래 등에서의
                    소비자보호에 관한 법률 시행령」 제21조의2).
                  </Text>
                  <Text margin={`10px 0 0`}>
                    √ 일부 이용의 허용: 디지털콘텐츠의 일부를 미리보기, 미리듣기
                    등으로 제공
                  </Text>
                  <Text>
                    √ 한시적 이용의 허용: 일정 사용기간을 설정하여 디지털콘텐츠
                    제공
                  </Text>
                  <Text>
                    √ 체험용 디지털콘텐츠 제공: 일부 제한된 기능만을 사용할 수
                    있는 디지털콘텐츠 제공
                  </Text>
                  <Text>
                    √ 위의 방법으로 시험 사용 상품 등을 제공하기 곤란한 경우:
                    디지털콘텐츠에 관한 정보 제공
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ②주문 취소 및 반품 가능 기간
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  인터넷에서 물품을 주문한 후 7일 이내에는 주문을 취소하거나
                  반품을 할 수 있습니다(「전자상거래 등에서의 소비자보호에 관한
                  법률」 제17조제1항).
                  <Text>
                    재화 등의 내용이 표시·광고의 내용과 다르거나 계약내용과
                    다르게 이행된 경우에는 그 재화 등을 공급받은 날부터 3개월
                    이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에
                    주문 취소 및 반품을 할 수 있습니다(「전자상거래 등에서의
                    소비자보호에 관한 법률」 제17조제3항).
                  </Text>
                  <Text>
                    인터넷쇼핑몰의 허위, 과장 표시 광고에 속아 물품을 구입한
                    경우
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ③물품반환 비용 부담
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  소비자가 물품 등을 반환하는 데 필요한 비용은 자신이 부담해야
                  합니다(규제「전자상거래 등에서의 소비자보호에 관한
                  법률」제18조제9항).
                  <Text>
                    다만, 물품 등의 내용이 표시·광고 내용과 다르거나 계약내용과
                    다르게 이행된 경우의 반환비용은 사업자가
                    부담합니다(「전자상거래 등에서의 소비자보호에 관한 법률」
                    제17조제3항 및 제18조제10항).
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ④사업자의 위약금 또는 손해배상 청구 제한
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  사업자는 소비자의 청약철회 등과 관련해서 소비자에게 운송비,
                  포장비, 보관비 등의 비용 또는 취소수수료, 반품위약(공제)금 등
                  위약금 또는 손해배상을 청구할 수 없습니다[규제「전자상거래
                  등에서의 소비자보호에 관한 법률」 제18조제9항 및 「전자상거래
                  등에서의 소비자보호 지침」(공정거래위원회 고시 제2015-7호,
                  2015. 8. 20. 발령∙시행) Ⅱ, 9, 가].
                </Wrapper>

                <Wrapper
                  fontSize={`18px`}
                  color={Theme.basicTheme_C}
                  margin={`30px 0 0`}
                  al={`flex-start`}
                  fontWeight={`bold`}
                >
                  환불안내
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ①사업자의 상품대금 환급 의무
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  인터넷쇼핑몰 사업자는 다음의 어느 하나에 해당하는 날부터
                  3영업일 이내에 이미 지급 받은 물품 등의 대금을 환급해야
                  합니다. 만약 물건의 대금 환급을 지연하면 그 지연기간에 대해 연
                  15％의 지연이자를 별도로 지급해야 합니다(규제「전자상거래
                  등에서의 소비자보호에 관한 법률」 제18조제2항 및 「전자상거래
                  등에서의 소비자보호에 관한 법률 시행령」 제21조의3).
                  <Text>
                    통신판매업자가 재화를 공급한 경우에는 재화를 반환받은 날
                  </Text>
                  <Text>
                    통신판매업자가 용역 또는 디지털콘텐츠를 공급한 경우에는
                    청약철회 등을 한 날
                  </Text>
                  <Text>
                    통신판매업자가 재화 등을 공급하지 않은 경우에는 청약철회
                    등을 한 날
                  </Text>
                  <Text>
                    ※ 이미 공급받은 상품 등이 용역 또는 디지털콘텐츠인 경우를
                    제외하고 환불요청을 받으면 소비자는 이미 받은 물건을
                    반환해야 합니다(규제「전자상거래 등에서의 소비자보호에 관한
                    법률」 제18조제1항).
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ②신용카드·전자상품권 등으로 결제한 경우
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  소비자가 신용카드나 그 밖의 결제수단으로 물품 등의 대금을
                  지급한 경우 인터넷쇼핑몰 사업자는 그 대금을 환급할 때 지체
                  없이 해당 결제수단을 제공한 결제업자에게 그 물품 등의 대금
                  청구를 정지 또는 취소하도록 요청해야 합니다(규제「전자상거래
                  등에서의 소비자보호에 관한 법률」 제18조제3항 본문).
                  <Text>
                    인터넷쇼핑몰 사업자가 신용카드사 등의 결제업자로부터 물품
                    등의 대금을 이미 지급받은 경우에는 지체 없이 이를
                    결제업자에게 환급하고, 그 사실을 소비자에게 알려야
                    합니다(규제「전자상거래 등에서의 소비자보호에 관한 법률」
                    제18조제3항 단서).
                  </Text>
                  <Text>
                    이 경우 사업자가 정당한 사유 없이 결제업자에게 대금을
                    환급하지 않으면 소비자는 환급받을 금액에 대해 결제업자에게
                    해당 인터넷쇼핑몰 사업자에 대한 다른 채무와 상계할 것을
                    요청할 수 있습니다(규제「전자상거래 등에서의 소비자보호에
                    관한 법률」 제18조제6항).
                  </Text>
                  <Text>
                    만약, 결제업자가 위 상계요청을 정당한 사유 없이 게을리
                    한다면 소비자는 그 결제업자에 대해 대금의 결제를 거부할 수
                    있습니다. 이 경우 인터넷쇼핑몰 사업자와 결제업자는 그 결제의
                    거부를 이유로 해당 소비자를 약정한 기일 이내에 채무를
                    변제하지 않은 사람(연체자나 신용불량자 등)으로 처리하는 등
                    소비자에게 불이익을 주는 행위를 해서는 안
                    됩니다(규제「전자상거래 등에서의 소비자보호에 관한 법률」
                    제18조제7항).
                  </Text>
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  margin={`10px 0 5px`}
                  fontWeight={`bold`}
                >
                  ③인터넷쇼핑몰의 휴업기간 및 영업정지기간 중의 반품
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  인터넷쇼핑몰 사업자는 휴업기간이나 영업정지기간에도 주문취소
                  및 반품 등의 업무와 대금 환급과 관련된 업무를 계속해야
                  합니다(규제「전자상거래 등에서의 소비자보호에 관한 법률」
                  제22조제1항).
                  <Text>
                    공정거래위원회는 사업자가 위를 위반하는 행위를 하는 경우에는
                    해당 사업자에게 그 시정조치를 명할 수
                    있습니다(규제「전자상거래 등에서의 소비자보호에 관한 법률」
                    제32조제1항제1호).
                  </Text>
                </Wrapper>
              </Wrapper>
            )}
          </RsWrapper>

          <Modal
            visible={cartOpen}
            footer={null}
            title={`장바구니`}
            onCancel={cartToggle}
          >
            <Wrapper>
              <Wrapper
                width={`86px`}
                height={`86px`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                radius={`100%`}
                fontSize={`30px`}
              >
                <CheckOutlined />
              </Wrapper>
              <Text
                fontSize={`18px`}
                fontWeight={`bold`}
                margin={`24px 0 48px`}
              >
                장바구니에 추가되었습니다.
              </Text>
              <Wrapper dr={`row`}>
                <CommonButton
                  height={`44px`}
                  kindOf={`white`}
                  margin={`0 10px 0 0`}
                  onClick={() => cartToggle()}
                >
                  쇼핑 계속하기
                </CommonButton>
                <Link href={`/cart`}>
                  <a>
                    <CommonButton height={`44px`}>장바구니 이동</CommonButton>
                  </a>
                </Link>
              </Wrapper>
            </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
