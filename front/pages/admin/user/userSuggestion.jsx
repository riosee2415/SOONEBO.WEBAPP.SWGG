import {
  ClockCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";
import PageHeader from "../../../components/admin/PageHeader";
import AdminLayout from "../../../components/AdminLayout";
import {
  AdminContent,
  GuideDiv,
  Text,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import useInput from "../../../hooks/useInput";
import useWidth from "../../../hooks/useWidth";
import { AGENCY_LIST_REQUEST } from "../../../reducers/agency";
import { GRADE_ALL_LIST_REQUEST } from "../../../reducers/grade";
import {
  LOAD_MY_INFO_REQUEST,
  USER_SUGGESTION_REQUEST,
  USER_SUGGESTION_SELECT_REQUEST,
  USER_UNDER_REQUEST,
} from "../../../reducers/user";
import wrapper from "../../../store/configureStore";

//////////////////////////////////////////////////////
////////////////////////STYLED////////////////////////
//////////////////////////////////////////////////////

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
  margin: 0 5px;

  @media (max-width: 700px) {
    margin: 0;
  }
`;

const CustomInput = styled(Input)`
  width: ${(props) => props.width || `100%`};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

const SelectStyle = styled(Select)`
  width: ${(props) => props.width || `100%`};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

const CustomButton = styled(Button)`
  margin: ${(props) => props.margin};
`;

const SearchForm = styled(Form)`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-right: 15px;

  & .ant-form-item {
    width: 100px;
    margin: 0;
  }

  & .ant-form-item,
  & .ant-form-item-control-input {
    min-height: 0;
  }
`;

const userSuggestion = () => {
  const width = useWidth();
  //////////////////////////////////////////////////////
  /////////////////////////HOOK/////////////////////////
  //////////////////////////////////////////////////////

  const email = useInput(null);
  const username = useInput(null);
  const [name, setName] = useState(null);
  const [lvValue, setLvValue] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [dateToggle, setDateToggle] = useState(1);
  const [modalName, setModalName] = useState(null);
  const [modalPeople, setModalPeaple] = useState(0);
  const [detailModal, setDetailModal] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [modalUsername, setModalUsername] = useState(null);
  const [modalDateToggle, setModalDateToggle] = useState(1);
  const [usernameToggle, setUsernameToggle] = useState(false);

  //////////////////////////////////////////////////////
  /////////////////////////REDUX////////////////////////
  //////////////////////////////////////////////////////

  const router = useRouter();
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();

  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { agencys, st_agencyListError } = useSelector((state) => state.agency);
  const { gradeAllList, st_gradeListError } = useSelector(
    (state) => state.grade
  );
  const {
    topUser,
    underUser,
    underUserAll,
    underUserNumber,
    topUserSelect,
    //
    st_userSuggestionLoading,
    st_userSuggestionError,
    st_userUnderLoading,
    st_userUnderDone,
    st_userUnderError,
  } = useSelector((state) => state.user);

  //////////////////////////////////////////////////////
  /////////////////////USE EFFECT//////////////////////
  //////////////////////////////////////////////////////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    if (st_agencyListError) {
      message.error(st_agencyListError);
    }
  }, [st_agencyListError]);

  useEffect(() => {
    if (st_gradeListError) {
      message.error(st_gradeListError);
    }
  }, [st_gradeListError]);

  useEffect(() => {
    if (st_userSuggestionError) {
      message.error(st_userSuggestionError);
    }
  }, [st_userSuggestionError]);

  useEffect(() => {
    if (st_userUnderError) {
      message.error(st_userUnderError);
    }
  }, [st_userUnderError]);

  useEffect(() => {
    if (st_userUnderDone) {
      if (!modalName) {
        setModalPeaple(underUserAll.allUserCnt);
      } else {
        if (underUserNumber.length !== 0) {
          setModalPeaple(underUserNumber[0].peopleCnt);
        } else {
          setModalPeaple(0);
        }
      }
    }
  }, [st_userUnderDone]);

  useEffect(() => {
    dispatch({
      type: USER_SUGGESTION_REQUEST,
      data: {
        username: username.value,
        email: email.value,
        agencyId: 5,
        gradeId: lvValue,
        dateSort: dateToggle,
      },
    });
  }, [username.value]);

  //////////////////////////////////////////////////////
  ///////////////////////HANDLER////////////////////////
  //////////////////////////////////////////////////////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const modalHandler = useCallback(
    (parentId) => {
      setDetailModal((prev) => !prev);
      setModalId(parentId.id);
      setModalUsername(parentId.username);
      dispatch({
        type: USER_UNDER_REQUEST,
        data: {
          parentId: parentId.id,
        },
      });
      message.info(`${parentId.username}님의 피추천인이 조회됩니다.`);
    },
    [detailModal, modalId, modalUsername]
  );

  const modalCancleHandler = useCallback(() => {
    setModalDateToggle(1);
    setModalId(null);
    setModalName(null);
    setModalUsername(null);
    setDetailModal((prev) => !prev);
    setModalPeaple(0);
  }, [detailModal]);

  const nameHandler = useCallback(
    (data) => {
      setName(5);
      dispatch({
        type: USER_SUGGESTION_REQUEST,
        data: {
          agencyId: 5,
          gradeId: lvValue,
        },
      });
    },
    [name]
  );

  const modalNameHandler = useCallback(
    (data) => {
      setModalName(data);
      dispatch({
        type: USER_UNDER_REQUEST,
        data: {
          parentId: modalId,
          agencyId: 5,
        },
      });
    },
    [modalName, modalId]
  );

  const lvValueHandler = useCallback(
    (data) => {
      setLvValue(data);
      dispatch({
        type: USER_SUGGESTION_REQUEST,
        data: {
          gradeId: data,
          agencyId: 5,
        },
      });
    },
    [lvValue]
  );

  const submitHandler = useCallback(() => {
    if (username.value || email.value) {
      dispatch({
        type: USER_SUGGESTION_REQUEST,
        data: {
          username: username.value,
          email: email.value,
          agencyId: 5,
          gradeId: lvValue,
          dateSort: dateToggle,
        },
      });
      if (username.value) {
        setUsernameToggle(true);
      }
      if (email.value) {
        setEmailToggle(true);
      }
    } else {
      message.error(`이름 또는 이메일을 입력해주세요.`);
    }
  }, [username.value, email.value, name, lvValue, dateToggle]);

  const allHandler = useCallback(() => {
    dispatch({
      type: USER_SUGGESTION_REQUEST,
    });
    username.setValue(null);
    email.setValue(null);
    setName(null);
    setLvValue(null);
    setEmailToggle(false);
    setUsernameToggle(false);
    message.info(`전체가 조회됩니다.`);
    searchForm.resetFields();
  }, []);

  const modalAllHandler = useCallback(() => {
    dispatch({
      type: USER_UNDER_REQUEST,
      data: {
        parentId: modalId,
      },
    });
    setModalName(null);
    message.info(`${modalUsername}님의 피추천인 전체가 조회됩니다.`);
  }, [modalId]);

  const dateHandler = useCallback(() => {
    if (dateToggle === 1) {
      setDateToggle(2);
      message.info(`가입일 최신순으로 조회됩니다.`);
      dispatch({
        type: USER_SUGGESTION_REQUEST,
        data: {
          username: username.value,
          email: email.value,
          agencyId: 5,
          gradeId: lvValue,
          dateSort: 2,
        },
      });
    } else if (dateToggle === 2) {
      setDateToggle(1);
      message.info(`가입일 등록순으로 조회됩니다.`);
      dispatch({
        type: USER_SUGGESTION_REQUEST,
        data: {
          username: username.value,
          email: email.value,
          agencyId: 5,
          gradeId: lvValue,
          dateSort: 1,
        },
      });
    }
  }, [dateToggle, username.value, email.value, name, lvValue]);

  const madalDateHandler = useCallback(() => {
    if (modalDateToggle === 1) {
      setModalDateToggle(2);
      message.info(`가입일 최신순으로 조회됩니다.`);
      dispatch({
        type: USER_UNDER_REQUEST,
        data: {
          parentId: modalId,
          agencyId: 5,
          dateSort: 2,
        },
      });
    } else if (modalDateToggle === 2) {
      setModalDateToggle(1);
      message.info(`가입일 등록순으로 조회됩니다.`);
      dispatch({
        type: USER_UNDER_REQUEST,
        data: {
          parentId: modalId,
          agencyId: 5,
          dateSort: 1,
        },
      });
    }
  }, [modalDateToggle, modalId, modalName]);

  const usernameHandler = useCallback(
    (e) => {
      username.setValue(e);
    },
    [username]
  );

  //////////////////////////////////////////////////////
  /////////////////////DATA COLUMNS/////////////////////
  //////////////////////////////////////////////////////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이름",
      render: (data) => (
        <Text
          fontWeight={usernameToggle ? `700` : ``}
          bgColor={usernameToggle ? Theme.subTheme3_C : ``}
        >
          {data.username}
        </Text>
      ),
    },
    {
      title: "아이디",
      dataIndex: "userId",
    },
    {
      title: "이메일",
      render: (data) => (
        <Text
          fontWeight={emailToggle ? `700` : ``}
          bgColor={emailToggle ? Theme.subTheme3_C : ``}
        >
          {data.email}
        </Text>
      ),
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "소속",
      render: (data) => (
        <Text
          fontWeight={name ? `700` : ``}
          bgColor={name ? Theme.subTheme3_C : ``}
        >
          {data.name}
        </Text>
      ),
    },
    {
      title: "직급",
      render: (data) => (
        <Text
          fontWeight={lvValue ? `700` : ``}
          bgColor={lvValue ? Theme.subTheme3_C : ``}
        >
          {data.lvValue}
        </Text>
      ),
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "피추천인 보기",
      render: (parentId) => (
        <Button
          size="small"
          type="primary"
          onClick={() => modalHandler(parentId)}
        >
          피추천인
        </Button>
      ),
    },
  ];

  const modalColumns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "아이디",
      dataIndex: "userId",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      title: "소속",
      render: (data) => (
        <Text
          fontWeight={modalName ? `700` : ``}
          bgColor={modalName ? Theme.subTheme3_C : ``}
        >
          {data.name}
        </Text>
      ),
    },
    {
      title: "직급",
      dataIndex: "lvValue",
    },
    {
      title: "가입일",
      dataIndex: "viewCreatedAt",
    },
  ];

  // render: (data) => (
  //   <Text width={`100%`} isEllipsis color={Theme.subTheme5_C}>
  //     {data.lvValue}
  //   </Text>
  // ),

  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리", "회원별 추천 현황"]}
        title={`회원별 추천 현황`}
        subTitle={`회원별 추천 현황을 조회할 수 있습니다.`}
      />
      <AdminContent>
        <Wrapper
          dr="row"
          ju="space-between"
          margin="0px 0px 10px 0px"
          borderBottom={`1px dashed ${Theme.lightGrey4_C}`}
          padding="5px 0px"
        >
          <Wrapper
            width={width < 700 ? `100%` : `60%`}
            dr="row"
            ju={width < 700 ? `space-between` : "flex-start"}
          >
            <CustomSelect
              width={width < 700 ? `49%` : `100px`}
              size="small"
              placeholder="직급"
              onChange={(data) => lvValueHandler(data)}
              value={lvValue}
            >
              {gradeAllList &&
                gradeAllList.map((data) => {
                  if (data.lvValue !== "any") {
                    return (
                      <Select value={data.id} key={data.id}>
                        {data.lvValue}
                      </Select>
                    );
                  }
                })}
            </CustomSelect>
            <Wrapper
              dr={`row`}
              width={width < 700 ? `100%` : `auto`}
              ju={`space-between`}
              margin={width < 700 ? `5px 0` : `0`}
            >
              <SearchForm form={searchForm}>
                <Form.Item name="username">
                  <SelectStyle
                    margin={width < 700 ? `0` : `0 0 0 5px`}
                    width={width < 700 ? `40%` : `100px`}
                    size="small"
                    placeholder="이름"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={usernameHandler}
                  >
                    {topUserSelect &&
                      topUserSelect.map((data) => (
                        <Select.Option value={data.username} key={data.id}>
                          {data.username}
                        </Select.Option>
                      ))}
                  </SelectStyle>
                </Form.Item>
              </SearchForm>
              <CustomInput
                width={width < 700 ? `40%` : `200px`}
                size="small"
                placeholder="이메일"
                {...email}
              />
              <Button
                icon={<SearchOutlined />}
                size="small"
                onClick={() => submitHandler()}
              >
                검색
              </Button>
            </Wrapper>
          </Wrapper>
          <Wrapper
            width={width < 700 ? `100%` : `30%`}
            dr={`row`}
            ju={`flex-end`}
          >
            <CustomButton
              margin={`0 5px 0 0`}
              icon={<ClockCircleOutlined />}
              size="small"
              type="primary"
              onClick={() => dateHandler()}
            >
              {dateToggle === 1 ? `가입일 최신순` : `가입일 등록순`}
            </CustomButton>
            <Button
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={() => allHandler()}
            >
              전체조회
            </Button>
          </Wrapper>
        </Wrapper>

        {/* ADMIN GUIDE AREA */}
        <Wrapper
          margin={`0px 0px 10px 0px`}
          radius="5px"
          bgColor={Theme.lightGrey5_C}
          padding="5px"
          fontSize="13px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>
            소속, 직급은 선택 시 바로 조회됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            원하시는 조건을 선택하거나 입력 후 검색버튼을 누르면 해당되는 회원이
            조회됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            전체조회 버튼을 누르면 피추천인이 있는 모든 회원들이 조회됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>모바일은 가로스크롤로 확인해주세요.</GuideDiv>
        </Wrapper>

        <Wrapper overflow={`auto`}>
          <Wrapper minWidth={`900px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={columns}
              dataSource={topUser}
              size="small"
              loading={st_userSuggestionLoading}
            />
          </Wrapper>
        </Wrapper>
      </AdminContent>

      <Modal
        visible={detailModal}
        footer={null}
        width={`1080px`}
        title="피추천인 보기"
        onCancel={() => modalCancleHandler()}
      >
        <Wrapper
          dr="row"
          ju="space-between"
          margin="0px 0px 10px 0px"
          borderBottom={`1px dashed ${Theme.lightGrey4_C}`}
          padding="5px 0px"
        >
          <Wrapper
            width={width < 700 ? `100%` : `60%`}
            dr="row"
            ju="flex-start"
          >
            <CustomSelect
              width={width < 700 ? `100%` : `100px`}
              size="small"
              placeholder="소속"
              onChange={(data) => modalNameHandler(data)}
              value={modalName}
            >
              {agencys &&
                agencys.map((data) => {
                  return (
                    <Select value={data.id} key={data.id}>
                      {data.name}
                    </Select>
                  );
                })}
            </CustomSelect>
            <CustomInput
              readOnly
              value={`${modalPeople}명`}
              width={width < 700 ? `100%` : `100px`}
              size="small"
              textAlign={`right`}
              bgColor={Theme.lightGrey5_C}
              margin={width < 700 ? `5px 0` : `0`}
            />
          </Wrapper>
          <Wrapper
            width={width < 700 ? `100%` : `30%`}
            dr={`row`}
            ju={`flex-end`}
          >
            <CustomButton
              margin={`0 5px 0 0`}
              icon={<ClockCircleOutlined />}
              size="small"
              type="primary"
              onClick={() => madalDateHandler()}
            >
              {modalDateToggle === 1 ? `가입일 최신순` : `가입일 등록순`}
            </CustomButton>
            <Button
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={() => modalAllHandler()}
            >
              전체조회
            </Button>
          </Wrapper>
        </Wrapper>
        <Wrapper
          margin={`0px 0px 10px 0px`}
          radius="5px"
          bgColor={Theme.lightGrey5_C}
          padding="5px"
          fontSize="13px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>소속은 선택 시 바로 조회됩니다.</GuideDiv>
          <GuideDiv isImpo={true}>
            상단의 인원 수는 전체 또는 소속별 피추천인 수입니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            전체조회 버튼을 누르면 해당 회원의 모든 피추천인이 조회됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>모바일은 가로스크롤로 확인해주세요.</GuideDiv>
        </Wrapper>
        <Wrapper overflow={`auto`}>
          <Wrapper minWidth={`900px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={modalColumns}
              dataSource={underUser}
              size="small"
              loading={st_userUnderLoading}
            />
          </Wrapper>
        </Wrapper>
      </Modal>
    </AdminLayout>
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
      type: USER_SUGGESTION_REQUEST,
    });

    context.store.dispatch({
      type: USER_SUGGESTION_SELECT_REQUEST,
    });

    context.store.dispatch({
      type: GRADE_ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: AGENCY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(userSuggestion);
