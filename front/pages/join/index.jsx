import React, { useCallback, useEffect, useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  KAKAO_JOIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  SIGNUP_REQUEST,
  USERLIST_REQUEST,
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
import {
  Checkbox,
  Form,
  message,
  Modal,
  notification,
  Radio,
  Select,
} from "antd";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import KakaoLogin from "react-kakao-login";

const CustomCheckbox = styled(Checkbox)`
  & .ant-checkbox .ant-checkbox-inner {
    width: 24px;
    height: 24px;
    border: solid 1px ${Theme.basicTheme_C};
    border-radius: 50%;
  }
  & .ant-checkbox-inner:hover {
    border-radius: 50%;
  }
  .ant-checkbox-checked::after {
    border-radius: 50%;
  }

  & .ant-checkbox.ant-checkbox-checked {
    width: 24px;
    height: 24px;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Theme.basicTheme_C};
  }
  & .ant-checkbox-checked .ant-checkbox-inner::after {
    display: none;
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const CustomSelect = styled(Select)`
  width: 100%;
  height: 48px;

  margin: 0 0 26px;

  color: ${Theme.grey4_C};

  .ant-select-selector,
  .ant-select-selector .ant-select-selection-search-input {
    height: 48px !important;
    border-radius: 5px !important;
  }

  .ant-select-selector .ant-select-selection-item,
  .ant-select-selector .ant-select-selection-placeholder {
    line-height: 48px !important;
  }

  &:hover {
    border-color: ${Theme.red_C};
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////

  const {
    users,
    st_signUpDone,
    st_signUpError,
    st_kakaoJoinDone,
    st_kakaoJoinError,
  } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const userId = useInput(``);
  const password = useInput(``);
  const name = useInput(``);
  const mobile = useInput(``);
  const email = useInput(``);
  const manager = useInput(``);
  const [userType, setUserType] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(``);

  const [modalOpen, setModalOpen] = useState(false);

  ////// REDUX //////
  ////// USEEFFECT //////

  // 일반 회원가입
  useEffect(() => {
    if (st_signUpDone) {
      message.success("회원가입되었습니다.");

      userId.setValue("");
      password.setValue("");
      name.setValue("");
      mobile.setValue("");
      email.setValue("");
      manager.setValue("");
      setIsCheck(false);
      setUserType(false);

      moveLinkHandler("/login");
    }
  }, [st_signUpDone]);

  useEffect(() => {
    if (st_signUpError) {
      message.error(st_signUpError);
    }
  }, [st_signUpError]);

  // 카카오 회원가입
  useEffect(() => {
    if (st_kakaoJoinDone) {
      manager.setValue("");
      setUserType(false);

      router.push("/");

      message.success("회원가입되었습니다");
    }
  }, [st_kakaoJoinDone]);

  useEffect(() => {
    if (st_kakaoJoinError) {
      message.error(st_kakaoJoinError);
    }
  }, [st_kakaoJoinError]);

  ////// TOGGLE //////
  const openModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, [modalOpen]);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const checkPasswordChangeHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
    },
    [password.value]
  );

  const onSubmit = useCallback(() => {
    if (!userId.value || userId.value.trim() === "") {
      return LoadNotification("안내", "아이디을 입력해주세요.");
    }

    if (!password.value || password.value.trim() === "") {
      return LoadNotification("안내", "비밀번호를 입력해주세요.");
    }

    if (password.value !== passwordCheck) {
      LoadNotification("안내", "비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!name.value || name.value.trim() === "") {
      return LoadNotification("안내", "이름을 입력해주세요.");
    }

    if (!mobile.value || mobile.value.trim() === "") {
      return LoadNotification("안내", "연락처를 입력해주세요.");
    }

    if (!email.value || email.value.trim() === "") {
      return LoadNotification("안내", "이메일을 입력해주세요.");
    }

    if (isCheck === false) {
      return LoadNotification("안내", "개인정보 수집을 선택해주세요.");
    }

    if (userType === true) {
      if (!manager.value || manager.value === "") {
        return LoadNotification("안내", "추천인을 입력해주세요.");
      }
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        userId: userId.value,
        password: password.value,
        username: name.value,
        mobile: mobile.value,
        email: email.value,
        terms: isCheck,
        managerId: manager.value,
        agencyId: 5,
        isSale: userType,
      },
    });
  }, [
    userId.value,
    password.value,
    passwordCheck,
    name.value,
    mobile.value,
    email.value,
    isCheck,
    userType,
    manager.value,
  ]);

  const kakaoJoinHandler = useCallback(
    (req) => {
      if (userType === true) {
        if (!manager.value || manager.value === "") {
          return message.error("추천인을 입력해주세요.");
        }
      }

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
        type: KAKAO_JOIN_REQUEST,
        data: {
          userId,
          password: req.profile.kakao_account.email,
          username: String(req.profile.kakao_account.profile.nickname),
          agencyId: 5,
          isSales: userType,
          managerId: manager.value,
        },
      });
    },
    [userType, manager.value]
  );
  ////// DATAVIEW //////

  return (
    <>
      <Head>
        <title>순애보</title>
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <Wrapper>
            <RsWrapper
              padding={width < 700 ? `100px 0 20px` : `200px 0 120px 0`}
            >
              <Text fontSize={`30px`} margin={`0 0 40px`}>
                회원가입
              </Text>

              <Wrapper
                width={width < 700 ? `100%` : `340px`}
                ju={`flex-start`}
                al={`flex-start`}
              >
                <CommonButton
                  type={`danger`}
                  width={`100%`}
                  radius={`5px`}
                  height={`48px`}
                  margin={`0 0 10px`}
                  kindOf={`kakao`}
                  onClick={() => openModalToggle()}
                >
                  <Wrapper dr={`row`}>
                    <Wrapper width={`22px`} margin={`0 6px 0 0`}>
                      <Image
                        src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/kakao.png`}
                      />
                    </Wrapper>
                    <Text fontSize={`18px`}>카카오톡으로 회원가입</Text>
                  </Wrapper>
                </CommonButton>

                <Text
                  fontSize={`13px`}
                  color={Theme.grey_C}
                  margin={`0 0 10px`}
                >
                  회원구분
                </Text>

                <Radio.Group
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                >
                  <Radio value={false} margin={`0 10px 0 0`}>
                    일반회원
                  </Radio>
                  <Radio value={true}>세일러</Radio>
                </Radio.Group>

                <Text fontSize={`13px`} color={Theme.grey_C} margin={`10px 0`}>
                  입력사항
                </Text>

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
                  margin={`0 0 16px`}
                  placeholder={`비밀번호 재확인`}
                  onChange={checkPasswordChangeHandler}
                />

                <Text
                  fontSize={`13px`}
                  color={Theme.grey_C}
                  margin={`0 0 10px`}
                >
                  개인정보
                </Text>

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
                  placeholder={`연락처`}
                  {...mobile}
                />

                <TextInput
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  margin={`0 0 26px`}
                  placeholder={`이메일`}
                  {...email}
                />

                <CustomSelect
                  placeholder="추천인"
                  value={manager.value}
                  onChange={(e) => manager.setValue(e)}
                >
                  <Select.Option disabled={true} value={""}>
                    추천인을 선택해주세요.
                  </Select.Option>
                  {users &&
                    users.map((data) => {
                      return (
                        <Select.Option key={data.id} value={data.id}>
                          {data.userId}
                        </Select.Option>
                      );
                    })}
                </CustomSelect>

                <CommonButton
                  type={`danger`}
                  kindOf={`basicTheme`}
                  width={`100%`}
                  height={`48px`}
                  radius={`5px`}
                  margin={`0 0 20px`}
                  fontSize={`18px`}
                  onClick={onSubmit}
                >
                  회원가입
                </CommonButton>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  onClick={() => setIsCheck((prev) => !prev)}
                  cursor={`pointer`}
                >
                  <CustomCheckbox checked={isCheck} />
                  <Text padding={`0 0 0 8px`}>
                    개인정보, 이용약관에 전체 동의합니다.
                  </Text>
                </Wrapper>

                <Wrapper
                  margin={`12px 0 0`}
                  padding={`15px 0 15px 20px`}
                  bgColor={Theme.subTheme2_C}
                  al={`flex-start`}
                  ju={`center`}
                  dr={`column`}
                  radius={`5px`}
                >
                  <Text margin={`0 0 10px`}>
                    개인정보 제공에 동의합니다.(필수)
                  </Text>
                  <Text>이용약관에 동의합니다.(필수)</Text>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>

          <Modal
            visible={modalOpen}
            onCancel={openModalToggle}
            footer={null}
            title={`카카오로그인`}
          >
            <Text fontSize={`13px`} color={Theme.grey_C} margin={`0 0 10px`}>
              회원구분
            </Text>

            <Radio.Group
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
              style={{ marginBottom: 26 }}
            >
              <Radio value={false} margin={`0 10px 0 0`}>
                일반회원
              </Radio>
              <Radio value={true}>세일러</Radio>
            </Radio.Group>

            <CustomSelect
              placeholder="추천인"
              value={manager.value}
              onChange={(e) => manager.setValue(e)}
            >
              <Select.Option disabled={true} value={""}>
                추천인을 선택해주세요.
              </Select.Option>
              {users &&
                users.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.userId}
                    </Select.Option>
                  );
                })}
            </CustomSelect>

            <KakaoLogin
              jsKey={process.env.NEXT_PUBLIC_SNS_KAKAO_KEY}
              onSuccess={kakaoJoinHandler}
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
                      <Text fontSize={`18px`}>카카오톡으로 회원가입</Text>
                    </Wrapper>
                  </CommonButton>
                );
              }}
            />
          </Modal>
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
      type: USERLIST_REQUEST,
      data: {
        agencyId: 5,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
