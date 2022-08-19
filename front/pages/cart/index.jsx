import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import Head from "next/head";
import {
  CommonTitle,
  RsWrapper,
  Wrapper,
  WholeWrapper,
  Text,
  Image,
  CommonButton,
} from "../../components/commonComponents";
import { InputNumber, Checkbox, Empty, message } from "antd";
import { animateScroll as scroll } from "react-scroll";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import {
  WISH_ALL_DELETE_REQUEST,
  WISH_LIST_REQUEST,
  WISH_UPDATE_REQUEST,
} from "../../reducers/wish";
import { numberWithCommas } from "../../components/commonUtils";

export const InputNum = styled.input`
  width: 100%;
  border: 1px solid ${Theme.lightGrey_C};

  &:hover {
    border: 1px solid ${Theme.basicTheme_C};
    box-shadow: 0 0 0 2px rgb(255 72 150 / 20%);
  }

  &:focus {
    border: 1px solid ${Theme.basicTheme_C};
    box-shadow: 0 0 0 2px rgb(255 72 150 / 20%);
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

  @media (max-width: 700px) {
    & .ant-input-number-handler-wrap {
      opacity: 0;
    }
  }
`;

const CustomCheckBox = styled(Checkbox)`
  font-size: 18px;
  color: ${Theme.grey_C};

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Theme.basicTheme_C};
    border-color: ${Theme.basicTheme_C};
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${Theme.basicTheme_C};
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const DeleteTitle = styled(Text)`
  &:hover {
    color: ${Theme.basicTheme_C};
  }
  cursor: pointer;
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const { me } = useSelector((state) => state.user);

  const {
    wishs,
    st_wishUpdateDone,
    st_wishUpdateError,
    st_wishAllDeleteDone,
    st_wishAllDeleteError,
  } = useSelector((state) => state.wish);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [currentData, setCurrentData] = useState([]);
  const [choicePrice, setChoicePrice] = useState(0);
  const [choiceDeli, setChoiceDeli] = useState(0);
  const [allCehck, setAllCheck] = useState(true);

  ////// USEEFFECT //////

  useEffect(() => {
    if (wishs && wishs.length !== 0) {
      let tempArr = [];
      wishs.map((data) => {
        tempArr.push(data.id);
      });
      setCurrentData(tempArr);

      let tempDeli = 0;

      wishs.map((data) => {
        if (currentData.includes(data.id)) {
          tempDeli = data.productDelPrice;
        }
      });

      setChoiceDeli(
        Math.max(
          ...wishs
            .filter((data) => tempArr.find((value) => value === data.id))
            .map((data) => data.productDelPrice)
        )
      );
    } else {
      setChoiceDeli(0);
    }
  }, [wishs, choiceDeli]);

  useEffect(() => {
    scroll.scrollTo(0);
  }, []);

  useEffect(() => {
    if (!me) {
      message.error("로그인이 필요합니다.");

      router.push(`/login`);
    }
  }, [me]);

  // 수량변경 후처리
  useEffect(() => {
    if (st_wishUpdateDone) {
      message.success("수량이 변경되었습니다.");

      dispatch({
        type: WISH_LIST_REQUEST,
      });
    }
  }, [st_wishUpdateDone]);

  useEffect(() => {
    if (st_wishUpdateError) {
      message.error(st_wishUpdateError);
    }
  }, [st_wishUpdateError]);

  // 삭제 후처리
  useEffect(() => {
    if (st_wishAllDeleteDone) {
      message.success("장바구니 상품이 삭제되었습니다.");

      setCurrentData([]);

      dispatch({
        type: WISH_LIST_REQUEST,
      });
    }
  }, [st_wishAllDeleteDone]);

  useEffect(() => {
    if (st_wishAllDeleteError) {
      message.error(st_wishAllDeleteError);
    }
  }, [st_wishAllDeleteError]);

  // 가격 변경
  useEffect(() => {
    if (currentData && wishs) {
      let tempPrice = 0;

      wishs.map((data) => {
        if (currentData.includes(data.id)) {
          tempPrice += data.originRealPrice + data.optionRealPrice;
        }
      });

      setChoicePrice(tempPrice);
    }
  }, [wishs, currentData]);

  ////// TOGGLE //////
  ////// HANDLER //////

  // 수량변경
  const countHandler = useCallback((id, count) => {
    dispatch({
      type: WISH_UPDATE_REQUEST,
      data: {
        id,
        count,
      },
    });
  }, []);

  // 단일선택
  const choiceHandler = useCallback(
    (type) => {
      const index = currentData.indexOf(type.id);
      let tempArr = currentData.map((data) => data);

      if (index !== -1) {
        tempArr = tempArr.filter((data) => data !== type.id);
      } else {
        tempArr.push(type.id);
      }

      if (currentData && wishs) {
        let tempDeli = 0;

        wishs.map((data) => {
          if (currentData.includes(data.id)) {
            tempDeli = data.productDelPrice;
          }
        });

        setChoiceDeli(
          wishs
            .filter((data) => tempArr.find((value) => value === data.id))
            .map((data) => data.productDelPrice).length === 0
            ? 0
            : Math.max(
                ...wishs
                  .filter((data) => tempArr.find((value) => value === data.id))
                  .map((data) => data.productDelPrice)
              )
        );
      }

      setCurrentData(tempArr);
    },
    [currentData, choiceDeli, wishs]
  );

  // 전체선택
  const allChoiceHandler = useCallback(() => {
    if (!allCehck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }

    if (wishs) {
      let tempArr = [];
      wishs.map((data) => {
        tempArr.push(data.id);
      });
      setCurrentData(tempArr);

      let tempDeli = 0;

      wishs.map((data) => {
        if (currentData.includes(data.id)) {
          tempDeli = data.productDelPrice;
        }
      });

      setChoiceDeli(
        Math.max(
          ...wishs
            .filter((data) => tempArr.find((value) => value === data.id))
            .map((data) => data.productDelPrice)
        )
      );
    }
    if (wishs.length === currentData.length) {
      setCurrentData([]);
      setChoiceDeli(0);
    }
  }, [currentData, wishs, choiceDeli]);

  // 선택삭제
  const choiceDeleteHandler = useCallback(() => {
    if (currentData.length !== 0) {
      dispatch({
        type: WISH_ALL_DELETE_REQUEST,
        data: { itemId: currentData },
      });
    } else {
      message.error("상품을 선택해주세요.");
    }
  }, [currentData]);

  // 바로삭제
  const choiceOneDeleteHandler = useCallback(
    (data) => {
      if (currentData.find((value) => value === data)) {
        setCurrentData(currentData.filter((value) => value !== data));
      }

      dispatch({
        type: WISH_ALL_DELETE_REQUEST,
        data: { itemId: [data.id] },
      });
    },
    [currentData]
  );

  // 전체삭제
  const allDeleteHandler = useCallback(() => {
    if (wishs.length !== 0) {
      let tempArr = [];
      wishs.map((data) => {
        tempArr.push(data.id);
      });

      dispatch({
        type: WISH_ALL_DELETE_REQUEST,
        data: { itemId: tempArr },
      });
    } else {
      message.error("장바구니에 상품이 없습니다.");
    }
  }, [wishs]);

  // 선택구매하기
  const choiceProductHandler = useCallback(() => {
    if (currentData.length !== 0) {
      sessionStorage.setItem("buy-az", JSON.stringify(currentData));

      return router.push("/order?type=buy");
    } else {
      return message.error("상품을 선택해주세요.");
    }
  }, [currentData, wishs]);

  // 전체구매하기
  const allProductHandler = useCallback(() => {
    if (wishs.length !== 0) {
      sessionStorage.setItem(
        "buy-az",
        JSON.stringify(wishs.map((data) => data.id))
      );

      return router.push("/order?type=buy");
    } else {
      return message.error("장바구니에 상품이 없습니다.");
    }
  }, [wishs]);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | CART</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={width < 900 ? `100px 0 0` : `180px 0 0`}>
          <RsWrapper>
            <CommonTitle>CART</CommonTitle>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              fontSize={width < 700 ? `14px` : `18px`}
              color={Theme.grey_C}
              margin={`60px 0 10px 0`}
            >
              <Wrapper dr={`row`} width={`auto`}>
                <CustomCheckBox onClick={allChoiceHandler} checked={allCehck}>
                  전체 선택
                </CustomCheckBox>

                <Text margin={`0 5px 0 0`}>|</Text>
                <DeleteTitle onClick={choiceDeleteHandler}>
                  선택 삭제
                </DeleteTitle>
              </Wrapper>

              <DeleteTitle onClick={allDeleteHandler}>전체 삭제</DeleteTitle>
            </Wrapper>

            <Wrapper borderTop={`1px solid ${Theme.darkGrey_C}`}>
              {wishs && wishs.length === 0 ? (
                <Wrapper margin={`50px 0`}>
                  <Empty description="조회된 장바구니 목록이 없습니다." />
                </Wrapper>
              ) : (
                wishs &&
                wishs.map((data) => {
                  return (
                    <Wrapper
                      key={data.id}
                      dr={`row`}
                      ju={`flex-start`}
                      padding={width < 900 ? `15px 0` : `30px 0`}
                      borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    >
                      <Wrapper width={width < 900 ? `7%` : `3%`}>
                        <CustomCheckBox
                          onClick={() => {
                            choiceHandler(data);
                          }}
                          checked={currentData.includes(data.id)}
                        />
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        width={width < 900 ? `60%` : `50%`}
                        ju={`flex-start`}
                        wrap={`nowrap`}
                        onClick={() =>
                          router.push(`/product/${data.ProductId}`)
                        }
                        cursor={`pointer`}
                      >
                        <Image
                          src={data.productThumbnail}
                          width={width < 900 ? `50px` : `60px`}
                          height={width < 900 ? `50px` : `60px`}
                          margin={`0 14px 0 0`}
                        />

                        <Wrapper al={`flex-start`}>
                          <Text
                            color={Theme.darkGrey_C}
                            fontSize={width < 900 ? `14px` : `18px`}
                          >
                            {data.productTitle}
                          </Text>

                          <Text
                            color={Theme.grey4_C}
                            fontSize={width < 900 ? `10px` : `14px`}
                          >
                            {data.optionString}
                          </Text>
                        </Wrapper>
                      </Wrapper>
                      {width < 900 ? (
                        <Wrapper width={`30%`}>
                          <Wrapper width={`80px`}>
                            <CustomInputNumber
                              onChange={(e) => countHandler(data.id, e)}
                              defaultValue={data.qun}
                              min={1}
                            />
                          </Wrapper>

                          <Wrapper
                            wordBreak={`break-all`}
                            margin={width < 900 && `10px 0 0`}
                          >
                            <Text
                              color={Theme.darkGrey_C}
                              fontSize={width < 700 ? `14px` : `18px`}
                            >
                              {numberWithCommas(
                                String(data.originRealPrice + data.optionPrice)
                              )}
                              원
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      ) : (
                        <>
                          <Wrapper width={`15%`}>
                            <CustomInputNumber
                              onChange={(e) => countHandler(data.id, e)}
                              defaultValue={data.qun}
                              min={1}
                            />
                          </Wrapper>
                          <Wrapper width={`27%`} wordBreak={`break-all`}>
                            <Text
                              color={Theme.darkGrey_C}
                              fontSize={width < 700 ? `14px` : `18px`}
                            >
                              {numberWithCommas(
                                String(
                                  data.originRealPrice + data.optionRealPrice
                                )
                              )}
                              원
                            </Text>
                          </Wrapper>
                        </>
                      )}

                      <Wrapper
                        width={`5%`}
                        display={width < 900 ? `none` : `flex`}
                        onClick={() => choiceOneDeleteHandler(data)}
                      >
                        <CloseOutlined
                          style={{
                            fontSize: 15,
                            color: Theme.grey6_C,
                            cursor: "pointer",
                          }}
                        />
                      </Wrapper>
                    </Wrapper>
                  );
                })
              )}
            </Wrapper>

            <Wrapper margin={`60px 0 0`}>
              <Wrapper dr={`row`} bgColor={Theme.subTheme2_C} height={`54px`}>
                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `20px`}
                >
                  총 상품금액
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `20px`}
                >
                  수량
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `20px`}
                >
                  배송비
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `20px`}
                >
                  결제예정금액
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                borderBottom={`1px solid ${Theme.subTheme6_C}`}
                height={width < 900 ? `80px` : `120px`}
              >
                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `22px`}
                >
                  {numberWithCommas(choicePrice)}원
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `22px`}
                >
                  {currentData.length}개
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `22px`}
                >
                  {choiceDeli ? numberWithCommas(choiceDeli) : 0}원
                </Wrapper>

                <Wrapper
                  width={`calc(100% / 4)`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 700 ? `14px` : `22px`}
                >
                  {numberWithCommas(choicePrice + choiceDeli)}원
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} margin={`60px 0 100px`}>
              <CommonButton
                margin={`0 10px 0 0`}
                radius={`0`}
                width={`146px`}
                height={`42px`}
                type={`danger`}
                onClick={choiceProductHandler}
              >
                선택 주문하기
              </CommonButton>
              <CommonButton
                radius={`0`}
                width={`146px`}
                height={`42px`}
                type={`danger`}
                kindOf={`basicTheme`}
                onClick={allProductHandler}
              >
                전체상품 주문
              </CommonButton>
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
      type: WISH_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
