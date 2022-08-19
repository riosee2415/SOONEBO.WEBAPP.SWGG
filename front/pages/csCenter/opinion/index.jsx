import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import styled from "styled-components";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
} from "../../../components/commonComponents";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import useWidth from "../../../hooks/useWidth";

const MaxWidthWrapper = styled(Wrapper)`
  width: 80%;
  margin: 50px 0 70px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Opinion = () => {
  ////// GLOBAL STATE //////

  const width = useWidth();
  const router = useRouter();
  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  ////// DATAVIEW //////
  return (
    <>
      <Head>
        <title>순애보 | C/S CENTER</title>
      </Head>

      <ClientLayout>
        <WholeWrapper padding={`0 0 70px`}>
          <Wrapper
            height={width < 700 ? `250px` : `360px`}
            ju={`flex-end`}
            padding={width < 700 ? `0 0 50px` : `0 0 77px`}
            bgImg={`url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/sub_ban/cs-center.png")`}
          >
            <Wrapper
              fontSize={width < 700 ? `20px` : `40px`}
              fontWeight={`bold`}
            >
              C/S CENTER
            </Wrapper>
            <Wrapper fontSize={width < 700 ? `16px` : `24px`}>Soonaebo</Wrapper>
          </Wrapper>
          <RsWrapper>
            {/* 상단 탭 */}
            <Wrapper ju={`flex-end`} dr={`row`} margin={`50px 0 60px`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/notice`)}
              >
                NOTICE
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/faq`)}
              >
                FAQ
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/qna`)}
              >
                Q&#38;A
              </Wrapper>
              <Wrapper
                width={`auto`}
                margin={width < 700 ? `0 10px` : `0 25px`}
              >
                |
              </Wrapper>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/csCenter/opinion`)}
              >
                OPINION
              </Wrapper>
            </Wrapper>

            <Wrapper fontSize={`34px`} fontWeight={`bold`}>
              OPINION
            </Wrapper>

            <MaxWidthWrapper>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/opinion/img1.png`}
              />
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/opinion/img2.png`}
              />
            </MaxWidthWrapper>

            <Link href={`/csCenter/opinion/contact`}>
              <a>
                <Wrapper width={`180px`} height={`48px`}>
                  <CommonButton
                    width={`100%`}
                    height={`100%`}
                    radius={`5px`}
                    kindOf={`basicTheme`}
                    fontSize={`18px`}
                    type={`danger`}
                  >
                    의견작성하기
                  </CommonButton>
                </Wrapper>
              </a>
            </Link>
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

export default Opinion;
