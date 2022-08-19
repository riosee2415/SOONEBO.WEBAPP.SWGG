import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  FIND_PASS_REQUEST,
  LOAD_MY_INFO_REQUEST,
  PASS_UPDATE_REQUEST,
  SECRET_CODE_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  Image,
  RsWrapper,
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

  const {
    st_findPassDone,
    st_findPassError,
    //
    st_secretCodeDone,
    st_secretCodeError,
    //
    st_passUpdateDone,
    st_passUpdateError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const userId = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const password = useInput("");
  const [passwordCheck, setPasswordCheck] = useState(``);

  const [currentPage, setCurrentPage] = useState(0);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_findPassDone) {
      message.success("입력하신 이메일로 인증코드가 전송되었습니다.");

      userId.setValue("");
      email.setValue("");

      setCurrentPage(1);
    }
  }, [st_findPassDone]);

  useEffect(() => {
    if (st_findPassError) {
      return message.error(st_findPassError);
    }
  }, [st_findPassError]);

  useEffect(() => {
    if (st_secretCodeDone) {
      message.success("인증코드가 획인이 되었습니다.");

      secret.setValue("");

      setCurrentPage(2);
    }
  }, [st_secretCodeDone]);

  useEffect(() => {
    if (st_secretCodeError) {
      return message.error(st_secretCodeError);
    }
  }, [st_secretCodeError]);

  useEffect(() => {
    if (st_passUpdateDone) {
      message.success("비밀번호가 변경되었습니다.");

      userId.setValue("");
      password.setValue("");
      setPasswordCheck("");

      moveLinkHandler(`/login`);
    }
  }, [st_passUpdateDone]);

  useEffect(() => {
    if (st_passUpdateError) {
      return message.error(st_passUpdateError);
    }
  }, [st_passUpdateError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const findIdHandler = useCallback(() => {
    if (!userId.value || userId.value.trim() === "") {
      return LoadNotification("안내", "아이디를 입력해주세요.");
    }

    if (!email.value || email.value.trim() === "") {
      return LoadNotification("안내", "이메일을 입력해주세요.");
    }

    dispatch({
      type: FIND_PASS_REQUEST,
      data: {
        userId: userId.value,
        email: email.value,
      },
    });
  }, [userId.value, email.value]);

  const checkSecretCodeHandler = useCallback(() => {
    if (!secret.value || secret.value.trim() === "") {
      return LoadNotification("안내", "인증코드를 입력해주세요.");
    }

    dispatch({
      type: SECRET_CODE_REQUEST,
      data: { secret: secret.value },
    });
  }, [secret.value]);

  const checkPasswordChangeHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
    },
    [password.value]
  );

  const changePasswordHandler = useCallback(() => {
    if (!userId.value || userId.value.trim() === "") {
      return LoadNotification("안내", "아이디를 입력해주세요.");
    }

    if (!password.value || password.value.trim() === "") {
      return LoadNotification("안내", "비밀번호를 입력해주세요.");
    }

    if (!passwordCheck || passwordCheck.trim() === "") {
      LoadNotification("안내", "비밀번호 재확인을 입력해주세요.");
      return;
    }

    if (password.value !== passwordCheck) {
      LoadNotification("안내", "비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch({
      type: PASS_UPDATE_REQUEST,
      data: {
        userId: userId.value,
        password: password.value,
      },
    });
  }, [userId.value, password.value, passwordCheck]);

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
                비밀번호 찾기
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
                  placeholder={`아이디`}
                  {...userId}
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
                  <Text fontSize={`18px`}>비밀번호 찾기</Text>
                </CommonButton>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`login`)}
                  >
                    로그인
                  </Text>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`join`)}
                  >
                    회원가입
                  </Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          )}

          {currentPage === 1 && (
            <RsWrapper
              padding={width < 700 ? `100px 0 20px` : `200px 0 120px 0`}
            >
              <Text fontSize={`30px`} margin={`0 0 40px`}>
                인증코드
              </Text>

              <FindGuide
                width={width < 700 ? `100%` : `340px`}
                margin={`0 0 10px`}
              >
                <Text>입력하신 이메일로 인증코드를 전송했습니다.</Text>
                <Text>인증코드를 입력해주세요.</Text>
              </FindGuide>

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
                  placeholder={`인증코드`}
                  {...secret}
                />

                <CommonButton
                  type={`danger`}
                  kindOf={`basicTheme`}
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  margin={`0 0 10px`}
                  onClick={checkSecretCodeHandler}
                >
                  <Text fontSize={`18px`}>인증코드 확인</Text>
                </CommonButton>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`login`)}
                  >
                    로그인
                  </Text>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`join`)}
                  >
                    회원가입
                  </Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          )}

          {currentPage === 2 && (
            <RsWrapper
              padding={width < 700 ? `100px 0 20px` : `200px 0 120px 0`}
            >
              <Text fontSize={`30px`} margin={`0 0 40px`}>
                비밀번호 변경
              </Text>

              <FindGuide
                width={width < 700 ? `100%` : `340px`}
                margin={`0 0 10px`}
              >
                <Text>새로운 비밀번호로 변경해주세요.</Text>
              </FindGuide>

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
                  placeholder={`아이디`}
                  {...userId}
                />
                <TextInput
                  type="password"
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  margin={`0 0 10px`}
                  placeholder={`비밀번호`}
                  {...password}
                />
                <TextInput
                  type="password"
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  margin={`0 0 10px`}
                  placeholder={`비밀번호 재확인`}
                  onChange={checkPasswordChangeHandler}
                />

                <CommonButton
                  type={`danger`}
                  kindOf={`basicTheme`}
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  margin={`0 0 10px`}
                  onClick={changePasswordHandler}
                >
                  <Text fontSize={`18px`}>비밀번호 변경</Text>
                </CommonButton>
                <Wrapper dr={`row`} ju={`space-between`}>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`login`)}
                  >
                    로그인
                  </Text>
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`join`)}
                  >
                    회원가입
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
