import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../../hooks/useWidth";
import Theme from "../../../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "../../../../components/commonComponents";
import { useRouter } from "next/dist/client/router";
import { NOTICE_DETAIL_REQUEST } from "../../../../reducers/notice";
import { FileImageOutlined } from "@ant-design/icons";

const TitleWrapper = styled(Wrapper)`
  text-align: center;
  margin: 26px 0 12px;
  font-size: 24px;
  font-weight: bold;
`;

const DownloadA = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  color: ${(props) => props.theme.grey_C};
`;

const NoticeDetail = () => {
  ////// GLOBAL STATE //////
  const { detail } = useSelector((state) => state.notice);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const id = router.query.id;

  ////// USEEFFECT //////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch({
        type: NOTICE_DETAIL_REQUEST,
        data: id,
      });
    }
  }, [id]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보 | NOTICE</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
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
            <Wrapper ju={`flex-end`} dr={`row`} margin={`50px 0 100px`}>
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

            <Wrapper
              padding={`55px 0 0`}
              borderTop={`1px solid ${Theme.darkGrey_C}`}
              borderBottom={`1px solid ${Theme.darkGrey_C}`}
            >
              <Wrapper
                width={`62px`}
                height={`31px`}
                bgColor={Theme.grey3_C}
                color={Theme.white_C}
              >
                {detail && detail[0].type}
              </Wrapper>
              <TitleWrapper>{detail && detail[0].title}</TitleWrapper>
              <Wrapper color={Theme.grey3_C}>
                {detail && detail[0].createdAt}
              </Wrapper>

              {/* content */}
              <Wrapper
                ju={`flex-start`}
                al={`flex-start`}
                margin={`55px 0 100px`}
                padding={width < 800 ? `0 30px` : `0 123px`}
                minHeight={`200px`}
              >
                {detail && detail[0].content}
              </Wrapper>

              <Wrapper
                borderTop={`1px solid ${Theme.lightGrey4_C}`}
                padding={width < 800 ? `18px 30px` : `18px 123px`}
                ju={`space-between`}
                dr={`row`}
              >
                <DownloadA href={detail && detail[0].file} download>
                  <FileImageOutlined />
                  <Text margin={`0 0 0 5px`}>첨부 파일</Text>
                </DownloadA>
                <Wrapper width={`auto`} color={Theme.grey_C}>
                  {detail && `작성자 : ${detail[0].author}`}
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <CommonButton
              width={`146px`}
              height={`48px`}
              margin={`55px 0 100px`}
              kindOf={`basicTheme`}
              radius={`5px`}
              fontSize={`18px`}
              onClick={() => moveLinkHandler(`/csCenter/notice`)}
            >
              목록
            </CommonButton>
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

export default NoticeDetail;
