import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, withRouter } from "next/router";

import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import {
  GuideDiv,
  ModalBtn,
  Text,
  Wrapper,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";

import styled from "styled-components";
import {
  Table,
  Button,
  message,
  Modal,
  Select,
  notification,
  Input,
  Form,
  Popconfirm,
} from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

import {
  LOAD_MY_INFO_REQUEST,
  USER_LEVEL_MODAL_TOGGLE,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
  USER_DETAIL_MODAL_TOGGLE,
  SELECT_USER_REQUEST,
} from "../../../reducers/user";
import { GRADE_ALL_LIST_REQUEST } from "../../../reducers/grade";
import { AGENCY_LIST_REQUEST } from "../../../reducers/agency";
import useInput from "../../../hooks/useInput";
import { POINT_CREATE_REQUEST } from "../../../reducers/userPoint";
import { numberWithCommas } from "../../../components/commonUtils";
import useWidth from "../../../hooks/useWidth";

const AdminContent = styled.div`
  padding: 20px;
`;

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const SearchForm = styled(Form)`
  display: flex;
  flex-direction: row;
  width: auto;

  & .ant-form-item {
    width: 300px;
    margin: 0;
  }

  & .ant-form-item,
  & .ant-form-item-control-input {
    min-height: 0;
  }

  @media (max-width: 900px) {
    width: 100%;
    margin: 0 0 5px;
  }
`;

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
  margin: 0 5px 0 0;

  @media (max-width: 700px) {
    margin: 0 0 5px;
  }
`;

const CustomInput = styled(Input)`
  width: 100%;
`;

const PointInput = styled(Input)`
  text-align: right;
  width: 85%;
  margin-right: 5px;
  margin-left: ${(props) => props.marginLeft};
  background-color: ${(props) => props.bgcolor};

  & > input {
    text-align: right;
    background-color: ${(props) => props.bgcolor};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const UserList = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const {
    users,
    me,
    selectUser,
    //
    levelModal,
    detailModal,
    //
    st_loadMyInfoDone,
    //
    st_userListLoading,
    st_userListError,
    //
    st_userListUpdateDone,
    st_userListUpdateError,
  } = useSelector((state) => state.user);
  const { gradeAllList, st_gradeListError } = useSelector(
    (state) => state.grade
  );
  const { agencys, st_agencyListError } = useSelector((state) => state.agency);

  const { st_pointCreateDone, st_pointCreateError } = useSelector(
    (state) => state.userPoint
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////
  const width = useWidth();
  ////// HOOKS //////

  const [updateData, setUpdateData] = useState(null);
  const [detailData, setDetailData] = useState(null);

  // SEARCH STATE
  const [listUserGrade, setListUserGrade] = useState(null); // 직급
  const [listUserAgency, setListUserAgency] = useState(null); // 대리점
  const [listUsername, setListUsername] = useState(""); // 회원이름
  const [listUserEmail, setListUserEmail] = useState(""); // 회원이메일
  const [listSort, setListSort] = useState("1"); // 순서
  const [pointModal, setPointModal] = useState(false); // 포인트 모달 토글
  const [userPoint, setUserPoint] = useState(0);
  const [pointId, setPointId] = useState(null);

  const plusPoint = useInput(0);
  const sumPoint = useInput(0);

  const [searchForm] = Form.useForm();
  const [levelForm] = Form.useForm();
  const [detailForm] = Form.useForm();
  const [pointForm] = Form.useForm();

  ////// USEEFFECT //////

  // 기본 START //
  // 회원
  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        gradeId: listUserGrade,
        agencyId: listUserAgency,
        username: listUsername,
        email: listUserEmail,
        dateSort: listSort,
      },
    });
  }, [
    router.query,
    listUserGrade,
    listUserAgency,
    listSort,
    listUsername,
    listUserEmail,
  ]);

  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  // 직급
  useEffect(() => {
    if (st_gradeListError) {
      return message.error(st_gradeListError);
    }
  }, [st_gradeListError]);

  // 직급
  useEffect(() => {
    if (st_agencyListError) {
      return message.error(st_agencyListError);
    }
  }, [st_agencyListError]);
  // 기본 END //

  // 권한 수정 START //
  useEffect(() => {
    if (st_userListUpdateDone) {
      userLevelModalToggle(null);

      dispatch({
        type: USERLIST_REQUEST,
        data: {
          gradeId: listUserGrade,
          agencyId: listUserAgency,
          username: listUsername,
          email: listUserEmail,
          dateSort: listSort,
        },
      });

      return message.success("권한이 수정되었습니다.");
    }
  }, [st_userListUpdateDone]);

  useEffect(() => {
    if (st_userListUpdateError) {
      return message.error(st_userListUpdateError);
    }
  }, [st_userListUpdateError]);

  useEffect(() => {
    if (plusPoint.value) {
      const sum = parseInt(plusPoint.value) + parseInt(userPoint);
      sumPoint.setValue(sum);

      pointForm.setFieldsValue({
        sumPoints: sum,
      });
    } else {
      sumPoint.setValue(parseInt(userPoint));
      pointForm.setFieldsValue({
        sumPoints: parseInt(userPoint),
      });
    }
  }, [plusPoint.value, sumPoint.value, userPoint]);

  useEffect(() => {
    if (st_pointCreateDone) {
      message.success(`포인트 지급이 완료되었습니다.`);
      dispatch({
        type: USERLIST_REQUEST,
      });
      pointModalToggle();
    }
  }, [st_pointCreateDone]);

  useEffect(() => {
    if (st_pointCreateError) {
      message.error(st_pointCreateError);
    }
  }, [st_pointCreateError]);

  // 권한 수정 END //

  ////// TOGGLE //////

  // 권한수정 모델 START
  const userLevelModalToggle = useCallback(
    (data) => {
      if (data) {
        setUpdateData(data);
        levelForm.setFieldsValue({
          level: parseInt(data.level),
        });
      } else {
        setUpdateData(null);
        levelForm.resetFields();
      }

      dispatch({
        type: USER_LEVEL_MODAL_TOGGLE,
      });
    },
    [levelModal, updateData]
  );
  // 권한수정 모델 END //

  // 상세보기 모델 START //
  const userDetailModalToggle = useCallback(
    (data) => {
      if (data) {
        setDetailData(data);
        detailForm.setFieldsValue({
          userId: data.userId,
          userType: data.userType,
          dName: data.dName,
          username: data.username,
          email: data.email,
          mobile: data.mobile,
          level: data.level,
          address: data.address,
          detailAddress: data.detailAddress,
          amountPrice: data.viewAmountPrice,
        });
      } else {
        setDetailData(null);
      }
      dispatch({
        type: USER_DETAIL_MODAL_TOGGLE,
      });
    },
    [detailModal, detailData]
  );
  // 상세보기 모델 END //

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const pointModalToggle = useCallback(
    (data) => {
      if (data) {
        setUserPoint(data.userPoint);
        setPointId(data.id);

        pointForm.setFieldsValue({
          userPoints: data.userPoint,
        });
      } else {
        pointForm.resetFields();
        setUserPoint(0);
        setPointId(null);
        plusPoint.setValue(null);
      }

      setPointModal((prev) => !prev);
    },
    [pointModal, userPoint, pointId, plusPoint.value]
  );

  const pointSubmitHandler = useCallback(
    (data) => {
      if (plusPoint.value >= 0) {
        dispatch({
          type: POINT_CREATE_REQUEST,
          data: {
            point: plusPoint.value,
            userId: pointId,
          },
        });
      }
    },
    [plusPoint.value, pointId]
  );

  // SEARCH FUNCATION

  // 순서
  const searchListSortHandler = useCallback(
    (data) => {
      setListSort(data);
    },
    [listSort]
  );

  // 직급
  const searchListUserGradeHandler = useCallback(
    (data) => {
      setListUserGrade(data === "전체" ? null : data);
    },
    [listUserGrade]
  );

  // 대리점
  const searchListUserAgencyHandler = useCallback(
    (data) => {
      setListUserAgency(data === "전체" ? null : data);
    },
    [listUserAgency]
  );

  // 회원이름, 대리점 이름
  const searchListUsernameHandler = useCallback(
    (data) => {
      setListUsername(data.username ? data.username : "");
      setListUserEmail(data.email ? data.email : "");
    },
    [listUsername, listUserEmail]
  );

  // 전체
  const searchAllHandler = useCallback(() => {
    setListUserGrade(null);
    setListUserAgency(null);
    setListUsername("");
    setListUserEmail("");
    searchForm.resetFields();
  }, [listUserGrade, listUserAgency, listUsername, listUserEmail]);

  // LEVEL FUNCATION
  const levelModalSubmit = useCallback(() => {
    levelForm.submit();
  }, []);

  const onSubmitUpdate = useCallback(
    (data) => {
      if (updateData.level === data.level) {
        return LoadNotification(
          "ADMIN SYSTEM ERRLR",
          "현재 사용자와 같은 레벨로 수정할 수 없습니다.."
        );
      }

      dispatch({
        type: USERLIST_UPDATE_REQUEST,
        data: {
          selectUserId: updateData.id,
          changeLevel: data.level,
        },
      });
    },
    [updateData]
  );

  const selectHandler = useCallback(
    (e) => {
      setListUsername(e);
    },
    [listUsername]
  );

  ////// DATAVIEW //////

  //  LEVEL DATUM
  const levelDatum = [
    {
      disabled: false,
      name: "일반회원",
      level: 1,
    },
    // {
    //   name: "비어있음",
    //   level: 2
    // },
    {
      disabled: false,
      name: "운영자",
      level: 3,
    },
    {
      disabled: false,
      name: "최고관리자",
      level: 4,
    },
    {
      disabled: true,
      name: "개발사",
      level: 5,
    },
  ];

  // USER TABLE COLUMNS
  const columns = [
    {
      width: `5%`,
      title: "번호",
      align: "center",
      dataIndex: "id",
    },
    {
      width: `10%`,
      title: "아이디",
      dataIndex: "userId",
    },
    {
      width: `10%`,
      title: "이름",
      dataIndex: "username",
      ellipsis: true,
    },

    {
      width: `15%`,
      title: "이메일",
      dataIndex: "email",
      ellipsis: true,
    },

    {
      width: `10%`,
      title: "전화번호",
      dataIndex: "mobile",
      ellipsis: true,
    },

    {
      width: `8%`,
      title: "대리점",
      align: "center",
      render: (data) => (
        <Text width={`100%`} isEllipsis color={Theme.subTheme5_C}>
          {data.name}
        </Text>
      ),
    },

    {
      width: `5%`,
      title: "직급",
      align: "center",
      render: (data) => (
        <Text width={`100%`} isEllipsis color={Theme.subTheme5_C}>
          {data.lvValue}
        </Text>
      ),
    },

    {
      width: `6%`,
      title: "상세보기",
      align: "center",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => userDetailModalToggle(data)}
        >
          상세보기
        </Button>
      ),
    },

    {
      width: `8%`,
      title: "권한",
      align: "center",
      dataIndex: "viewLevel",
    },

    {
      width: `6%`,
      title: "권한수정",
      align: "center",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => userLevelModalToggle(data)}
        >
          권한수정
        </Button>
      ),
    },
    {
      width: `7%`,
      title: "포인트 지급",
      align: "center",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => pointModalToggle(data)}
        >
          포인트 지급
        </Button>
      ),
    },

    {
      width: `10%`,
      title: "가입일",
      dataIndex: "viewCreatedAt",
      ellipsis: true,
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리", "관리"]}
        title={`회원 리스트`}
        subTitle={`홈페이지에 가입한 회원를 확인할 수 있습니다.`}
      />
      <AdminContent>
        {/* ADMIN TOP MENU */}
        <Wrapper
          dr="row"
          ju="space-between"
          margin="0px 0px 10px 0px"
          borderBottom={`1px dashed ${Theme.lightGrey4_C}`}
          padding="5px 0px"
        >
          <Wrapper
            width={`100%`}
            dr={`row`}
            ju={width < 700 ? `flex-end` : `flex-start`}
          >
            <CustomSelect
              width={width < 700 ? `100%` : `130px`}
              value={listSort}
              onChange={searchListSortHandler}
              size="small"
            >
              <Select.Option value="1">오래된 가입일</Select.Option>
              <Select.Option value="2">최근 가입일</Select.Option>
            </CustomSelect>

            <CustomSelect
              width={width < 700 ? `100%` : `130px`}
              value={listUserGrade}
              onChange={searchListUserGradeHandler}
              size="small"
              placeholder="직급"
            >
              <Select.Option value={"전체"}>전체</Select.Option>
              {gradeAllList &&
                gradeAllList.map((data) => (
                  <Select.Option value={data.id} key={data.id}>
                    {data.lvValue}
                  </Select.Option>
                ))}
            </CustomSelect>

            <SearchForm form={searchForm} onFinish={searchListUsernameHandler}>
              <Form.Item name="username">
                <Select
                  size="small"
                  showSearch
                  placeholder="사용자명"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={selectHandler}
                >
                  {selectUser &&
                    selectUser.map((data) => (
                      <Select.Option value={data.username} key={data.id}>
                        {data.username}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name="email">
                <CustomInput size="small" placeholder="이메일" />
              </Form.Item>
              <Button icon={<SearchOutlined />} size="small" htmlType="submit">
                검색
              </Button>
            </SearchForm>

            <ModalBtn
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={searchAllHandler}
            >
              전체조회
            </ModalBtn>
          </Wrapper>
        </Wrapper>
        {/* ADMIN TOP MENU END */}

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
            직급, 사용자명, 대리점명으로 검색할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            직급변경, 권한수정은 수정 시 사이트 및 어플리케이션에 즉시 적용되기
            때문에 신중한 처리를 필요로 합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>탈퇴된 회원은 복구할 수 없습니다.</GuideDiv>
          <GuideDiv isImpo={true}>모바일은 가로스크롤로 확인해주세요.</GuideDiv>
        </Wrapper>

        {/* ADMIN GUIDE AREA END */}
        <Wrapper overflow={`auto`}>
          <Wrapper minWidth={`1200px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={columns}
              dataSource={users ? users : []}
              size="small"
              loading={st_userListLoading}
            />
          </Wrapper>
        </Wrapper>
      </AdminContent>
      {/* LEVEL MODAL */}
      <Modal
        visible={levelModal}
        width={`500px`}
        title={`사용자 권한 수정`}
        onCancel={() => userLevelModalToggle(null)}
        footer={
          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onCancel={() => userLevelModalToggle(null)}>
              취소
            </ModalBtn>
            <ModalBtn size="small" type="primary" onClick={levelModalSubmit}>
              수정
            </ModalBtn>
          </Wrapper>
        }
        okText="수정"
        cancelText="취소"
      >
        <CustomForm form={levelForm} onFinish={onSubmitUpdate}>
          <Form.Item
            label="권한"
            name="level"
            rules={[{ required: true, message: "권한을 선택해주세요." }]}
          >
            <Select>
              {levelDatum &&
                levelDatum.map((data) => (
                  <Select.Option
                    disabled={data.disabled}
                    value={data.level}
                    key={data.level}
                  >
                    {data.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </CustomForm>
      </Modal>

      {/* DETAIL MODAL */}
      <Modal
        title="회원상세정보"
        width={`550px`}
        visible={detailModal}
        footer={null}
        onCancel={() => userDetailModalToggle(null)}
      >
        {detailData && (
          <Wrapper>
            {/* 아이디 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                아이디
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.userId}</Text>
              </Wrapper>
            </Wrapper>

            {/* 회원이름 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                회원이름
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.username}</Text>
              </Wrapper>
            </Wrapper>

            {/* 이메일 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                이메일
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.email}</Text>
              </Wrapper>
            </Wrapper>

            {/* 전화번호 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                전화번호
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.mobile}</Text>
              </Wrapper>
            </Wrapper>

            {/* 주소 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                주소
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.address}</Text>
              </Wrapper>
            </Wrapper>

            {/* 상세주소 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                상세주소
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.detailAddress}</Text>
              </Wrapper>
            </Wrapper>

            {/* 우편번호 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                우편번호
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.postCode}</Text>
              </Wrapper>
            </Wrapper>

            {/* 보유 포인트 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                보유 포인트
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{numberWithCommas(detailData.userPoint)}원</Text>
              </Wrapper>
            </Wrapper>

            {/* 대리점 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                대리점
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text color={Theme.subTheme5_C}>{detailData.name}</Text>
              </Wrapper>
            </Wrapper>

            {/* 나의 추천인 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                나의 추천인
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text color={Theme.subTheme5_C}>
                  {detailData.mgrName ? detailData.mgrName : "-"}
                </Text>
              </Wrapper>
            </Wrapper>

            {/* 직급 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                직급
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text color={Theme.subTheme5_C}>{detailData.lvValue}</Text>
              </Wrapper>
            </Wrapper>

            {/* 권한 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                권한
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.viewLevel}</Text>
              </Wrapper>
            </Wrapper>

            {/* 생성일 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                생성일
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{detailData.viewCreatedAt}</Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        )}
      </Modal>

      {/* POINT MODAL */}
      <Modal
        visible={pointModal}
        width={`300px`}
        title={`포인트 지급하기`}
        onCancel={() => pointModalToggle(null)}
        footer={null}
        okText="수정"
        cancelText="취소"
      >
        <CustomForm
          form={pointForm}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 15 }}
          onFinish={pointSubmitHandler}
        >
          <Form.Item label="기존 포인트" name="userPoints">
            <PointInput
              bgcolor={Theme.lightGrey4_C}
              readOnly
              size="small"
              suffix="원"
            />
          </Form.Item>

          <Form.Item
            label="지급 포인트"
            name="plusPoints"
            rules={[{ required: true, message: "지급 포인트를 입력해주세요." }]}
          >
            <PointInput
              autoFocus={true}
              size="small"
              type="number"
              min="0"
              {...plusPoint}
              suffix="원"
            />
          </Form.Item>

          <Form.Item label="합계 포인트" name="sumPoints">
            <PointInput
              bgcolor={Theme.lightGrey4_C}
              readOnly
              size="small"
              suffix="원"
            />
          </Form.Item>
          <Wrapper>
            <ModalBtn size="small" type="primary" htmlType="submit">
              포인트 지급
            </ModalBtn>
          </Wrapper>
        </CustomForm>
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
      type: USERLIST_REQUEST,
    });

    context.store.dispatch({
      type: GRADE_ALL_LIST_REQUEST,
    });

    context.store.dispatch({
      type: AGENCY_LIST_REQUEST,
    });

    context.store.dispatch({
      type: SELECT_USER_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserList);
