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
import { SEO_LIST_REQUEST } from "../../reducers/seo";

import Head from "next/head";
import {
  CommonTitle,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  TextInput,
  CommonButton,
  SpanText,
  GuideUl,
  GuideLi,
  GuideDiv,
} from "../../components/commonComponents";

import { useRouter } from "next/router";
import { Form, Modal, Radio, Select, message, Empty } from "antd";
import { numberWithCommas } from "../../components/commonUtils";
import DaumPostcode from "react-daum-postcode";
import { ADDRESS_SEARCH_MODAL_TOGGLE } from "../../reducers/address";
import { WISH_ORDER_LIST_REQUEST } from "../../reducers/wish";
import { BOUGHT_CREATE_REQUEST } from "../../reducers/boughtHistory";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const CustomTextInput = styled(TextInput)`
  width: 100%;
  border: 1px solid ${Theme.lightGrey4_C};
  border-radius: 5px;

  &:hover {
    border: 1px solid ${Theme.basicTheme_C};
  }

  &:focus {
    border: 1px solid ${Theme.basicTheme_C};
  }
  &:read-only {
    background-color: ${Theme.white_C};
  }
`;

const CustomSelectInput = styled(Select)`
  & .ant-select-selector {
    border: 1px solid ${Theme.lightGrey4_C};
    border-radius: 5px;
    width: 100%;
    height: 40px !important;
  }

  & .ant-select-selection-placeholder {
    height: 40px;
    display: flex;
    align-items: center;
  }

  & .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
`;

const CustomRadioBox = styled(Radio)`
  & .ant-radio-checked .ant-radio-inner {
    border-color: ${Theme.basicTheme_C};
  }

  & .ant-radio-inner::after {
    background-color: ${Theme.basicTheme_C};
  }

  & .ant-radio:hover {
    & .ant-radio-inner {
      border-color: ${Theme.basicTheme_C};
    }
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  const { me } = useSelector((state) => state.user);
  const { searchModal } = useSelector((state) => state.address);
  const { orderWishs } = useSelector((state) => state.wish);
  const { boughtResultId, st_boughtCreateDone, st_boughtCreateError } =
    useSelector((state) => state.boughtHistory);

  const width = useWidth();
  const router = useRouter();

  const dispatch = useDispatch();

  const [buyList, setBuyList] = useState(null);
  const [buyType, setBuyType] = useState(null);
  const [trems, setTrems] = useState(false);
  const [usePoint, setUsePoint] = useState(0);
  const [buyDeliveryPrice, setBuyDeliveryPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  const usePointInput = useOnlyNumberInput();

  const [form] = Form.useForm();

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      router.push("/login");
      return message.error("로그인 후 이용해주세요.");
    }

    if (!sessionStorage.getItem("buy-swgg")) {
      router.push("/");

      return message.error("구매할 항목이 없습니다.");
    } else {
      setBuyList(JSON.parse(sessionStorage.getItem("buy-swgg")));
    }
  }, [router.query]);

  useEffect(() => {
    if (buyList) {
      dispatch({
        type: WISH_ORDER_LIST_REQUEST,
        data: {
          wishItemId: buyList,
        },
      });
    }
  }, [buyList]);

  // 주문하기 후처리
  useEffect(() => {
    if (st_boughtCreateDone) {
      sessionStorage.removeItem("buy-swgg");

      router.push(`/finish/${boughtResultId}`);

      return message.success("주문되었습니다.");
    }
  }, [st_boughtCreateDone]);

  useEffect(() => {
    if (st_boughtCreateError) {
      return message.error(st_boughtCreateError);
    }
  }, [st_boughtCreateError]);

  // orderWiths 조회 후
  useEffect(() => {
    if (orderWishs) {
      setBuyPrice(
        orderWishs
          .map(
            (data) =>
              (data.productPrice -
                data.productPrice * (data.productDiscount / 100) +
                data.optionPrice) *
              data.qun
          )
          .reduce((a, b) => a + b, 0)
      );

      setBuyDeliveryPrice(
        Math.max(...orderWishs.map((data) => data.productDelPrice))
      );
    }
  }, [orderWishs]);

  ////// TOGGLE //////

  const postCodeModalToggle = useCallback(() => {
    dispatch({
      type: ADDRESS_SEARCH_MODAL_TOGGLE,
    });
  }, [searchModal]);

  ////// HANDLER //////

  const searchAddressHandler = useCallback(
    (data) => {
      form.setFieldsValue({
        zoneCode: data.zonecode,
        address: data.address,
      });

      dispatch({
        type: ADDRESS_SEARCH_MODAL_TOGGLE,
      });
    },
    [searchModal]
  );

  const buyTypeChangeHandler = useCallback(
    (data) => {
      setBuyType(data);
    },
    [buyType]
  );

  const tremsChangeHandler = useCallback(() => {
    setTrems(!trems);
  }, [trems]);

  // 포인트-전액 사용
  const useAllPointHandler = useCallback(() => {
    const buyUsePrice = buyPrice + buyDeliveryPrice;

    if (buyUsePrice - 150 <= me.userPoint) {
      usePointInput.setValue(buyUsePrice - 150);
      setUsePoint(buyUsePrice - 150);
    } else {
      usePointInput.setValue(me.userPoint);
      setUsePoint(me.userPoint);
    }
  }, [
    usePointInput.value,
    usePoint,
    orderWishs,
    me,
    buyDeliveryPrice,
    buyPrice,
  ]);

  // 포인트-사용
  const usePointHandler = useCallback(() => {
    const buyUsePrice = buyPrice + buyDeliveryPrice;

    if (buyUsePrice - 150 < parseInt(usePointInput.value)) {
      return message.error("주문금액보다 많이 사용할 수 없습니다.");
    }

    setUsePoint(parseInt(usePointInput.value ? usePointInput.value : 0));
  }, [usePointInput.value, usePoint, orderWishs, buyDeliveryPrice, buyPrice]);

  // 구매
  const buyProductHandler = useCallback(
    (data) => {
      if (!buyType) {
        return message.error("결제방법을 선택해주세요.");
      }

      if (!trems) {
        return message.error("개인정보 수집에 동의해주세요.");
      }

      const buyUsePrice = buyPrice + buyDeliveryPrice - usePoint;

      const d = new Date();

      let year = d.getFullYear() + "";
      let month = d.getMonth() + 1 + "";
      let date = d.getDate() + "";
      let hour = d.getHours() + "";
      let min = d.getMinutes() + "";
      let sec = d.getSeconds() + "";
      let mSec = d.getMilliseconds() + "";

      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      mSec = mSec < 10 ? "0" + mSec : mSec;

      let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;

      const IMP = window.IMP;

      if (buyType === "nobank") {
        dispatch({
          type: BOUGHT_CREATE_REQUEST,
          data: {
            payWay: buyType,
            wishItemId: orderWishs.map((data) => data.id),

            // 가격
            price: buyPrice + buyDeliveryPrice,

            // 배송비
            deliveryPrice: buyDeliveryPrice,

            // 포인트
            usePoint: usePoint !== 0,
            pointPrice: usePoint,

            // 배송
            postCode: data.zoneCode,
            address: data.address,
            detailAddress: data.detailAddress,
            etc: data.deliveryMessage ? data.deliveryMessage : "-",

            // 구매자 정보
            toSales: me.userGradeId !== 5,
            name: data.receiveUser,
            mobile: data.mobile,

            // 아임포트 정보
            impUid: null,
            merchantUid: null,

            // 가상계좌
            vBankDate: null,
            vbankHolder: null,
            vbankName: null,
            vbankNum: null,
          },
        });
      } else {
        IMP.request_pay(
          {
            pg:
              buyType === "phone"
                ? "danal"
                : buyType === "kakao"
                ? "kakaopay"
                : "danal_tpay",
            pay_method: buyType === "kakao" ? "card" : buyType,
            merchant_uid: orderPK,
            name:
              orderWishs &&
              `${orderWishs[0].productTitle} ${
                orderWishs.length > 1 ? `외 ${orderWishs.length - 1}개` : ``
              }`,
            amount: buyUsePrice,
            buyer_name: me.username,
            buyer_tel: me.mobile.replace(
              /^(\d{2,3})(\d{3,4})(\d{4})$/,
              `$1-$2-$3`
            ),
            buyer_email: me.email,
            buyer_addr: data.address,
            buyer_postcode: data.zonCode,
          },
          async (rsp) => {
            if (rsp.success) {
              dispatch({
                type: BOUGHT_CREATE_REQUEST,
                data: {
                  payWay: buyType,
                  wishItemId: orderWishs.map((data) => data.id),

                  // 가격
                  price: buyPrice + buyDeliveryPrice,

                  // 배송비
                  deliveryPrice: buyDeliveryPrice,

                  // 포인트
                  usePoint: usePoint !== 0,
                  pointPrice: usePoint,

                  // 배송
                  postCode: data.zoneCode,
                  address: data.address,
                  detailAddress: data.detailAddress,
                  etc: data.deliveryMessage ? data.deliveryMessage : "-",

                  // 구매자 정보
                  toSales: me.userGradeId !== 5,
                  name: data.receiveUser,
                  mobile: data.mobile,

                  // 아임포트 정보
                  impUid: rsp.imp_uid,
                  merchantUid: rsp.merchant_uid,

                  // 가상계좌
                  vBankDate: buyType === "vbank" ? rsp.vbank_date : null,
                  vbankHolder: buyType === "vbank" ? rsp.vbank_holder : null,
                  vbankName: buyType === "vbank" ? rsp.vbank_name : null,
                  vbankNum: buyType === "vbank" ? rsp.vbank_num : null,
                },
              });
            } else {
              console.log(rsp);
              return console.log("결제실패");
            }
          }
        );
      }
    },
    [trems, buyType, orderWishs, me, usePoint, buyDeliveryPrice, buyPrice]
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
        <WholeWrapper padding={width < 900 ? `100px 0 0 0` : `180px 0 0 0`}>
          <RsWrapper>
            <CommonTitle>ORDER</CommonTitle>

            <Wrapper
              al={`flex-start`}
              color={`${Theme.darkGrey_C}`}
              fontWeight={`600`}
              margin={`40px 0 0`}
              fontSize={width < 700 ? `16px` : `20px`}
            >
              주문 리스트
            </Wrapper>

            <Wrapper
              borderTop={`1px solid ${Theme.grey2_C}`}
              margin={`30px 0 0 0`}
            >
              {orderWishs &&
                (orderWishs.length === 0 ? (
                  <Wrapper margin={`50px 0`}>
                    <Empty description="조회된 장바구니 목록이 없습니다." />
                  </Wrapper>
                ) : (
                  orderWishs.map((data) => {
                    return (
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        padding={`30px 0`}
                        borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                      >
                        <Wrapper
                          dr={`row`}
                          width={width < 700 ? `60%` : `50%`}
                          ju={`flex-start`}
                          al={`flex-start`}
                        >
                          <Image
                            src={data.productThumbnail}
                            width={`60px`}
                            height={`60px`}
                            margin={`0 14px 0 0`}
                          />

                          <Wrapper width={`auto`} al={`flex-start`}>
                            <Text
                              color={Theme.darkGrey_C}
                              fontSize={width < 700 ? "14px" : `18px`}
                            >
                              {data.productTitle}
                            </Text>
                            <Text
                              color={Theme.grey3_C}
                              fontSize={width < 700 ? "12px" : `16px`}
                            >
                              {data.optionString}-{data.viewOptionPrice}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper width={width < 700 ? `10%` : `15%`}>
                          {data.qun}개
                        </Wrapper>

                        <Wrapper
                          width={width < 700 ? `20%` : `35%`}
                          wordBreak={`break-all`}
                        >
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 700 ? "14px" : `18px`}
                          >
                            {numberWithCommas(
                              String(
                                (data.productPrice -
                                  data.productPrice *
                                    (data.productDiscount / 100) +
                                  data.optionPrice) *
                                  data.qun
                              )
                            )}
                            원
                          </Text>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                ))}
            </Wrapper>

            <CustomForm form={form} onFinish={buyProductHandler}>
              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`60px 0 20px`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                주문자 정보
              </Wrapper>

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
                  <Text width={`160px`}>주문자명</Text>
                  <Text width={`calc(100% - 160px)`}>{me && me.username}</Text>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `16px`}
                  margin={`30px 0 0 0`}
                >
                  <Text width={`160px`}>연락처</Text>
                  <Text width={`calc(100% - 160px)`}>{me && me.mobile}</Text>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  wordBreak={`break-all`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `16px`}
                  margin={`30px 0 0 0`}
                >
                  <Text width={`160px`}>이메일</Text>
                  <Text width={`calc(100% - 160px)`}>{me && me.email}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`60px 0 20px`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                배송 정보
              </Wrapper>

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
                  <Text
                    width={`160px`}
                    margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                  >
                    받는분
                  </Text>
                  <Wrapper width={`512px`}>
                    <Form.Item
                      name="receiveUser"
                      rules={[
                        { required: true, message: "받는분을 입력해주세요." },
                      ]}
                    >
                      <CustomTextInput placeholder="받는분을 입력해주세요." />
                    </Form.Item>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `16px`}
                >
                  <Text
                    width={`160px`}
                    margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                  >
                    연락처
                  </Text>
                  <Wrapper width={`512px`}>
                    <Form.Item
                      name="mobile"
                      rules={[
                        { required: true, message: "연락처를 입력해주세요." },
                      ]}
                    >
                      <CustomTextInput
                        placeholder="연락처는 숫자만 입력해주세요."
                        type="number"
                      />
                    </Form.Item>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  al={`flex-start`}
                  wordBreak={`break-all`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `16px`}
                >
                  <Text
                    width={`160px`}
                    margin={width < 700 ? `0 0 10px` : `10px 0 0`}
                  >
                    주소
                  </Text>
                  <Wrapper width={`512px`} dr={`row`} ju={`space-between`}>
                    <Wrapper width={`70%`}>
                      <Form.Item
                        name="zoneCode"
                        rules={[
                          {
                            required: true,
                            message: "우편번호를 입력해주세요.",
                          },
                        ]}
                      >
                        <CustomTextInput readOnly placeholder="우편번호" />
                      </Form.Item>
                    </Wrapper>
                    <Wrapper width={`30%`} al={`flex-end`} margin={`0 0 25px`}>
                      <CommonButton
                        width={`90%`}
                        height={`40px`}
                        kindOf={"basicTheme"}
                        type={`danger`}
                        onClick={postCodeModalToggle}
                      >
                        주소검색
                      </CommonButton>
                    </Wrapper>

                    <Form.Item
                      name="address"
                      rules={[
                        { required: true, message: "주소를 입력해주세요." },
                      ]}
                    >
                      <CustomTextInput readOnly placeholder="기본 주소" />
                    </Form.Item>

                    <Form.Item
                      name="detailAddress"
                      rules={[
                        { required: true, message: "상세주소를 입력해주세요." },
                      ]}
                    >
                      <CustomTextInput placeholder="상세 주소" />
                    </Form.Item>
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `16px`}
                >
                  <Text
                    width={`160px`}
                    margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                  >
                    배송메세지
                  </Text>
                  <Wrapper width={`512px`}>
                    <Form.Item name="deliveryMessage">
                      <CustomSelectInput placeholder="--선택해주세요--">
                        <Select.Option value={"부재 시 경비실에 맡겨주세요."}>
                          부재 시 경비실에 맡겨주세요.
                        </Select.Option>
                        <Select.Option value={"집 앞에 놓아주세요."}>
                          집 앞에 놓아주세요.
                        </Select.Option>
                      </CustomSelectInput>
                    </Form.Item>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 1100 ? `column` : `row`}
                ju={`space-between`}
                al={`flex-start`}
                margin={`60px 0 0`}
              >
                <Wrapper width={width < 1100 ? `100%` : `70%`}>
                  <Wrapper margin={`0 0 20px`}>
                    <Wrapper
                      al={`flex-start`}
                      color={`${Theme.darkGrey_C}`}
                      fontWeight={`600`}
                      fontSize={width < 700 ? `16px` : `20px`}
                    >
                      보유 포인트
                    </Wrapper>
                    <GuideDiv isImpo>
                      보유 포인트는 최소 150원 이상으로 사용 가능합니다.
                    </GuideDiv>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0 0`}
                    borderTop={`1px solid ${Theme.grey2_C}`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 700 ? `14px` : `16px`}
                    >
                      <Text
                        width={`160px`}
                        margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                      >
                        보유 포인트
                      </Text>
                      <Text
                        width={`calc(100% - 160px)`}
                        margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                        color={Theme.grey3_C}
                      >
                        {me && numberWithCommas(String(me.userPoint))}원
                      </Text>
                    </Wrapper>

                    {usePoint !== 0 && (
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        color={Theme.darkGrey_C}
                        fontSize={width < 700 ? `14px` : `16px`}
                      >
                        <Text
                          width={`160px`}
                          margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                        >
                          사용될 포인트
                        </Text>
                        <Text
                          width={`calc(100% - 160px)`}
                          margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                          color={Theme.grey3_C}
                        >
                          {numberWithCommas(String(usePoint))}원
                        </Text>
                      </Wrapper>
                    )}
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 700 ? `14px` : `16px`}
                    >
                      <Text
                        width={`160px`}
                        margin={width < 700 ? `0 0 10px` : `0 0 25px`}
                      >
                        포인트 사용
                      </Text>
                      <Wrapper
                        width={`512px`}
                        dr={`row`}
                        ju={`space-between`}
                        margin={`0 0 25px`}
                      >
                        <Wrapper width={width < 700 ? `50%` : `55%`}>
                          {me && (
                            <CustomTextInput
                              {...usePointInput}
                              type="number"
                              max={me.userPoint}
                              placeholder="0"
                              onKeyDown={(key) => key}
                            />
                          )}
                        </Wrapper>
                        <Wrapper width={`30%`} al={`flex-end`}>
                          <CommonButton
                            width={`calc(100% - 10px)`}
                            height={`40px`}
                            onClick={useAllPointHandler}
                          >
                            전액 사용
                          </CommonButton>
                        </Wrapper>
                        <Wrapper
                          width={width < 700 ? `20%` : `15%`}
                          al={`flex-end`}
                        >
                          <CommonButton
                            width={`calc(100% - 10px)`}
                            height={`40px`}
                            kindOf={"basicTheme"}
                            onClick={usePointHandler}
                          >
                            사용
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    al={`flex-start`}
                    color={`${Theme.darkGrey_C}`}
                    fontWeight={`600`}
                    margin={`100px 0 20px`}
                    fontSize={width < 700 ? `16px` : `20px`}
                  >
                    결제수단
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`30px 0 0`}
                    borderTop={`1px solid ${Theme.grey2_C}`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      al={`flex-start`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 700 ? `14px` : `16px`}
                    >
                      <Text
                        width={`160px`}
                        margin={width < 700 ? `0 0 10px` : `10px 0 0`}
                      >
                        결제수단 선택
                      </Text>
                      <Wrapper width={`600px`} al={`space-between`}>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={width < 700 ? `0 0 10px` : `10px 0 30px`}
                        >
                          {/* 신용카드 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "card"}
                            onChange={() => buyTypeChangeHandler("card")}
                          >
                            신용카드
                          </CustomRadioBox>

                          {/* 무통장입금 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "nobank"}
                            onChange={() => buyTypeChangeHandler("nobank")}
                          >
                            무통장입금
                          </CustomRadioBox>
                          {/* 가상계좌 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "vbank"}
                            onChange={() => buyTypeChangeHandler("vbank")}
                          >
                            가상계좌
                          </CustomRadioBox>
                          {/* 계좌이체 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "trans"}
                            onChange={() => buyTypeChangeHandler("trans")}
                          >
                            계좌이체
                          </CustomRadioBox>

                          {/* 휴대폰결제 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "phone"}
                            onChange={() => buyTypeChangeHandler("phone")}
                          >
                            휴대폰결제
                          </CustomRadioBox>

                          {/* 카카오페이 */}
                          <CustomRadioBox
                            style={{ color: Theme.grey3_C }}
                            checked={buyType === "kakao"}
                            onChange={() => buyTypeChangeHandler("kakao")}
                          >
                            카카오페이
                          </CustomRadioBox>
                        </Wrapper>
                        {/* 
                          나중에 사용할수도 있어서 주석
                          
                        <Wrapper width={width < 700 ? `100%` : `55%`}>
                          <Form.Item name="card">
                            <CustomSelectInput placeholder="카드를 선택해주세요.">
                              <Select.Option>카드</Select.Option>
                            </CustomSelectInput>
                          </Form.Item>
                        </Wrapper>
                        <Wrapper width={width < 700 ? `100%` : `55%`}>
                          <Form.Item name="date">
                            <CustomSelectInput placeholder="할부기간을 선택해주세요.">
                              <Select.Option>할부기간</Select.Option>
                            </CustomSelectInput>
                          </Form.Item>
                        </Wrapper> */}
                        <Text
                          fontSize={`14px`}
                          color={Theme.grey2_C}
                          margin={`0 0 20px`}
                        >
                          ※ 배송기간은 2~3일정도 소요됩니다.
                        </Text>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>

                <Wrapper width={width < 1100 ? `100%` : `30%`} al={`flex-end`}>
                  <Wrapper
                    width={width < 1100 ? `100%` : `calc(100% - 15px)`}
                    al={`flex-start`}
                    color={`${Theme.darkGrey_C}`}
                    fontWeight={`600`}
                    margin={width < 1100 ? `60px 0 20px` : `0 0 20px`}
                    fontSize={width < 700 ? `16px` : `20px`}
                  >
                    결제 금액
                  </Wrapper>
                  <Wrapper
                    width={width < 1100 ? `100%` : `calc(100% - 15px)`}
                    bgColor={Theme.lightGrey2_C}
                    border={`1px solid ${Theme.lightGrey3_C}`}
                    padding={`20px`}
                  >
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      margin={`0 0 19px`}
                      fontSize={`16px`}
                    >
                      <Text>주문금액</Text>
                      <Text>
                        {orderWishs && numberWithCommas(String(buyPrice))}원
                      </Text>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      color={Theme.grey_C}
                      margin={`0 0 9px`}
                    >
                      <Text> ㄴ 상품금액</Text>
                      <Text>
                        {orderWishs &&
                          numberWithCommas(
                            String(
                              orderWishs
                                .map(
                                  (data) =>
                                    (data.productPrice + data.optionPrice) *
                                    data.qun
                                )
                                .reduce((a, b) => a + b, 0)
                            )
                          )}
                        원
                      </Text>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      color={Theme.grey_C}
                      margin={`0 0 30px`}
                    >
                      <Text> ㄴ 상품할인금액</Text>
                      <Text>
                        {orderWishs &&
                          numberWithCommas(
                            String(
                              orderWishs
                                .map(
                                  (data) =>
                                    data.productPrice *
                                    (data.productDiscount / 100) *
                                    data.qun
                                )
                                .reduce((a, b) => a + b, 0)
                            )
                          )}
                        원
                      </Text>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      ju={`space-between`}
                      margin={`0 0 20px`}
                      fontSize={`16px`}
                    >
                      <Text>배송비</Text>
                      <Text>
                        +{orderWishs && numberWithCommas(buyDeliveryPrice)}원
                      </Text>
                    </Wrapper>
                    <Wrapper dr={`row`} ju={`space-between`} fontSize={`16px`}>
                      <Text>포인트 사용</Text>
                      <Text>{numberWithCommas(String(usePoint))}원</Text>
                    </Wrapper>

                    <Wrapper
                      width={`100%`}
                      height={`1px`}
                      margin={`12px 0 18px`}
                      bgColor={Theme.lightGrey4_C}
                    />

                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Text fontSize={`16px`}>최종결제금액</Text>
                      <Text fontSize={`22px`} color={Theme.basicTheme_C}>
                        {orderWishs &&
                          numberWithCommas(
                            buyPrice + buyDeliveryPrice - usePoint
                          )}
                        원
                      </Text>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                color={`${Theme.darkGrey_C}`}
                fontWeight={`600`}
                margin={`60px 0 20px`}
                fontSize={width < 700 ? `16px` : `20px`}
              >
                개인정보 수집 및 제공
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`30px 0`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <CustomRadioBox
                  style={{ fontSize: `16px` }}
                  checked={trems}
                  onChange={tremsChangeHandler}
                >
                  결제진행 약관 동의
                </CustomRadioBox>
                <Wrapper al={`flex-start`} padding={`20px 0 0 30px`}>
                  <Text>
                    개인정보 수집 ・ 이용및 처리 동의&nbsp;
                    <SpanText color={Theme.grey3_C}>(필수)</SpanText>
                  </Text>
                  <Text margin={`10px 0`}>
                    쇼핑몰 이용약관 동의&nbsp;
                    <SpanText color={Theme.grey3_C}>(필수)</SpanText>
                  </Text>
                  <Text>
                    구매조건 확인 및 결제 동의&nbsp;
                    <SpanText color={Theme.grey3_C}>(필수)</SpanText>
                  </Text>
                </Wrapper>
              </Wrapper>

              <Wrapper margin={`60px 0 100px`}>
                <CommonButton
                  htmlType="submit"
                  width={`340px`}
                  height={`48px`}
                  kindOf={`basicTheme`}
                  fontSize={`18px`}
                  type={`danger`}
                >
                  결제하기
                </CommonButton>
              </Wrapper>
            </CustomForm>

            <Modal
              title="주소검색"
              footer={null}
              visible={searchModal}
              onCancel={postCodeModalToggle}
            >
              <DaumPostcode
                onComplete={searchAddressHandler}
                width={width < 600 ? `100%` : `600px`}
                height={`500px`}
                autoClose={false}
                animation
              />
            </Modal>
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

export default Index;
