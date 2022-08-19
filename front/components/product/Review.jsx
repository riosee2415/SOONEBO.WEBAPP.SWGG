import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Input,
  Pagination,
  Rate,
  Modal,
  Empty,
  Form,
  message,
  Upload,
} from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "../commonComponents";
import Theme from "../Theme";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";
import {
  REVIEW_IMAGE_UPLOAD_REQUEST,
  REVIEW_IMAGE_SETVALUE,
  REVIEW_PRODUCT_LIST_REQUEST,
  REVIEW_USER_CREATE_REQUEST,
} from "../../reducers/review";
import ReviewModalSlider from "../slide/ReviewModalSlider";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 20px 40px;

    @media (max-width: 800px) {
      padding: 20px 10px;
    }
  }
`;

const CustomRate = styled(Rate)`
  color: ${Theme.basicTheme_C};
`;

const CustomPage = styled(Pagination)`
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

const ReviewWrapper = styled(Wrapper)`
  width: calc(100% / 5 - 35px);
  overflow: hidden;
  margin: 35px 43px 0 0;
  padding: 0 0 35px;

  & ${Image} {
    cursor: pointer;
  }

  &:nth-child(5n) {
    margin-right: 0;
  }

  @media (max-width: 1100px) {
    width: calc(100% / 4 - 35px);
    margin: 35px 46px 0 0;

    &:nth-child(5n) {
      margin-right: auto;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (max-width: 800px) {
    width: calc(100% / 3 - 20px);

    margin: 35px 30px 0 0;

    &:nth-child(4n) {
      margin-right: auto;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 500px) {
    width: calc(100% / 2 - 10px);
    margin: 20px 20px 0 0;
    padding: 0 0 20px;

    &:nth-child(3n) {
      margin-right: auto;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`;

const HoverUploadWrapper = styled(Wrapper)`
  border: 1px solid ${(props) => props.theme.grey4_C};
  width: 100px;
  height: 100px;
  border-radius: 5px;
  color: ${(props) => props.theme.grey_C};
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }
`;

const HoverCrossWrapper = styled(Wrapper)`
  width: auto;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: ${(props) => props.theme.white_C};
  background-color: ${(props) => props.theme.basicTheme_C};
  border: 1px solid ${(props) => props.theme.basicTheme_C};

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
    background-color: ${(props) => props.theme.white_C};
  }
`;

const Review = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  const {
    reviewProductList,
    reviewProductLastPage,
    // 리뷰 이미지
    reviewImageList,
    reviewImageHistory,
    // 리뷰 리스트
    st_reviewProductListError,
    // 리뷰 생성
    st_reviewUserCreateDone,
    st_reviewUserCreateError,
  } = useSelector((state) => state.review);

  ////// HOOKS //////

  const dispatch = useDispatch();
  const router = useRouter();

  const imageRef = useRef();

  const [reviewForm] = Form.useForm();

  // pageination
  const [currentPage, setCurrentPage] = useState(1);

  // modal
  const [wModal, setWModal] = useState(false); // 리뷰 작성 모달
  const [dModal, setDModal] = useState(false); // 리뷰 상세 모달
  const [detailData, setDetailData] = useState(null); // 리뷰 상세정보

  ////// USEEFFECT //////

  // 상품 리뷰 가져오기
  useEffect(() => {
    if (router.query) {
      dispatch({
        type: REVIEW_PRODUCT_LIST_REQUEST,
        data: {
          productId: router.query.id,
          page: currentPage,
        },
      });
    }
  }, [router.query, currentPage]);

  // 상품 리뷰 생성

  useEffect(() => {
    if (st_reviewUserCreateDone) {
      dispatch({
        type: REVIEW_PRODUCT_LIST_REQUEST,
        data: {
          productId: router.query.id,
          page: currentPage,
        },
      });

      dispatch({
        type: REVIEW_IMAGE_SETVALUE,
        data: null,
      });

      setWModal(false);

      reviewForm.resetFields();

      return;
    }
  }, [st_reviewUserCreateDone]);

  ////// TOGGLE //////

  // 상세정보 모달
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

  // 작성하기 모달
  const writeModalToggle = useCallback(() => {
    setWModal((prev) => !prev);
  }, [wModal]);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 페이지네이션
  const pageChnageHandler = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [currentPage]
  );

  // 리뷰 이미지 등록

  const writeImageRefHandler = useCallback(() => {
    imageRef.current.click();
  }, [imageRef]);

  const writeImageHandler = useCallback(
    (e) => {
      if (reviewImageList.length === 4) {
        return message.error("사진은 총 4장만 등록할 수 있습니다.");
      }

      const formData = new FormData();

      [].forEach.call(e.target.files, (file) => {
        formData.append("image", file);
      });

      dispatch({
        type: REVIEW_IMAGE_UPLOAD_REQUEST,
        data: formData,
      });
    },
    [reviewImageList]
  );

  // 리뷰 이미지 삭제
  const writeImageDeleteHandler = useCallback(
    (id) => {
      dispatch({
        type: REVIEW_IMAGE_SETVALUE,
        data: reviewImageList.filter((data) => data.id !== id),
      });
    },
    [reviewImageHistory, reviewImageList]
  );

  // 리뷰 등록
  const writeReviewHandler = useCallback(
    (data) => {
      dispatch({
        type: REVIEW_USER_CREATE_REQUEST,
        data: {
          productId: router.query.id,
          rate: data.rate,
          title: data.title,
          content: data.content,
          imagePath1: reviewImageList[0] ? reviewImageList[0].path : null,
          imagePath2: reviewImageList[1] ? reviewImageList[1].path : null,
          imagePath3: reviewImageList[2] ? reviewImageList[2].path : null,
          imagePath4: reviewImageList[3] ? reviewImageList[3].path : null,
        },
      });
    },
    [reviewImageList, router.query]
  );

  ////// DATAVIEW //////

  return (
    <WholeWrapper>
      <Text fontSize={`20px`} fontWeight={`600`}>
        REVIEW
      </Text>
      <Text>순애보의 제품에 후기를 남겨주세요!</Text>
      <CommonButton
        width={`140px`}
        height={`40px`}
        margin={`15px 0 40px`}
        type={`danger`}
        onClick={writeModalToggle}
      >
        리뷰 작성하기
      </CommonButton>

      {/* 리뷰 데이터 */}
      <Wrapper dr={`row`} ju={`flex-start`}>
        {reviewProductList.length === 0 ? (
          <Wrapper margin={`50px 0`}>
            <Empty description="조회된 후기가 없습니다." />
          </Wrapper>
        ) : (
          reviewProductList.map((data) => {
            return (
              <ReviewWrapper
                dr={`row`}
                key={data.id}
                onClick={() => dModalToggle(data)}
              >
                <Wrapper
                  position={`relative`}
                  overflow={`hidden`}
                  al={`flex-start`}
                >
                  <Text
                    color={Theme.grey_C}
                    margin={`0 0 5px`}
                    fontSize={width < 700 ? `12px` : "14px"}
                  >
                    [다프네 BC 세럼크림 120ml]
                  </Text>
                  <Image
                    src={data.imagePath1}
                    width={`100%`}
                    height={width < 700 ? `165px` : `225px`}
                  />
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  bgColor={`${Theme.white_C}`}
                  margin={`10px 0 0`}
                >
                  <CustomRate value={data.rate} disabled></CustomRate>
                  <Text
                    color={Theme.darkGrey_C}
                    fontSize={width < 700 ? `14px` : `16px`}
                    fontWeight={`600`}
                  >
                    {data.title}
                  </Text>
                  <Wrapper dr={`row`} ju={`space-between`}>
                    <Text
                      fontSize={width < 700 ? `12px` : `14px`}
                      color={Theme.grey3_C}
                    >
                      {data.username}
                    </Text>

                    <Text
                      fontSize={width < 700 ? `12px` : `14px`}
                      color={Theme.grey3_C}
                    >
                      {data.viewCreatedAt}
                    </Text>
                  </Wrapper>
                </Wrapper>
              </ReviewWrapper>
            );
          })
        )}
      </Wrapper>

      <Wrapper margin={`50px 0 0`}>
        <CustomPage
          current={currentPage}
          total={reviewProductLastPage * 10}
          onChange={pageChnageHandler}
        />
      </Wrapper>

      {/* WRITE MODAL */}
      <CustomModal
        visible={wModal}
        onCancel={writeModalToggle}
        footer={null}
        title="리뷰 작성하기"
        width={width < 800 ? `100%` : `510px`}
      >
        <input
          type="file"
          name="file"
          hidden
          ref={imageRef}
          accept={`.jpeg, .jpg, .svg, .png`}
          onChange={writeImageHandler}
        />

        <HoverUploadWrapper onClick={writeImageRefHandler}>
          <CameraOutlined />
          사진 등록하기
        </HoverUploadWrapper>

        <Wrapper dr={`row`} ju={`flex-start`} margin={`20px 0`}>
          {reviewImageList &&
            reviewImageList.map((data) => (
              <Wrapper
                key={data.id}
                width={`auto`}
                position={`relative`}
                margin={reviewImageHistory.length !== data.id && `0 10px 0 0`}
              >
                <HoverCrossWrapper
                  onClick={() => writeImageDeleteHandler(data.id)}
                >
                  <CloseOutlined />
                </HoverCrossWrapper>
                <Image
                  width={`100px`}
                  height={`100px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.grey4_C}`}
                  src={data.path}
                  alt="reviewImage"
                />
              </Wrapper>
            ))}
        </Wrapper>

        <Form form={reviewForm} onFinish={writeReviewHandler}>
          <Form.Item
            label={"별점"}
            name={"rate"}
            rules={[{ required: true, message: "별점을 선택해주세요." }]}
          >
            <CustomRate />
          </Form.Item>

          <Form.Item
            label={"제목"}
            name={"title"}
            rules={[{ required: true, message: "제목을 선택해주세요." }]}
          >
            <Input placeholder="제목을 입력해주세요." suffix />
          </Form.Item>

          <Form.Item
            label={"내용"}
            name={"content"}
            rules={[{ required: true, message: "내용을 선택해주세요." }]}
          >
            <TextArea placeholder="내용을 입력해주세요." width={`100%`} />
          </Form.Item>

          <Wrapper ju={`flex-end`} padding={`0 0 10px`} dr={`row`}>
            <CommonButton type={`danger`} onClick={() => writeModalToggle()}>
              취소
            </CommonButton>
            <CommonButton
              htmlType="submit"
              margin={`0 0 0 10px`}
              kindOf={`basicTheme`}
            >
              작성
            </CommonButton>
          </Wrapper>
        </Form>
      </CustomModal>

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
              <Text fontSize={width < 700 ? `18px` : `24px`} fontWeight={`600`}>
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
    </WholeWrapper>
  );
};

export default Review;
