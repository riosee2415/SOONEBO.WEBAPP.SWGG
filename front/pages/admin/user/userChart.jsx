import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Select, notification, message } from "antd";

import Theme from "../../../components/Theme";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  GuideDiv,
  Wrapper,
  AdminContent,
  Text,
} from "../../../components/commonComponents";
import {
  LOAD_MY_INFO_REQUEST,
  USER_AGENCY_CHART_REQUEST,
} from "../../../reducers/user";
import useWidth from "../../../hooks/useWidth";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const UserChart = ({}) => {
  ////// HOOKS //////
  const router = useRouter();
  const dispatch = useDispatch();
  const width = useWidth();

  const {
    me,
    //
    agencyUserChart, // 대리점별 회원 수 통계
    gradeUserChart, // 직급별 회원 수 통계
    recommUserChart, // 가장 많이 추천된 회원 수 통계
    //
    st_loadMyInfoDone,
  } = useSelector((state) => state.user);

  const [agencyChart, setAgencyChart] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  useEffect(() => {
    if (agencyUserChart && gradeUserChart && recommUserChart) {
      setAgencyChart([
        // 대리점별 회원 그래프
        {
          series: gradeUserChart.map((data) => data.cnt),
          options: {
            labels: gradeUserChart.map((data) => data.lvValue),
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "직급별 회원수",
              align: "left",
            },
          },
        },
        {
          series: [
            {
              data: gradeUserChart.map((data) => data.cnt),
            },
          ],
          options: {
            labels: gradeUserChart.map((data) => data.lvValue),
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "직급별 회원수",
              align: "left",
            },
          },
        },
        {
          series: [
            {
              data: recommUserChart.map((data) => data.cnt),
            },
          ],
          options: {
            labels: recommUserChart.map((data) => data.username),
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "가장 많이 추천된 회원",
              align: "left",
            },
          },
        },
      ]);
    }
  }, [agencyUserChart]);

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  const recommUserColumn = [
    {
      align: "center",
      title: "순위",
      dataIndex: "num",
      width: `20%`,
    },
    {
      title: "이름",
      dataIndex: "username",
      width: `45%`,
    },
    {
      align: "center",
      title: "추천된 수",
      render: (data) => `${data.cnt}명`,
      width: `35%`,
    },
  ];

  ////// DATA COLUMNS //////

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리", "회원 통계"]}
        title={"회원 통계"}
        subTitle={`회원 별 통계를 확인할 수 있습니다.`}
      />

      <AdminContent>
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
            가장 많이 추천된 회원중 10명을 확인할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>직급별 회원수를 확인할 수 있습니다.</GuideDiv>
        </Wrapper>

        {/* ADMIN GUIDE AREA END */}

        <Wrapper dr={`row`} ju={`space-between`} al={`flex-start`}>
          {/* CHART AREA END */}
          {/* CHART AREA */}
          <Wrapper
            width={width < 900 ? `100%` : `300px`}
            al={`flex-start`}
            padding={`10px`}
            shadow={`2px 2px 5px ${Theme.lightGrey_C}`}
          >
            <Text fontWeight={`bold`} margin={`0 0 20px`}>
              가장 많이 추천된 회원 10명
            </Text>
            <Wrapper>
              <Table
                style={{ width: `100%` }}
                size="small"
                columns={recommUserColumn}
                dataSource={recommUserChart ? recommUserChart : []}
                pagination={{ position: ["none", "none"] }}
              />
            </Wrapper>
          </Wrapper>
          {/* CHART AREA END */}

          {/* CHART AREA */}
          <Wrapper
            width={width < 900 ? `100%` : `auto`}
            padding={`10px`}
            shadow={`2px 2px 5px ${Theme.lightGrey_C}`}
            margin={width < 900 ? `10px 0` : `0`}
          >
            {agencyChart && (
              <Chart
                options={agencyChart[0].options}
                series={agencyChart[0].series}
                type="donut"
                width={
                  width < 1650 ? (width < 900 ? `100%` : `450px`) : `490px`
                }
              />
            )}
          </Wrapper>
          {/* CHART AREA END */}
          {/* CHART AREA */}
          <Wrapper
            width={width < 900 ? `100%` : `auto`}
            padding={`10px`}
            shadow={`2px 2px 5px ${Theme.lightGrey_C}`}
          >
            {agencyChart && (
              <Chart
                options={agencyChart[1].options}
                series={agencyChart[1].series}
                type="bar"
                width={
                  width < 1650 ? (width < 900 ? `100%` : `510px`) : `550px`
                }
              />
            )}
          </Wrapper>
        </Wrapper>
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
      type: USER_AGENCY_CHART_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserChart);
