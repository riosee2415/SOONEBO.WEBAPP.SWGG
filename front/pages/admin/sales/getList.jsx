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
  Row,
  Col,
  Select,
} from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  GuideDiv,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  AGENCY_SALES_LIST_REQUEST,
  IN_AGENCY_SALES_LIST_REQUEST,
} from "../../../reducers/sale";
import Theme from "../../../components/Theme";
import moment from "moment";
import useWidth from "../../../hooks/useWidth";
import { SEARCH_AGENCY_LIST_REQUEST } from "../../../reducers/agency";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
`;

const GetList = ({}) => {
  ////// GLOBAL STATE //////
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);

  const { agencySales, inAgencySales, st_agencySalesListDone } = useSelector(
    (state) => state.sale
  );

  const { searchAgencys } = useSelector((state) => state.agency);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const { RangePicker } = DatePicker;

  const [sStartDate, setSStartDate] = useState("");
  const [sEndDate, setSEndDate] = useState("");
  const [sValue, setSValue] = useState("");
  const [dModal, setDModal] = useState(false);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  // useEffect(() => {
  //   if (st_agencySalesListDone) {
  //     if (agencySales.length === 0) {
  //       return message.error("조회된 대리점의 매출이 없습니다.");
  //     }
  //   }
  // }, [sValue, agencySales, st_agencySalesListDone]);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const detailModalToggle = useCallback(
    (name = null) => {
      setDModal((prev) => !prev);

      if (name) {
        const id = String(name).split("[")[1].split("]")[0];
        const D = new Date();

        const year = D.getFullYear();
        const month = D.getMonth() + 1;
        const _month = String(month).padStart(2, "0");

        const currentDate = year + _month;

        dispatch({
          type: IN_AGENCY_SALES_LIST_REQUEST,
          data: {
            startDate: sStartDate || currentDate,
            endDate: sEndDate || currentDate,
            agecyId: id,
          },
        });
      }
    },
    [dModal, sStartDate, sEndDate]
  );

  const serachFormFinish = useCallback(
    (data) => {
      const D = new Date();

      const year = D.getFullYear();
      const month = D.getMonth() + 1;
      const _month = String(month).padStart(2, "0");

      const currentDate = year + _month;

      dispatch({
        type: AGENCY_SALES_LIST_REQUEST,
        data: {
          startDate: sStartDate || currentDate,
          endDate: sEndDate || currentDate,
          searchValue: "AZ대리점",
        },
      });

      setSValue(data);
    },
    [sValue, sStartDate, sEndDate]
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

      dispatch({
        type: AGENCY_SALES_LIST_REQUEST,
        data: {
          startDate: sendDate[0],
          endDate: sendDate[1],
          searchValue: "AZ대리점",
        },
      });
    },
    [sStartDate, sEndDate]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },

    {
      title: "대리점",
      dataIndex: "agencyName",
    },
    {
      title: "기간 별 합산 매출",
      dataIndex: "totalSale",
    },
    {
      title: "기간 별 평균 매출",
      dataIndex: "avgSale",
    },
    {
      title: "기간 별 매출 건 수",
      render: (data) => <div>{data.cnt}건</div>,
    },
    {
      title: "매출 건 수 상세보기",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => detailModalToggle(data.agencyName)}
        >
          상세보기
        </Button>
      ),
    },
  ];

  const inAgency = [
    {
      title: "번호",
      dataIndex: "num",
    },

    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "휴대폰 번호",
      dataIndex: "mobile",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "매출",
      dataIndex: "viewPrice",
    },
    {
      title: "매출발생시점 등급",
      dataIndex: "gradeString",
    },
    {
      title: "현재 등급",
      dataIndex: "currentGrade",
    },
    {
      title: "매출발생일",
      dataIndex: "viewCreatedAt",
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["매출 관리", "전체 매출관리"]}
        title={`전체 매출관리`}
        subTitle={`기간에 따른 전체 매출관리를 확인할 수 있습니다.`}
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
          {/* <CustomSelect
            width={`200px`}
            value={sValue}
            onChange={serachFormFinish}
            size="small"
          >
            <Select.Option value="" disabled={true}>
              대리점명을 선택해주세요.
            </Select.Option>
            {searchAgencys &&
              searchAgencys.map((data) => (
                <Select.Option key={data.id} value={data.name}>
                  {data.name}
                </Select.Option>
              ))}
          </CustomSelect> */}

          <Wrapper
            // width={width < 900 ? `100%` : `50%`}
            dr="row"
            ju={width < 900 ? `center` : `flex-end`}
          >
            <RangePicker
              picker="month"
              defaultValue={[moment(), moment()]}
              onChange={dateChangeHandler}
              disabledDate={(e) => e > moment()}
            />
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
            초기 조회값은 현재 월을 기준으로 조회합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            매출이 발생되지 않으면 목록에 보이지 않습니다.
          </GuideDiv>

          <GuideDiv isImpo={true}>
            모바일에서는 가로스크롤로 확인해주세요.
          </GuideDiv>
        </Wrapper>
        <Wrapper overflow={`auto`}>
          <Wrapper width={`100%`} minWidth={`900px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="num"
              columns={columns}
              dataSource={agencySales}
              size="small"
            />
          </Wrapper>
        </Wrapper>
        {/* DETAIL MODAL */}
        <Modal
          width="1100px"
          title="기간 별 매출 건수 상세 내용"
          footer={null}
          visible={dModal}
          onCancel={() => detailModalToggle()}
        >
          <>
            <Wrapper
              margin={`0px 0px 10px 0px`}
              radius="5px"
              bgColor={Theme.lightGrey5_C}
              padding="5px"
              fontSize="13px"
              al="flex-start"
            >
              <GuideDiv isImpo={true}>
                본 데이터는 기간 별 조회 기준으로 보여집니다.
              </GuideDiv>
              <GuideDiv isImpo={true}>
                해당 화면에서는 기간별로 조회된 매출 내역이 보여지며, 보여지는
                데이터를 제어할 수 없습니다.
              </GuideDiv>
            </Wrapper>
            <Wrapper overflow={`auto`}>
              <Wrapper width={`100%`} minWidth={`900px`}>
                <Table
                  style={{ width: `100%` }}
                  rowKey="id"
                  columns={inAgency}
                  dataSource={inAgencySales}
                  size="small"
                />
              </Wrapper>
            </Wrapper>
          </>
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

    // 현재 월 구하기
    const D = new Date();

    const year = D.getFullYear();
    const month = D.getMonth() + 1;
    const _month = String(month).padStart(2, "0");

    const currentDate = year + _month;

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: AGENCY_SALES_LIST_REQUEST,
      data: {
        startDate: currentDate,
        endDate: currentDate,
        searchValue: "AZ대리점",
      },
    });

    context.store.dispatch({
      type: SEARCH_AGENCY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(GetList);
