import React, { useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
} from "../../components/commonComponents";
import { useRouter } from "next/dist/client/router";

const MenuBtnWrapper = styled(Wrapper)`
  width: calc(50% - 10px);
  border: 1px solid ${Theme.darkGrey_C};
  padding: 40px 0;
  font-size: 24px;
  justify-content: flex-start;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    background-color: ${Theme.subTheme2_C};
    border: 1px solid ${Theme.basicTheme_C};
  }

  @media (max-width: 800px) {
    font-size: 18px;
  }

  @media (max-width: 700px) {
    width: 100%;
    justify-content: center;
  }
`;

const CsCenter = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();
  const router = useRouter();
  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
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
        <WholeWrapper>
          <RsWrapper>
            {/* 메인제목 */}
            <Wrapper
              margin={width < 700 ? `140px 0 10px` : `200px 0 10px`}
              color={Theme.darkGrey_C}
              fontSize={width < 700 ? `20px` : `40px`}
              fontWeight={`bold`}
            >
              C/S CENTER
            </Wrapper>
            <Wrapper
              color={Theme.darkGrey_C}
              fontSize={width < 700 ? `16px` : `24px`}
            >
              Soonaebo
            </Wrapper>

            {/* 메뉴 바로가기버튼 */}
            <Wrapper
              dr={width < 700 ? `column` : `row`}
              margin={`80px 0 20px`}
              width={width < 900 ? `100%` : `80%`}
            >
              <MenuBtnWrapper
                margin={width < 700 ? `0 0 20px` : `0 20px 0 0`}
                onClick={() => moveLinkHandler(`/csCenter/notice`)}
              >
                {/* 버튼내 왼쪽정렬을 위한 Wrapper */}
                <Wrapper
                  width={`25%`}
                  display={width < 700 ? `none` : `flex`}
                ></Wrapper>
                <Image
                  width={`50px`}
                  height={`50px`}
                  alt="icon"
                  margin={`0 25px 0 0`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/cs_notice.png`}
                />
                NOTICE 바로가기
              </MenuBtnWrapper>
              <MenuBtnWrapper onClick={() => moveLinkHandler(`/csCenter/faq`)}>
                {/* 버튼내 왼쪽정렬을 위한 Wrapper */}
                <Wrapper
                  width={`25%`}
                  display={width < 700 ? `none` : `flex`}
                ></Wrapper>
                <Image
                  width={`50px`}
                  height={`50px`}
                  alt="icon"
                  margin={`0 25px 0 0`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/cs_faq.png`}
                />
                FAQ 바로가기
              </MenuBtnWrapper>
            </Wrapper>
            <Wrapper
              dr={width < 700 ? `column` : `row`}
              margin={`0 0 120px`}
              width={width < 900 ? `100%` : `80%`}
            >
              <MenuBtnWrapper
                margin={width < 700 ? `0 0 20px` : `0 20px 0 0`}
                onClick={() => moveLinkHandler(`/csCenter/qna`)}
              >
                {/* 버튼내 왼쪽정렬을 위한 Wrapper */}
                <Wrapper
                  width={`25%`}
                  display={width < 700 ? `none` : `flex`}
                ></Wrapper>
                <Image
                  width={`50px`}
                  height={`50px`}
                  alt="icon"
                  margin={`0 25px 0 0`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/cs_qna.png`}
                />
                Q&#38;A 바로가기
              </MenuBtnWrapper>
              <MenuBtnWrapper
                onClick={() => moveLinkHandler(`/csCenter/opinion`)}
              >
                {/* 버튼내 왼쪽정렬을 위한 Wrapper */}
                <Wrapper
                  width={`25%`}
                  display={width < 700 ? `none` : `flex`}
                ></Wrapper>
                <Image
                  width={`50px`}
                  height={`50px`}
                  alt="icon"
                  margin={`0 25px 0 0`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/cs_opinion.png`}
                />
                OPINION 바로가기
              </MenuBtnWrapper>
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

export default CsCenter;
