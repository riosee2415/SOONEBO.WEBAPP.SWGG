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
  Image,
  Popconfirm,
} from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";

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
import Theme from "../../../components/Theme";
import {
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_UPDATE_REQUEST,
  BOUGHT_COMPLETED_REQUEST,
  BOUGHT_DETAIL_LIST_REQUEST,
  BOUGHT_DETAIL_REQUEST,
} from "../../../reducers/boughtHistory";
import { AGENCY_LIST_REQUEST } from "../../../reducers/agency";
import useWidth from "../../../hooks/useWidth";

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `100%`};
  margin: 0 5px 0 0;

  @media (max-width: 900px) {
    margin: 0 5px 5px 0;
  }
`;

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const UserDeliAddress = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const { agencys } = useSelector((state) => state.agency);
  const {
    adminBoughtList, // 전체 리스트
    boughtDetailList, // 상세정보
    boughtDetaiItems, // 상세정보
    // 전체 리스트
    st_boughtAdminListLoading,
    st_boughtAdminListError,
    // 배송정보 저장
    st_boughtAdminUpdateDone,
    st_boughtAdminUpdateError,
    // 승인
    st_boughtCompletedLoading,
    st_boughtCompletedDone,
    st_boughtCompletedError,
  } = useSelector((state) => state.boughtHistory);

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
  const router = useRouter();
  const width = useWidth();

  const [deliveryForm] = Form.useForm();

  // 검색
  const [searchAgency, setSearchAgency] = useState(2); // 대리점 조회
  const [searcDelivery, setSearcDelivery] = useState(null); // 배송상태 조회
  const [searchPayWay, setSearchPayWay] = useState("전체"); // 결제유형 조회
  const [searchDate, setSearchDate] = useState("6"); // 개월별 생성일 조회
  const [searchAreaDate, setSearchAreaDate] = useState([null, null]); // 생성일 영역 조회

  // 모달
  const [dModal, setDModal] = useState(false); // 상세보기 모달
  const [bModal, setBModal] = useState(false); // 배송정보입력 모달

  const [detailData, setDetailData] = useState(null); // 모달 상세정보

  ////// USEEFFECT //////

  // 전체 리스트
  useEffect(() => {
    dispatch({
      type: BOUGHT_ADMIN_LIST_REQUEST,
      data: {
        startDate: searchAreaDate[0]
          ? searchAreaDate[0].format("YYYY-MM-DD")
          : null,

        endDate: searchAreaDate[1]
          ? searchAreaDate[1].format("YYYY-MM-DD")
          : null,

        searchDate: parseInt(searchDate),
        payWay: searchPayWay !== "전체" ? searchPayWay : null,
        agencyId: 2,
        deliveryStatus: searcDelivery ? parseInt(searcDelivery) : null,
      },
    });
  }, [router.query, searchPayWay, searcDelivery, searchDate, searchAreaDate]);

  useEffect(() => {
    if (st_boughtAdminListError) {
      return message.error(st_boughtAdminListError);
    }
  }, [st_boughtAdminListError]);

  // 배송정보 저장

  useEffect(() => {
    if (st_boughtAdminUpdateDone) {
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          startDate: searchAreaDate[0]
            ? searchAreaDate[0].format("YYYY-MM-DD")
            : null,

          endDate: searchAreaDate[1]
            ? searchAreaDate[1].format("YYYY-MM-DD")
            : null,

          searchDate: parseInt(searchDate),
          payWay: searchPayWay !== "전체" ? searchPayWay : null,
          agencyId: 2,
          deliveryStatus: searcDelivery ? parseInt(searcDelivery) : null,
        },
      });

      bModalToggle(null);

      deliveryForm.resetFields();

      return message.success("배송정보가 저장되었습니다.");
    }
  }, [st_boughtAdminUpdateDone]);

  useEffect(() => {
    if (st_boughtAdminUpdateError) {
      return message.error(st_boughtAdminUpdateError);
    }
  }, [st_boughtAdminUpdateError]);

  // 승인

  useEffect(() => {
    if (st_boughtCompletedDone) {
      dispatch({
        type: BOUGHT_ADMIN_LIST_REQUEST,
        data: {
          startDate: searchAreaDate[0]
            ? searchAreaDate[0].format("YYYY-MM-DD")
            : null,

          endDate: searchAreaDate[1]
            ? searchAreaDate[1].format("YYYY-MM-DD")
            : null,

          searchDate: parseInt(searchDate),
          payWay: searchPayWay !== "전체" ? searchPayWay : null,
          agencyId: 2,
          deliveryStatus: searcDelivery ? parseInt(searcDelivery) : null,
        },
      });

      return message.success("승인되었습니다.");
    }
  }, [st_boughtCompletedDone]);
  useEffect(() => {
    if (st_boughtCompletedError) {
      return message.error(st_boughtCompletedError);
    }
  }, [st_boughtCompletedError]);

  ////// TOGGLE //////

  const dModalToggle = useCallback(
    (data) => {
      if (data) {
        dispatch({
          type: BOUGHT_DETAIL_LIST_REQUEST,
          data: {
            boughtId: data.id,
          },
        });

        setDetailData(data);
      } else {
        setDetailData(null);
      }

      setDModal((prev) => !prev);
    },
    [dModal, detailData]
  );

  const bModalToggle = useCallback(
    (data) => {
      if (data) {
        deliveryForm.setFieldsValue({
          deliveryNo: data.deliveryNo,
        });

        setDetailData(data);
      } else {
        setDetailData(null);
      }

      setBModal((prev) => !prev);
    },
    [bModal, detailData]
  );

  ////// HANDLER //////

  // 대리점 검색
  const chnageAgencyHandler = useCallback(
    (data) => {
      setSearchAgency(data);
    },
    [searchAgency]
  );

  // 배송상태 검색
  const chnageDeliveryHandler = useCallback(
    (data) => {
      setSearcDelivery(data);
    },
    [searcDelivery]
  );

  // 결제유형 검색
  const changePayWayHandler = useCallback(
    (data) => {
      setSearchPayWay(data);
    },
    [searchPayWay]
  );

  // 개월별 생성일 조회
  const chnageDateHandler = useCallback(
    (data) => {
      if (searchAreaDate) {
        setSearchAreaDate([null, null]);
      }

      setSearchDate(data);
    },
    [searchDate, searchAreaDate]
  );

  // 생성일 영역 조회
  const chnageAreaDateHandler = useCallback(
    (data) => {
      if (searchDate !== "6") {
        setSearchDate("6");
      }
      setSearchAreaDate([data ? data[0] : null, data ? data[1] : null]);
    },
    [searchAreaDate, searchDate]
  );

  // 전체조회
  const allSearchHandler = useCallback(() => {
    setSearchAgency(null);
    setSearcDelivery(null);
    setSearchDate("6");
    setSearchAreaDate([null, null]);
  }, [searchAgency, searcDelivery, searchDate, searchAreaDate]);

  // 배송정보 입력
  const deliveryUpdateHadnler = useCallback(
    (data) => {
      dispatch({
        type: BOUGHT_ADMIN_UPDATE_REQUEST,
        data: {
          id: detailData.id,
          deliveryCom: "롯데택배",
          deliveryNo: data.deliveryNo,
        },
      });
    },
    [detailData]
  );

  // 승인
  const checkBankHandler = useCallback((data) => {
    dispatch({
      type: BOUGHT_COMPLETED_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, []);

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      align: "center",
      title: "번호",
      dataIndex: "id",
    },
    {
      align: "center",
      title: "결제유형",
      render: (data) =>
        data.payWay === "card"
          ? "신용카드"
          : data.payWay === "nobank"
          ? "무통장입금"
          : data.payWay === "vbank"
          ? "가상계좌"
          : data.payWay === "trans"
          ? "계좌이체"
          : data.payWay === "phone"
          ? "휴대폰결제"
          : "신용카드",
    },
    {
      align: "center",
      title: "배송상태",
      dataIndex: "viewDeliveryStatus",
    },
    {
      title: "주문자",
      dataIndex: "name",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      align: "right",
      title: "가격",
      dataIndex: "viewPrice",
    },
    {
      align: "right",
      title: "사용포인트",
      dataIndex: "viewPointPrice",
    },

    {
      align: "center",
      title: "상세정보",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => dModalToggle(data)}>
          상세정보
        </Button>
      ),
    },

    {
      align: "center",
      title: "배송정보입력",
      render: (data) => (
        <Button size="small" type="primary" onClick={() => bModalToggle(data)}>
          배송정보입력
        </Button>
      ),
    },

    {
      align: "center",
      title: "승인여부",
      render: (data) =>
        data.isCompleted ? (
          <Text color={Theme.subTheme5_C}>승인완료</Text>
        ) : (
          <Popconfirm
            title="승인하시겠습니까?"
            okText="승인"
            cancelText="취소"
            onConfirm={() => checkBankHandler(data)}
          >
            <Button
              size="small"
              type="primary"
              loading={st_boughtCompletedLoading}
            >
              승인
            </Button>
          </Popconfirm>
        ),
    },

    {
      title: "구매일",
      dataIndex: "viewCreatedAt",
    },
  ];

  const searchDateArr = [
    {
      key: "6",
      text: "전체",
    },
    {
      key: "1",
      text: "오늘",
    },
    {
      key: "2",
      text: "1개월",
    },
    {
      key: "3",
      text: "3개월",
    },
    {
      key: "4",
      text: "6개월",
    },
    {
      key: "5",
      text: "1년",
    },
  ];

  const searchDeliveryArr = [
    {
      key: "8",
      text: "전체",
    },
    {
      key: "0",
      text: "입금대기",
    },
    {
      key: "1",
      text: "결제완료",
    },
    {
      key: "2",
      text: "배송준비중",
    },
    {
      key: "3",
      text: "집화완료",
    },
    {
      key: "4",
      text: "배송중",
    },
    {
      key: "5",
      text: "지점도착",
    },
    {
      key: "6",
      text: "배송출발",
    },
    {
      key: "7",
      text: "배송완료",
    },
  ];

  const searchPayWayArr = [
    {
      key: "card",
      text: "신용카드",
    },
    {
      key: "nobank",
      text: "무통장입금",
    },
    {
      key: "vbank",
      text: "가상계좌",
    },
    {
      key: "trans",
      text: "계좌이체",
    },
    {
      key: "phone",
      text: "휴대폰결제",
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["주문 관리", "주문내역 관리"]}
        title={`주문내역 관리`}
        subTitle={`회원이 주문한 주문내역을 관리할 수 있습니다.`}
      />

      <AdminContent>
        {/* ADMIN TOP MENU */}

        <Wrapper
          dr="row"
          ju="space-between"
          padding="5px 0px"
          margin="0px 0px 10px 0px"
          borderBottom={`1px dashed ${Theme.lightGrey4_C}`}
        >
          <Wrapper
            width={width < 900 ? `100%` : `80%`}
            dr={`row`}
            ju={`flex-start`}
          >
            {/* <CustomSelect
              width={width < 900 ? `calc(100% / 2 - 10px)` : `130px`}
              size="small"
              placeholder="대리점 검색"
              value={searchAgency}
              onChange={chnageAgencyHandler}
            >
              <Select.Option value={"전체"}>전체</Select.Option>
              {agencys &&
                agencys.map((data) => (
                  <Select.Option value={data.id} key={data.id}>
                    {data.name}
                  </Select.Option>
                ))}
            </CustomSelect> */}

            <CustomSelect
              width={width < 900 ? `calc(100% / 2 - 10px)` : `130px`}
              size="small"
              placeholder="배송상태"
              value={searcDelivery}
              onChange={chnageDeliveryHandler}
            >
              {searchDeliveryArr.map((data) => (
                <Select.Option value={data.key} key={data.key}>
                  {data.text}
                </Select.Option>
              ))}
            </CustomSelect>

            <CustomSelect
              width={width < 900 ? `calc(100% / 2 - 10px)` : `130px`}
              size="small"
              placeholder="결제유형"
              value={searchPayWay}
              onChange={changePayWayHandler}
            >
              <Select.Option value={"전체"}>전체</Select.Option>
              {searchPayWayArr.map((data) => (
                <Select.Option value={data.key} key={data.key}>
                  {data.text}
                </Select.Option>
              ))}
            </CustomSelect>

            <CustomSelect
              width={width < 900 ? `calc(100% / 2 - 10px)` : `130px`}
              size="small"
              value={searchDate}
              onChange={chnageDateHandler}
            >
              {searchDateArr.map((data) => (
                <Select.Option value={data.key} key={data.key}>
                  {data.text}
                </Select.Option>
              ))}
            </CustomSelect>

            <DatePicker.RangePicker
              size="small"
              value={searchAreaDate}
              placeholder={["생성일", "생성일"]}
              onChange={chnageAreaDateHandler}
            />

            <ModalBtn
              icon={<UnorderedListOutlined />}
              size="small"
              type="primary"
              onClick={allSearchHandler}
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
          padding="5px"
          fontSize="13px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>
            홈페이지에서 회원이 주문한 상품의 배송정보를 확인할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            배송정보입력에서 배송회사, 배송운송장번호를 입력할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            모바일에서는 가로스크롤로 확인해주세요.
          </GuideDiv>
        </Wrapper>
        {/* ADMIN GUIDE AREA END */}

        <Wrapper overflow={`auto`}>
          <Wrapper width={`100%`} minWidth={`1100px`}>
            <Table
              rowKey="id"
              style={{ width: `100%` }}
              columns={columns}
              dataSource={adminBoughtList}
              loading={st_boughtAdminListLoading}
              size="small"
            />
          </Wrapper>
        </Wrapper>
      </AdminContent>

      {/* DETAIL MODAL */}
      <Modal
        width={`700px`}
        title="상세보기"
        visible={dModal}
        footer={null}
        onCancel={() => dModalToggle(null)}
      >
        {boughtDetailList && (
          <Wrapper>
            {/* 주문번호 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                주문번호
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.boughtName}</Text>
              </Wrapper>
            </Wrapper>

            {/* 결제유형 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                결제유형
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>
                  {boughtDetailList.payWay === "card"
                    ? "신용카드"
                    : boughtDetailList.payWay === "nobank"
                    ? "무통장입금"
                    : boughtDetailList.payWay === "vbank"
                    ? "가상계좌"
                    : boughtDetailList.payWay === "trans"
                    ? "계좌이체"
                    : boughtDetailList.payWay === "phone"
                    ? "휴대폰결제"
                    : boughtDetailList.payWay === "kakao"
                    ? "카카오페이"
                    : "신용카드"}
                </Text>
              </Wrapper>
            </Wrapper>

            {/* 주문자 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                주문자
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.name}</Text>
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
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.mobile}</Text>
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
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.address}</Text>
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
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.detailAddress}</Text>
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
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.postCode}</Text>
              </Wrapper>
            </Wrapper>

            {/* 배송메세지 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                배송메세지
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.etc}</Text>
              </Wrapper>
            </Wrapper>

            {/* 배송상태 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                배송상태
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-start`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.viewDeliveryStatus}</Text>
              </Wrapper>
            </Wrapper>

            {/* 배송비 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                배송비
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-end`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.deliveryPrice}</Text>
              </Wrapper>
            </Wrapper>

            {/* 구매 금액 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                구매 금액
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-end`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.viewPrice}</Text>
              </Wrapper>
            </Wrapper>

            {/* 사용포인트 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                사용포인트
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-end`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.viewPointPrice}</Text>
              </Wrapper>
            </Wrapper>

            {/* 총 결제 금액 */}
            <Wrapper dr={`row`}>
              <Wrapper
                width={`25%`}
                padding={`5px`}
                radius={`2px`}
                bgColor={Theme.lightGrey4_C}
              >
                총 결제 금액
              </Wrapper>
              <Wrapper
                width={`75%`}
                padding={`5px`}
                al={`flex-end`}
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
              >
                <Text>{boughtDetailList.viewFinalPrice}</Text>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        )}

        {boughtDetaiItems &&
          boughtDetaiItems.map((data) => (
            <Wrapper
              dr={`row`}
              margin={`10px 0`}
              bgColor={Theme.subTheme3_C}
              al={`flex-start`}
            >
              <Image width={`25%`} src={data.productThumbnail} />
              <Wrapper width={`75%`} padding={`4px 0 0 10px`}>
                {/* 상품 이름 */}
                <Wrapper dr={`row`}>
                  <Text width={`20%`}>상품 이름</Text>
                  <Text width={`80%`}>{data.productTitle}</Text>
                </Wrapper>

                {/* 상품 가격 */}
                <Wrapper dr={`row`}>
                  <Text width={`20%`}>상품 가격</Text>
                  <Text width={`80%`}>{data.viewProductPrice}</Text>
                </Wrapper>

                {data.optionString !== null && (
                  <>
                    {/* 옵션 이름 */}
                    <Wrapper dr={`row`}>
                      <Text width={`20%`}>옵션 이름</Text>
                      <Text width={`80%`}>{data.optionString}</Text>
                    </Wrapper>

                    {/* 옵션 가격 */}
                    <Wrapper dr={`row`}>
                      <Text width={`20%`}>옵션 가격</Text>
                      <Text width={`80%`}>{data.viewOptionPrice}</Text>
                    </Wrapper>
                  </>
                )}

                {/* 할인율 */}
                <Wrapper dr={`row`}>
                  <Text width={`20%`}>할인율</Text>
                  <Text width={`80%`}>{data.viewProductDiscount}</Text>
                </Wrapper>

                {/* 할인 가격 */}
                <Wrapper dr={`row`}>
                  <Text width={`20%`}>할인 가격</Text>
                  <Text width={`80%`}>{data.viewDiscount}</Text>
                </Wrapper>

                {/* 총 가격 */}
                <Wrapper dr={`row`}>
                  <Text width={`20%`}>총 가격</Text>
                  <Text width={`80%`}>{data.realPrice}</Text>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          ))}
      </Modal>

      {/* DELIVERY MODAL */}
      <Modal
        title="배송정보입력"
        visible={bModal}
        footer={null}
        onCancel={() => bModalToggle(null)}
      >
        <CustomForm
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={deliveryForm}
          onFinish={deliveryUpdateHadnler}
        >
          <Form.Item label="배송회사">롯데택배</Form.Item>
          <Form.Item
            label="운송장번호"
            name="deliveryNo"
            rules={[{ required: true, message: "운송장번호를 입력해주세요." }]}
          >
            <Input
              size="small"
              placeholder="운송장번호는 숫자만 입력해주세요."
            />
          </Form.Item>

          <Wrapper dr={`row`} ju={`flex-end`}>
            <ModalBtn size="small" onClick={() => bModalToggle(null)}>
              취소
            </ModalBtn>
            <ModalBtn size="small" type="primary" htmlType="submit">
              저장
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
      type: AGENCY_LIST_REQUEST,
    });

    context.store.dispatch({
      type: BOUGHT_ADMIN_LIST_REQUEST,
      data: {
        startDate: null,
        endDate: null,
        searchDate: 6,
        payWay: null,
        agencyId: 2,
        deliveryStatus: null,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(UserDeliAddress);
