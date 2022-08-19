import React from "react";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  RsWrapper,
  WholeWrapper,
  Image,
  Text,
  Wrapper,
  SpanText,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import Fade from "react-reveal/Fade";
import useWidth from "../../hooks/useWidth";

const Intro = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
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
        <WholeWrapper
          margin={width < 800 ? `79px 0 0` : `119px 0 0`}
          bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/brand-story/bg.png")`}
        >
          <RsWrapper>
            <Fade bottom>
              <Image
                alt="logo"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/brand-story/logo.png`}
                margin={`60px 0 80px`}
                width={width < 900 ? `120px` : `170px`}
              />
            </Fade>
            <Image
              alt="logo"
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/brand-story/img1.png`}
              width={width < 900 ? `300px` : `462px`}
            />
            <Fade bottom>
              <Text
                fontSize={width < 900 ? `30px` : `56px`}
                fontWeight={`bold`}
                color={Theme.basicTheme_C}
              >
                피부에 면역을 입히다
              </Text>
              <Text
                fontSize={width < 900 ? `16px` : `22px`}
                color={Theme.darkGrey_C}
              >
                피부는 물론 건강까지 생각하는 화장품
              </Text>
              <Text
                fontSize={width < 900 ? `16px` : `22px`}
                color={Theme.darkGrey_C}
              >
                코스메슈티컬 브랜드 순애보 다프네
              </Text>
            </Fade>
            <Wrapper
              dr={width < 900 ? `column-reverse` : `row`}
              margin={width < 900 ? `80px 0` : `150px 0`}
            >
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                al={width < 900 ? `center` : `flex-end`}
                padding={width < 900 ? `45px 10px` : `45px 50px 45px 0`}
                bgColor={`linear-gradient(270deg, ${Theme.white_C}, rgba(255, 255, 255, 0.6) )`}
              >
                <Fade bottom>
                  <Text
                    fontSize={width < 900 ? `18px` : `34px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    순애보
                  </Text>
                  <Text
                    fontSize={width < 900 ? `16px` : `22px`}
                    color={Theme.darkGrey_C}
                  >
                    순수함으로 오로지 한길만을 따라가는 진실한 사람.
                  </Text>
                  <Text
                    fontSize={width < 900 ? `16px` : `22px`}
                    color={Theme.darkGrey_C}
                  >
                    사랑할 수 밖에 없는 "
                    <SpanText color={Theme.basicTheme_C}>진실한 제품</SpanText>
                    "을 의미합니다.
                  </Text>
                </Fade>
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                al={width < 900 ? `center` : `flex-start`}
              >
                <Image
                  alt="logo"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/brand-story/img2.png`}
                  width={width < 900 ? `300px` : `462px`}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} margin={width < 900 ? `0 0 50px` : `0 0 150px`}>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                al={width < 900 ? `center` : `flex-end`}
              >
                <Image
                  alt="logo"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/brand-story/img3.png`}
                  width={width < 900 ? `300px` : `462px`}
                />
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `50%`}
                al={width < 900 ? `center` : `flex-start`}
                padding={width < 900 ? `45px 10px` : `45px 0 45px 50px`}
                bgColor={`linear-gradient(90deg, ${Theme.white_C}, rgba(255, 255, 255, 0.6) )`}
              >
                <Fade bottom>
                  <Text
                    fontSize={width < 900 ? `18px` : `34px`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    다프네
                  </Text>
                  <Text
                    textAlign={width < 900 && `center`}
                    fontSize={width < 900 ? `16px` : `22px`}
                    color={Theme.darkGrey_C}
                  >
                    라틴어로 월계수를 의미합니다.&nbsp;
                    <SpanText color={Theme.basicTheme_C}>사랑의 요정</SpanText>
                    이자 태양의 신인 아폴론의 첫사랑 올림포스 12신 중 한명인
                    아르테미스신과 순결을 약속한 요정으로 아르테미스와 약속한
                    순결을 지키느라 아폴론의 구애를 받지못하고 끝내 원계수로
                    변해버린 전설이 있습니다.
                  </Text>
                </Fade>
              </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Intro;
