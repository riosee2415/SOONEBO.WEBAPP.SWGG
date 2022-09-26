import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
} from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  ModalBtn,
  GuideUl,
  GuideLi,
  GuideDiv,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST, USERLIST_REQUEST } from "../../../reducers/user";
import {
  AGENCY_SALES_LIST_REQUEST,
  IN_AGENCY_SALES_LIST_REQUEST,
} from "../../../reducers/sale";
import Theme from "../../../components/Theme";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const UserDeliAddress = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { agencySales, inAgencySales } = useSelector((state) => state.sale);

  const [sStartDate, setSStartDate] = useState("");
  const [sEndDate, setSEndDate] = useState("");
  const [sValue, setSValue] = useState("");
  const [dModal, setDModal] = useState(false);
  const [saleChartState, setSaleChartState] = useState(null);

  const router = useRouter();
  const [sForm] = Form.useForm();
  const { RangePicker } = DatePicker;

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  ////// USEEFFECT //////

  // 차트 그리기
  useEffect(() => {
    if (agencySales) {
      setSaleChartState({
        series: [
          {
            data: agencySales.map((data) => data.originAvgPrice),
          },
        ],
        options: {
          labels: agencySales.map((data) => data.agencyName),
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "대리점별 평균 매출 그래프",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
        },
      });
    }
  }, [agencySales]);

  ////// HANDLER //////

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
          searchValue: data.searchValue,
        },
      });

      setSValue(data.searchValue);
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
          searchValue: sValue,
        },
      });
    },
    [sStartDate, sEndDate, sValue]
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

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["매출 관리", "대리점 별 매출관리"]}
        title={`대리점 별 매출관리`}
        subTitle={`기간에 따른 대리점 별 매출관리를 확인할 수 있습니다.`}
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
          <Wrapper width="50%" dr="row" ju="flex-start">
            <Form
              form={sForm}
              style={{ width: "300px" }}
              onFinish={serachFormFinish}
            >
              <Row gutter={4}>
                <Col span={16}>
                  <Form.Item name="searchValue" style={{ marginBottom: 0 }}>
                    <Input
                      size="small"
                      allowClear
                      placeholder="대리점명으로 검색하세요."
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button type="primary" size="small" htmlType="submit">
                      검색
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Wrapper>

          <Wrapper width="50%" dr="row" ju="flex-end">
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
            기간에 따른 대리점 별 매출관리를 확인할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            초기 조회값은 현재 월을 기준으로 조회합니다. 매출이 발생되지 않은
            대리점은 목록에 보이지 않습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            대리점 코드 별 정렬되며, 가독성을 위해 임의의 변경은 불가능합니다.
          </GuideDiv>
        </Wrapper>
      </AdminContent>
      {saleChartState && (
        <Chart
          options={saleChartState.options}
          series={saleChartState.series}
          type="bar"
          height="550"
        />
      )}
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
        searchValue: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserDeliAddress);
