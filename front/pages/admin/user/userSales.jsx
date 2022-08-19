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
  Switch,
} from "antd";
import {
  SearchOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

import {
  LOAD_MY_INFO_REQUEST,
  USER_LEVEL_MODAL_TOGGLE,
  USERLIST_REQUEST,
  USERLIST_UPDATE_REQUEST,
  USER_DETAIL_MODAL_TOGGLE,
  SALES_CREATE_MODAL_TOGGLE,
  USER_SALES_CREATE_REQUEST,
  USER_JOB_UPDATE_REQUEST,
  SALES_JOB_UPDATE_MODAL_TOGGLE,
} from "../../../reducers/user";
import { GRADE_ALL_LIST_REQUEST } from "../../../reducers/grade";
import { AGENCY_LIST_REQUEST } from "../../../reducers/agency";
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

  @media (max-width: 700px) {
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
    //
    detailModal,
    salesCreateModal,
    salesGradeUpModal,
    //
    st_loadMyInfoDone,
    //
    st_userListLoading,
    st_userListError,
    //
    st_userListUpdateDone,
    st_userListUpdateError,
    //
    st_userSalesCreateDone,
    st_userSalesCreateError,
    //
    st_userJobUpdateDone,
    st_userJobUpdateError,
  } = useSelector((state) => state.user);
  const { gradeAllList, st_gradeListError } = useSelector(
    (state) => state.grade
  );
  const { agencys, st_agencyListError } = useSelector((state) => state.agency);

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

  const [detailData, setDetailData] = useState(null);

  // SEARCH STATE
  const [listUserGrade, setListUserGrade] = useState(null); // 직급
  const [listUserAgency, setListUserAgency] = useState(null); // 대리점
  const [listUsername, setListUsername] = useState(""); // 회원이름
  const [listUserEmail, setListUserEmail] = useState(""); // 회원이메일
  const [listSort, setListSort] = useState("1"); // 순서

  const [searchForm] = Form.useForm();
  const [detailForm] = Form.useForm();
  const [salesForm] = Form.useForm();
  const [jobUpFrom] = Form.useForm();

  ////// USEEFFECT //////

  // 기본 START //
  // 회원
  useEffect(() => {
    dispatch({
      type: USERLIST_REQUEST,
      data: {
        notAny: true,

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

  // 세일즈 생성
  useEffect(() => {
    if (st_userSalesCreateDone) {
      dispatch({
        type: USERLIST_REQUEST,
        data: {
          notAny: true,
          gradeId: listUserGrade,
          agencyId: listUserAgency,
          username: listUsername,
          email: listUserEmail,
          dateSort: listSort,
        },
      });

      salesForm.resetFields();
      salesCreateModalToggle();

      return message.success("세일즈 회원이 생성되었습니다.");
    }
  }, [st_userSalesCreateDone]);

  useEffect(() => {
    if (st_userSalesCreateError) {
      return message.error(st_userSalesCreateError);
    }
  }, [st_userSalesCreateError]);

  // 직급 등급업
  useEffect(() => {
    if (st_userJobUpdateDone) {
      dispatch({
        type: USERLIST_REQUEST,
        data: {
          notAny: true,
          gradeId: listUserGrade,
          agencyId: listUserAgency,
          username: listUsername,
          email: listUserEmail,
          dateSort: listSort,
        },
      });

      jobUpFrom.resetFields();
      jobUpdateModalToggle(null);

      return message.success("회원이 등급업되었습니다.");
    }
  }, [st_userJobUpdateDone]);

  useEffect(() => {
    if (st_userJobUpdateError) {
      return message.error(st_userJobUpdateError);
    }
  }, [st_userJobUpdateError]);

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
          notAny: true,
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
  // 권한 수정 END //

  ////// TOGGLE //////

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

  // 세일즈 생성 모달 START //

  const salesCreateModalToggle = useCallback(() => {
    dispatch({
      type: SALES_CREATE_MODAL_TOGGLE,
    });
  }, [salesCreateModal]);
  // 세일즈 생성 모달 END //

  // 등급업 모달 START //
  const jobUpdateModalToggle = useCallback(
    (data) => {
      if (data) {
        setDetailData(data);
      } else {
        setDetailData(null);
      }
      dispatch({
        type: SALES_JOB_UPDATE_MODAL_TOGGLE,
      });
    },
    [salesGradeUpModal, detailData, gradeAllList]
  );
  // 등급업 모달 END //

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

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
  }, [listUserGrade, listUserAgency, listUsername, listUserEmail]);

  // 세일즈 회원 생성
  const salesCreateHandler = useCallback((data) => {
    dispatch({
      type: USER_SALES_CREATE_REQUEST,
      data: {
        userId: data.userId,
        email: data.email,
        username: data.username,
        mobile: data.mobile,
        password: data.password,
        managerId: JSON.parse(data.managerId).id,
        isAgency: data.isAgency,
        agencyId: JSON.parse(data.agencyId).id,
      },
    });
  }, []);

  // SALES CREATE FUNCATION
  const salesCreateModalSubmit = useCallback(() => {
    salesForm.submit();
  }, []);

  // JOB UPDATe FUNCATION
  const jobUpdateModalSubmit = useCallback(() => {
    jobUpFrom.submit();
  }, []);

  // 세일즈 등급업
  const salesUpdateHandler = useCallback(
    (data) => {
      if (
        gradeAllList.find((value) => value.id === data.gradeId)
          .possiblePayment > detailData.originAmountPrice
      ) {
        return message.error("매출액에 해당하지않아 등급업을 할 수 없습니다.");
      }

      dispatch({
        type: USER_JOB_UPDATE_REQUEST,
        data: {
          id: detailData.id,
          gradeId: data.gradeId,
        },
      });
    },
    [detailData, gradeAllList]
  );

  ////// DATAVIEW //////

  // USER TABLE COLUMNS
  const columns = [
    {
      width: `5%`,
      title: "번호",
      align: "center",
      dataIndex: "id",
    },
    {
      width: `12%`,
      title: "아이디",
      dataIndex: "userId",
    },
    {
      width: `12%`,
      title: "이름",
      dataIndex: "username",
      ellipsis: true,
    },

    {
      width: `13%`,
      title: "이메일",
      dataIndex: "email",
      ellipsis: true,
    },

    {
      width: `12%`,
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
      width: `8%`,
      title: "직급",
      align: "center",
      render: (data) => (
        <Text width={`100%`} isEllipsis color={Theme.subTheme5_C}>
          {data.lvValue}
        </Text>
      ),
    },

    {
      width: `10%`,
      title: "한달 매출액",
      align: "right",
      render: (data) => (
        <Text width={`100%`} isEllipsis color={Theme.subTheme5_C}>
          {data.viewAmountPrice}
        </Text>
      ),
    },

    {
      width: `8%`,
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
      title: "등급업",
      align: "center",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => jobUpdateModalToggle(data)}
        >
          등급업
        </Button>
      ),
    },

    {
      width: `13%`,
      title: "가입일",
      dataIndex: "viewCreatedAt",
      ellipsis: true,
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리", "세일즈 등업"]}
        title={`세일즈 등업`}
        subTitle={`홈페이지에 가입한 회원을 관리할 수 있습니다.`}
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
          <Wrapper dr={`row`} ju={`space-between`}>
            <Wrapper dr={`row`} width={width < 700 ? `100%` : `auto`}>
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
                  gradeAllList
                    .filter((data) => data.lvValue !== "any")
                    .map((data) => (
                      <Select.Option value={data.id} key={data.id}>
                        {data.lvValue}
                      </Select.Option>
                    ))}
              </CustomSelect>
              {/* <CustomSelect
                value={listUserAgency}
                onChange={searchListUserAgencyHandler}
                width={width < 700 ? `100%` : `130px`}
                size="small"
                placeholder="대리점"
              >
                <Select.Option value={"전체"}>전체</Select.Option>
                {agencys &&
                  agencys.map((data) => (
                    <Select.Option value={data.id} key={data.id}>
                      {data.name}
                    </Select.Option>
                  ))}
              </CustomSelect> */}

              <SearchForm
                form={searchForm}
                onFinish={searchListUsernameHandler}
              >
                <Form.Item name="username">
                  <CustomInput size="small" placeholder="사용자명" />
                </Form.Item>
                <Form.Item name="email">
                  <CustomInput size="small" placeholder="이메일" />
                </Form.Item>
                <Button
                  icon={<SearchOutlined />}
                  size="small"
                  htmlType="submit"
                >
                  검색
                </Button>
              </SearchForm>
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={width < 700 ? `100%` : `auto`}
              ju={`flex-end`}
            >
              <ModalBtn
                icon={<UnorderedListOutlined />}
                size="small"
                type="primary"
                onClick={searchAllHandler}
              >
                전체조회
              </ModalBtn>
              {/* <ModalBtn
                icon={<PlusOutlined />}
                size="small"
                type="primary"
                onClick={() => salesCreateModalToggle(null)}
              >
                세일즈 생성
              </ModalBtn> */}
            </Wrapper>
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
            직급, 사용자명, 이메일로 검색할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            등급업은 신중한 작업을 필요로 합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>모바일은 가로스크롤로 확인해주세요.</GuideDiv>
        </Wrapper>

        {/* ADMIN GUIDE AREA END */}

        <Wrapper overflow={`auto`}>
          <Wrapper minWidth={`900px`}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={users ? users : []}
              size="small"
              loading={st_userListLoading}
            />
          </Wrapper>
        </Wrapper>
      </AdminContent>

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
                <Text>{detailData.mobile ? detailData.mobile : "-"}</Text>
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
                <Text>{detailData.address ? detailData.address : "-"}</Text>
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
                <Text>
                  {detailData.detailAddress ? detailData.detailAddress : "-"}
                </Text>
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
                <Text>{detailData.postCode ? detailData.postCode : "-"}</Text>
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
                <Text>{detailData.userPoint}p</Text>
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

            {/* 한달 매출액 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                한달 매출액
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text color={Theme.subTheme5_C}>
                  {detailData.viewAmountPrice}
                </Text>
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

      {/* SALES MODAL */}
      <Modal
        width={`600px`}
        title="세일즈 생성"
        visible={salesCreateModal}
        onCancel={salesCreateModalToggle}
        footer={
          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={salesCreateModalToggle}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              onClick={salesCreateModalSubmit}
            >
              생성
            </ModalBtn>
          </Wrapper>
        }
      >
        <CustomForm
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={salesForm}
          onFinish={salesCreateHandler}
        >
          {/* 아이디 */}
          <Form.Item
            label="아이디"
            name="userId"
            rules={[{ required: true, message: "아이디를 입력해주세요." }]}
          >
            <Input size="small" placeholder="아이디를 입력해주세요." />
          </Form.Item>

          {/* 이메일 */}
          <Form.Item
            label="이메일"
            name="email"
            rules={[{ required: true, message: "이메일을 입력해주세요." }]}
          >
            <Input
              size="small"
              type="email"
              placeholder="이메일를 입력해주세요."
            />
          </Form.Item>

          {/* 이름 */}
          <Form.Item
            label="이름"
            name="username"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input size="small" placeholder="이름을 입력해주세요." />
          </Form.Item>

          {/* 전화번호 */}
          <Form.Item
            label="전화번호"
            name="mobile"
            rules={[{ required: true, message: "전화번호를 입력해주세요." }]}
          >
            <Input
              size="small"
              type="number"
              placeholder="전화번호는 숫자만 입력해주세요."
            />
          </Form.Item>

          {/* 비밀번호 */}
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
          >
            <Input
              size="small"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </Form.Item>

          {/* 추천인 */}
          <Form.Item
            label="추천인"
            name="managerId"
            rules={[{ required: true, message: "추천인을 선택해주세요." }]}
          >
            <Select
              size="small"
              showSearch
              placeholder="추천인을 선택해주세요."
            >
              {users &&
                users.map((data) => (
                  <Select.Option
                    value={JSON.stringify({
                      id: data.id,
                      username: data.username,
                    })}
                    key={data.id}
                  >
                    {data.username}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {/* 대리점 */}
          <Form.Item
            label="대리점"
            name="agencyId"
            rules={[{ required: true, message: "대리점을 선택해주세요." }]}
          >
            <Select
              size="small"
              showSearch
              placeholder="대리점을 선택해주세요."
            >
              {agencys &&
                agencys.map((data) => (
                  <Select.Option
                    value={JSON.stringify({
                      id: data.id,
                      name: data.name,
                    })}
                    key={data.id}
                  >
                    {data.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {/* 대리점주 여부 */}
          <Form.Item label="대리점주여부" name="isAgency">
            <Switch />
          </Form.Item>
        </CustomForm>
      </Modal>

      {/* SALES UP MODAL */}
      <Modal
        width={`600px`}
        title="등급업"
        visible={salesGradeUpModal}
        onCancel={() => jobUpdateModalToggle(null)}
        footer={
          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={() => jobUpdateModalToggle(null)}>
              취소
            </ModalBtn>
            <ModalBtn
              size="small"
              type="primary"
              onClick={jobUpdateModalSubmit}
            >
              등급업
            </ModalBtn>
          </Wrapper>
        }
      >
        {/* 매출액 */}
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
            <Text>{detailData && detailData.lvValue}</Text>
          </Wrapper>
        </Wrapper>

        {/* 매출액 */}
        <Wrapper dr={`row`} margin={`0 0 20px`}>
          <Wrapper
            width={`25%`}
            padding={`5px`}
            radius={`2px`}
            bgColor={Theme.lightGrey4_C}
          >
            매출액
          </Wrapper>
          <Wrapper
            width={`75%`}
            padding={`5px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Text>{detailData && detailData.viewAmountPrice}</Text>
          </Wrapper>
        </Wrapper>

        <CustomForm form={jobUpFrom} onFinish={salesUpdateHandler}>
          <Form.Item
            label="직급"
            name="gradeId"
            rules={[{ required: true, message: "직급을 선택해주세요." }]}
          >
            <Select placeholder="직급을 선택해주세요." size="small">
              {gradeAllList &&
                detailData &&
                gradeAllList
                  .filter((data) => data.lvValue !== "any")
                  .map((data) => (
                    <Select.Option value={data.id} key={data.id}>
                      {data.lvValue}(
                      {numberWithCommas(String(data.possiblePayment))}원)
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
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
      data: {
        notAny: true,
      },
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

export default withRouter(UserList);
