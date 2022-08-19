import { DatePicker, Empty, Pagination } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { MY_OPINION_LIST_REQUEST } from "../../reducers/opinion";
import { CommonButton, Image, Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";

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

const Point = () => {
  ////// GLOBAL STATE //////
  const { myPointList, lastPage } = useSelector((state) => state.userPoint);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1); // 페이지
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: MY_OPINION_LIST_REQUEST,
      data: {
        page: currentPage,
      },
    });
  }, [currentPage]);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 페이지네이션 기능
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  return (
    <>
      <Head>
        <title>순애보 | 포인트 내역</title>
      </Head>

      <Wrapper>
        <Wrapper al={`flex-start`}>
          <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
            포인트 내역
          </Text>

          {/* 테이블 */}
          <Wrapper
            bgColor={Theme.lightGrey2_C}
            color={Theme.grey_C}
            dr={`row`}
            height={`60px`}
            borderTop={`1px solid ${Theme.grey2_C}`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper fontSize={`14px`} width={`13%`}>
              구분
            </Wrapper>
            <Wrapper fontSize={`14px`} width={`20%`}>
              날짜
            </Wrapper>
            <Wrapper
              fontSize={`13px`}
              width={`calc(100% - 13% - 20% - 15% - 15% - 15%)`}
            >
              내역
            </Wrapper>
            <Wrapper fontSize={`14px`} width={`15%`}>
              지급금액
            </Wrapper>
            <Wrapper fontSize={`14px`} width={`15%`}>
              사용금액
            </Wrapper>
            <Wrapper fontSize={`14px`} width={`15%`}>
              잔액
            </Wrapper>
          </Wrapper>

          <Wrapper>
            {myPointList.length === 0 ? (
              <Wrapper height={`300px`}>
                <Empty description={false}>포인트 내역이 없습니다.</Empty>
              </Wrapper>
            ) : (
              myPointList.map((data, idx) => {
                return (
                  <Wrapper
                    key={data.id}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                    dr={`row`}
                    height={`60px`}
                  >
                    <Wrapper
                      width={`13%`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `10px` : `16px`}
                    >
                      {data.type}
                    </Wrapper>
                    <Wrapper
                      width={`20%`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `10px` : `16px`}
                    >
                      {data.viewCreatedAt}
                    </Wrapper>
                    <Wrapper
                      width={`calc(100% - 13% - 20% - 15% - 15% - 15%)`}
                      padding={width < 900 ? `0 10px` : `0 20px`}
                      dr={`row`}
                    >
                      <Text
                        color={Theme.darkGrey_C}
                        fontSize={width < 900 ? `10px` : `16px`}
                      >
                        {data.content}
                      </Text>
                    </Wrapper>
                    <Wrapper
                      width={`15%`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `10px` : `16px`}
                    >
                      {data.viewReceivePoint}
                    </Wrapper>
                    <Wrapper
                      width={`15%`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `10px` : `16px`}
                    >
                      {data.viewUsePoint}
                    </Wrapper>

                    <Wrapper
                      width={`15%`}
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `10px` : `16px`}
                    >
                      {data.viewRemainPrice}
                    </Wrapper>
                  </Wrapper>
                );
              })
            )}

            <CustomPagination
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={lastPage * 10}
              onChange={(page) => otherPageCall(page)}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Point;
