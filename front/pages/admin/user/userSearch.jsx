import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Select,
  notification,
  message,
  Form,
  Input,
  DatePicker,
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
  Text,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST, USERLIST_REQUEST } from "../../../reducers/user";
import { SearchOutlined } from "@ant-design/icons";
import Theme from "../../../components/Theme";
import { PERSNAL_LIST_REQUEST } from "../../../reducers/sale";
import moment from "moment";
import useWidth from "../../../hooks/useWidth";

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
`;

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
  margin: 0 5px;

  @media (max-width: 700px) {
    margin: 5px 0;
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

const UserSearch = ({}) => {
  const { st_loadMyInfoDone, me, users } = useSelector((state) => state.user);

  const router = useRouter();

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
  const width = useWidth();

  const {
    persnalLists,
    //
    st_persnalListDone,
  } = useSelector((state) => state.sale);

  const { RangePicker } = DatePicker;
  //   const [noPickerDate, setNoPickerDate] = useState(`202205`);

  ////// HOOKS //////
  const dispatch = useDispatch();
  // const width = useWidth();

  const [searchUserId, setSearchUserId] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUserName, setIsUserName] = useState(null);

  ////// USEEFFECT //////

  // 이름 검색 후 아이디 매칭하기
  useEffect(() => {
    if (isUserName) {
      const usenameFind = users.find((data) => data.username === isUserName);

      setSearchUserId(usenameFind && usenameFind.id);
    }
  }, [isUserName, searchUserId]);

  // 리스트 검색완료
  useEffect(() => {
    if (st_persnalListDone) {
      if (persnalLists.length === 0) {
        setIsUserName(null);

        return message.success("조회된 매출 내역이 없습니다.");
      } else {
        setIsUserName(null);

        let priceAll = 0;

        persnalLists.map((data) => {
          priceAll += data.price;
        });

        const result = priceAll
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        setTotalPrice(result);

        return message.success("매출이 조회되었습니다.");
      }
    }
  }, [st_persnalListDone]);

  ////// HANDLER //////

  //   달력 리셋
  const resetHandler = useCallback(() => {
    setSearchData(null);
  }, [searchData]);

  //   검색하기
  const searchHandler = useCallback(() => {
    if (!searchData) {
      return message.error("검색할 년도와 월을 선택해주세요.");
    }

    if (!isUserName) {
      return message.error("검색할 회원을 선택해주세요.");
    }

    dispatch({
      type: PERSNAL_LIST_REQUEST,
      data: {
        startDate: searchData[0].format(`YYYYMM`),
        endDate: searchData[1].format(`YYYYMM`),
        userId: searchUserId,
      },
    });
  }, [searchData, isUserName, searchUserId]);

  //   아이디값
  const userIdHandler = useCallback(
    (data) => {
      setIsUserName(data);
    },
    [isUserName]
  );

  //   날짜선택
  const searchDataHandler = useCallback(
    (data) => {
      if (data) {
        setSearchData(data);
      }
    },
    [searchData]
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      title: "번호",
      dataIndex: "num",
    },
    {
      title: "아이디",
      dataIndex: "userId",
    },
    {
      title: "이름",
      dataIndex: "username",
    },
    {
      title: "소속대리점",
      dataIndex: "name",
    },
    {
      title: "매출구분",
      dataIndex: "content",
    },
    {
      title: "매출 발생시점 직급",
      dataIndex: "gradeString",
    },
    {
      title: "매출액",
      dataIndex: "viewPrice",
    },
    {
      title: "매출발생일",
      dataIndex: "viewCreatedAt",
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리", "개인 매출 조회"]}
        title={`개인 매출 조회`}
        subTitle={`회원 별 매출을 조회할 수 있습니다.`}
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
            width={width < 700 ? `100%` : `80%`}
            dr={`row`}
            ju={width < 700 ? `space-between` : `flex-start`}
          >
            <RangePicker
              size="small"
              placeholder={[`선택`, `선택`]}
              value={searchData}
              onChange={searchDataHandler}
              picker="month"
              onCalendarChange={resetHandler}
              disabledDate={(e) => e > moment()}
              style={{ width: width < 700 ? `100%` : `auto` }}
            />

            <CustomSelect
              width={width < 700 ? `80%` : `300px`}
              size="small"
              placeholder="이름으로 검색해주세요."
              onChange={userIdHandler}
              value={isUserName}
              showSearch={true}
            >
              {users &&
                users.map((data) => {
                  return (
                    <Select.Option value={data.username} key={data.id}>
                      {data.userId} | {data.username} | {data.name}
                    </Select.Option>
                  );
                })}
            </CustomSelect>

            <Button
              icon={<SearchOutlined />}
              size="small"
              onClick={searchHandler}
            >
              검색
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
            개인 매출 조회할 날짜 선택 후 아이디 및 이름을 선택하시고 검색버튼을
            누르면 날짜 안에 있는 매출이 조회됩니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            개인매출이기 때문에, 실적매출과는 상이한 데이터입니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>모바일은 가로스크롤로 확인해주세요.</GuideDiv>
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 10px`}>
          <Text>총 {persnalLists && persnalLists.length}건</Text>

          <Wrapper
            bgColor={Theme.grey2_C}
            padding={`10px`}
            width={`auto`}
            dr={`row`}
          >
            <Text margin={`0 10px 0 0`} color={Theme.white_C}>
              총 매출액
            </Text>
            <Text color={Theme.white_C}>{totalPrice}원</Text>
          </Wrapper>
        </Wrapper>

        <Wrapper overflow={`auto`}>
          <Wrapper minWidth={`900px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={columns}
              dataSource={persnalLists}
              size="small"
            />
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
      type: USERLIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserSearch);
