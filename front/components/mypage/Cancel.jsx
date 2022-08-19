import React, { useCallback, useEffect, useState } from "react";
import { CommonButton, Image, Text, Wrapper } from "../commonComponents";
import { BOUGHT_LIST_REQUEST } from "../../reducers/boughtHistory";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Empty, Pagination } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import styled from "styled-components";
import Theme from "../Theme";
import { MY_CANCEL_LIST_REQUEST } from "../../reducers/cancel";

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

const Cancel = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { myList, lastPage } = useSelector((state) => state.cancel);

  ////// HOOKS //////

  const dispatch = useDispatch();
  const router = useRouter();

  const [clickTerm, setClickTerm] = useState(2);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 네이션

  ////// USEEFFECT //////
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

  ////// HANDLER //////

  // 페이지네이션 이동
  const paginationMoveHadnler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  //   날짜로 조회
  const termClickHandler = useCallback(
    (v) => {
      setClickTerm(v);
    },
    [clickTerm]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  return (
    <Wrapper>
      <Wrapper al={`flex-start`} padding={`0 0 80px`}>
        <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
          취소/교환/반품 내역
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
          {myList && myList.length !== 0 ? (
            myList.map((data, idx) => {
              return (
                <Wrapper
                  key={idx}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  dr={`row`}
                  height={`120px`}
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
                        moveLinkHandler(
                          `/mypage?type=cancelDetail&id=${data.BoughtHistoryId}`
                        )
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
                      {data.cancelType && data.isComplete
                        ? `${data.cancelType}완료`
                        : data.cancelType}
                    </Text>
                  </Wrapper>
                </Wrapper>
              );
            })
          ) : (
            <Wrapper margin={`20px 0`}>
              <Empty description="취소/교환/반품 내역이 없습니다." />
            </Wrapper>
          )}

          {/* <CustomPagination /> */}
          <CustomPagination
            current={currentPage}
            total={lastPage * 10}
            onChange={paginationMoveHadnler}
          ></CustomPagination>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Cancel;
