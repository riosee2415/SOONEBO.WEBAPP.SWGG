import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Empty, message, Modal, Pagination, Rate } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Text, Wrapper } from "../commonComponents";
import ReviewModalSlider from "../slide/ReviewModalSlider";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";
import styled from "styled-components";

import { REVIEW_USER_LIST_REQUEST } from "../../reducers/review";
import Head from "next/head";

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

const CustomRate = styled(Rate)`
  &.ant-rate {
    color: ${Theme.basicTheme_C} !important;
  }
  & .ant-rate-star:not(:last-child) {
    margin-right: 5px;
  }
  @media (max-width: 700px) {
    & .ant-rate-star:not(:last-child) {
      margin-right: 3px !important;
    }
    & .anticon-star > svg {
      font-size: 0.8rem !important;
      margin: 0 !important;
    }
  }
`;

const HoverWrapper = styled(Wrapper)`
  flex-direction: row;
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey4_C};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.subTheme3_C};
  }
`;

const Review = () => {
  ////// GLOBAL STATE //////

  const { reviewUserList, reviewUserLastPage, st_reviewUserListError } =
    useSelector((state) => state.review);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // 페이지 네이션

  // modal
  const [dModal, setDModal] = useState(false); // 리뷰 상세 모달
  const [detailData, setDetailData] = useState(null); // 리뷰 상세정보

  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query.type === "review") {
      dispatch({
        type: REVIEW_USER_LIST_REQUEST,
        data: {
          page: currentPage,
        },
      });
    }
  }, [router.query, currentPage]);

  useEffect(() => {
    if (st_reviewUserListError) {
      return message.error(st_reviewUserListError);
    }
  }, [st_reviewUserListError]);

  ////// TOGGLE //////

  const dModalToggle = useCallback(
    (data) => {
      if (data) {
        setDetailData(data);
      } else {
        setDetailData(null);
      }

      setDModal((prev) => !prev);
    },
    [dModal, detailData]
  );

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 페이지네이션 이동
  const paginationMoveHadnler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  return (
    <>
      <Head>
        <title>순애보 | REVIEW</title>
      </Head>

      <Wrapper>
        <Wrapper al={`flex-start`}>
          <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
            REVIEW
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
            <Wrapper width={`20%`}>별점</Wrapper>
            <Wrapper width={`25%`}>제품명</Wrapper>
            <Wrapper
              width={
                width < 700
                  ? `calc(100% - 20% - 25% - 27%)`
                  : `calc(100% - 20% - 25% - 20%)`
              }
            >
              제목
            </Wrapper>
            <Wrapper width={width < 700 ? `27%` : `20%`}>작성일</Wrapper>
          </Wrapper>

          <Wrapper>
            {reviewUserList.length === 0 ? (
              <Wrapper margin={`20px 0`}>
                <Empty description="리뷰내역이 없습니다." />
              </Wrapper>
            ) : (
              reviewUserList.map((data) => (
                <HoverWrapper key={data.id} onClick={() => dModalToggle(data)}>
                  <Wrapper
                    width={`20%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    <CustomRate value={data.rate} disabled />
                  </Wrapper>
                  <Wrapper
                    width={`25%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    <Text width={`100%`} isEllipsis>
                      {data.title}
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={
                      width < 700
                        ? `calc(100% - 20% - 25% - 27%)`
                        : `calc(100% - 20% - 25% - 20%)`
                    }
                    padding={width < 900 ? `0 10px` : `0 20px`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Text
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `12px` : `16px`}
                    >
                      <Text width={`100%`} isEllipsis>
                        {data.title}
                      </Text>
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `27%` : `20%`}
                    // fontWeight={`600`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    {data.viewCreatedAt}
                  </Wrapper>
                </HoverWrapper>
              ))
            )}
            <CustomPagination
              current={currentPage}
              total={reviewUserLastPage * 10}
              onChange={paginationMoveHadnler}
            ></CustomPagination>
          </Wrapper>
        </Wrapper>

        {/* DETAIL MODAL */}
        <CustomModal
          visible={dModal}
          onCancel={() => dModalToggle(null)}
          footer={null}
          width={width < 800 ? `100%` : `510px`}
          closable={false}
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
                  onClick={() => dModalToggle(null)}
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
      </Wrapper>
    </>
  );
};

export default Review;
