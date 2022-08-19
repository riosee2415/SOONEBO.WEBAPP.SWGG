import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { FIND_ID_REQUEST, LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  Image,
  RsWrapper,
  SpanText,
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { Checkbox, message, notification } from "antd";
import styled from "styled-components";
import useInput from "../../hooks/useInput";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const FindGuide = styled(Wrapper)`
  align-items: ${(props) => props.al || `flex-start`};
  padding: 20px 10px;
  background: ${Theme.subTheme3_C};
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${Theme.lightGrey_C};
  line-height: 150%;
  box-shadow: 1px 1px 5px #eeeeee;
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { findId, st_findIdDone, st_findIdError } = useSelector(
    (state) => state.user
  );

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const name = useInput("");
  const email = useInput("");

  const [currentPage, setCurrentPage] = useState(0);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_findIdDone) {
      message.success("아이디를 찾았습니다.");

      name.setValue("");
      email.setValue("");

      setCurrentPage(1);
    }
  }, [st_findIdDone]);

  useEffect(() => {
    if (st_findIdError) {
      return message.error(st_findIdError);
    }
  }, [st_findIdError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const findIdHandler = useCallback(() => {
    if (!name.value || name.value.trim() === "") {
      return LoadNotification("안내", "이름을 입력해주세요.");
    }

    if (!email.value || email.value.trim() === "") {
      return LoadNotification("안내", "이메일을 입력해주세요.");
    }

    dispatch({
      type: FIND_ID_REQUEST,
      data: {
        username: name.value,
        email: email.value,
      },
    });
  }, [name.value, email.value]);

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
          {currentPage === 0 && (
            <RsWrapper
              padding={width < 700 ? `100px 0 20px` : `200px 0 120px 0`}
            >
              <Text fontSize={`30px`} margin={`0 0 40px`}>
                아이디 찾기
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `340px`}
                ju={`flex-start`}
                al={`flex-start`}
              >
                <TextInput
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  margin={`0 0 10px`}
                  placeholder={`이름`}
                  {...name}
                />
                <TextInput
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  margin={`0 0 10px`}
                  placeholder={`이메일`}
                  {...email}
                />

                <CommonButton
                  type={`danger`}
                  kindOf={`basicTheme`}
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  margin={`0 0 10px`}
                  onClick={findIdHandler}
                >
                  <Text fontSize={`18px`}>아이디 찾기</Text>
                </CommonButton>

                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`/login`)}
                  >
                    로그인
                  </Text>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`/join`)}
                  >
                    회원가입
                  </Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          )}

          {currentPage === 1 && (
            <RsWrapper
              height={`calc(100vh - 300px)`}
              padding={width < 700 ? `100px 0 20px` : `200px 0 120px 0`}
            >
              <Text fontSize={`30px`} margin={`0 0 40px`}>
                아이디 확인
              </Text>
              <Wrapper
                width={width < 700 ? `100%` : `340px`}
                ju={`flex-start`}
                al={`flex-start`}
              >
                <Wrapper>
                  <FindGuide al={`center`} margin={`0 0 10px`}>
                    <SpanText
                      fontSize={`15px`}
                      fontWeight={`600`}
                      textDecoration={`underline`}
                    >
                      {findId
                        ? `아이디 : ${findId.slice(0, findId.length - 2)}****`
                        : "입력하신 정보에 해당하는 아이디를 찾을 수 없습니다."}
                    </SpanText>
                  </FindGuide>
                </Wrapper>

                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`/login`)}
                  >
                    로그인
                  </Text>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`/findPw`)}
                  >
                    PW 찾기
                  </Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          )}
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

export default Index;
