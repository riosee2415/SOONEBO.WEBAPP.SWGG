import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  CommonTitle,
  Text,
  Image,
  WholeWrapper,
  Wrapper,
  RsWrapper2,
  StyleBtn,
  CommonButton,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";

import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import ProductSlider from "../components/slide/productSlider";
import ReviewSlider from "../components/slide/ReviewSlider";
import Fade from "react-reveal/Fade";
import { RightOutlined } from "@ant-design/icons";
import ProductMobileSlider from "../components/slide/ProductMobileSlider";
import ReviewModalSlider from "../components/slide/ReviewModalSlider";
import Link from "next/link";
import { PRODUCT_LIST_REQUEST } from "../reducers/product";
import { useRouter } from "next/router";
import { Empty, message, Modal, Rate } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { REVIEW_MAIN_SLIDE_REQUEST } from "../reducers/review";

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

const CustomRate = styled(Rate)`
  color: ${Theme.basicTheme_C};
`;

const ImgWrapper = styled(Wrapper)`
  width: ${(props) => props.width || `calc(100% / 4.2)`};
  position: relative;

  img.product {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover {
    img.product {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Home = ({}) => {
  ////// GLOBAL STATE //////

  const { products } = useSelector((state) => state.product);

  const { reviewMainSlide, st_reviewMainSlideError } = useSelector(
    (state) => state.review
  );

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  // 모달
  const [rModal, setRModal] = useState(false); // 리뷰 모달
  const [reviewDetailData, setReviewDetailData] = useState(null); // 리뷰 모달 상세정보

  ////// TOGGLE//////

  const rModalToggle = useCallback(
    (data) => {
      if (data) {
        setReviewDetailData(data);
      } else {
        setReviewDetailData(null);
      }

      setRModal((prev) => !prev);
    },
    [rModal, reviewDetailData]
  );

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_reviewMainSlideError) {
      return message.error(st_reviewMainSlideError);
    }
  }, [st_reviewMainSlideError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Mainslider />

          <Wrapper
            padding={width < 900 ? `80px 0` : `120px 0`}
            bgColor={Theme.lightGrey2_C}
          >
            <RsWrapper2>
              <Wrapper dr={`row`} ju={`space-between`}>
                <ImgWrapper
                  width={width < 1100 && `100%`}
                  al={width < 1100 ? `center` : `flex-start`}
                  margin={width < 1100 && `0 0 20px`}
                >
                  <Text fontSize={width < 900 ? `20px` : `30px`}>
                    순애보 DAPHNE
                  </Text>
                  <Text
                    fontSize={
                      width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`
                    }
                    color={Theme.grey3_C}
                  >
                    코스메슈티컬 브랜드 순애보 다프네
                  </Text>
                </ImgWrapper>
                {width < 900 ? (
                  <ProductMobileSlider />
                ) : (
                  <>
                    {products && products.length === 0 ? (
                      <Wrapper>
                        <Empty description={"등록된 상품이 없습니다."} />
                      </Wrapper>
                    ) : (
                      products &&
                      products.slice(0, 3).map((data) => {
                        return (
                          <ImgWrapper
                            width={width < 1100 && `32%`}
                            key={data.id}
                            cursor={`pointer`}
                            onClick={() =>
                              moveLinkHandler(`/product/${data.id}`)
                            }
                          >
                            <Image alt="thumnail" src={data.thumbnail} />
                            <Image
                              className="product"
                              alt="thumnail-hover"
                              src={data.hoverImage}
                            />
                            <Text
                              fontSize={
                                width < 1100
                                  ? width < 800
                                    ? `14px`
                                    : `16px`
                                  : `18px`
                              }
                              margin={`15px 0 0`}
                            >
                              {data.title}
                            </Text>
                            <Text
                              fontSize={
                                width < 1100
                                  ? width < 800
                                    ? `14px`
                                    : `16px`
                                  : `18px`
                              }
                              color={Theme.subTheme4_C}
                            >
                              {data.realPrice}
                            </Text>
                          </ImgWrapper>
                        );
                      })
                    )}
                  </>
                )}
              </Wrapper>
            </RsWrapper2>
          </Wrapper>

          <RsWrapper2 padding={width < 900 ? `80px 0` : `100px 0`}>
            <Fade bottom>
              <CommonTitle>PRODUCT</CommonTitle>
            </Fade>
            <Text
              fontSize={width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`}
              color={Theme.grey3_C}
              margin={`10px 0 60px`}
            >
              순애보로 면역을 선물합니다.
            </Text>
            <ProductSlider />
          </RsWrapper2>

          <Wrapper
            padding={width < 900 ? `80px 0` : `145px 0`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/main/bg_video.png")`}
          >
            <Wrapper
              width={width < 1100 ? `90%` : `70%`}
              height={width < 900 ? (width < 700 ? `200px` : `450px`) : `600px`}
            >
              <iframe
                width={`100%`}
                height={`100%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/main/main.mp4`}
                frameBorder="0"
                allow="accelerometer; autoplay; loop; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Wrapper>
          </Wrapper>

          <RsWrapper2 padding={width < 900 ? `80px 0` : `100px 0`}>
            <Fade bottom>
              <CommonTitle>REVIEW</CommonTitle>
            </Fade>
            <Text
              fontSize={width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`}
              color={Theme.grey3_C}
              margin={`10px 0 60px`}
            >
              순애보와 함께한 순간들
            </Text>
            <ReviewSlider datum={reviewMainSlide} rModalToggle={rModalToggle} />
          </RsWrapper2>

          <Wrapper
            padding={width < 900 ? `80px 0` : `100px 0`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/main/bg_brandstory.png")`}
          >
            <RsWrapper2>
              <Fade bottom>
                <CommonTitle>BRAND STORY</CommonTitle>

                <Text
                  fontSize={
                    width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`
                  }
                  color={Theme.grey2_C}
                  margin={`10px 0 5px`}
                >
                  피부는 물론 건강까지 생각하는 화장품 코스메슈티컬 브랜드
                </Text>
                <Text
                  fontSize={
                    width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`
                  }
                  color={Theme.grey2_C}
                  margin={`0 0 70px`}
                >
                  순애보 다프네의 이야기를 들어보고싶다면
                </Text>
              </Fade>
              <Link href={`/company/intro`}>
                <a>
                  <StyleBtn
                    width={`140px`}
                    height={`45px`}
                    fontWeight={`bold`}
                    border={`1px solid ${Theme.darkGrey_C}`}
                    color={Theme.darkGrey_C}
                  >
                    <Text zIndex={`1`}>MORE VIEW</Text>
                  </StyleBtn>
                </a>
              </Link>
            </RsWrapper2>
          </Wrapper>

          <RsWrapper2
            dr={`row`}
            padding={
              width < 900 ? `50px 0` : width < 900 ? `80px 0` : `100px 0`
            }
          >
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% /3)`}
              fontSize={`14ox`}
              color={Theme.grey_C}
            >
              <Fade bottom>
                <Link href={`/csCenter/notice`}>
                  <a>
                    <Text isHover>공지사항</Text>
                  </a>
                </Link>
                <Link href={`/service`}>
                  <a>
                    <Text isHover margin={`10px 0`}>
                      이용약관
                    </Text>
                  </a>
                </Link>
                <Link href={`/privacy`}>
                  <a>
                    <Text isHover>개인정보처리방침</Text>
                  </a>
                </Link>
              </Fade>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% /3)`}
              fontSize={`14ox`}
              color={Theme.grey_C}
              padding={width < 900 && `50px 0`}
            >
              <Fade bottom>
                <Text>고객센터</Text>
                <Text
                  fontSize={`26px`}
                  fontWeight={`bold`}
                  color={Theme.darkGrey_C}
                >
                  1522-4462
                </Text>
                <Text>운영시간 : AM 09:00 ~ PM 06:00</Text>
                <Text>휴무 : 법정공휴일, 토요일, 일요일</Text>
              </Fade>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `calc(100% /3)`}
              fontSize={`14ox`}
              color={Theme.grey_C}
            >
              <Fade bottom>
                <Text>문의하기</Text>
                <Text margin={`15px 0 25px`}>rcp2019@naver.com</Text>
                <Wrapper dr={`row`}>
                  <Link href={`/csCenter/faq`}>
                    <a>
                      <CommonButton
                        width={`120px`}
                        fontSize={`14px`}
                        kindOf={`white`}
                        type={`danger`}
                        margin={`0 5px 0 0`}
                      >
                        <Wrapper dr={`row`} ju={`space-between`}>
                          FAQ
                          <RightOutlined />
                        </Wrapper>
                      </CommonButton>
                    </a>
                  </Link>
                  <Link href={`/csCenter/opinion`}>
                    <a>
                      <CommonButton
                        width={`120px`}
                        fontSize={`14px`}
                        kindOf={`white`}
                        type={`danger`}
                      >
                        <Wrapper dr={`row`} ju={`space-between`}>
                          1:1문의하기 <RightOutlined />
                        </Wrapper>
                      </CommonButton>
                    </a>
                  </Link>
                </Wrapper>
              </Fade>
            </Wrapper>
          </RsWrapper2>

          <Popup />

          {/* REVIEW MODAL */}

          {/* DETAIL MODAL */}
          <CustomModal
            visible={rModal}
            onCancel={rModalToggle}
            footer={null}
            width={width < 800 ? `100%` : `510px`}
          >
            {reviewDetailData && (
              <>
                <Wrapper dr={`row`} ju={`space-between`} padding={`40px 0 0`}>
                  <Text
                    fontSize={width < 700 ? `18px` : `24px`}
                    fontWeight={`600`}
                  >
                    {reviewDetailData.title}
                  </Text>
                  <CloseOutlined
                    style={{
                      cursor: "pointer",
                      fontSize: 25,
                      color: Theme.lightGrey_C,
                    }}
                    onClick={() => rModalToggle()}
                  />
                </Wrapper>
                <Wrapper al={`flex-start`} padding={`18px 0 0 0`}>
                  <Text
                    fontSize={width < 700 ? `14px` : `16px`}
                    color={Theme.grey3_C}
                  >
                    {reviewDetailData.username}
                  </Text>

                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    padding={`0 0 5px 0`}
                  >
                    <Text
                      fontSize={width < 700 ? `12px` : `14px`}
                      color={Theme.grey3_C}
                    >
                      {reviewDetailData.viewCreatedAt}
                    </Text>

                    <CustomRate value={reviewDetailData.rate} disabled />
                  </Wrapper>

                  <ReviewModalSlider
                    datum={[
                      reviewDetailData.imagePath1
                        ? reviewDetailData.imagePath1
                        : null,
                      reviewDetailData.imagePath2
                        ? reviewDetailData.imagePath2
                        : null,
                      reviewDetailData.imagePath3
                        ? reviewDetailData.imagePath3
                        : null,
                      reviewDetailData.imagePath4
                        ? reviewDetailData.imagePath4
                        : null,
                    ].filter((data) => data)}
                  />

                  <Wrapper al={`flex-start`} padding={`10px 0 60px 0`}>
                    <Text
                      fontWeight={`600`}
                      fontSize={width < 700 ? `18px` : `24px`}
                    >
                      {reviewDetailData.title}
                    </Text>

                    <Text
                      fontSize={width < 700 ? `16px` : `18px`}
                      color={Theme.grey3_C}
                    >
                      {reviewDetailData.content}
                    </Text>
                  </Wrapper>
                </Wrapper>
              </>
            )}
          </CustomModal>
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
      type: PRODUCT_LIST_REQUEST,
    });

    context.store.dispatch({
      type: REVIEW_MAIN_SLIDE_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
