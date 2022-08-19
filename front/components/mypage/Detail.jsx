import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { CommonButton, Image, Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";
import { BOUGHT_DETAIL_LIST_REQUEST } from "../../reducers/boughtHistory";
import { DETAIL_CANCEL_REQUEST } from "../../reducers/cancel";
import Head from "next/head";

const MobileBox = styled(Wrapper)`
  /* width: 20%; */
  width: calc(100% / 3);
  font-size: 13px;

  ${(props) => props.isActive && `color: ${Theme.basicTheme_C};`}
`;

const Detail = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  const { boughtDetailList, boughtDetaiItems } = useSelector(
    (state) => state.boughtHistory
  );

  const { detailList, detailItem } = useSelector((state) => state.cancel);

  ////// HOOKS //////

  const dispatch = useDispatch();
  const router = useRouter();

  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const type = router.query.type;
    const id = String(router.asPath).split("id=")[1];

    if (type === `cancelDetail`) {
      dispatch({
        type: DETAIL_CANCEL_REQUEST,
        data: {
          boughtId: id,
        },
      });
    } else {
      dispatch({
        type: BOUGHT_DETAIL_LIST_REQUEST,
        data: {
          boughtId: id,
        },
      });
    }
  }, []);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  return (
    <>
      <Head>
        <title>순애보 | 주문내역</title>
      </Head>
      <Wrapper>
        <Wrapper al={`flex-start`}>
          {/* 메뉴 */}
          {width < 900 && (
            <Wrapper
              dr={`row`}
              ju={`space-around`}
              bgColor={Theme.subTheme6_C}
              height={`120px`}
              margin={`0 0 50px`}
            >
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage`);
                }}
              >
                마이페이지
              </MobileBox>
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=order`);
                }}
                isActive
              >
                주문내역
              </MobileBox>
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=cancel`);
                }}
              >
                취소/교환/반품 내역
              </MobileBox>
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=point`);
                }}
              >
                포인트 내역
              </MobileBox>

              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=review`);
                }}
              >
                REVIEW
              </MobileBox>
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=question`);
                }}
              >
                문의내역
              </MobileBox>
              <MobileBox
                onClick={() => {
                  moveLinkHandler(`/mypage?type=myInfo`);
                }}
              >
                회원정보 수정
              </MobileBox>
            </Wrapper>
          )}
          <Text
            fontSize={`20px`}
            color={Theme.darkGrey_C}
            fontWeight={`700`}
            margin={width < 900 ? `0 0 30px` : `80px 0 30px`}
          >
            {router.query.type === `cancelDetail`
              ? "취소/교환/반품 내역상세"
              : "주문내역상세"}
          </Text>

          {/* 테이블 > 헤더 */}
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            color={Theme.grey_C}
            dr={`row`}
            height={`60px`}
            borderTop={`1px solid ${Theme.grey2_C}`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper width={`20%`}>주문일자</Wrapper>
            <Wrapper width={`calc(100% - 20% - 20% - 20%)`}>상품명</Wrapper>
            <Wrapper width={`20%`}>결제금액</Wrapper>
            <Wrapper width={`20%`}>주문상태</Wrapper>
          </Wrapper>
          {/* 테이블 > 데이터 */}

          <Wrapper
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
            dr={`row`}
            height={`100px`}
          >
            <Wrapper
              width={`20%`}
              color={Theme.darkGrey_C}
              fontSize={width < 900 ? `12px` : `16px`}
            >
              {boughtDetailList
                ? boughtDetailList.viewCreatedAt
                : detailList
                ? detailList[0].viewCreatedAt
                : ""}
            </Wrapper>
            <Wrapper
              width={`calc(100% - 20% - 20% - 20%)`}
              padding={width < 900 ? `0 10px` : `0 20px`}
              ju={`flex-start`}
              dr={`row`}
            >
              <Image
                alt="thumnail"
                src={
                  boughtDetaiItems
                    ? boughtDetaiItems[0].productThumbnail
                    : detailItem
                    ? detailItem[0].productThumbnail
                    : ""
                }
                width={`60px`}
                height={`60px`}
                margin={`0 15px 0 0`}
              />
              <Text
                color={Theme.darkGrey_C}
                fontSize={width < 900 ? `12px` : `16px`}
              >
                {boughtDetaiItems
                  ? boughtDetaiItems[0].productTitle
                  : detailItem
                  ? detailItem[0].productTitle
                  : ""}
              </Text>
            </Wrapper>
            <Wrapper
              width={`20%`}
              fontWeight={`600`}
              color={Theme.grey2_C}
              fontSize={width < 900 ? `12px` : `16px`}
            >
              {boughtDetailList
                ? boughtDetailList.viewFinalPrice
                : detailList
                ? detailList[0].viewPrice
                : ""}
            </Wrapper>
            <Wrapper width={`20%`}>
              <Text
                color={Theme.darkGrey_C}
                margin={`0 0 10px`}
                fontSize={width < 900 ? `12px` : `16px`}
              >
                {boughtDetailList
                  ? boughtDetailList.viewDeliveryStatus
                  : detailList
                  ? detailList[0].cancelType
                  : ""}
              </Text>
            </Wrapper>
          </Wrapper>

          {/* 주문정보 */}
          <Wrapper al={`flex-start`} margin={`0 0 60px`}>
            <Text
              margin={`60px 0 20px`}
              fontSize={`18px`}
              fontWeight={`700`}
              color={Theme.darkGrey_C}
            >
              주문정보
            </Text>

            <Wrapper
              borderTop={`1px solid ${Theme.grey2_C}`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              padding={`20px 0`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  주문 번호
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.boughtName
                    : detailList
                    ? detailList[0].boughtName
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  주문자명
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.name
                    : detailList
                    ? detailList[0].name
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  결제일시
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.viewCreatedAt
                    : detailList
                    ? detailList[0].viewCreatedAt
                    : ""}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          {/* 배송정보 */}
          <Wrapper al={`flex-start`} margin={`0 0 60px`}>
            <Text
              margin={`0 0 20px`}
              fontSize={`18px`}
              fontWeight={`700`}
              color={Theme.darkGrey_C}
            >
              배송정보
            </Text>

            <Wrapper
              borderTop={`1px solid ${Theme.grey2_C}`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              padding={`20px 0`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  받는 분
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.name
                    : detailList
                    ? detailList[0].name
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  연락처
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.mobile
                    : detailList
                    ? detailList[0].mobile
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  주소
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  (
                  {boughtDetailList
                    ? boughtDetailList.postCode
                    : detailList
                    ? detailList[0].postCode
                    : ""}
                  ) &nbsp;
                  {boughtDetailList
                    ? boughtDetailList.address
                    : detailList
                    ? detailList[0].address
                    : ""}
                  {boughtDetailList
                    ? boughtDetailList.detailAddress
                    : detailList
                    ? detailList[0].detailAddress
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList ? "배송메세지" : "취소/교환/반품 이유"}
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.etc
                    : detailList
                    ? detailList[0].reason
                    : ""}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          {/* 결제정보 */}
          <Wrapper al={`flex-start`} margin={`0 0 50px`}>
            <Text
              margin={`0 0 20px`}
              fontSize={`18px`}
              fontWeight={`700`}
              color={Theme.darkGrey_C}
            >
              배송정보
            </Text>

            <Wrapper
              borderTop={`1px solid ${Theme.grey2_C}`}
              borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              padding={`20px 0`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  상품금액
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetaiItems
                    ? boughtDetaiItems[0].realPrice
                    : detailItem
                    ? detailItem[0].realPrice
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  배송비
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.deliveryPrice
                    : detailList
                    ? detailList[0].deliveryPrice
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  포인트 사용
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.usePoint
                    : detailList
                    ? detailList[0].usePoint
                    : ""}
                  원
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  결제금액
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.viewPrice
                    : detailList
                    ? detailList[0].viewPrice
                    : ""}
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100px` : `160px`}
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  결제방법
                </Wrapper>
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900 ? `calc(100% - 100px)` : `calc(100% - 160px)`
                  }
                  fontSize={`16px`}
                  color={Theme.darkGrey_C}
                >
                  {boughtDetailList
                    ? boughtDetailList.payWay === `nobank`
                      ? "무통장입금"
                      : "신용카드"
                    : detailList
                    ? detailList[0].payWay === `nobank`
                      ? "무통장입금"
                      : "신용카드"
                    : ""}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          {/* 목록 버튼 */}
          <Wrapper margin={width < 900 ? `0 0 50px` : `0 0 100px`}>
            <CommonButton
              type={`danger`}
              kindOf={`basicTheme`}
              width={width < 900 ? `80` : `150px`}
              height={width < 900 ? `40` : `50px`}
              radius={`5px`}
              onClick={() => router.back()}
            >
              <Text fontSize={width < 900 ? `14px` : `18px`}>목록</Text>
            </CommonButton>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Detail;
