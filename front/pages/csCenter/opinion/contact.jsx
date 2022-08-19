import React, { useCallback, useEffect } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../../hooks/useWidth";
import useInput from "../../../hooks/useInput";
import Theme from "../../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Head from "next/head";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  TextArea,
} from "../../../components/commonComponents";
import { Checkbox, Input, message, notification, Select } from "antd";
import { useRouter } from "next/dist/client/router";
import {
  OPINION_CREATE_REQUEST,
  OPINION_TYPE_GET_REQUEST,
  RESET_OPINION_CREATE,
} from "../../../reducers/opinion";

const CommonCheckBox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.basicTheme_C};
    border-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox-input:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-inner {
    border-color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-checkbox-checked::after {
    border: none;
  }
`;

const CustomInput = styled(Input)`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  height: 48px;
  border: 1px solid ${Theme.lightGrey4_C};
  border-radius: 4px;

  & .ant-input-affix-wrapper:hover {
    border: 1px solid ${Theme.basicTheme_C} !important;
  }

  & .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: ${Theme.basicTheme_C};
  }

  &::placeholder {
    font-size: 14px;
    line-height: 1.6;
    color: ${(props) => props.theme.lightGrey_C};
  }

  @media (max-width: 700px) {
    height: 42px;
  }
`;

const CustomSelect = styled(Select)`
  width: 285px;
  height: 48px;

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

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Contact = () => {
  ////// GLOBAL STATE //////

  const { types, st_opinionCreateDone, st_opinionCreateError } = useSelector(
    (state) => state.opinion
  );

  const { me } = useSelector((state) => state.user);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const { Option } = Select;

  const type = useInput("");
  const email = useInput("");
  const title = useInput("");
  const content = useInput("");
  const isTerm = useInput(false);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (!me) {
      message.error("로그인이 필요한 페이지입니다.");

      moveLinkHandler(`/login`);
    }
  }, [me]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (st_opinionCreateDone) {
      type.setValue("");
      email.setValue("");
      title.setValue("");
      content.setValue("");
      isTerm.setValue(false);

      dispatch({
        type: RESET_OPINION_CREATE,
      });

      message.success("고객의 의견이 접수되었습니다.");

      return;
    }
  }, [st_opinionCreateDone]);

  useEffect(() => {
    if (st_opinionCreateError) {
      return message.error(st_opinionCreateError);
    }
  }, [st_opinionCreateError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const opinionHandler = useCallback(() => {
    if (!type.value || type.value === "") {
      return LoadNotification("안내", "문의유형을 선택해주세요.");
    }
    if (!email.value || email.value.trim() === "") {
      return LoadNotification("안내", "이메일을 입력해주세요.");
    }
    if (!title.value || title.value.trim() === "") {
      return LoadNotification("안내", "제목을 입력해주세요.");
    }
    if (!content.value || content.value.trim() === "") {
      return LoadNotification("안내", "내용을 입력해주세요.");
    }
    if (!isTerm.value) {
      return LoadNotification("안내", "개인정보 제공에 동의해주세요.");
    }

    dispatch({
      type: OPINION_CREATE_REQUEST,
      data: {
        typeId: type.value,
        email: email.value,
        title: title.value,
        content: content.value,
        terms: isTerm.value,
      },
    });
  }, [type, email, title, content, isTerm]);

  ////// DATAVIEW //////
  return (
    <>
      <Head>
        <title>순애보 | C/S CENTER</title>
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

            <Wrapper
              width={width < 900 ? `100%` : `60%`}
              padding={width < 900 ? `50px 10px` : `75px`}
              shadow={`0 0 30px ${Theme.lightGrey4_C}`}
              margin={`70px 0 140px`}
            >
              <Text
                fontSize={width < 900 ? `18px` : `30px`}
                fontWeight={`bold`}
                margin={`0 0 30px`}
              >
                고객의 의견
              </Text>

              <Wrapper al={`flex-start`}>
                <CustomSelect
                  defaultValue="문의유형"
                  value={type.value}
                  onChange={(e) => type.setValue(e)}
                >
                  <Option disabled={true} value={""}>
                    문의유형을 선택해주세요.
                  </Option>
                  {types &&
                    types.map((data) => {
                      return (
                        <Option key={data.id} value={data.id}>
                          {data.value}
                        </Option>
                      );
                    })}
                </CustomSelect>
              </Wrapper>

              <CustomInput
                margin={`10px 0`}
                suffix
                placeholder="이메일"
                {...email}
              />
              <CustomInput suffix placeholder="의견 제목" {...title} />
              <TextArea
                width={`100%`}
                height={`85px`}
                placeholder="의견 내용"
                margin={`10px 0 18px`}
                {...content}
              />
              <CommonCheckBox
                checked={isTerm.value}
                onChange={() => isTerm.setValue(!isTerm.value)}
              >
                개인정보 제공에 동의합니다(필수)
              </CommonCheckBox>
              <CommonButton
                margin={`10px 0 0`}
                width={`145px`}
                height={`48px`}
                radius={`5px`}
                kindOf={`basicTheme`}
                fontSize={`18px`}
                type={`danger`}
                onClick={opinionHandler}
              >
                문의하기
              </CommonButton>
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

    context.store.dispatch({
      type: OPINION_TYPE_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Contact;
