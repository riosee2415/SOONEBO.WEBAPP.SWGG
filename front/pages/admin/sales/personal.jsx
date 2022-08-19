import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  DatePicker,
  notification,
  message,
  Form,
  Input,
  Popconfirm,
  Select,
} from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  ModalBtn,
  GuideDiv,
  Text,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST, USERLIST_REQUEST } from "../../../reducers/user";
import {
  PERSONAL_CAL_LIST_REQUEST,
  PERSONAL_CAL_UPDATE_REQUEST,
} from "../../../reducers/sale";
import Theme from "../../../components/Theme";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import useWidth from "../../../hooks/useWidth";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const SearchForm = styled(Form)`
  display: flex;
  flex-direction: row;
  width: auto;

  & .ant-form-item {
    width: 200px;
    margin: 0 0 0 5px;
  }

  & .ant-form-item,
  & .ant-form-item-control-input {
    min-height: 0;
  }

  @media (max-width: 900px) {
    margin: 10px 0;
  }
`;

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
`;

const Personal = ({}) => {
  ////// GLOBAL STATE //////
  const { st_loadMyInfoDone, me, users } = useSelector((state) => state.user);

  const { personalCals, st_personalCalUpdateDone, st_personalCalUpdateError } =
    useSelector((state) => state.sale);

  ////// HOOKS //////
  const router = useRouter();
  const width = useWidth();
  const dispatch = useDispatch();

  const [searchForm] = Form.useForm();

  const { RangePicker } = DatePicker;

  const [dModal, setDModal] = useState(false);

  const [detailData, setDetailData] = useState(null);

  const [sStartDate, setSStartDate] = useState("");
  const [sEndDate, setSEndDate] = useState("");
  const [userName, setUserName] = useState("");
  const [isCom, setIsCom] = useState(0);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    dispatch({
      type: PERSONAL_CAL_LIST_REQUEST,
      data: {
        startDate: sStartDate,
        endDate: sEndDate,
        searchName: userName,
        comp: isCom,
      },
    });
  }, [sStartDate, sEndDate, userName, isCom]);

  ////////////////// 정보 수정 후처리 /////////////////////
  useEffect(() => {
    if (st_personalCalUpdateDone) {
      dispatch({
        type: PERSONAL_CAL_LIST_REQUEST,
        data: {
          startDate: sStartDate,
          endDate: sEndDate,
          searchName: userName,
          comp: isCom,
        },
      });

      message.success("정상적으로 정산처리가 이루어졌습니다.");
    }
  }, [st_personalCalUpdateDone]);

  useEffect(() => {
    if (st_personalCalUpdateError) {
      return message.error(st_personalCalUpdateError);
    }
  }, [st_personalCalUpdateError]);

  ////// TOGGLE //////
  const detailModalToggle = useCallback(
    (data) => {
      setDModal((prev) => !prev);
      setDetailData(data);
    },
    [dModal]
  );

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const serachFormFinish = useCallback(
    (data) => {
      setUserName(data);
    },
    [userName]
  );

  const dateChangeHandler = useCallback(
    (dateF, dateS) => {
      let sendDate = [];

      if (dateS.length >= 2) {
        dateS.map((v) => {
          sendDate.push(String(v).replace("-", ""));
        });
      }

      setSStartDate(sendDate[0]);
      setSEndDate(sendDate[1]);
    },
    [sStartDate, sEndDate]
  );

  const completeHandler = useCallback((data) => {
    dispatch({
      type: PERSONAL_CAL_UPDATE_REQUEST,
      data: {
        id: data,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "사용자",
      dataIndex: "username",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "매출 발생시점 직급",
      dataIndex: "gradeString",
    },
    {
      title: "현재직급",
      dataIndex: "currentGrade",
    },
    {
      title: "정산금액",
      render: (data) => <Text color={Theme.basicTheme_C}>{data.viewFee}</Text>,
    },
    {
      title: "정산 외 금액",
      render: (data) => (
        <Text color={Theme.subTheme5_C}>{data.viewRemainPrice}</Text>
      ),
    },
    {
      title: "원 매출액",
      dataIndex: "viewPrice",
    },
    {
      title: "생성일",
      dataIndex: "viewCreatedAt",
    },
    {
      title: "정산처리",
      render: (data) =>
        data.viewCompletedAt === null ? (
          <Popconfirm
            placement="topRight"
            title="정말로 정산처리 하겠습니까?"
            okText="처리하기"
            cancelText="취소"
            onConfirm={() => completeHandler(data.id)}
          >
            <Button size="small" type="primary">
              정산처리하기
            </Button>
          </Popconfirm>
        ) : (
          <Text>{data.viewCompletedAt}</Text>
        ),
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => detailModalToggle(data)}
        >
          상세보기
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["정산 관리", "개인 별 정산관리"]}
        title={`개인 별 정산관리`}
        subTitle={`기간에 따른 개인 별 정산내역을 확인할 수 있습니다.`}
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
          <Wrapper dr="row" ju="flex-start">
            <RangePicker
              style={{ width: `300px` }}
              size="small"
              picker="month"
              placeholder={["날짜를 선택해주세요.", "날짜를 선택해주세요"]}
              onChange={dateChangeHandler}
              disabledDate={(e) => e > moment()}
            />

            <CustomSelect
              width={`200px`}
              value={userName}
              onChange={serachFormFinish}
              size="small"
            >
              <Select.Option value="" disabled={true}>
                사용자를 선택해주세요.
              </Select.Option>
              {users &&
                users.map((data) => (
                  <Select.Option key={data.id} value={data.username}>
                    {data.username}
                  </Select.Option>
                ))}
            </CustomSelect>

            <ModalBtn
              size="small"
              type={isCom === 0 ? "primary" : "default"}
              onClick={() => setIsCom(0)}
            >
              미정산
            </ModalBtn>
            <ModalBtn
              size="small"
              type={isCom === 1 ? "primary" : "default"}
              onClick={() => setIsCom(1)}
            >
              정산완료
            </ModalBtn>
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
          <GuideDiv isImpo={true}>초기 조회값은 불러오지 않습니다.</GuideDiv>
          <GuideDiv isImpo={true}>
            기간에 따른 개인 별 정산내역을 확인할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            기간을 선택하면 미정산내역 기준으로 조회가 됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            정산처리후 데이터를 되돌릴 수 없으니 신중하게 처리바랍니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            모바일에서는 가로스크롤로 확인해주세요.
          </GuideDiv>
        </Wrapper>

        <Wrapper overflow={`auto`}>
          <Wrapper width={`100%`} minWidth={`1100px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={columns}
              dataSource={personalCals}
              size="small"
            />
          </Wrapper>
        </Wrapper>

        {/* DETAIL MODAL */}
        <Modal
          width="600px"
          title="상세 내용"
          footer={null}
          visible={dModal}
          onCancel={() => detailModalToggle(null)}
        >
          <Wrapper
            margin={`0px 0px 10px 0px`}
            radius="5px"
            bgColor={Theme.lightGrey5_C}
            padding="5px"
            fontSize="13px"
            al="flex-start"
          >
            <GuideDiv isImpo={true}>
              상세내용는 사용자의 기간 별 정산내역 조회 기준으로 보여집니다.
            </GuideDiv>
            <GuideDiv isImpo={true}>
              보여지는 상세내용은 제어할 수 없습니다.
            </GuideDiv>
          </Wrapper>

          {detailData && (
            <Wrapper>
              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  이름
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.username}</Text>
                </Wrapper>
              </Wrapper>

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

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  연락처
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.mobile}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  은행명
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.bank}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  계좌번호
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.accountNo}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  매출구분
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.content}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  매출 발생시점 직급
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.currentGrade}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  현재직급
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.currentGrade}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  정산금액
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.viewFee}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  정산 외 금액
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.viewRemainPrice}</Text>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`25%`}
                  padding={`5px`}
                  radius={`2px`}
                  bgColor={Theme.lightGrey4_C}
                >
                  원 매출액
                </Wrapper>
                <Wrapper
                  width={`75%`}
                  padding={`5px`}
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                >
                  <Text>{detailData.viewPrice}</Text>
                </Wrapper>
              </Wrapper>

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

              {detailData.viewCompletedAt ? (
                <Wrapper dr={`row`}>
                  <Wrapper
                    width={`25%`}
                    padding={`5px`}
                    radius={`2px`}
                    bgColor={Theme.lightGrey4_C}
                  >
                    정산처리일
                  </Wrapper>
                  <Wrapper
                    width={`75%`}
                    padding={`5px`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Text>{detailData.viewCompletedAt}</Text>
                  </Wrapper>
                </Wrapper>
              ) : (
                <Wrapper dr={`row`}>
                  <Wrapper
                    width={`25%`}
                    padding={`5px`}
                    radius={`2px`}
                    bgColor={Theme.lightGrey4_C}
                  >
                    정산처리일
                  </Wrapper>
                  <Wrapper
                    width={`75%`}
                    padding={`5px`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Text>정산이 이루어지지 않았습니다.</Text>
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          )}
        </Modal>
      </AdminContent>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Personal);
