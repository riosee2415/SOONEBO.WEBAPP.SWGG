import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../../reducers/user";
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
import styled from "styled-components";
import { Form, message, Radio, Select } from "antd";
import KakaoLogin from "react-kakao-login";

const CustomForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .ant-form-item {
    width: 100%;
  }

  & .ant-form-item-control-input-content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const HoverSpan = styled(SpanText)`
  position: relative;
  &:before {
    transition: 0.5s;
    position: absolute;
    bottom: -3px;
    left: 0;
    content: "";
    width: 0;
    height: 1px;
    background: ${Theme.grey_C};
  }
  &:hover:before {
    width: 100%;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const { st_loginDone, st_loginError, st_kakaoLoginDone, st_kakaoLoginError } =
    useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loginDone) {
      router.push("/");

      return message.success("로그인 되었습니다.");
    }
  }, [st_loginDone]);

  useEffect(() => {
    if (st_loginError) {
      return message.error(st_loginError);
    }
  }, [st_loginError]);

  // 카카오로그인
  useEffect(() => {
    if (st_kakaoLoginDone) {
      router.push("/");

      message.success("로그인 되었습니다.");
    }
  }, [st_kakaoLoginDone]);

  useEffect(() => {
    if (st_kakaoLoginError) {
      return message.error(st_kakaoLoginError);
    }
  }, [st_kakaoLoginError]);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const signinHandler = useCallback((data) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId: data.email,
        password: data.password,
      },
    });
  }, []);

  const kakaoLoginHandler = useCallback((req) => {
    const userId = "Kakao_" + req.profile.id;

    // const info = {
    //   userId,
    //   email: req.profile.kakao_account.email,
    //   username: req.profile.kakao_account.profile.nickname,
    // };

    // localStorage.setItem("platform", "3r5sKGMdgUoKaKasdaoiJej5TtN");
    // localStorage.setItem(
    //   "3r5sKGMdgUoKaKasdaoiJej5TtN",
    //   JSON.stringify({ ...info })
    // );

    dispatch({
      type: KAKAO_LOGIN_REQUEST,
      data: {
        userId,
        password: req.profile.kakao_account.email,
        username: String(req.profile.kakao_account.profile.nickname),
      },
    });
  }, []);
  ////// DATAVIEW //////

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <Head>
        <title>순애보</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper
            height={`100vh`}
            bgImg={`url(
              "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/login/bg.png"
            )`}
          >
            <RsWrapper
              height={`100%`}
              padding={width < 700 ? `70px 0 0` : `120px 0 0 0`}
            >
              <Wrapper
                width={width < 700 ? `100%` : `500px`}
                height={width < 700 ? `450px` : `570px`}
                bgColor={`rgba(255, 255, 255, 0.7)`}
              >
                <Text fontSize={`30px`} margin={`0 0 30px`}>
                  로그인
                </Text>
                <CustomForm onFinish={signinHandler}>
                  <Wrapper width={width < 700 ? `80%` : `70%`}>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "아이디를 입력해주세요." },
                      ]}
                    >
                      <TextInput
                        width={`100%`}
                        height={`48px`}
                        margin={`0 0 10px`}
                        border={`none`}
                        radius={`5px`}
                        placeholder={`아이디`}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "비밀번호를 입력해주세요." },
                      ]}
                    >
                      <TextInput
                        type="password"
                        width={`100%`}
                        height={`48px`}
                        margin={`0 0 16px`}
                        border={`none`}
                        placeholder={`비밀번호`}
                        radius={`5px`}
                      />
                    </Form.Item>
                    <CommonButton
                      htmlType="submit"
                      type={`danger`}
                      width={`100%`}
                      radius={`5px`}
                      height={`48px`}
                      margin={`0 0 10px`}
                      kindOf={`basicTheme`}
                    >
                      <Text fontSize={`18px`}>로그인</Text>
                    </CommonButton>

                    <KakaoLogin
                      jsKey={process.env.NEXT_PUBLIC_SNS_KAKAO_KEY}
                      onSuccess={kakaoLoginHandler}
                      onFailure={(error) => {
                        console.log(error);
                      }}
                      getProfile="true"
                      render={({ onClick }) => {
                        return (
                          <CommonButton
                            type={`danger`}
                            width={`100%`}
                            radius={`5px`}
                            height={`48px`}
                            margin={`0 0 10px`}
                            kindOf={`kakao`}
                            onClick={(e) => {
                              e.preventDefault();
                              onClick();
                            }}
                          >
                            <Wrapper dr={`row`}>
                              <Wrapper width={`22px`} margin={`0 6px 0 0`}>
                                <Image
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/kakao.png`}
                                />
                              </Wrapper>
                              <Text fontSize={`18px`}>카카오톡으로 로그인</Text>
                            </Wrapper>
                          </CommonButton>
                        );
                      }}
                    />
                  </Wrapper>
                </CustomForm>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  width={width < 700 ? `80%` : `70%`}
                >
                  <Text
                    cursor={`pointer`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                    onClick={() => moveLinkHandler(`/join`)}
                  >
                    <HoverSpan>회원가입</HoverSpan>
                  </Text>
                  <Wrapper
                    dr={`row`}
                    width={`auto`}
                    color={Theme.grey_C}
                    fontSize={`16px`}
                  >
                    <Text cursor={`pointer`}>
                      <HoverSpan onClick={() => moveLinkHandler(`/findId`)}>
                        ID
                      </HoverSpan>
                      &nbsp;/&nbsp;
                      <HoverSpan onClick={() => moveLinkHandler(`/findPw`)}>
                        PW
                      </HoverSpan>
                      &nbsp;
                    </Text>
                    찾기
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
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
