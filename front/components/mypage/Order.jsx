import React, { useCallback, useEffect, useState } from "react";
import {
  CommonButton,
  Image,
  Text,
  TextArea,
  TextInput,
  Wrapper,
} from "../commonComponents";
import {
  BOUGHT_DETAIL_LIST_REQUEST,
  BOUGHT_LIST_REQUEST,
} from "../../reducers/boughtHistory";
import { useDispatch, useSelector } from "react-redux";
import { Empty, message, Modal, Pagination, Select } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import styled, { ThemeContext } from "styled-components";
import Theme from "../Theme";
import useInput from "../../hooks/useInput";
import { CANCEL_CREATE_REQUEST } from "../../reducers/cancel";

const CustomPagination = styled(Pagination)`
  margin: 50px 0 100px 0;
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

const Box = styled(Wrapper)`
  width: 80px;
  height: 30px;
  color: ${Theme.grey2_C};

  border: 1px solid
    ${(props) => (props.active ? Theme.basicTheme_C : Theme.lightGrey3_C)};

  &:hover {
    border: 1px solid ${Theme.basicTheme_C};
  }
  cursor: pointer;
`;

const Order = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  const [clickTerm, setClickTerm] = useState(2);

  const { boughtList, boughtDetailList, boughtDetaiItems } = useSelector(
    (state) => state.boughtHistory
  );
  const { st_cancelCreateDone } = useSelector((state) => state.cancel);

  ////// HOOKS //////

  const dispatch = useDispatch();
  const router = useRouter();

  const [cModal, setCModal] = useState(false);
  const [reModal, setReModal] = useState(false);
  const [chModal, setChModal] = useState(false);

  const cancelReason = useInput(``);
  const bankNameInput = useInput(``);
  const bankNoInput = useInput(``);

  ////// USEEFFECT //////

  // 주문취소 신청완료
  useEffect(() => {
    if (st_cancelCreateDone) {
      setCModal(false);
      setReModal(false);
      setChModal(false);
      cancelReason.setValue(``);
      bankNameInput.setValue(``);
      bankNoInput.setValue(``);

      dispatch({
        type: BOUGHT_LIST_REQUEST,
        data: {
          searchDate: "2",
        },
      });

      return message.success("주문취소 신청이 완료되었습니다.");
    }
  }, [st_cancelCreateDone]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch({
      type: BOUGHT_LIST_REQUEST,
      data: {
        searchDate: "2",
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: BOUGHT_LIST_REQUEST,
      data: {
        searchDate: String(clickTerm),
      },
    });
  }, [clickTerm]);

  ////// TOGGLE //////

  // 반품 모달토글
  const refundModalToggle = useCallback(
    (data) => () => {
      if (data) {
        dispatch({
          type: BOUGHT_DETAIL_LIST_REQUEST,
          data: {
            boughtId: data.id,
          },
        });
      }

      setReModal(!reModal);
    },
    [reModal]
  );

  // 교환 모달토글
  const changeModalToggle = useCallback(
    (data) => () => {
      if (data) {
        dispatch({
          type: BOUGHT_DETAIL_LIST_REQUEST,
          data: {
            boughtId: data.id,
          },
        });
      }

      setChModal(!chModal);
    },
    [chModal]
  );

  // 주문취소 모달토글
  const cancelModalToggle = useCallback(
    (data) => () => {
      if (data) {
        dispatch({
          type: BOUGHT_DETAIL_LIST_REQUEST,
          data: {
            boughtId: data.id,
          },
        });
      }

      setCModal(!cModal);
    },
    [cModal]
  );

  ////// HANDLER //////

  // 환불 신청하기
  const refundCreateHandler = useCallback(() => {
    if (!cancelReason.value) {
      return message.error("환불 이유를 작성해주세요.");
    }

    if (boughtDetailList.payWay === `nobank`) {
      if (!bankNoInput.value) {
        return message.error("환불받을 계좌번호를 작성해주세요.");
      }

      if (!bankNameInput.value) {
        return message.error("환불받을 은행명을 작성해주세요.");
      }
    }

    dispatch({
      type: CANCEL_CREATE_REQUEST,
      data: {
        reason: cancelReason.value,
        payWay: boughtDetailList.payWay,
        type: 3,
        boughtHistoryId: boughtDetailList.id,
        bankName: bankNameInput.value,
        bankNo: bankNoInput.value,
        impUid: boughtDetailList.impUid,
        merchantUid: boughtDetailList.merchantUid,
      },
    });
  }, [cancelReason, bankNoInput, bankNameInput]);

  // 교환 신청하기
  const changeCreateHandler = useCallback(() => {
    if (!cancelReason.value) {
      return message.error("주문취소 이유를 작성해주세요.");
    }

    dispatch({
      type: CANCEL_CREATE_REQUEST,
      data: {
        reason: cancelReason.value,
        type: 2,
        boughtHistoryId: boughtDetailList.id,
      },
    });
  }, [cancelReason]);

  // 주문취소 신청하기
  const cancelCreateHandler = useCallback(() => {
    // 무통장입금 일때 - 은행명 / 계좌번호 (확인이 늦은경우 대비)
    // 카드일때 / 실시간계좌이체일때 - 아임포트 카드 값
    // 취소 상세페이지 안됨
    // 교환일때 차액 처리 ??
    // 환불일때 - 아임포트 카드 값 / 은행명 / 계좌번호
    if (!cancelReason.value) {
      return message.error("주문취소 이유를 작성해주세요.");
    }

    if (boughtDetailList.payWay === `nobank`) {
      if (!bankNoInput.value) {
        return message.error("환불받을 계좌번호를 작성해주세요.");
      }

      if (!bankNameInput.value) {
        return message.error("환불받을 은행명을 작성해주세요.");
      }
    }

    dispatch({
      type: CANCEL_CREATE_REQUEST,
      data: {
        reason: cancelReason.value,
        payWay: boughtDetailList.payWay,
        type: 1,
        boughtHistoryId: boughtDetailList.id,
        bankName: bankNameInput.value,
        bankNo: bankNoInput.value,
        impUid: boughtDetailList.impUid,
        merchantUid: boughtDetailList.merchantUid,
      },
    });
  }, [cancelReason, bankNameInput, bankNoInput, boughtDetailList]);

  const termClickHandler = useCallback(
    (v) => {
      setClickTerm(v);
    },
    [clickTerm]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  return (
    <Wrapper>
      <Wrapper al={`flex-start`} padding={`0 0 80px`}>
        <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
          주문내역
        </Text>

        {/* 날짜로 조회 */}
        <Wrapper al={width < 900 ? `center` : `flex-start`} margin={`0 0 20px`}>
          <Wrapper dr={`row`} width={`auto`} margin={`0 0 10px`}>
            <Box
              margin={`0 8px 0 0`}
              active={clickTerm === 2}
              onClick={() => termClickHandler(2)}
            >
              1개월
            </Box>
            <Box
              margin={`0 8px 0 0`}
              active={clickTerm === 3}
              onClick={() => termClickHandler(3)}
            >
              3개월
            </Box>
            <Box
              margin={`0 8px 0 0`}
              active={clickTerm === 4}
              onClick={() => termClickHandler(4)}
            >
              6개월
            </Box>
            <Box active={clickTerm === 5} onClick={() => termClickHandler(5)}>
              12개월
            </Box>
          </Wrapper>
        </Wrapper>

        {/* 테이블 */}
        <Wrapper
          bgColor={Theme.lightGrey2_C}
          color={Theme.grey_C}
          dr={`row`}
          height={`60px`}
          borderTop={`1px solid ${Theme.grey2_C}`}
          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
        >
          <Wrapper width={`20%`}>주문일자</Wrapper>
          <Wrapper width={`calc(100% - 20% - 20% - 20%)`}>주문번호</Wrapper>
          <Wrapper width={`20%`}>결제금액</Wrapper>
          <Wrapper width={`20%`}>주문상태</Wrapper>
        </Wrapper>
        <Wrapper>
          {boughtList && boughtList.length === 0 ? (
            <Wrapper height={`300px`}>
              <Empty description={false}>주문 내역이 없습니다.</Empty>
            </Wrapper>
          ) : (
            boughtList &&
            boughtList.map((data, idx) => {
              return (
                <Wrapper
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  dr={`row`}
                  height={`120px`}
                  key={idx}
                >
                  <Wrapper
                    width={`20%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    {data.viewCreatedAt}
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% - 20% - 20% - 20%)`}
                    padding={width < 900 ? `0 10px` : `0 20px`}
                    al={`flex-start`}
                  >
                    <Text
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `12px` : `16px`}
                    >
                      {data.productCnt > 1
                        ? `${data.productName} 외 ${data.productCnt}개`
                        : `${data.productName}`}
                    </Text>
                    <CommonButton
                      width={width < 900 ? `95%` : `100px`}
                      height={`30px`}
                      radius={`2px`}
                      margin={`5px 0 0`}
                      padding={`0`}
                      onClick={() =>
                        moveLinkHandler(`/mypage?type=detail&id=${data.id}`)
                      }
                    >
                      상세정보 보기
                    </CommonButton>
                  </Wrapper>
                  <Wrapper
                    width={`20%`}
                    fontWeight={`600`}
                    color={Theme.grey2_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    {data.viewPrice}
                  </Wrapper>
                  <Wrapper width={`20%`}>
                    <Text
                      color={Theme.darkGrey_C}
                      margin={`0 0 10px`}
                      fontSize={width < 900 ? `12px` : `16px`}
                    >
                      {data.viewDeliveryStatus}
                    </Text>
                    {data.deliveryStatus === 6 && (
                      <>
                        <CommonButton
                          type={`danger`}
                          kindOf={`outline`}
                          width={width < 900 ? `95%` : `80px`}
                          height={`30px`}
                          radius={`2px`}
                          margin={`0 0 5px`}
                          padding={`0`}
                          onClick={changeModalToggle(data)}
                        >
                          교환 신청
                        </CommonButton>
                        <CommonButton
                          type={`danger`}
                          kindOf={`outline`}
                          width={width < 900 ? `95%` : `80px`}
                          height={`30px`}
                          radius={`2px`}
                          padding={`0`}
                          onClick={refundModalToggle(data)}
                        >
                          반품 신청
                        </CommonButton>
                      </>
                    )}

                    {data.deliveryStatus === 0 && (
                      <CommonButton
                        type={`danger`}
                        kindOf={`outline`}
                        width={width < 900 ? `95%` : `80px`}
                        height={`30px`}
                        radius={`2px`}
                        margin={`0 0 5px`}
                        padding={`0`}
                        onClick={cancelModalToggle(data)}
                      >
                        주문 취소
                      </CommonButton>
                    )}
                  </Wrapper>
                </Wrapper>
              );
            })
          )}

          {/* <CustomPagination /> */}
        </Wrapper>

        {/* 환불 */}
        <Modal
          visible={reModal}
          onCancel={refundModalToggle()}
          footer={null}
          width="600px"
        >
          {boughtDetaiItems &&
            boughtDetaiItems.map((data, idx) => {
              return (
                <Wrapper dr={`row`}>
                  <Wrapper width={`40%`}>
                    <Image src={data.productThumbnail} alt="thumbnail" />
                  </Wrapper>
                  <Wrapper width={`60%`} padding={`0 0 0 20px`}>
                    <Wrapper
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                      key={idx}
                    >
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                        position={`relative`}
                        zIndex={`1`}
                      >
                        <Wrapper
                          position={`absolute`}
                          top={`0`}
                          left={`0`}
                          bgColor={Theme.basicTheme_C}
                          height={`100%`}
                          width={`30%`}
                          zIndex={`-1`}
                        ></Wrapper>
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          color={Theme.white_C}
                        >
                          상품이름
                        </Wrapper>
                        <Wrapper padding={`0 5px`} width={`70%`}>
                          {data.productTitle}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품가격
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.viewProductPrice}</Wrapper>
                      </Wrapper>

                      {data.optionString && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션이름
                          </Wrapper>
                          <Wrapper width={`70%`}>{data.optionString}</Wrapper>
                        </Wrapper>
                      )}

                      {data.viewOptionPrice && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션가격
                          </Wrapper>
                          <Wrapper width={`70%`}>
                            {data.viewOptionPrice}
                          </Wrapper>
                        </Wrapper>
                      )}

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          할인율
                        </Wrapper>
                        <Wrapper width={`70%`}>
                          {data.viewProductDiscount}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품개수
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.qun}개</Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          총 결제금액
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.realPrice}</Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              );
            })}

          <Wrapper
            padding={`10px 0`}
            margin={`10px 0`}
            borderTop={`1px solid ${Theme.lightGrey4_C}`}
          >
            {boughtDetailList && boughtDetailList.payWay === `nobank` && (
              <>
                <Wrapper dr={`row`} margin={`0 0 10px`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`30%`}
                    padding={`0 10px 0 0`}
                  >
                    <Text margin={`0 0 5px`}>은행명</Text>

                    <TextInput
                      width={`100%`}
                      height={`32px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      placeholder="은행명을 입력해주세요."
                      {...bankNameInput}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} width={`70%`}>
                    <Text margin={`0 0 5px`}>계좌번호</Text>

                    <TextInput
                      width={`100%`}
                      height={`32px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      placeholder="-를 제외한 계좌번호를 입력해주세요."
                      {...bankNoInput}
                    />
                  </Wrapper>
                </Wrapper>
              </>
            )}

            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              <Text margin={`0 0 5px`}>환불 이유</Text>

              <TextArea
                placeholder="환불하는 이유를 적어주세요"
                width={`100%`}
                {...cancelReason}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`}>
            <CommonButton
              kindOf={`white`}
              margin={`0 5px 0 0`}
              onClick={refundModalToggle()}
            >
              취소
            </CommonButton>
            <CommonButton onClick={refundCreateHandler}>환불</CommonButton>
          </Wrapper>
        </Modal>

        {/* 교환 */}
        <Modal
          visible={chModal}
          onCancel={changeModalToggle()}
          footer={null}
          width="600px"
        >
          {boughtDetaiItems &&
            boughtDetaiItems.map((data, idx) => {
              return (
                <Wrapper dr={`row`}>
                  <Wrapper width={`40%`}>
                    <Image src={data.productThumbnail} alt="thumbnail" />
                  </Wrapper>
                  <Wrapper width={`60%`} padding={`0 0 0 20px`}>
                    <Wrapper
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                      key={idx}
                    >
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                        position={`relative`}
                        zIndex={`1`}
                      >
                        <Wrapper
                          position={`absolute`}
                          top={`0`}
                          left={`0`}
                          bgColor={Theme.basicTheme_C}
                          height={`100%`}
                          width={`30%`}
                          zIndex={`-1`}
                        ></Wrapper>
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          color={Theme.white_C}
                        >
                          상품이름
                        </Wrapper>
                        <Wrapper padding={`0 5px`} width={`70%`}>
                          {data.productTitle}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품가격
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.viewProductPrice}</Wrapper>
                      </Wrapper>

                      {data.optionString && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션이름
                          </Wrapper>
                          <Wrapper width={`70%`}>{data.optionString}</Wrapper>
                        </Wrapper>
                      )}

                      {data.viewOptionPrice && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션가격
                          </Wrapper>
                          <Wrapper width={`70%`}>
                            {data.viewOptionPrice}
                          </Wrapper>
                        </Wrapper>
                      )}

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          할인율
                        </Wrapper>
                        <Wrapper width={`70%`}>
                          {data.viewProductDiscount}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품개수
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.qun}개</Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          총 결제금액
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.realPrice}</Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              );
            })}

          <Wrapper
            padding={`10px 0`}
            margin={`10px 0`}
            borderTop={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              <Text margin={`0 0 5px`}>교환 이유</Text>

              <TextArea
                placeholder="교환하는 이유를 적어주세요"
                width={`100%`}
                {...cancelReason}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`}>
            <CommonButton
              kindOf={`white`}
              margin={`0 5px 0 0`}
              onClick={changeModalToggle()}
            >
              취소
            </CommonButton>
            <CommonButton onClick={changeCreateHandler}>교환</CommonButton>
          </Wrapper>
        </Modal>

        <Modal
          visible={cModal}
          onCancel={cancelModalToggle()}
          footer={null}
          width="600px"
        >
          {boughtDetaiItems &&
            boughtDetaiItems.map((data, idx) => {
              return (
                <Wrapper dr={`row`}>
                  <Wrapper width={`40%`}>
                    <Image src={data.productThumbnail} alt="thumbnail" />
                  </Wrapper>
                  <Wrapper width={`60%`} padding={`0 0 0 20px`}>
                    <Wrapper
                      borderBottom={`1px solid ${Theme.lightGrey2_C}`}
                      key={idx}
                    >
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                        position={`relative`}
                        zIndex={`1`}
                      >
                        <Wrapper
                          position={`absolute`}
                          top={`0`}
                          left={`0`}
                          bgColor={Theme.basicTheme_C}
                          height={`100%`}
                          width={`30%`}
                          zIndex={`-1`}
                        ></Wrapper>
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          color={Theme.white_C}
                        >
                          상품이름
                        </Wrapper>
                        <Wrapper padding={`0 5px`} width={`70%`}>
                          {data.productTitle}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품가격
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.viewProductPrice}</Wrapper>
                      </Wrapper>

                      {data.optionString && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션이름
                          </Wrapper>
                          <Wrapper width={`70%`}>{data.optionString}</Wrapper>
                        </Wrapper>
                      )}

                      {data.viewOptionPrice && (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.basicTheme_C}`}
                          margin={`0 0 5px`}
                        >
                          <Wrapper
                            width={`30%`}
                            padding={`5px`}
                            bgColor={Theme.basicTheme_C}
                            color={Theme.white_C}
                          >
                            상품옵션가격
                          </Wrapper>
                          <Wrapper width={`70%`}>
                            {data.viewOptionPrice}
                          </Wrapper>
                        </Wrapper>
                      )}

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          할인율
                        </Wrapper>
                        <Wrapper width={`70%`}>
                          {data.viewProductDiscount}
                        </Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          상품개수
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.qun}개</Wrapper>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.basicTheme_C}`}
                        margin={`0 0 5px`}
                      >
                        <Wrapper
                          width={`30%`}
                          padding={`5px`}
                          bgColor={Theme.basicTheme_C}
                          color={Theme.white_C}
                        >
                          총 결제금액
                        </Wrapper>
                        <Wrapper width={`70%`}>{data.realPrice}</Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              );
            })}

          <Wrapper
            padding={`10px 0`}
            margin={`10px 0`}
            borderTop={`1px solid ${Theme.lightGrey4_C}`}
          >
            {boughtDetailList && boughtDetailList.payWay === `nobank` && (
              <>
                <Wrapper dr={`row`} margin={`0 0 10px`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`30%`}
                    padding={`0 10px 0 0`}
                  >
                    <Text margin={`0 0 5px`}>은행명</Text>

                    <TextInput
                      width={`100%`}
                      height={`32px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      placeholder="은행명을 입력해주세요."
                      {...bankNameInput}
                    />
                  </Wrapper>
                  <Wrapper dr={`row`} ju={`flex-start`} width={`70%`}>
                    <Text margin={`0 0 5px`}>계좌번호</Text>

                    <TextInput
                      width={`100%`}
                      height={`32px`}
                      border={`1px solid ${Theme.lightGrey4_C}`}
                      placeholder="-를 제외한 계좌번호를 입력해주세요."
                      {...bankNoInput}
                    />
                  </Wrapper>
                </Wrapper>
              </>
            )}

            <Wrapper al={`flex-start`} margin={`0 0 10px`}>
              <Text margin={`0 0 5px`}>주문취소 이유</Text>

              <TextArea
                placeholder="주문취소하는 이유를 적어주세요"
                width={`100%`}
                {...cancelReason}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`}>
            <CommonButton
              kindOf={`white`}
              margin={`0 5px 0 0`}
              onClick={cancelModalToggle()}
            >
              취소
            </CommonButton>
            <CommonButton onClick={cancelCreateHandler}>주문취소</CommonButton>
          </Wrapper>
        </Modal>
      </Wrapper>
    </Wrapper>
  );
};

export default Order;
